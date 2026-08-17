//////////////////////////////////////////////////////////////
// NATIONPATH OTP VERIFY API
//
// LOCK ONE
//
// POST /api/auth/otp/verify
//
// GET  /api/auth/otp/verify?token=TOKEN
//
// POST responsibilities:
// - Verify phone OTP
// - Verify email OTP
// - Consume OTP
// - Resolve canonical Prisma User
// - Create/link UserPhone
// - Create/link UserEmail
// - Login
// - Signup
// - Phone/email verification
// - Change phone/email
// - Reset password using OTP
//
// GET responsibilities:
// - Verify email verification link
// - Hash verification token
// - Resolve EmailVerificationToken
// - Check expiry
// - Resolve canonical Prisma User
// - Mark UserEmail verified
// - Sync User.email when empty
// - Consume verification token
//
// IMPORTANT:
// - Canonical User = Prisma User
// - MongoDB collection = "users"
// - Never use Mongoose User
// - Never store plaintext OTP
// - Never store plaintext password
// - OTP plaintext is NEVER logged by this API
// - Verification token plaintext is NEVER stored
//
// VERIFICATION LINK:
// - Uses EmailVerificationToken
// - Same API route
// - No separate verification API
//
// RESET PASSWORD:
// - purpose = "reset_password"
// - OTP must already belong to target User
// - OTP is consumed only after successful verification
// - New password is bcrypt hashed before storage
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import {
  normalizePhone,
  normalizeEmail,
  verifyOtp,
} from "@/lib/auth/otp";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_HASH_ROUNDS = 12;


//////////////////////////////////////////////////////////////
// OTP PURPOSES
//////////////////////////////////////////////////////////////

const OTP_PURPOSES = [
  "login",
  "signup",
  "verify_phone",
  "verify_email",
  "change_phone",
  "change_email",
  "reset_password",
] as const;

type OtpPurpose =
  (typeof OTP_PURPOSES)[number];


//////////////////////////////////////////////////////////////
// CHANNELS
//////////////////////////////////////////////////////////////

const OTP_CHANNELS = [
  "phone",
  "email",
] as const;

type OtpChannel =
  (typeof OTP_CHANNELS)[number];


//////////////////////////////////////////////////////////////
// PASSWORD VALIDATION
//////////////////////////////////////////////////////////////

function validateNewPassword(
  value: unknown
): string {

  const password =
    String(value || "");

  if (!password) {

    throw new Error(
      "New password is required"
    );

  }

  if (
    password.length <
    PASSWORD_MIN_LENGTH
  ) {

    throw new Error(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    );

  }

  if (
    password.length >
    PASSWORD_MAX_LENGTH
  ) {

    throw new Error(
      `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`
    );

  }

  return password;
}


//////////////////////////////////////////////////////////////
// GET
//
// EMAIL VERIFICATION LINK
//
// /api/auth/otp/verify?token=TOKEN
//////////////////////////////////////////////////////////////

