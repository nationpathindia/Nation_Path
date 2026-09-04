//////////////////////////////////////////////////////////////
// NATIONPATH OTP SEND API
//
// POST /api/auth/otp/send
//
// Supports:
// - Phone OTP
// - Email OTP
// - Email signup OTP + verification link
// - Canonical Prisma User
// - Canonical MongoDB collection = users
// - Secure OTP hash storage
// - Secure verification token hash storage
//
// EMAIL SIGNUP ARCHITECTURE:
//
//   /send
//      ↓
//   Find/Create canonical User
//      ↓
//   UserEmail(isVerified=false)
//      ↓
//   OTP
//      ↓
//   EmailVerificationToken
//      ↓
//   ONE EMAIL:
//      - 6 digit OTP
//      - Verify Email Address link
//      ↓
//   /verify
//      ↓
//   SAME canonical User
//      ↓
//   UserEmail.isVerified=true
//
// IMPORTANT:
// - Prisma is the only DB access layer.
// - Never use Mongoose User.
// - Never store plaintext OTP.
// - Never store plaintext verification token.
// - Production never returns/logs plaintext OTP.
// - Phone flow remains unchanged.
// - Existing email login remains unchanged.
// - Email signup NEVER creates a second User.
// - Verification link NEVER creates another User.
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
// APPLICATION BASE URL
//////////////////////////////////////////////////////////////

function getApplicationBaseUrl(
  request: Request
) {
  const configuredBaseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredBaseUrl) {
    return new URL(
      configuredBaseUrl
    ).origin;
  }

  return new URL(
    request.url
  ).origin;
}


//////////////////////////////////////////////////////////////
// CREATE EMAIL VERIFICATION URL
//
// IMPORTANT:
//
// EmailVerificationToken.user is REQUIRED in Prisma.
//
// Therefore the token MUST always be connected to the
// canonical User.
//
// For NEW email signup, /send creates a provisional
// canonical User first.
//
// The User is NOT created again during /verify.
//
// Database stores only:
// - tokenHash
// - email
// - user relation
// - expiresAt
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
  // GENERATE SECURE RANDOM TOKEN
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
  // INVALIDATE PREVIOUS ACTIVE TOKENS
  //////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.updateMany({
    where: {
      userId,
      email,
      consumedAt: null,
    },

    data: {
      consumedAt: new Date(),
    },
  });


  //////////////////////////////////////////////////////////
  // CREATE NEW TOKEN
  //
  // IMPORTANT:
  //
  // DO NOT use:
  //
  // userId
  //
  // Prisma requires the User relation here.
  //////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.create({
    data: {
      tokenHash,
      email,
      expiresAt,

      user: {
        connect: {
          id: userId,
        },
      },
    },
  });


  //////////////////////////////////////////////////////////
  // BUILD VERIFICATION URL
  //////////////////////////////////////////////////////////

  const baseUrl =
    getApplicationBaseUrl(
      request
    );

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
// GET OR CREATE EMAIL SIGNUP USER
//
// CANONICAL FLOW:
//
// 1. Find UserEmail WITHOUT joining User.
// 2. Manually resolve User.
// 3. Remove orphan UserEmail if necessary.
// 4. Check canonical users.email.
// 5. If existing canonical User exists:
//      - do NOT create another User
//      - create missing UserEmail if necessary
// 6. If no User exists:
//      - create provisional canonical User
//      - create UserEmail(isVerified=false)
//
// IMPORTANT:
//
// This keeps ONE canonical User system.
//
// No Mongoose User.
// No duplicate User collection.
// No second account during verification.
//////////////////////////////////////////////////////////////

