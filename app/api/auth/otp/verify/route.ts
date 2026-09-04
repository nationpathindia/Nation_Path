//////////////////////////////////////////////////////////////
//
// NATIONPATH OTP VERIFY API
//
// POST /api/auth/otp/verify
//
// GET  /api/auth/otp/verify?token=TOKEN
//
// Supports:
// - Phone OTP login
// - Email OTP login
// - Phone signup
// - Email signup
// - Email verification
// - Change email
// - Change phone
// - Reset password
// - Email verification link
//
// CANONICAL AUTH:
// - Prisma only
// - MongoDB collection = users
// - Never use Mongoose User
//
// SECURITY:
// - OTP is verified through verifyOtp()
// - Verification tokens are SHA-256 hashed
// - Passwords are bcrypt hashed
// - No plaintext OTP/password/token is stored
// - Email verification NEVER creates a second User
//
// IMPORTANT ORPHAN PROTECTION:
// NEVER use:
//
//   include: { user: true }
//
// on UserEmail / UserPhone lookups.
//
// Therefore identity records are always resolved first,
// then canonical User is loaded manually.
//
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
import { signToken } from "@/lib/auth";

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
// OTP CHANNELS
//////////////////////////////////////////////////////////////

const OTP_CHANNELS = [
  "phone",
  "email",
] as const;

type OtpChannel =
  (typeof OTP_CHANNELS)[number];

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
// ACCOUNT STATUS
//////////////////////////////////////////////////////////////

