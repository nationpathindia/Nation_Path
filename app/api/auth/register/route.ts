import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";

import {
  normalizeEmail,
  normalizePhone,
} from "@/lib/auth/otp";

import {
  sendVerificationLinkEmail,
} from "@/lib/auth/email";

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// NATIONPATH REGISTER API
//
// POST /api/auth/register
//
// TARGET:
// - Canonical Prisma User only
// - Email verification through verification link
// - Same verification endpoint:
//     GET /api/auth/otp/verify?token=TOKEN
//
// FLOWS:
//
// 1. Direct email/password registration
//    User
//      -> UserEmail (unverified)
//      -> EmailVerificationToken
//      -> verification email
//
// 2. Phone OTP signup completion
//    Existing provisional OTP User
//      -> complete same User
//      -> UserEmail (unverified)
//      -> EmailVerificationToken
//      -> verification email
//
// 3. Email OTP signup completion
//    Existing provisional OTP User
//      -> email already verified
//      -> no verification link required
//
// SECURITY:
// - Never use Mongoose User
// - Never create duplicate User
// - Never store plaintext password
// - Never store plaintext verification token
// - Never log raw verification token
// - Never expose provider errors to client
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

type RegisterChannel =
  | "phone"
  | "email";


//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const PASSWORD_MIN_LENGTH = 6;

const PASSWORD_HASH_ROUNDS = 10;

const EMAIL_VERIFICATION_EXPIRY_MS =
  24 * 60 * 60 * 1000;


//////////////////////////////////////////////////////////////
// RESPONSE HELPERS
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


function getString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}


//////////////////////////////////////////////////////////////
// VERIFICATION BASE URL
//
// Priority:
//
// 1. NEXT_PUBLIC_SITE_URL
// 2. NEXTAUTH_URL
// 3. request origin
//
// Only origin is used.
// This prevents accidental paths from being
// appended to the verification endpoint.
//////////////////////////////////////////////////////////////

function getApplicationOrigin(
  req: Request
): string {

  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL;

  if (configuredUrl) {

    try {

      const parsed =
        new URL(configuredUrl);

      if (
        parsed.protocol !== "https:" &&
        parsed.protocol !== "http:"
      ) {
        throw new Error(
          "Invalid application URL protocol"
        );
      }

      return parsed.origin;

    } catch {

      // Fall back to request origin.
    }
  }

  return new URL(req.url).origin;
}


//////////////////////////////////////////////////////////////
// CREATE + SEND VERIFICATION LINK
//
// IMPORTANT:
//
// Raw token:
//   - generated in memory
//   - inserted into email URL
//   - NEVER stored
//   - NEVER logged
//
// Database:
//   tokenHash only
//
// Verification endpoint:
//
// GET /api/auth/otp/verify?token=TOKEN
//////////////////////////////////////////////////////////////

