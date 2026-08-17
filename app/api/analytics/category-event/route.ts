import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CategoryAnalyticsEventBody = {
  eventType?: unknown;
  categoryId?: unknown;
  userId?: unknown;
  sessionId?: unknown;
  path?: unknown;
  source?: unknown;
  referrer?: unknown;
  metadata?: unknown;
};

const ALLOWED_EVENT_TYPES = new Set([
  "view",
  "open",
  "read",
  "scroll",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function cleanOptionalString(value: unknown): string | undefined {
  if (!isNonEmptyString(value)) {
    return undefined;
  }

  return value.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body =
      (await request.json()) as CategoryAnalyticsEventBody;

    const eventType =
      typeof body.eventType === "string"
        ? body.eventType.trim().toLowerCase()
        : "";

    if (!eventType) {
      return NextResponse.json(
        {
          success: false,
          error: "eventType is required",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_EVENT_TYPES.has(eventType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported category analytics event",
        },
        { status: 400 }
      );
    }

    const categoryId =
      cleanOptionalString(body.categoryId);

    if (!categoryId) {
      return NextResponse.json(
        {
          success: false,
          error: "categoryId is required",
        },
        { status: 400 }
      );
    }

    const category =
      await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        select: {
          id: true,
        },
      });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    const userId =
      cleanOptionalString(body.userId);

    const sessionId =
      cleanOptionalString(body.sessionId);

    const path =
      cleanOptionalString(body.path);

    const source =
      cleanOptionalString(body.source);

    const referrer =
      cleanOptionalString(body.referrer);

    let metadata:
      | Prisma.InputJsonValue
      | undefined;

    if (
      body.metadata !== undefined &&
      body.metadata !== null
    ) {
      if (
        typeof body.metadata !== "object" ||
        Array.isArray(body.metadata)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "metadata must be an object",
          },
          { status: 400 }
        );
      }

      metadata =
        body.metadata as Prisma.InputJsonValue;
    }

    const userAgent =
      request.headers.get("user-agent") ||
      undefined;

    const forwardedFor =
      request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    const event =
      await prisma.categoryAnalyticsEvent.create({
        data: {
          categoryId,
          eventType,
          userId,
          sessionId,
          path,
          source,
          referrer,
          userAgent,
          ip,
          metadata,
        },
        select: {
          id: true,
          categoryId: true,
          eventType: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "[Analytics] Category event collection failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to record category analytics event",
      },
      { status: 500 }
    );
  }
}