export async function GET(
  request: Request
) {

  try {

    //////////////////////////////////////////////////////////
    // READ TOKEN
    //////////////////////////////////////////////////////////

    const url =
      new URL(request.url);

    const token =
      url.searchParams
        .get("token")
        ?.trim() || "";


    //////////////////////////////////////////////////////////
    // TOKEN REQUIRED
    //////////////////////////////////////////////////////////

    if (!token) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Verification token is required",
        },
        {
          status: 400,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // HASH TOKEN
    //
    // Raw token is never stored in MongoDB.
    //////////////////////////////////////////////////////////

    const tokenHash =
      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");


    //////////////////////////////////////////////////////////
    // FIND VERIFICATION TOKEN
    //////////////////////////////////////////////////////////

    const verificationToken =
      await prisma.emailVerificationToken.findUnique({

        where: {
          tokenHash,
        },

        include: {
          user: true,
        },

      });


    //////////////////////////////////////////////////////////
    // INVALID TOKEN
    //////////////////////////////////////////////////////////

    if (!verificationToken) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid or expired verification link",
        },
        {
          status: 400,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // EXPIRY CHECK
    //////////////////////////////////////////////////////////

    if (
      verificationToken.expiresAt <=
      new Date()
    ) {

      ////////////////////////////////////////////////////////
      // Remove expired token
      ////////////////////////////////////////////////////////

      try {

        await prisma.emailVerificationToken.delete({

          where: {
            id:
              verificationToken.id,
          },

        });

      } catch {
        // Token may already have been removed.
      }


      return NextResponse.json(
        {
          success: false,
          error:
            "Verification link has expired",
        },
        {
          status: 400,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // USER
    //////////////////////////////////////////////////////////

    const user =
      verificationToken.user;


    //////////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////////

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          error:
            "User account not found",
        },
        {
          status: 404,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // ACCOUNT STATUS
    //////////////////////////////////////////////////////////

    if (
      user.isActive === false
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Account is inactive",
        },
        {
          status: 403,
        }
      );

    }


    if (
      user.status &&
      user.status !== "active"
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Account is not active",
        },
        {
          status: 403,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // NORMALIZE EMAIL
    //////////////////////////////////////////////////////////

    let normalizedEmail: string;

    try {

      normalizedEmail =
        normalizeEmail(
          verificationToken.email
        );

    } catch {

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid verification email",
        },
        {
          status: 400,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // FIND EXISTING EMAIL IDENTITY
    //////////////////////////////////////////////////////////

    const existingEmail =
      await prisma.userEmail.findUnique({

        where: {
          email:
            normalizedEmail,
        },

      });


    //////////////////////////////////////////////////////////
    // EMAIL BELONGS TO ANOTHER USER
    //////////////////////////////////////////////////////////

    if (
      existingEmail &&
      existingEmail.userId !== user.id
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "This email address belongs to another account",
        },
        {
          status: 409,
        }
      );

    }


    //////////////////////////////////////////////////////////
    // VERIFY EMAIL + CONSUME TOKEN
    //
    // Keep these operations together.
    //////////////////////////////////////////////////////////

    await prisma.$transaction(
      async (tx) => {

        //////////////////////////////////////////////////////
        // CREATE / UPDATE EMAIL IDENTITY
        //////////////////////////////////////////////////////

        if (existingEmail) {

          await tx.userEmail.update({

            where: {
              id:
                existingEmail.id,
            },

            data: {

              isVerified:
                true,

              verifiedAt:
                new Date(),

            },

          });

        } else {

          await tx.userEmail.create({

            data: {

              email:
                normalizedEmail,

              userId:
                user.id,

              isVerified:
                true,

              verifiedAt:
                new Date(),

            },

          });

        }


        //////////////////////////////////////////////////////
        // SYNC CANONICAL USER EMAIL
        //
        // Only fill User.email if currently empty.
        //////////////////////////////////////////////////////

        if (!user.email) {

          await tx.user.update({

            where: {
              id:
                user.id,
            },

            data: {
              email:
                normalizedEmail,
            },

          });

        }


        //////////////////////////////////////////////////////
        // CONSUME VERIFICATION TOKEN
        //////////////////////////////////////////////////////

        await tx.emailVerificationToken.delete({

          where: {
            id:
              verificationToken.id,
          },

        });

      }
    );


    //////////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,

        message:
          "Email verified successfully",

        user: {

          id:
            user.id,

          name:
            user.name,

          email:
            normalizedEmail,

          avatar:
            user.avatar,

          role:
            user.role,

        },

      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "NATIONPATH EMAIL VERIFICATION LINK ERROR:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to verify email",
      },
      {
        status: 500,
      }
    );

  }

}