async function getOrCreateEmailSignupUser({
  email,
}: {
  email: string;
}) {

  //////////////////////////////////////////////////////////
  // FIND EMAIL IDENTITY
  //
  // DO NOT include user here.
  //
  // This protects against legacy/orphan UserEmail
  // records where the required Prisma relation points
  // to a missing User.
  //////////////////////////////////////////////////////////

  let emailRecord =
    await prisma.userEmail.findUnique({
      where: {
        email,
      },
    });


  //////////////////////////////////////////////////////////
  // EXISTING EMAIL IDENTITY
  //////////////////////////////////////////////////////////

  if (emailRecord) {

    ////////////////////////////////////////////////////////
    // RESOLVE USER MANUALLY
    ////////////////////////////////////////////////////////

    const linkedUser =
      await prisma.user.findUnique({
        where: {
          id:
            emailRecord.userId,
        },
      });


    ////////////////////////////////////////////////////////
    // VALID USER EXISTS
    ////////////////////////////////////////////////////////

    if (linkedUser) {

      return {
        user:
          linkedUser,

        emailRecord,

        created:
          false,
      };

    }


    ////////////////////////////////////////////////////////
    // ORPHAN USEREMAIL
    ////////////////////////////////////////////////////////

    console.warn(
      "NATIONPATH: Removing orphan UserEmail during email signup",
      {
        email,
        userId:
          emailRecord.userId,
        emailRecordId:
          emailRecord.id,
      }
    );


    await prisma.userEmail.delete({
      where: {
        id:
          emailRecord.id,
      },
    });


    emailRecord =
      null;
  }


  //////////////////////////////////////////////////////////
  // CHECK CANONICAL USER.EMAIL
  //////////////////////////////////////////////////////////

  const canonicalUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });


  //////////////////////////////////////////////////////////
  // EXISTING CANONICAL USER
  //////////////////////////////////////////////////////////

  if (canonicalUser) {

    ////////////////////////////////////////////////////////
    // CREATE MISSING EMAIL IDENTITY
    ////////////////////////////////////////////////////////

    const createdEmailRecord =
      await prisma.userEmail.create({
        data: {
          email,
          userId:
            canonicalUser.id,
          isVerified:
            false,
        },
      });


    return {
      user:
        canonicalUser,

      emailRecord:
        createdEmailRecord,

      created:
        false,
    };

  }


  //////////////////////////////////////////////////////////
  // CREATE PROVISIONAL CANONICAL USER
  //////////////////////////////////////////////////////////

  const user =
    await prisma.user.create({
      data: {
        email,
        provider: "otp",
        role: "user",
        status: "active",
        isActive: true,
      },
    });


  //////////////////////////////////////////////////////////
  // CREATE UNVERIFIED EMAIL IDENTITY
  //////////////////////////////////////////////////////////

  const createdEmailRecord =
    await prisma.userEmail.create({
      data: {
        email,
        userId:
          user.id,
        isVerified:
          false,
      },
    });


  return {
    user,

    emailRecord:
      createdEmailRecord,

    created:
      true,
  };
}


//////////////////////////////////////////////////////////////
// ACCOUNT STATUS
//////////////////////////////////////////////////////////////