async function createAndSendVerificationEmail({
  userId,
  email,
  name,
  req,
}: {
  userId: string;
  email: string;
  name?: string | null;
  req: Request;
}) {

  ////////////////////////////////////////////////////////////
  // NORMALIZE EMAIL
  ////////////////////////////////////////////////////////////

  let normalizedEmail: string;

  try {

    normalizedEmail =
      normalizeEmail(email);

  } catch {

    throw new Error(
      "Invalid verification email"
    );

  }

  if (!normalizedEmail) {

    throw new Error(
      "Invalid verification email"
    );

  }


  ////////////////////////////////////////////////////////////
  // VERIFY USER EXISTS
  //
  // This keeps token ownership tied to the canonical
  // Prisma User.
  ////////////////////////////////////////////////////////////

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

  if (!user) {

    throw new Error(
      "User account not found"
    );

  }


  ////////////////////////////////////////////////////////////
  // GENERATE RAW TOKEN
  //
  // Raw token exists ONLY in memory.
  ////////////////////////////////////////////////////////////

  const rawToken =
    crypto
      .randomBytes(32)
      .toString("hex");


  ////////////////////////////////////////////////////////////
  // HASH TOKEN
  //
  // Database receives ONLY this hash.
  ////////////////////////////////////////////////////////////

  const tokenHash =
    crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");


  ////////////////////////////////////////////////////////////
  // EXPIRATION
  ////////////////////////////////////////////////////////////

  const expiresAt =
    new Date(
      Date.now() +
      EMAIL_VERIFICATION_EXPIRY_MS
    );


  ////////////////////////////////////////////////////////////
  // INVALIDATE PREVIOUS UNUSED TOKENS
  //
  // Only the newest verification link should remain
  // usable for this user/email.
  ////////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.updateMany({

    where: {
      userId,
      email: normalizedEmail,
      consumedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },

    data: {
      consumedAt: new Date(),
    },

  });


  ////////////////////////////////////////////////////////////
  // CREATE TOKEN RECORD
  //
  // IMPORTANT:
  // rawToken is NOT stored.
  ////////////////////////////////////////////////////////////

  await prisma.emailVerificationToken.create({

    data: {
      tokenHash,
      userId,
      email: normalizedEmail,
      expiresAt,
    },

  });


  ////////////////////////////////////////////////////////////
  // BUILD VERIFICATION URL
  //
  // SAME API ROUTE.
  //
  // No separate verify-email API.
  ////////////////////////////////////////////////////////////

  const baseUrl =
    getApplicationOrigin(req);

  const verificationUrl =
    new URL(
      "/api/auth/otp/verify",
      baseUrl
    );

  verificationUrl.searchParams.set(
    "token",
    rawToken
  );


  ////////////////////////////////////////////////////////////
  // SEND VERIFICATION EMAIL
  //
  // Raw URL is passed directly to the email service.
  // This function does not log it.
  ////////////////////////////////////////////////////////////

  try {

    const result =
      await sendVerificationLinkEmail({

        email:
          normalizedEmail,

        name:
          name || undefined,

        verificationUrl:
          verificationUrl.toString(),

      });


    if (
      result?.success === false
    ) {

      throw new Error(
        "Unable to send verification email"
      );

    }


    //////////////////////////////////////////////////////////
    // IMPORTANT:
    //
    // Return only delivery metadata.
    // NEVER return raw token or verification URL.
    //////////////////////////////////////////////////////////

    return {
      success: true,
      id: result?.id || null,
    };

  } catch {

    //////////////////////////////////////////////////////////
    // Do not expose Resend/provider error.
    //////////////////////////////////////////////////////////

    throw new Error(
      "Unable to send verification email"
    );

  }
}