//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  request: Request
) {

  try {

    ////////////////////////////////////////////////////////////
    // READ REQUEST
    ////////////////////////////////////////////////////////////

    let body: any;

    try {

      body =
        await request.json();

    } catch {

      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        {
          status: 400,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // BASIC REQUEST DATA
    ////////////////////////////////////////////////////////////

    const channel =
      String(
        body?.channel || "phone"
      ) as OtpChannel;

    const purpose =
      String(
        body?.purpose || "login"
      ) as OtpPurpose;

    const otp =
      String(
        body?.otp || ""
      ).trim();


    ////////////////////////////////////////////////////////////
    // DESTINATIONS
    ////////////////////////////////////////////////////////////

    const rawPhone =
      String(
        body?.phone || ""
      ).trim();

    const rawEmail =
      String(
        body?.email || ""
      ).trim();


    ////////////////////////////////////////////////////////////
    // RESET PASSWORD INPUT
    ////////////////////////////////////////////////////////////

    const rawNewPassword =
      body?.newPassword;


    ////////////////////////////////////////////////////////////
    // VALIDATE CHANNEL
    ////////////////////////////////////////////////////////////

    if (
      !OTP_CHANNELS.includes(channel)
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "Invalid OTP channel",
        },
        {
          status: 400,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // VALIDATE PURPOSE
    ////////////////////////////////////////////////////////////

    if (
      !OTP_PURPOSES.includes(purpose)
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "Invalid OTP purpose",
        },
        {
          status: 400,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // VALIDATE OTP
    ////////////////////////////////////////////////////////////

    if (
      !/^\d{6}$/.test(otp)
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "OTP must contain 6 digits",
        },
        {
          status: 400,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // NORMALIZE DESTINATION
    ////////////////////////////////////////////////////////////

    let normalizedPhone:
      string | null = null;

    let normalizedEmail:
      string | null = null;

    try {

      if (
        channel === "phone"
      ) {

        normalizedPhone =
          normalizePhone(
            rawPhone
          );

      } else {

        normalizedEmail =
          normalizeEmail(
            rawEmail
          );

      }

    } catch {

      return NextResponse.json(
        {
          success: false,
          error:
            channel === "phone"
              ? "Enter a valid international phone number with country code"
              : "Enter a valid email address",
        },
        {
          status: 400,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // RESET PASSWORD
    ////////////////////////////////////////////////////////////

    if (
      purpose === "reset_password"
    ) {

      //////////////////////////////////////////////////////////
      // NEW PASSWORD REQUIRED
      //////////////////////////////////////////////////////////

      let newPassword: string;

      try {

        newPassword =
          validateNewPassword(
            rawNewPassword
          );

      } catch (error) {

        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Invalid new password",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // VERIFY OTP
      //////////////////////////////////////////////////////////

      let verification;

      try {

        verification =
          await verifyOtp({

            channel,

            phone:
              normalizedPhone ||
              undefined,

            email:
              normalizedEmail ||
              undefined,

            otp,

            purpose:
              "reset_password",

          });

      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "OTP verification failed";

        return NextResponse.json(
          {
            success: false,
            error: message,
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // USER MUST BE RESOLVED
      //////////////////////////////////////////////////////////

      if (
        !verification.userId
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Unable to resolve user account",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // LOAD CANONICAL USER
      //////////////////////////////////////////////////////////

      const user =
        await prisma.user.findUnique({

          where: {
            id:
              verification.userId,
          },

          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            password: true,
            provider: true,
            status: true,
            isActive: true,
          },

        });


      //////////////////////////////////////////////////////////
      // USER NOT FOUND
      //////////////////////////////////////////////////////////

      if (!user) {

        return NextResponse.json(
          {
            success: false,
            error:
              "User account not found",
          },
          {
            status: 404,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      //////////////////////////////////////////////////////////

      if (
        user.isActive === false
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is inactive",
          },
          {
            status: 403,
          }
        );

      }

      if (
        user.status &&
        user.status !== "active"
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is not active",
          },
          {
            status: 403,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // HASH NEW PASSWORD
      //////////////////////////////////////////////////////////

      const passwordHash =
        await bcrypt.hash(
          newPassword,
          PASSWORD_HASH_ROUNDS
        );


      //////////////////////////////////////////////////////////
      // UPDATE PASSWORD
      //////////////////////////////////////////////////////////

      const updatedUser =
        await prisma.user.update({

          where: {
            id:
              user.id,
          },

          data: {
            password:
              passwordHash,

            provider:
              user.provider === "otp"
                ? "credentials"
                : user.provider,
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
          },

        });


      //////////////////////////////////////////////////////////
      // SUCCESS
      //////////////////////////////////////////////////////////

      return NextResponse.json(
        {
          success: true,

          message:
            "Password reset successfully",

          user: {

            id:
              updatedUser.id,

            name:
              updatedUser.name,

            email:
              updatedUser.email,

            avatar:
              updatedUser.avatar,

            role:
              updatedUser.role,

            provider:
              updatedUser.provider,
          },
        },
        {
          status: 200,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // SIGNUP
    ////////////////////////////////////////////////////////////

    if (
      purpose === "signup"
    ) {

      //////////////////////////////////////////////////////////
      // PHONE SIGNUP
      //////////////////////////////////////////////////////////

      if (
        channel === "phone"
      ) {

        const existingPhone =
          await prisma.userPhone.findUnique({

            where: {
              phone:
                normalizedPhone!,
            },

            select: {
              id: true,
              userId: true,
            },

          });


        if (
          existingPhone
        ) {

          return NextResponse.json(
            {
              success: false,
              error:
                "This phone number is already registered",
            },
            {
              status: 409,
            }
          );

        }


        ////////////////////////////////////////////////////////
        // VERIFY OTP
        ////////////////////////////////////////////////////////

        try {

          await verifyOtp({

            channel: "phone",

            phone:
              normalizedPhone!,

            otp,

            purpose: "signup",

          });

        } catch (error) {

          return NextResponse.json(
            {
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : "OTP verification failed",
            },
            {
              status: 400,
            }
          );

        }


        ////////////////////////////////////////////////////////
        // CREATE USER + PHONE
        ////////////////////////////////////////////////////////

        try {

          const result =
            await prisma.$transaction(
              async (tx) => {

                const phoneUser =
                  await tx.userPhone.findUnique({

                    where: {
                      phone:
                        normalizedPhone!,
                    },

                    select: {
                      id: true,
                      userId: true,
                    },

                  });


                if (
                  phoneUser
                ) {

                  throw new Error(
                    "PHONE_ALREADY_EXISTS"
                  );

                }


                const newUser =
                  await tx.user.create({

                    data: {

                      name: null,

                      email: null,

                      password: null,

                      provider: "otp",

                      role: "user",

                      status: "active",

                      isActive: true,

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


                await tx.userPhone.create({

                  data: {

                    phone:
                      normalizedPhone!,

                    isVerified: true,

                    verifiedAt:
                      new Date(),

                    userId:
                      newUser.id,

                  },

                });


                return newUser;

              }
            );


          return NextResponse.json(
            {
              success: true,

              message:
                "Phone verified successfully",

              user: {

                id:
                  result.id,

                name:
                  result.name,

                email:
                  result.email,

                avatar:
                  result.avatar,

                role:
                  result.role,

                phone:
                  normalizedPhone,

                provider:
                  result.provider,

              },
            },
            {
              status: 200,
            }
          );


        } catch (error) {

          if (
            error instanceof Error &&
            error.message ===
              "PHONE_ALREADY_EXISTS"
          ) {

            return NextResponse.json(
              {
                success: false,
                error:
                  "This phone number is already registered",
              },
              {
                status: 409,
              }
            );

          }

          throw error;

        }

      }


      //////////////////////////////////////////////////////////
      // EMAIL SIGNUP
      //////////////////////////////////////////////////////////

      if (
        channel === "email"
      ) {

        const existingEmail =
          await prisma.userEmail.findUnique({

            where: {
              email:
                normalizedEmail!,
            },

            select: {
              id: true,
              userId: true,
            },

          });


        if (
          existingEmail
        ) {

          return NextResponse.json(
            {
              success: false,
              error:
                "This email address is already registered",
            },
            {
              status: 409,
            }
          );

        }


        const existingUser =
          await prisma.user.findUnique({

            where: {
              email:
                normalizedEmail!,
            },

            select: {
              id: true,
            },

          });


        if (
          existingUser
        ) {

          return NextResponse.json(
            {
              success: false,
              error:
                "An account already exists with this email address",
            },
            {
              status: 409,
            }
          );

        }


        ////////////////////////////////////////////////////////
        // VERIFY EMAIL OTP
        ////////////////////////////////////////////////////////

        try {

          await verifyOtp({

            channel: "email",

            email:
              normalizedEmail!,

            otp,

            purpose: "signup",

          });

        } catch (error) {

          return NextResponse.json(
            {
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : "OTP verification failed",
            },
            {
              status: 400,
            }
          );

        }


        ////////////////////////////////////////////////////////
        // CREATE USER + EMAIL
        ////////////////////////////////////////////////////////

        try {

          const result =
            await prisma.$transaction(
              async (tx) => {

                const emailRecord =
                  await tx.userEmail.findUnique({

                    where: {
                      email:
                        normalizedEmail!,
                    },

                    select: {
                      id: true,
                      userId: true,
                    },

                  });


                if (
                  emailRecord
                ) {

                  throw new Error(
                    "EMAIL_ALREADY_EXISTS"
                  );

                }


                const emailUser =
                  await tx.user.findUnique({

                    where: {
                      email:
                        normalizedEmail!,
                    },

                    select: {
                      id: true,
                    },

                  });


                if (
                  emailUser
                ) {

                  throw new Error(
                    "EMAIL_ALREADY_EXISTS"
                  );

                }


                const newUser =
                  await tx.user.create({

                    data: {

                      name: null,

                      email: null,

                      password: null,

                      provider: "otp",

                      role: "user",

                      status: "active",

                      isActive: true,

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


                await tx.userEmail.create({

                  data: {

                    email:
                      normalizedEmail!,

                    userId:
                      newUser.id,

                    isVerified: true,

                    verifiedAt:
                      new Date(),

                  },

                });


                return newUser;

              }
            );


          return NextResponse.json(
            {
              success: true,

              message:
                "Email verified successfully",

              user: {

                id:
                  result.id,

                name:
                  result.name,

                email:
                  result.email,

                avatar:
                  result.avatar,

                role:
                  result.role,

                provider:
                  result.provider,

              },
            },
            {
              status: 200,
            }
          );


        } catch (error) {

          if (
            error instanceof Error &&
            error.message ===
              "EMAIL_ALREADY_EXISTS"
          ) {

            return NextResponse.json(
              {
                success: false,
                error:
                  "This email address is already registered",
              },
              {
                status: 409,
              }
            );

          }

          throw error;

        }

      }

    }


    ////////////////////////////////////////////////////////////
    // EMAIL VERIFICATION / CHANGE EMAIL
    ////////////////////////////////////////////////////////////

    if (
      channel === "email" &&
      (
        purpose === "verify_email" ||
        purpose === "change_email"
      )
    ) {

      let verification;

      try {

        verification =
          await verifyOtp({

            channel: "email",

            email:
              normalizedEmail!,

            otp,

            purpose,

          });

      } catch (error) {

        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "OTP verification failed",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // USER REQUIRED
      //////////////////////////////////////////////////////////

      if (
        !verification.userId
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Unable to resolve user account",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // LOAD USER
      //////////////////////////////////////////////////////////

      const user =
        await prisma.user.findUnique({

          where: {
            id:
              verification.userId,
          },

        });


      if (!user) {

        return NextResponse.json(
          {
            success: false,
            error:
              "User account not found",
          },
          {
            status: 404,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      //////////////////////////////////////////////////////////

      if (
        user.isActive === false
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is inactive",
          },
          {
            status: 403,
          }
        );

      }


      if (
        user.status &&
        user.status !== "active"
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is not active",
          },
          {
            status: 403,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // EXISTING EMAIL
      //////////////////////////////////////////////////////////

      const existingEmail =
        await prisma.userEmail.findUnique({

          where: {
            email:
              normalizedEmail!,
          },

        });


      if (
        existingEmail &&
        existingEmail.userId !== user.id
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Email address is already linked to another account",
          },
          {
            status: 409,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // CREATE / UPDATE
      //////////////////////////////////////////////////////////

      if (
        existingEmail
      ) {

        await prisma.userEmail.update({

          where: {
            id:
              existingEmail.id,
          },

          data: {

            isVerified:
              true,

            verifiedAt:
              new Date(),

          },

        });

      } else {

        await prisma.userEmail.create({

          data: {

            email:
              normalizedEmail!,

            userId:
              user.id,

            isVerified:
              true,

            verifiedAt:
              new Date(),

          },

        });

      }


      //////////////////////////////////////////////////////////
      // SYNC USER.EMAIL
      //////////////////////////////////////////////////////////

      if (!user.email) {

        await prisma.user.update({

          where: {
            id:
              user.id,
          },

          data: {
            email:
              normalizedEmail!,
          },

        });

      }


      //////////////////////////////////////////////////////////
      // RESPONSE
      //////////////////////////////////////////////////////////

      return NextResponse.json(
        {
          success: true,

          message:
            "Email verified successfully",

          user: {

            id:
              user.id,

            name:
              user.name,

            email:
              normalizedEmail,

            avatar:
              user.avatar,

            role:
              user.role,

          },
        },
        {
          status: 200,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // PHONE LOGIN / VERIFY / CHANGE
    ////////////////////////////////////////////////////////////

    if (
      channel === "phone"
    ) {

      let verification;

      try {

        verification =
          await verifyOtp({

            channel: "phone",

            phone:
              normalizedPhone!,

            otp,

            purpose,

          });

      } catch (error) {

        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "OTP verification failed",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // FIND PHONE OWNER
      //////////////////////////////////////////////////////////

      let phoneRecord =
        await prisma.userPhone.findUnique({

          where: {
            phone:
              normalizedPhone!,
          },

          include: {
            user: true,
          },

        });


      //////////////////////////////////////////////////////////
      // RESOLVE USER
      //////////////////////////////////////////////////////////

      let user =
        phoneRecord?.user ||
        null;


      if (
        !user &&
        verification.userId
      ) {

        user =
          await prisma.user.findUnique({

            where: {
              id:
                verification.userId,
            },

          });

      }


      //////////////////////////////////////////////////////////
      // LOGIN MUST HAVE USER
      //////////////////////////////////////////////////////////

      if (
        purpose === "login" &&
        !user
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "No account is associated with this phone number",
          },
          {
            status: 404,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // USER REQUIRED
      //////////////////////////////////////////////////////////

      if (!user) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Unable to resolve user account",
          },
          {
            status: 400,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      //////////////////////////////////////////////////////////

      if (
        user.isActive === false
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is inactive",
          },
          {
            status: 403,
          }
        );

      }


      if (
        user.status &&
        user.status !== "active"
      ) {

        return NextResponse.json(
          {
            success: false,
            error:
              "Account is not active",
          },
          {
            status: 403,
          }
        );

      }


      //////////////////////////////////////////////////////////
      // CREATE / LINK PHONE
      //////////////////////////////////////////////////////////

      if (
        !phoneRecord
      ) {

        phoneRecord =
          await prisma.userPhone.create({

            data: {

              phone:
                normalizedPhone!,

              isVerified:
                true,

              verifiedAt:
                new Date(),

              userId:
                user.id,

            },

            include: {
              user: true,
            },

          });

      } else {

        ////////////////////////////////////////////////////////
        // SECURITY CHECK
        ////////////////////////////////////////////////////////

        if (
          phoneRecord.userId !==
          user.id
        ) {

          return NextResponse.json(
            {
              success: false,
              error:
                "This phone number belongs to another account",
            },
            {
              status: 409,
            }
          );

        }


        ////////////////////////////////////////////////////////
        // MARK VERIFIED
        ////////////////////////////////////////////////////////

        if (
          !phoneRecord.isVerified
        ) {

          phoneRecord =
            await prisma.userPhone.update({

              where: {
                id:
                  phoneRecord.id,
              },

              data: {

                isVerified:
                  true,

                verifiedAt:
                  new Date(),

              },

              include: {
                user: true,
              },

            });

        }

      }


      //////////////////////////////////////////////////////////
      // UPDATE LAST LOGIN
      //////////////////////////////////////////////////////////

      if (
        purpose === "login"
      ) {

        user =
          await prisma.user.update({

            where: {
              id:
                user.id,
            },

            data: {

              lastLoginAt:
                new Date(),

              provider:
                user.provider ===
                "credentials"
                  ? "otp"
                  : user.provider,

            },

          });

      }


      //////////////////////////////////////////////////////////
      // RESPONSE
      //////////////////////////////////////////////////////////

      return NextResponse.json(
        {
          success: true,

          message:
            purpose === "login"
              ? "OTP verified successfully"
              : "Phone verified successfully",

          user: {

            id:
              user.id,

            name:
              user.name,

            email:
              user.email,

            avatar:
              user.avatar,

            role:
              user.role,

            phone:
              normalizedPhone,

          },
        },
        {
          status: 200,
        }
      );

    }


    ////////////////////////////////////////////////////////////
    // UNSUPPORTED FLOW
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: false,
        error:
          "Unsupported OTP verification flow",
      },
      {
        status: 400,
      }
    );

  }


  //////////////////////////////////////////////////////////////
  // UNEXPECTED ERROR
  //////////////////////////////////////////////////////////////

  catch (error) {

    console.error(
      "OTP VERIFY ERROR:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to verify OTP",
      },
      {
        status: 500,
      }
    );

  }

}