function validateAccountStatus(
  user: {
    isActive: boolean | null;
    status: string;
  }
) {

  if (
    user.isActive === false
  ) {

    return jsonError(
      "Account is inactive",
      403
    );

  }


  if (
    user.status &&
    user.status !== "active"
  ) {

    return jsonError(
      "Account is not active",
      403
    );

  }


  return null;
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
          normalizePhone(
            phone
          );

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
        phoneRecord?.user ||
        null;


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
      // SIGNUP REQUIRES NEW PHONE
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

        const statusError =
          validateAccountStatus(
            existingUser
          );

        if (statusError) {
          return statusError;
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
            `👤 User ID  : ${existingUser?.id || "null"}`,
            `⏳ Expires  : ${otpRecord.expiresAt.toISOString()}`,
            "==================================================",
            "",
          ].join("\n")
        );

      }


      ////////////////////////////////////////////////////////
      // SMS PROVIDER LATER
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
    // EMAIL
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
        normalizeEmail(
          email
        );

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
    // ======================================================
    // EMAIL SIGNUP
    // ======================================================
    //
    // NEW EMAIL SIGNUP:
    //
    // User is provisionally created HERE.
    //
    // This is required because:
    //
    // EmailVerificationToken.user
    // is required by Prisma.
    //
    //////////////////////////////////////////////////////////

    if (
      purpose === "signup"
    ) {

      ////////////////////////////////////////////////////////
      // GET OR CREATE CANONICAL USER
      ////////////////////////////////////////////////////////

      const signupUser =
        await getOrCreateEmailSignupUser({
          email:
            normalizedEmail,
        });


      const existingUser =
        signupUser.user;


      const emailRecord =
        signupUser.emailRecord;


      const provisionalUserCreated =
        signupUser.created;


      ////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      ////////////////////////////////////////////////////////

      const statusError =
        validateAccountStatus(
          existingUser
        );

      if (statusError) {
        return statusError;
      }


      ////////////////////////////////////////////////////////
      // ALREADY VERIFIED
      ////////////////////////////////////////////////////////

      if (
        emailRecord.isVerified === true
      ) {

        return jsonError(
          "An account already exists with this email address",
          409
        );

      }


      ////////////////////////////////////////////////////////
      // CREATE OTP
      ////////////////////////////////////////////////////////

      const otpRecord =
        await createOtpRecord({
          channel:
            "email",

          email:
            normalizedEmail,

          purpose:
            "signup",

          userId:
            existingUser.id,
        });


      ////////////////////////////////////////////////////////
      // CREATE VERIFICATION LINK
      ////////////////////////////////////////////////////////

      const verification =
        await createEmailVerificationUrl({
          userId:
            existingUser.id,

          email:
            normalizedEmail,

          request,
        });


      ////////////////////////////////////////////////////////
      // DEVELOPMENT DEBUG
      ////////////////////////////////////////////////////////

      if (isDevelopment) {

        console.log(
          [
            "",
            "==================================================",
            "🧪 NATIONPATH EMAIL SIGNUP OTP CREATED",
            "==================================================",
            `🆔 OTP ID   : ${otpRecord.id}`,
            `📧 Email    : ${otpRecord.email}`,
            `🎯 Purpose  : ${otpRecord.purpose}`,
            `🔢 OTP      : ${otpRecord.otp}`,
            `👤 User ID  : ${existingUser.id}`,
            `🆕 Provisional User Created: ${
              provisionalUserCreated
                ? "YES"
                : "NO"
            }`,
            `🔗 Verification Link: CREATED`,
            `⏳ OTP Expires: ${otpRecord.expiresAt.toISOString()}`,
            `⏳ Link Expires: ${verification.expiresAt.toISOString()}`,
            "==================================================",
            "",
          ].join("\n")
        );

      }


      ////////////////////////////////////////////////////////
      // SEND ONE EMAIL
      ////////////////////////////////////////////////////////

      try {

        await sendOtpEmail({
          email:
            normalizedEmail,

          otp:
            otpRecord.otp,

          expiresInMinutes:
            5,

          verificationUrl:
            verification.url,
        });

      } catch (error) {

        console.error(
          "NATIONPATH OTP EMAIL DELIVERY ERROR:",
          error
        );


        //////////////////////////////////////////////////////
        // CONSUME OTP
        //////////////////////////////////////////////////////

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

        } catch (
          cleanupError
        ) {

          console.error(
            "NATIONPATH OTP CLEANUP ERROR:",
            cleanupError
          );

        }


        //////////////////////////////////////////////////////
        // INVALIDATE VERIFICATION TOKEN
        //////////////////////////////////////////////////////

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

        } catch (
          verificationCleanupError
        ) {

          console.error(
            "NATIONPATH VERIFICATION TOKEN CLEANUP ERROR:",
            verificationCleanupError
          );

        }


        return jsonError(
          "Unable to send OTP email",
          500
        );

      }


      ////////////////////////////////////////////////////////
      // SUCCESS
      ////////////////////////////////////////////////////////

      return NextResponse.json(
        {
          success:
            true,

          message:
            "OTP and verification link sent successfully",

          channel:
            "email",

          email:
            normalizedEmail,

          expiresAt:
            otpRecord.expiresAt,

          verificationRequired:
            true,

          verificationExpiresAt:
            verification.expiresAt,

          provisionalUserCreated:
            provisionalUserCreated,

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
    // NON-SIGNUP EMAIL FLOW
    // ======================================================
    //////////////////////////////////////////////////////////

    let emailRecord =
      await prisma.userEmail.findUnique({
        where: {
          email:
            normalizedEmail,
        },
      });


    //////////////////////////////////////////////////////////
    // RESOLVE USER MANUALLY
    //////////////////////////////////////////////////////////

    let existingUser:
      Awaited<
        ReturnType<
          typeof prisma.user.findUnique
        >
      > = null;


    if (
      emailRecord
    ) {

      const linkedUser =
        await prisma.user.findUnique({
          where: {
            id:
              emailRecord.userId,
          },
        });


      if (linkedUser) {

        existingUser =
          linkedUser;

      } else {

        //////////////////////////////////////////////////////
        // ORPHAN EMAIL IDENTITY
        //////////////////////////////////////////////////////

        console.warn(
          "NATIONPATH: Removing orphan UserEmail during email OTP flow",
          {
            email:
              normalizedEmail,

            userId:
              emailRecord.userId,

            emailRecordId:
              emailRecord.id,
          }
        );


        await prisma.userEmail.delete({
          where: {
            id:
              emailRecord.id,
          },
        });


        emailRecord =
          null;

      }

    }


    //////////////////////////////////////////////////////////
    // FALLBACK CANONICAL EMAIL
    //////////////////////////////////////////////////////////

    if (!existingUser) {

      existingUser =
        await prisma.user.findUnique({
          where: {
            email:
              normalizedEmail,
          },
        });

    }


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
    // OTHER PURPOSES REQUIRE USER
    //////////////////////////////////////////////////////////

    if (
      !existingUser
    ) {

      return jsonError(
        "No account found with this email address",
        404
      );

    }


    //////////////////////////////////////////////////////////
    // ACCOUNT STATUS
    //////////////////////////////////////////////////////////

    const statusError =
      validateAccountStatus(
        existingUser
      );

    if (statusError) {
      return statusError;
    }


    //////////////////////////////////////////////////////////
    // CREATE MISSING EMAIL IDENTITY
    //////////////////////////////////////////////////////////

    if (
      !emailRecord
    ) {

      emailRecord =
        await prisma.userEmail.create({
          data: {
            email:
              normalizedEmail,

            userId:
              existingUser.id,

            isVerified:
              false,
          },
        });

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
          existingUser.id,
      });


    //////////////////////////////////////////////////////////
    // VERIFICATION LINK
    //////////////////////////////////////////////////////////

    let verificationUrl:
      string | undefined;

    let verificationExpiresAt:
      Date | undefined;


    const shouldCreateVerificationLink =
      emailRecord.isVerified !== true &&
      (
        purpose === "verify_email" ||
        purpose === "change_email"
      );


    if (
      shouldCreateVerificationLink
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
    // DEVELOPMENT DEBUG
    //////////////////////////////////////////////////////////

    if (isDevelopment) {

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
          `👤 User ID  : ${existingUser.id}`,
          `🔗 Verification Link: ${
            verificationUrl
              ? "CREATED"
              : "NOT REQUIRED"
          }`,
          `⏳ OTP Expires: ${otpRecord.expiresAt.toISOString()}`,
          `⏳ Link Expires: ${
            verificationExpiresAt
              ? verificationExpiresAt.toISOString()
              : "N/A"
          }`,
          "==================================================",
          "",
        ].join("\n")
      );

    }


    //////////////////////////////////////////////////////////
    // SEND EMAIL
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


      //////////////////////////////////////////////////////
      // CONSUME OTP
      //////////////////////////////////////////////////////

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

      } catch (
        cleanupError
      ) {

        console.error(
          "NATIONPATH OTP CLEANUP ERROR:",
          cleanupError
        );

      }


      //////////////////////////////////////////////////////
      // INVALIDATE VERIFICATION TOKEN
      //////////////////////////////////////////////////////

      if (
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

        } catch (
          verificationCleanupError
        ) {

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
          Boolean(
            verificationUrl
          ),

        verificationExpiresAt:
          verificationExpiresAt ||
          null,

        provisionalUserCreated:
          false,

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
  // GLOBAL ERROR
  //////////////////////////////////////////////////////////

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

