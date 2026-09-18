import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

function getR2Client() {
  if (
    !R2_ACCOUNT_ID ||
    !R2_ACCESS_KEY_ID ||
    !R2_SECRET_ACCESS_KEY ||
    !R2_BUCKET_NAME ||
    !R2_PUBLIC_URL
  ) {
    throw new Error("R2 environment variables are not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function getExtension(file: File) {
  const typeMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return typeMap[file.type] || "webp";
}

/**
 * Upload new image to R2
 */
export async function POST(req: Request) {
  try {
    const formData =
      (await req.formData()) as unknown as globalThis.FormData;

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image type",
        },
        { status: 400 }
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "File too large. Maximum size is 5MB.",
        },
        { status: 400 }
      );
    }

    const r2 = getR2Client();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = getExtension(file);

    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");

    const key = `articles/${year}/${month}/${crypto.randomUUID()}.${extension}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const baseUrl = R2_PUBLIC_URL!.replace(/\/$/, "");
    const url = `${baseUrl}/${key}`;

    return NextResponse.json({
      success: true,
      url,
      key,
      provider: "r2",
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("R2 UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "R2 upload failed",
      },
      { status: 500 }
    );
  }
}

/**
 * Delete an R2 image by its object key.
 *
 * IMPORTANT:
 * This endpoint only accepts keys inside the articles/ path.
 * Existing Cloudinary URLs are never touched.
 */
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";

    if (!key) {
      return NextResponse.json(
        {
          success: false,
          message: "R2 object key is required",
        },
        { status: 400 }
      );
    }

    if (!key.startsWith("articles/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid R2 object key",
        },
        { status: 400 }
      );
    }

    const r2 = getR2Client();

    await r2.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    );

    return NextResponse.json({
      success: true,
      deleted: true,
      key,
    });
  } catch (error) {
    console.error("R2 DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "R2 delete failed",
      },
      { status: 500 }
    );
  }
}