//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  req: Request
) {

  try {

    //////////////////////////////////////////////////////////
    // PARSE BODY
    //////////////////////////////////////////////////////////

    let body: any;

    try {

      body =
        await req.json();

    } catch {

      return jsonError(
        "Invalid request body",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // INPUT
    //////////////////////////////////////////////////////////

    const name =
      getString(body?.name);

    const emailInput =
      getString(body?.email);

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    const userId =
      getString(body?.userId);

    const rawPhone =
      getString(body?.phone);


    //////////////////////////////////////////////////////////
    // CHANNEL
    //////////////////////////////////////////////////////////

    const channel: RegisterChannel =
      body?.channel === "email"
        ? "email"
        : "phone";


    //////////////////////////////////////////////////////////
    // BASIC VALIDATION
    //////////////////////////////////////////////////////////

    if (!name) {

      return jsonError(
        "Name is required",
        400
      );

    }

    if (
      !password ||
      password.length < PASSWORD_MIN_LENGTH
    ) {

      return jsonError(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        400
      );

    }


    //////////////////////////////////////////////////////////
    // NORMALIZE EMAIL
    //////////////////////////////////////////////////////////

    let normalizedEmail: string;

    try {

      normalizedEmail =
        normalizeEmail(emailInput);

    } catch {

      return jsonError(
        "Enter a valid email address",
        400
      );

    }

    if (!normalizedEmail) {

      return jsonError(
        "Email address is required",
        400
      );

    }


    //////////////////////////////////////////////////////////
    // OTP SIGNUP COMPLETION
    //////////////////////////////////////////////////////////

    if (userId) {

      ////////////////////////////////////////////////////////
      // LOAD CANONICAL USER
      ////////////////////////////////////////////////////////

      const user =
        await prisma.user.findUnique({

          where: {
            id: userId,
          },

        });


      if (!user) {

        return jsonError(
          "User account not found",
          404
        );

      }


      ////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      ////////////////////////////////////////////////////////

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


      ////////////////////////////////////////////////////////
      // ONLY PROVISIONAL OTP USER MAY BE COMPLETED
      ////////////////////////////////////////////////////////

      const isOtpProvisionalUser =
        user.provider === "otp" &&
        !user.email &&
        !user.password;

      if (!isOtpProvisionalUser) {

        return jsonError(
          "This account is already registered",
          409
        );

      }


      ////////////////////////////////////////////////////////
      // EMAIL IDENTITY
      ////////////////////////////////////////////////////////

      const emailRecord =
        await prisma.userEmail.findUnique({

          where: {
            email: normalizedEmail,
          },

          select: {
            id: true,
            email: true,
            userId: true,
            isVerified: true,
          },

        });


      ////////////////////////////////////////////////////////
      // EMAIL OTP
      //
      // Email must already have been verified by OTP.
      ////////////////////////////////////////////////////////

      if (channel === "email") {

        if (!emailRecord) {

          return jsonError(
            "Email verification is required",
            403
          );

        }

        if (
          emailRecord.userId !== user.id
        ) {

          return jsonError(
            "This email address belongs to another account",
            409
          );

        }

        if (
          emailRecord.isVerified !== true
        ) {

          return jsonError(
            "Email address has not been verified",
            403
          );

        }

      }


      ////////////////////////////////////////////////////////
      // PHONE OTP
      ////////////////////////////////////////////////////////

      let normalizedPhone:
        string | null = null;

      if (channel === "phone") {

        if (!rawPhone) {

          return jsonError(
            "Verified phone number is required",
            400
          );

        }

        try {

          normalizedPhone =
            normalizePhone(rawPhone);

        } catch {

          return jsonError(
            "Enter a valid international phone number with country code",
            400
          );

        }


        const phoneRecord =
          await prisma.userPhone.findUnique({

            where: {
              phone: normalizedPhone,
            },

            select: {
              userId: true,
              isVerified: true,
            },

          });


        if (!phoneRecord) {

          return jsonError(
            "Phone verification is required",
            403
          );

        }

        if (
          phoneRecord.userId !== user.id
        ) {

          return jsonError(
            "This phone number belongs to another account",
            409
          );

        }

        if (
          phoneRecord.isVerified !== true
        ) {

          return jsonError(
            "Phone number has not been verified",
            403
          );

        }

      }


      ////////////////////////////////////////////////////////
      // EMAIL OWNERSHIP
      ////////////////////////////////////////////////////////

      const emailOwner =
        await prisma.user.findUnique({

          where: {
            email: normalizedEmail,
          },

          select: {
            id: true,
          },

        });


      if (
        emailOwner &&
        emailOwner.id !== user.id
      ) {

        return jsonError(
          "An account with this email already exists",
          409
        );

      }


      ////////////////////////////////////////////////////////
      // PASSWORD HASH
      ////////////////////////////////////////////////////////

      const hashedPassword =
        await bcrypt.hash(
          password,
          PASSWORD_HASH_ROUNDS
        );


      ////////////////////////////////////////////////////////
      // COMPLETE SAME CANONICAL USER
      ////////////////////////////////////////////////////////

      const completedUser =
        await prisma.user.update({

          where: {
            id: user.id,
          },

          data: {

            name,

            email:
              normalizedEmail,

            password:
              hashedPassword,

            provider:
              "credentials",

            role:
              user.role || "user",

            status:
              "active",

            isActive:
              true,

            lastLoginAt:
              new Date(),

          },

          select: {

            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            provider: true,
            status: true,
            isActive: true,
            createdAt: true,

          },

        });


      ////////////////////////////////////////////////////////
      // EMAIL IDENTITY
      ////////////////////////////////////////////////////////

      let shouldSendVerificationEmail =
        false;


      if (channel === "email") {

        //////////////////////////////////////////////////////
        // Already OTP verified.
        ////////////////////////////////////////////////////////

        shouldSendVerificationEmail =
          false;

      } else {

        //////////////////////////////////////////////////////
        // PHONE OTP:
        //
        // Email still needs verification.
        ////////////////////////////////////////////////////////

        if (!emailRecord) {

          await prisma.userEmail.create({

            data: {

              email:
                normalizedEmail,

              userId:
                user.id,

              isVerified:
                false,

            },

          });

        } else {

          if (
            emailRecord.userId !== user.id
          ) {

            return jsonError(
              "This email address belongs to another account",
              409
            );

          }

        }


        const latestEmailRecord =
          await prisma.userEmail.findUnique({

            where: {
              email: normalizedEmail,
            },

            select: {
              isVerified: true,
            },

          });


        shouldSendVerificationEmail =
          latestEmailRecord?.isVerified !== true;

      }


      ////////////////////////////////////////////////////////
      // SEND VERIFICATION LINK
      //
      // PHONE OTP signup:
      //   YES
      //
      // EMAIL OTP signup:
      //   NO
      ////////////////////////////////////////////////////////

      if (
        shouldSendVerificationEmail
      ) {

        try {

          await createAndSendVerificationEmail({

            userId:
              completedUser.id,

            email:
              completedUser.email!,

            name:
              completedUser.name,

            req,

          });

        } catch {

          ////////////////////////////////////////////////////
          // User is already created.
          // Never create another User.
          ////////////////////////////////////////////////////

          return NextResponse.json({

            success: false,

            error:
              "Account created, but verification email could not be sent.",

            verificationRequired:
              true,

            user: {

              id:
                completedUser.id,

              name:
                completedUser.name,

              email:
                completedUser.email,

              avatar:
                completedUser.avatar,

              role:
                completedUser.role,

              provider:
                completedUser.provider,

              channel,

              phone:
                normalizedPhone,

            },

          }, {
            status: 500,
          });

        }

      }


      ////////////////////////////////////////////////////////
      // OTP COMPLETION SUCCESS
      ////////////////////////////////////////////////////////

      return NextResponse.json({

        success: true,

        message:
          shouldSendVerificationEmail
            ? "Account registered successfully. Verification link sent to your email."
            : "Account registered successfully.",

        verificationRequired:
          shouldSendVerificationEmail,

        user: {

          id:
            completedUser.id,

          name:
            completedUser.name,

          email:
            completedUser.email,

          avatar:
            completedUser.avatar,

          role:
            completedUser.role,

          provider:
            completedUser.provider,

          channel,

          phone:
            normalizedPhone,

        },

      }, {
        status: 200,
      });

    }


    //////////////////////////////////////////////////////////
    // NORMAL EMAIL/PASSWORD REGISTRATION
    //////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////
    // EXISTING USER
    //////////////////////////////////////////////////////////

    const existingUser =
      await prisma.user.findUnique({

        where: {
          email: normalizedEmail,
        },

        select: {
          id: true,
        },

      });


    if (existingUser) {

      return jsonError(
        "An account with this email already exists",
        409
      );

    }


    //////////////////////////////////////////////////////////
    // EXISTING EMAIL IDENTITY
    //////////////////////////////////////////////////////////

    const existingEmailIdentity =
      await prisma.userEmail.findUnique({

        where: {
          email: normalizedEmail,
        },

        select: {
          id: true,
          userId: true,
          isVerified: true,
        },

      });


    if (existingEmailIdentity) {

      return jsonError(
        "This email address is already associated with an account",
        409
      );

    }


    //////////////////////////////////////////////////////////
    // HASH PASSWORD
    //////////////////////////////////////////////////////////

    const hashedPassword =
      await bcrypt.hash(
        password,
        PASSWORD_HASH_ROUNDS
      );


    //////////////////////////////////////////////////////////
    // CREATE CANONICAL USER
    //////////////////////////////////////////////////////////

    const user =
      await prisma.user.create({

        data: {

          name,

          email:
            normalizedEmail,

          password:
            hashedPassword,

          role:
            "user",

          status:
            "active",

          isActive:
            true,

          provider:
            "credentials",

        },

        select: {

          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,

        },

      });


    //////////////////////////////////////////////////////////
    // CREATE UNVERIFIED EMAIL IDENTITY
    //////////////////////////////////////////////////////////

    await prisma.userEmail.create({

      data: {

        email:
          normalizedEmail,

        userId:
          user.id,

        isVerified:
          false,

      },

    });


    //////////////////////////////////////////////////////////
    // CREATE TOKEN + SEND LINK
    //////////////////////////////////////////////////////////

    try {

      await createAndSendVerificationEmail({

        userId:
          user.id,

        email:
          user.email!,

        name:
          user.name,

        req,

      });

    } catch {

      ////////////////////////////////////////////////////////
      // DO NOT CREATE ANOTHER USER.
      //
      // Account exists and remains pending verification.
      ////////////////////////////////////////////////////////

      return NextResponse.json({

        success: false,

        error:
          "Account created, but verification email could not be sent.",

        verificationRequired:
          true,

        user: {

          id:
            user.id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,

          createdAt:
            user.createdAt,

        },

      }, {
        status: 500,
      });

    }


    //////////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "Registration successful. Verification link sent to your email.",

      verificationRequired:
        true,

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        createdAt:
          user.createdAt,

      },

    }, {
      status: 201,
    });


  } catch (error) {

    //////////////////////////////////////////////////////////
    // PRISMA UNIQUE CONFLICT
    //////////////////////////////////////////////////////////

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {

      return jsonError(
        "An account with this email already exists",
        409
      );

    }


    //////////////////////////////////////////////////////////
    // INTERNAL LOG
    //
    // Raw verification tokens are never logged here because
    // this route never puts them into the error object.
    //////////////////////////////////////////////////////////

    console.error(
      "REGISTER ERROR:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );


    return jsonError(
      "Registration failed",
      500
    );

  }

}