function validateAccountStatus(
  user: {
    isActive: boolean | null;
    status: string;
  }
) {
  if (user.isActive === false) {
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
// PASSWORD VALIDATION
//////////////////////////////////////////////////////////////

function validateNewPassword(
  value: unknown
): string {
  const password =
    String(value || "");

  if (!password) {
    throw new Error(
      "Password is required"
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
// AUTH COOKIE
//////////////////////////////////////////////////////////////

function setAuthCookie(
  response: NextResponse,
  token: string
) {
  response.cookies.set(
    "token",
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "strict",

      path: "/",

      maxAge:
        60 * 60 * 24 * 7,
    }
  );
}

//////////////////////////////////////////////////////////////
// LOGIN RESPONSE
//////////////////////////////////////////////////////////////

function createLoginResponse(
  user: {
    id: string;
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string;
    phone?: string | null;
    provider?: string | null;
  }
) {
  const token =
    signToken({
      id: user.id,
      role: user.role,
    });

  const response =
    NextResponse.json(
      {
        success: true,

        message:
          "OTP login successful",

        token,

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

          ...(user.phone
            ? {
                phone:
                  user.phone,
              }
            : {}),

          ...(user.provider
            ? {
                provider:
                  user.provider,
              }
            : {}),
        },
      },
      {
        status: 200,
      }
    );

  setAuthCookie(
    response,
    token
  );

  return response;
}

//////////////////////////////////////////////////////////////
// SAFE USER EMAIL RESOLUTION
//////////////////////////////////////////////////////////////

async function resolveEmailIdentity(
  email: string
) {
  const emailRecord =
    await prisma.userEmail.findUnique({
      where: {
        email,
      },
    });

  if (!emailRecord) {
    return {
      emailRecord: null,
      user: null,
    };
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id:
          emailRecord.userId,
      },
    });

  //////////////////////////////////////////////////////////
  // ORPHAN USEREMAIL
  //////////////////////////////////////////////////////////

  if (!user) {
    console.warn(
      "NATIONPATH: Removing orphan UserEmail during verification",
      {
        email,
        userId:
          emailRecord.userId,
        emailRecordId:
          emailRecord.id,
      }
    );

    try {
      await prisma.userEmail.delete({
        where: {
          id:
            emailRecord.id,
        },
      });
    } catch (error) {
      console.error(
        "NATIONPATH: Failed to remove orphan UserEmail",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    }

    return {
      emailRecord: null,
      user: null,
    };
  }

  return {
    emailRecord,
    user,
  };
}

//////////////////////////////////////////////////////////////
// GET
// EMAIL VERIFICATION LINK
//////////////////////////////////////////////////////////////

export async function GET(
  request: Request
) {
  try {
    const url =
      new URL(request.url);

    const rawToken =
      url.searchParams
        .get("token")
        ?.trim() || "";

    if (!rawToken) {
      return jsonError(
        "Verification token is required",
        400
      );
    }

    const tokenHash =
      crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const verificationToken =
      await prisma.emailVerificationToken.findUnique({
        where: {
          tokenHash,
        },
      });

    if (!verificationToken) {
      return jsonError(
        "Invalid or expired verification link",
        400
      );
    }

    if (
      verificationToken.consumedAt
    ) {
      return jsonError(
        "This verification link has already been used",
        400
      );
    }

    if (
      verificationToken.expiresAt <=
      new Date()
    ) {
      try {
        await prisma.emailVerificationToken.delete({
          where: {
            id:
              verificationToken.id,
          },
        });
      } catch {
        // Already removed.
      }

      return jsonError(
        "Verification link has expired",
        400
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          id:
            verificationToken.userId,
        },
      });

    if (!user) {
      try {
        await prisma.emailVerificationToken.update({
          where: {
            id:
              verificationToken.id,
          },

          data: {
            consumedAt:
              new Date(),
          },
        });
      } catch {
        // Ignore cleanup failure.
      }

      return jsonError(
        "User account not found",
        404
      );
    }

    const statusError =
      validateAccountStatus(user);

    if (statusError) {
      return statusError;
    }

    let normalizedEmail: string;

    try {
      normalizedEmail =
        normalizeEmail(
          verificationToken.email
        );
    } catch {
      return jsonError(
        "Invalid verification email",
        400
      );
    }

    const verifiedUser =
      await prisma.$transaction(
        async (tx) => {
          const currentToken =
            await tx.emailVerificationToken.findUnique({
              where: {
                id:
                  verificationToken.id,
              },
            });

          if (
            !currentToken ||
            currentToken.consumedAt ||
            currentToken.expiresAt <=
              new Date()
          ) {
            throw new Error(
              "VERIFICATION_TOKEN_INVALID"
            );
          }

          const emailRecord =
            await tx.userEmail.findUnique({
              where: {
                email:
                  normalizedEmail,
              },
            });

          if (
            emailRecord &&
            emailRecord.userId !==
              user.id
          ) {
            throw new Error(
              "EMAIL_BELONGS_TO_ANOTHER_USER"
            );
          }

          if (emailRecord) {
            await tx.userEmail.update({
              where: {
                id:
                  emailRecord.id,
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

          const updatedUser =
            await tx.user.update({
              where: {
                id:
                  user.id,
              },

              data: {
                ...(user.email
                  ? {}
                  : {
                      email:
                        normalizedEmail,
                    }),
              },

              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                provider: true,
              },
            });

          await tx.emailVerificationToken.update({
            where: {
              id:
                verificationToken.id,
            },

            data: {
              consumedAt:
                new Date(),
            },
          });

          await tx.emailVerificationToken.updateMany({
            where: {
              userId:
                user.id,

              email:
                normalizedEmail,

              consumedAt:
                null,

              id: {
                not:
                  verificationToken.id,
              },
            },

            data: {
              consumedAt:
                new Date(),
            },
          });

          return updatedUser;
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Email verified successfully",

        verificationMethod:
          "link",

        user: {
          id:
            verifiedUser.id,

          name:
            verifiedUser.name,

          email:
            verifiedUser.email,

          avatar:
            verifiedUser.avatar,

          role:
            verifiedUser.role,

          provider:
            verifiedUser.provider,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    if (
      message ===
      "VERIFICATION_TOKEN_INVALID"
    ) {
      return jsonError(
        "Invalid or expired verification link",
        400
      );
    }

    if (
      message ===
      "EMAIL_BELONGS_TO_ANOTHER_USER"
    ) {
      return jsonError(
        "This email address belongs to another account",
        409
      );
    }

    console.error(
      "NATIONPATH EMAIL VERIFICATION LINK ERROR:",
      message
    );

    return jsonError(
      "Unable to verify email",
      500
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

    const data =
      body &&
      typeof body === "object"
        ? body as Record<string, unknown>
        : {};

    const channel =
      String(
        data.channel || "phone"
      ) as OtpChannel;

    const purpose =
      String(
        data.purpose || "login"
      ) as OtpPurpose;

    const otp =
      String(
        data.otp || ""
      ).trim();

    const rawPhone =
      String(
        data.phone || ""
      ).trim();

    const rawEmail =
      String(
        data.email || ""
      ).trim();

    const rawNewPassword =
      data.newPassword;

    if (
      !OTP_CHANNELS.includes(channel)
    ) {
      return jsonError(
        "Invalid OTP channel",
        400
      );
    }

    if (
      !OTP_PURPOSES.includes(purpose)
    ) {
      return jsonError(
        "Invalid OTP purpose",
        400
      );
    }

    if (
      !/^\d{6}$/.test(otp)
    ) {
      return jsonError(
        "OTP must contain 6 digits",
        400
      );
    }

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
      return jsonError(
        channel === "phone"
          ? "Enter a valid international phone number with country code"
          : "Enter a valid email address",
        400
      );
    }

    //////////////////////////////////////////////////////////
    // RESET PASSWORD
    //////////////////////////////////////////////////////////

    if (
      purpose === "reset_password"
    ) {
      let newPassword: string;

      try {
        newPassword =
          validateNewPassword(
            rawNewPassword
          );
      } catch (error) {
        return jsonError(
          error instanceof Error
            ? error.message
            : "Invalid new password",
          400
        );
      }

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
        return jsonError(
          error instanceof Error
            ? error.message
            : "OTP verification failed",
          400
        );
      }

      if (
        !verification.userId
      ) {
        return jsonError(
          "Unable to resolve user account",
          400
        );
      }

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

      if (!user) {
        return jsonError(
          "User account not found",
          404
        );
      }

      const statusError =
        validateAccountStatus(user);

      if (statusError) {
        return statusError;
      }

      const passwordHash =
        await bcrypt.hash(
          newPassword,
          PASSWORD_HASH_ROUNDS
        );

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
          },
        });

      return NextResponse.json(
        {
          success: true,

          message:
            "Password reset successfully",

          user:
            updatedUser,
        },
        {
          status: 200,
        }
      );
    }

    //////////////////////////////////////////////////////////
    // SIGNUP
    //////////////////////////////////////////////////////////

    if (
      purpose === "signup"
    ) {
      ////////////////////////////////////////////////////////
      // PHONE SIGNUP
      ////////////////////////////////////////////////////////

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

        if (existingPhone) {
          return jsonError(
            "This phone number is already registered",
            409
          );
        }

        let verification;

        try {
          verification =
            await verifyOtp({
              channel:
                "phone",

              phone:
                normalizedPhone!,

              otp,

              purpose:
                "signup",
            });
        } catch (error) {
          return jsonError(
            error instanceof Error
              ? error.message
              : "OTP verification failed",
            400
          );
        }

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

                if (phoneUser) {
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
                    },
                  });

                await tx.userPhone.create({
                  data: {
                    phone:
                      normalizedPhone!,

                    isVerified:
                      true,

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
            return jsonError(
              "This phone number is already registered",
              409
            );
          }

          throw error;
        }
      }

      ////////////////////////////////////////////////////////
      // EMAIL SIGNUP
      ////////////////////////////////////////////////////////

      if (
        channel === "email"
      ) {
        const resolved =
          await resolveEmailIdentity(
            normalizedEmail!
          );

        const emailRecord =
          resolved.emailRecord;

        const user =
          resolved.user;

        if (
          !emailRecord ||
          !user
        ) {
          return jsonError(
            "Signup session not found. Please request a new OTP.",
            404
          );
        }

        const statusError =
          validateAccountStatus(user);

        if (statusError) {
          return statusError;
        }

        if (
          emailRecord.isVerified === true
        ) {
          return jsonError(
            "This email address has already been verified",
            409
          );
        }

        let verification;

        try {
          verification =
            await verifyOtp({
              channel:
                "email",

              email:
                normalizedEmail!,

              otp,

              purpose:
                "signup",
            });
        } catch (error) {
          return jsonError(
            error instanceof Error
              ? error.message
              : "OTP verification failed",
            400
          );
        }

        if (
          verification.userId &&
          verification.userId !==
            user.id
        ) {
          return jsonError(
            "OTP does not belong to this account",
            409
          );
        }

        let passwordHash:
          string | undefined;

        if (
          rawNewPassword !==
            undefined &&
          rawNewPassword !==
            null &&
          String(rawNewPassword).length > 0
        ) {
          let newPassword: string;

          try {
            newPassword =
              validateNewPassword(
                rawNewPassword
              );
          } catch (error) {
            return jsonError(
              error instanceof Error
                ? error.message
                : "Invalid password",
              400
            );
          }

          passwordHash =
            await bcrypt.hash(
              newPassword,
              PASSWORD_HASH_ROUNDS
            );
        }

        const verifiedUser =
          await prisma.$transaction(
            async (tx) => {
              const currentEmail =
                await tx.userEmail.findUnique({
                  where: {
                    email:
                      normalizedEmail!,
                  },
                });

              if (
                !currentEmail ||
                currentEmail.userId !==
                  user.id
              ) {
                throw new Error(
                  "EMAIL_IDENTITY_CHANGED"
                );
              }

              if (
                currentEmail.isVerified
              ) {
                throw new Error(
                  "EMAIL_ALREADY_VERIFIED"
                );
              }

              await tx.userEmail.update({
                where: {
                  id:
                    currentEmail.id,
                },

                data: {
                  isVerified:
                    true,

                  verifiedAt:
                    new Date(),
                },
              });

              const updatedUser =
                await tx.user.update({
                  where: {
                    id:
                      user.id,
                  },

                  data: {
                    email:
                      normalizedEmail!,

                    ...(passwordHash
                      ? {
                          password:
                            passwordHash,

                          provider:
                            "credentials",
                        }
                      : {}),
                  },

                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    role: true,
                    provider: true,
                  },
                });

              await tx.emailVerificationToken.updateMany({
                where: {
                  userId:
                    user.id,

                  email:
                    normalizedEmail!,

                  consumedAt:
                    null,
                },

                data: {
                  consumedAt:
                    new Date(),
                },
              });

              return updatedUser;
            }
          );

        return NextResponse.json(
          {
            success: true,

            message:
              "Email signup verified successfully",

            verificationMethod:
              "otp",

            passwordConfigured:
              Boolean(passwordHash),

            user: {
              id:
                verifiedUser.id,

              name:
                verifiedUser.name,

              email:
                verifiedUser.email,

              avatar:
                verifiedUser.avatar,

              role:
                verifiedUser.role,

              provider:
                verifiedUser.provider,
            },
          },
          {
            status: 200,
          }
        );
      }
    }

    //////////////////////////////////////////////////////////
    // EMAIL LOGIN
    //////////////////////////////////////////////////////////

    if (
      channel === "email" &&
      purpose === "login"
    ) {
      let verification;

      try {
        verification =
          await verifyOtp({
            channel:
              "email",

            email:
              normalizedEmail!,

            otp,

            purpose:
              "login",
          });
      } catch (error) {
        return jsonError(
          error instanceof Error
            ? error.message
            : "OTP verification failed",
          400
        );
      }

      const resolved =
        await resolveEmailIdentity(
          normalizedEmail!
        );

      const emailRecord =
        resolved.emailRecord;

      let user =
        resolved.user;

      const userId =
        emailRecord?.userId ||
        verification.userId ||
        null;

      if (!userId) {
        return jsonError(
          "Unable to resolve user account",
          400
        );
      }

      if (!user) {
        user =
          await prisma.user.findUnique({
            where: {
              id:
                userId,
            },
          });
      }

      if (!user) {
        return jsonError(
          "User account not found",
          404
        );
      }

      if (
        emailRecord &&
        emailRecord.userId !==
          user.id
      ) {
        return jsonError(
          "This email address belongs to another account",
          409
        );
      }

      const statusError =
        validateAccountStatus(user);

      if (statusError) {
        return statusError;
      }

      if (emailRecord) {
        await prisma.userEmail.update({
          where: {
            id:
              emailRecord.id,
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

      ////////////////////////////////////////////////////////
      // IMPORTANT:
      // Do NOT reassign `user` here.
      //
      // `user` is the full Prisma User.
      // `loginUser` is the intentionally selected
      // lightweight response object.
      ////////////////////////////////////////////////////////

      const loginUser =
        await prisma.user.update({
          where: {
            id:
              user.id,
          },

          data: {
            ...(user.email
              ? {}
              : {
                  email:
                    normalizedEmail!,
                }),

            lastLoginAt:
              new Date(),

            provider:
              user.provider ===
              "credentials"
                ? "otp"
                : user.provider,
          },

          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            provider: true,
          },
        });

      return createLoginResponse({
        id:
          loginUser.id,

        name:
          loginUser.name,

        email:
          loginUser.email ||
          normalizedEmail,

        avatar:
          loginUser.avatar,

        role:
          loginUser.role,

        provider:
          loginUser.provider,
      });
    }

    //////////////////////////////////////////////////////////
    // PHONE LOGIN / VERIFY / CHANGE
    //////////////////////////////////////////////////////////

    if (
      channel === "phone"
    ) {
      let verification;

      try {
        verification =
          await verifyOtp({
            channel:
              "phone",

            phone:
              normalizedPhone!,

            otp,

            purpose,
          });
      } catch (error) {
        return jsonError(
          error instanceof Error
            ? error.message
            : "OTP verification failed",
          400
        );
      }

      ////////////////////////////////////////////////////////
      // IMPORTANT LOCK:
      // Never include { user: true }.
      ////////////////////////////////////////////////////////

      let phoneRecord =
        await prisma.userPhone.findUnique({
          where: {
            phone:
              normalizedPhone!,
          },

          select: {
            id: true,
            userId: true,
            phone: true,
            isVerified: true,
          },
        });

      ////////////////////////////////////////////////////////
      // LOAD CANONICAL USER MANUALLY
      ////////////////////////////////////////////////////////

      let user = null as Awaited<
        ReturnType<
          typeof prisma.user.findUnique
        >
      >;

      if (phoneRecord?.userId) {
        user =
          await prisma.user.findUnique({
            where: {
              id:
                phoneRecord.userId,
            },
          });
      }

      ////////////////////////////////////////////////////////
      // FALLBACK OTP USER
      ////////////////////////////////////////////////////////

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

      ////////////////////////////////////////////////////////
      // LOGIN REQUIRES USER
      ////////////////////////////////////////////////////////

      if (
        purpose === "login" &&
        !user
      ) {
        return jsonError(
          "No account is associated with this phone number",
          404
        );
      }

      if (!user) {
        return jsonError(
          "Unable to resolve user account",
          400
        );
      }

      ////////////////////////////////////////////////////////
      // ACCOUNT STATUS
      ////////////////////////////////////////////////////////

      const statusError =
        validateAccountStatus(user);

      if (statusError) {
        return statusError;
      }

      ////////////////////////////////////////////////////////
      // CREATE / LINK PHONE
      ////////////////////////////////////////////////////////

      if (!phoneRecord) {
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

            select: {
              id: true,
              userId: true,
              phone: true,
              isVerified: true,
            },
          });
      } else {
        //////////////////////////////////////////////////////
        // SECURITY
        //////////////////////////////////////////////////////

        if (
          phoneRecord.userId !==
          user.id
        ) {
          return jsonError(
            "This phone number belongs to another account",
            409
          );
        }

        //////////////////////////////////////////////////////
        // MARK VERIFIED
        //////////////////////////////////////////////////////

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

              select: {
                id: true,
                userId: true,
                phone: true,
                isVerified: true,
              },
            });
        }
      }

      ////////////////////////////////////////////////////////
      // PHONE LOGIN
      ////////////////////////////////////////////////////////

      if (
        purpose === "login"
      ) {
        //////////////////////////////////////////////////////
        // IMPORTANT:
        // Do NOT assign selected result back to `user`.
        //////////////////////////////////////////////////////

        const loginUser =
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

            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              role: true,
              provider: true,
            },
          });

        return createLoginResponse({
          id:
            loginUser.id,

          name:
            loginUser.name,

          email:
            loginUser.email,

          avatar:
            loginUser.avatar,

          role:
            loginUser.role,

          phone:
            normalizedPhone,

          provider:
            loginUser.provider,
        });
      }

      ////////////////////////////////////////////////////////
      // NON-LOGIN PHONE FLOW
      ////////////////////////////////////////////////////////

      return NextResponse.json(
        {
          success: true,

          message:
            "Phone verified successfully",

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

    //////////////////////////////////////////////////////////
    // EMAIL VERIFICATION / CHANGE EMAIL
    //////////////////////////////////////////////////////////

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
            channel:
              "email",

            email:
              normalizedEmail!,

            otp,

            purpose,
          });
      } catch (error) {
        return jsonError(
          error instanceof Error
            ? error.message
            : "OTP verification failed",
          400
        );
      }

      if (
        !verification.userId
      ) {
        return jsonError(
          "Unable to resolve user account",
          400
        );
      }

      const user =
        await prisma.user.findUnique({
          where: {
            id:
              verification.userId,
          },
        });

      if (!user) {
        return jsonError(
          "User account not found",
          404
        );
      }

      const statusError =
        validateAccountStatus(user);

      if (statusError) {
        return statusError;
      }

      const resolved =
        await resolveEmailIdentity(
          normalizedEmail!
        );

      const existingEmail =
        resolved.emailRecord;

      if (
        existingEmail &&
        existingEmail.userId !==
          user.id
      ) {
        return jsonError(
          "Email address is already linked to another account",
          409
        );
      }

      if (existingEmail) {
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

      await prisma.emailVerificationToken.updateMany({
        where: {
          userId:
            user.id,

          email:
            normalizedEmail!,

          consumedAt:
            null,
        },

        data: {
          consumedAt:
            new Date(),
        },
      });

      return NextResponse.json(
        {
          success: true,

          message:
            "Email verified successfully",

          verificationMethod:
            "otp",

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

    //////////////////////////////////////////////////////////
    // UNSUPPORTED
    //////////////////////////////////////////////////////////

    return jsonError(
      "Unsupported OTP verification flow",
      400
    );
  } catch (error) {
    console.error(
      "NATIONPATH OTP VERIFY ERROR:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return jsonError(
      "Unable to verify OTP",
      500
    );
  }
}