//////////////////////////////////////////////////////////////
// NATIONPATH OTP SEND API
//
// POST /api/auth/otp/send
//
// Supports:
// - Phone OTP
// - Email OTP
// - Canonical Prisma User
// - Secure OTP hash storage
// - Resend email delivery
// - Email OTP + verification link
//
// IMPORTANT:
// - Canonical User collection = "users"
// - Prisma is the only DB access layer
// - Never use Mongoose User
// - Never store plaintext OTP in MongoDB
// - Never store plaintext verification token
// - Development may log/return OTP temporarily
// - Production NEVER returns/logs plaintext OTP
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";
import crypto from "crypto";

import {
  createOtpRecord,
  normalizeEmail,
  normalizePhone,
  type OtpChannel,
  type OtpPurpose,
} from "@/lib/auth/otp";

import { sendOtpEmail } from "@/lib/auth/email";

import { prisma } from "@/lib/prisma";


//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const OTP_PURPOSES: readonly OtpPurpose[] = [
  "login",
  "signup",
  "verify_phone",
  "verify_email",
  "change_phone",
  "change_email",
  "reset_password",
];

const EMAIL_VERIFICATION_EXPIRY_MS =
  24 * 60 * 60 * 1000;


//////////////////////////////////////////////////////////////
// DEVELOPMENT
//////////////////////////////////////////////////////////////

const isDevelopment =
  process.env.NODE_ENV !== "production";


//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function jsonError(
  error: string,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    {
      status,
    }
  );
}


//////////////////////////////////////////////////////////////
// CREATE EMAIL VERIFICATION TOKEN
//
// IMPORTANT:
// - Raw token is sent only inside the email URL.
// - Database stores only SHA-256 hash.
// - Existing unused tokens for the same user/email
//   are invalidated before creating a new one.
//////////////////////////////////////////////////////////////

async function createEmailVerificationUrl({
  userId,
  email,
  request,
}: {
  userId: string;
  email: string;
  request: Request;
}) {

  //////////////////////////////////////////////////////////
  // GENERATE SECURE TOKEN
  //////////////////////////////////////////////////////////

  const rawToken =
    crypto.randomBytes(32).toString("hex");


  //////////////////////////////////////////////////////////
  // HASH TOKEN
  //////////////////////////////////////////////////////////

  const tokenHash =
    crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");


  //////////////////////////////////////////////////////////
  // EXPIRATION
  //////////////////////////////////////////////////////////

  const expiresAt =
    new Date(
      Date.now() +
      EMAIL_VERIFICATION_EXPIRY_MS
    );


  //////////////////////////////////////////////////////////
  // INVALIDATE OLD UNUSED TOKENS
  //////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.updateMany({

    where: {

      userId,

      email,

      consumedAt:
        null,

    },

    data: {

      consumedAt:
        new Date(),

    },

  });


  //////////////////////////////////////////////////////////
  // CREATE NEW TOKEN
  //////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.create({

    data: {

      tokenHash,

      userId,

      email,

      expiresAt,

    },

  });


  //////////////////////////////////////////////////////////
  // APPLICATION BASE URL
  //////////////////////////////////////////////////////////

  const configuredBaseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;


  const baseUrl =
    configuredBaseUrl
      ? new URL(configuredBaseUrl).origin
      : new URL(request.url).origin;


  //////////////////////////////////////////////////////////
  // BUILD VERIFICATION URL
  //////////////////////////////////////////////////////////

  const verificationUrl =
    new URL(
      "/api/auth/otp/verify",
      baseUrl
    );


  verificationUrl.searchParams.set(
    "token",
    rawToken
  );


  return {

    url:
      verificationUrl.toString(),

    expiresAt,

  };

}


//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  request: Request
) {

  try {

    //////////////////////////////////////////////////////////
    // READ REQUEST
    //////////////////////////////////////////////////////////

    let body: unknown;

    try {

      body =
        await request.json();

    } catch {

      return jsonError(
        "Invalid request body",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // SAFE BODY
    //////////////////////////////////////////////////////////

    const data =
      body &&
      typeof body === "object"
        ? body as Record<string, unknown>
        : {};


    //////////////////////////////////////////////////////////
    // CHANNEL
    //////////////////////////////////////////////////////////

    const channel =
      String(
        data.channel || "phone"
      ) as OtpChannel;


    if (
      channel !== "phone" &&
      channel !== "email"
    ) {

      return jsonError(
        "Invalid OTP channel",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // PURPOSE
    //////////////////////////////////////////////////////////

    const purpose =
      String(
        data.purpose || "login"
      ) as OtpPurpose;


    if (
      !OTP_PURPOSES.includes(
        purpose
      )
    ) {

      return jsonError(
        "Invalid OTP purpose",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // ======================================================
    // PHONE OTP
    // ======================================================
    //////////////////////////////////////////////////////////

    if (
      channel === "phone"
    ) {

      ////////////////////////////////////////////////////////
      // READ PHONE
      ////////////////////////////////////////////////////////

      const phone =
        String(
          data.phone || ""
        ).trim();


      ////////////////////////////////////////////////////////
      // NORMALIZE PHONE
      ////////////////////////////////////////////////////////

      let normalizedPhone: string;

      try {

        normalizedPhone =
          normalizePhone(phone);

      } catch {

        return jsonError(
          "Enter a valid international phone number with country code",
          400
        );

      }


      ////////////////////////////////////////////////////////
      // FIND PHONE OWNER
      ////////////////////////////////////////////////////////

      const phoneRecord =
        await prisma.userPhone.findUnique({

          where: {

            phone:
              normalizedPhone,

          },

          include: {

            user: true,

          },

        });


      const existingUser =
        phoneRecord?.user || null;


      ////////////////////////////////////////////////////////
      // LOGIN REQUIRES EXISTING USER
      ////////////////////////////////////////////////////////

      if (
        purpose === "login" &&
        !existingUser
      ) {

        return jsonError(
          "No account found with this phone number",
          404
        );

      }


      ////////////////////////////////////////////////////////
      // SIGNUP REQUIRES NEW USER
      ////////////////////////////////////////////////////////

      if (
        purpose === "signup" &&
        existingUser
      ) {

        return jsonError(
          "This phone number is already registered",
          409
        );

      }


      ////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      ////////////////////////////////////////////////////////

      if (existingUser) {

        if (
          existingUser.isActive === false
        ) {

          return jsonError(
            "Account is inactive",
            403
          );

        }


        if (
          existingUser.status &&
          existingUser.status !== "active"
        ) {

          return jsonError(
            "Account is not active",
            403
          );

        }

      }


      ////////////////////////////////////////////////////////
      // CREATE PHONE OTP
      ////////////////////////////////////////////////////////

      const otpRecord =
        await createOtpRecord({

          channel:
            "phone",

          phone:
            normalizedPhone,

          purpose,

          userId:
            existingUser?.id,

        });


      ////////////////////////////////////////////////////////
      // DEVELOPMENT DEBUG
      ////////////////////////////////////////////////////////

      if (isDevelopment) {

        const dbRecord =
          await prisma.userOtp.findUnique({

            where: {

              id:
                otpRecord.id,

            },

            select: {

              id: true,

              channel: true,

              phone: true,

              email: true,

              purpose: true,

              expiresAt: true,

              consumedAt: true,

              attempts: true,

              maxAttempts: true,

              userId: true,

              createdAt: true,

            },

          });


        console.log(
          [
            "",
            "==================================================",
            "🧪 NATIONPATH PHONE OTP CREATED",
            "==================================================",
            `🆔 OTP ID   : ${otpRecord.id}`,
            `📱 Phone    : ${otpRecord.phone}`,
            `🎯 Purpose  : ${otpRecord.purpose}`,
            `🔢 OTP      : ${otpRecord.otp}`,
            `💾 DB Found : ${dbRecord ? "YES" : "NO"}`,
            `🔒 Consumed : ${
              dbRecord?.consumedAt
                ? dbRecord.consumedAt.toISOString()
                : "null"
            }`,
            `🔢 Attempts : ${
              dbRecord
                ? `${dbRecord.attempts}/${dbRecord.maxAttempts}`
                : "N/A"
            }`,
            `👤 User ID  : ${
              dbRecord?.userId || "null"
            }`,
            `⏳ Expires  : ${
              otpRecord.expiresAt.toISOString()
            }`,
            `🕐 Created  : ${
              dbRecord?.createdAt
                ? dbRecord.createdAt.toISOString()
                : "unknown"
            }`,
            "==================================================",
            "",
          ].join("\n")
        );

      }


      ////////////////////////////////////////////////////////
      // PHONE SMS
      //
      // SMS provider will be connected later.
      ////////////////////////////////////////////////////////

      return NextResponse.json(
        {

          success:
            true,

          message:
            "OTP sent successfully",

          channel:
            "phone",

          phone:
            normalizedPhone,

          expiresAt:
            otpRecord.expiresAt,

          ...(isDevelopment
            ? {

                developmentOtp:
                  otpRecord.otp,

                developmentOtpId:
                  otpRecord.id,

              }
            : {}),

        },
        {
          status: 200,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // ======================================================
    // EMAIL OTP
    // ======================================================
    //////////////////////////////////////////////////////////

    const email =
      String(
        data.email || ""
      ).trim();


    //////////////////////////////////////////////////////////
    // NORMALIZE EMAIL
    //////////////////////////////////////////////////////////

    let normalizedEmail: string;

    try {

      normalizedEmail =
        normalizeEmail(email);

    } catch {

      return jsonError(
        "Enter a valid email address",
        400
      );

    }


    if (!normalizedEmail) {

      return jsonError(
        "Enter a valid email address",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // FIND EMAIL OWNER
    //////////////////////////////////////////////////////////

    const emailRecord =
      await prisma.userEmail.findUnique({

        where: {

          email:
            normalizedEmail,

        },

        include: {

          user: true,

        },

      });


    const existingUser =
      emailRecord?.user || null;


    //////////////////////////////////////////////////////////
    // LOGIN REQUIRES EXISTING USER
    //////////////////////////////////////////////////////////

    if (
      purpose === "login" &&
      !existingUser
    ) {

      return jsonError(
        "No account found with this email address",
        404
      );

    }


    //////////////////////////////////////////////////////////
    // SIGNUP REQUIRES NEW USER
    //////////////////////////////////////////////////////////

    if (
      purpose === "signup" &&
      existingUser
    ) {

      return jsonError(
        "An account already exists with this email address",
        409
      );

    }


    //////////////////////////////////////////////////////////
    // ACCOUNT STATUS
    //////////////////////////////////////////////////////////

    if (existingUser) {

      if (
        existingUser.isActive === false
      ) {

        return jsonError(
          "Account is inactive",
          403
        );

      }


      if (
        existingUser.status &&
        existingUser.status !== "active"
      ) {

        return jsonError(
          "Account is not active",
          403
        );

      }

    }


    //////////////////////////////////////////////////////////
    // CREATE EMAIL OTP
    //////////////////////////////////////////////////////////

    const otpRecord =
      await createOtpRecord({

        channel:
          "email",

        email:
          normalizedEmail,

        purpose,

        userId:
          existingUser?.id,

      });


    //////////////////////////////////////////////////////////
    // EMAIL VERIFICATION URL
    //
    // If a canonical User exists and the email identity
    // is not verified, create a verification token.
    //
    // This means the same email can receive:
    //
    // 1. OTP
    // 2. Verification link
    //
    // in ONE email.
    //////////////////////////////////////////////////////////

    let verificationUrl:
      string | undefined;


    let verificationExpiresAt:
      Date | undefined;


    if (
      existingUser &&
      emailRecord?.isVerified !== true
    ) {

      const verification =
        await createEmailVerificationUrl({

          userId:
            existingUser.id,

          email:
            normalizedEmail,

          request,

        });


      verificationUrl =
        verification.url;

      verificationExpiresAt =
        verification.expiresAt;

    }


    //////////////////////////////////////////////////////////
    // DEVELOPMENT DB VERIFICATION
    //////////////////////////////////////////////////////////

    if (isDevelopment) {

      const dbRecord =
        await prisma.userOtp.findUnique({

          where: {

            id:
              otpRecord.id,

          },

          select: {

            id: true,

            channel: true,

            phone: true,

            email: true,

            purpose: true,

            expiresAt: true,

            consumedAt: true,

            attempts: true,

            maxAttempts: true,

            userId: true,

            createdAt: true,

          },

        });


      console.log(
        [
          "",
          "==================================================",
          "🧪 NATIONPATH EMAIL OTP CREATED",
          "==================================================",
          `🆔 OTP ID   : ${otpRecord.id}`,
          `📧 Email    : ${otpRecord.email}`,
          `🎯 Purpose  : ${otpRecord.purpose}`,
          `🔢 OTP      : ${otpRecord.otp}`,
          `💾 DB Found : ${dbRecord ? "YES" : "NO"}`,
          `🔒 Consumed : ${
            dbRecord?.consumedAt
              ? dbRecord.consumedAt.toISOString()
              : "null"
          }`,
          `🔢 Attempts : ${
            dbRecord
              ? `${dbRecord.attempts}/${dbRecord.maxAttempts}`
              : "N/A"
          }`,
          `👤 User ID  : ${
            dbRecord?.userId || "null"
          }`,
          `⏳ Expires  : ${
            otpRecord.expiresAt.toISOString()
          }`,
          `🕐 Created  : ${
            dbRecord?.createdAt
              ? dbRecord.createdAt.toISOString()
              : "unknown"
          }`,
          `🔗 Verification Link: ${
            verificationUrl
              ? "CREATED"
              : "NOT REQUIRED"
          }`,
          "==================================================",
          "",
        ].join("\n")
      );

    }


    //////////////////////////////////////////////////////////
    // SEND EMAIL
    //
    // OTP + verificationUrl are now sent together.
    //////////////////////////////////////////////////////////

    try {

      await sendOtpEmail({

        email:
          normalizedEmail,

        otp:
          otpRecord.otp,

        expiresInMinutes:
          5,

        verificationUrl,

      });

    } catch (error) {

      console.error(
        "NATIONPATH OTP EMAIL DELIVERY ERROR:",
        error
      );


      ////////////////////////////////////////////////////////
      // CONSUME OTP AFTER DELIVERY FAILURE
      ////////////////////////////////////////////////////////

      try {

        await prisma.userOtp.update({

          where: {

            id:
              otpRecord.id,

          },

          data: {

            consumedAt:
              new Date(),

          },

        });

      } catch (cleanupError) {

        console.error(
          "NATIONPATH OTP CLEANUP ERROR:",
          cleanupError
        );

      }


      ////////////////////////////////////////////////////////
      // ALSO INVALIDATE VERIFICATION TOKEN
      ////////////////////////////////////////////////////////

      if (
        existingUser &&
        verificationUrl
      ) {

        try {

          await prisma.emailVerificationToken.updateMany({

            where: {

              userId:
                existingUser.id,

              email:
                normalizedEmail,

              consumedAt:
                null,

            },

            data: {

              consumedAt:
                new Date(),

            },

          });

        } catch (verificationCleanupError) {

          console.error(
            "NATIONPATH VERIFICATION TOKEN CLEANUP ERROR:",
            verificationCleanupError
          );

        }

      }


      return jsonError(
        "Unable to send OTP email",
        500
      );

    }


    //////////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////////

    return NextResponse.json(
      {

        success:
          true,

        message:
          verificationUrl
            ? "OTP and verification link sent successfully"
            : "OTP sent successfully",

        channel:
          "email",

        email:
          normalizedEmail,

        expiresAt:
          otpRecord.expiresAt,

        verificationRequired:
          Boolean(verificationUrl),

        verificationExpiresAt:
          verificationExpiresAt || null,

        ...(isDevelopment
          ? {

              developmentOtp:
                otpRecord.otp,

              developmentOtpId:
                otpRecord.id,

            }
          : {}),

      },
      {
        status: 200,
      }
    );

  }


  ////////////////////////////////////////////////////////////
  // GLOBAL ERROR
  ////////////////////////////////////////////////////////////

  catch (error) {

    console.error(
      "NATIONPATH OTP SEND ERROR:",
      error
    );


    return jsonError(
      "Unable to send OTP",
      500
    );

  }

}