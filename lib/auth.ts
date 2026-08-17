//////////////////////////////////////////////////////////////
// NATIONPATH AUTH CONFIG
//
// SINGLE CANONICAL USER SYSTEM
//
// Authentication:
// - Email + Password
// - Google
// - Phone OTP
//
// Database:
// - Prisma
// - MongoDB canonical collection: "users"
//
// IMPORTANT:
// - Do NOT use the old MongoDB "User" collection.
// - Prisma User maps to "users".
// - OTP records live in UserOtp.
// - Phone identities live in UserPhone.
// - All authentication methods resolve to the same User.
// - All authenticated users receive the same NextAuth JWT/session.
//////////////////////////////////////////////////////////////

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import type {
  NextAuthOptions,
} from "next-auth";

import { prisma } from "@/lib/prisma";

import {
  normalizePhone as normalizeOtpPhone,
  verifyOtp,
} from "@/lib/auth/otp";


//////////////////////////////////////////////////////////////
// JWT SECRET
//////////////////////////////////////////////////////////////

const JWT_SECRET =
  process.env.JWT_SECRET;

if (!JWT_SECRET) {

  throw new Error(
    "JWT_SECRET is not configured"
  );

}


//////////////////////////////////////////////////////////////
// JWT HELPERS
//////////////////////////////////////////////////////////////

export function signToken(
  payload: Record<string, unknown>
) {

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

}


export function verifyToken(
  token: string
) {

  try {

    return jwt.verify(
      token,
      JWT_SECRET
    );

  } catch {

    return null;

  }

}


//////////////////////////////////////////////////////////////
// USER STATUS
//////////////////////////////////////////////////////////////

function isUserActive(
  user: any
): boolean {

  if (!user) {

    return false;

  }


  if (
    user.isActive === false
  ) {

    return false;

  }


  if (
    user.status &&
    user.status !== "active"
  ) {

    return false;

  }


  return true;

}


//////////////////////////////////////////////////////////////
// EMAIL NORMALIZATION
//////////////////////////////////////////////////////////////

function normalizeEmail(
  email?: string | null
): string {

  return (
    email
      ?.trim()
      .toLowerCase() ||
    ""
  );

}


//////////////////////////////////////////////////////////////
// FIND USER BY PHONE
//
// Phone ownership belongs to UserPhone.
// The actual canonical identity remains User.
//
// MongoDB:
// users
//
// UserPhone:
// phone -> userId
//////////////////////////////////////////////////////////////

async function findUserByPhone(
  phone: string
) {

  const phoneRecord =
    await prisma.userPhone.findUnique({

      where: {

        phone,

      },

      include: {

        user: true,

      },

    });


  return (
    phoneRecord?.user ||
    null
  );

}


//////////////////////////////////////////////////////////////
// BUILD NEXTAUTH USER
//
// Keeps all authentication methods consistent.
//
// Email:
// Google:
// OTP:
//
// All return the same identity shape.
//////////////////////////////////////////////////////////////

function buildAuthUser(
  user: any,
  phone?: string | null
) {

  return {

    id:
      user.id,

    name:
      user.name || null,

    email:
      user.email || null,

    image:
      user.avatar || null,

    role:
      user.role,

    ...(phone
      ? {
          phone,
        }
      : {}),

  } as any;

}


//////////////////////////////////////////////////////////////
// NEXTAUTH
//////////////////////////////////////////////////////////////

export const authOptions: NextAuthOptions = {

  ////////////////////////////////////////////////////////////
  // PROVIDERS
  ////////////////////////////////////////////////////////////

  providers: [

    ////////////////////////////////////////////////////////////
    // CREDENTIALS
    //
    // Supports:
    //
    // 1. Email + Password
    // 2. Phone + OTP
    ////////////////////////////////////////////////////////////

    CredentialsProvider({

      name: "credentials",

      credentials: {

        email: {

          label: "Email",

          type: "email",

        },

        password: {

          label: "Password",

          type: "password",

        },

        phone: {

          label: "Phone",

          type: "tel",

        },

        otp: {

          label: "OTP",

          type: "text",

        },

        loginType: {

          label: "Login Type",

          type: "text",

        },

      },


      async authorize(
        credentials
      ) {

        ////////////////////////////////////////////////////////
        // DETERMINE LOGIN TYPE
        ////////////////////////////////////////////////////////

        const loginType =
          String(
            credentials?.loginType || ""
          )
            .trim()
            .toLowerCase();


        ////////////////////////////////////////////////////////
        // PHONE OTP LOGIN
        ////////////////////////////////////////////////////////

        if (
          loginType === "otp"
        ) {

          //////////////////////////////////////////////////////
          // INPUT
          //////////////////////////////////////////////////////

          const rawPhone =
            String(
              credentials?.phone || ""
            ).trim();


          const otp =
            String(
              credentials?.otp || ""
            ).trim();


          //////////////////////////////////////////////////////
          // VALIDATION
          //////////////////////////////////////////////////////

          if (!rawPhone) {

            throw new Error(
              "Phone number is required"
            );

          }


          if (!otp) {

            throw new Error(
              "OTP is required"
            );

          }


          if (
            !/^\d{6}$/.test(otp)
          ) {

            throw new Error(
              "OTP must contain 6 digits"
            );

          }


          //////////////////////////////////////////////////////
          // NORMALIZE PHONE
          //////////////////////////////////////////////////////

          let phone: string;


          try {

            phone =
              normalizeOtpPhone(
                rawPhone
              );

          } catch {

            throw new Error(
              "Enter a valid international phone number with country code"
            );

          }


          //////////////////////////////////////////////////////
          // VERIFY OTP
          //
          // verifyOtp():
          // - checks expiry
          // - checks attempts
          // - compares bcrypt hash
          // - consumes OTP
          //////////////////////////////////////////////////////

          let verification;


          try {

            verification = await verifyOtp({
  channel: "phone",
  phone,
  otp,
  purpose: "login",
});

          } catch (error) {

            throw new Error(

              error instanceof Error
                ? error.message
                : "Invalid or expired OTP"

            );

          }


          //////////////////////////////////////////////////////
          // RESOLVE CANONICAL USER
          //
          // Primary source:
          // UserPhone -> User
          //
          // Fallback:
          // UserOtp.userId
          //////////////////////////////////////////////////////

          let user =
            await findUserByPhone(
              phone
            );


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


          //////////////////////////////////////////////////////
          // USER MUST EXIST
          //
          // OTP login is NOT signup.
          //////////////////////////////////////////////////////

          if (!user) {

            throw new Error(
              "No account is linked to this phone number"
            );

          }


          //////////////////////////////////////////////////////
          // ACCOUNT STATUS
          //////////////////////////////////////////////////////

          if (
            !isUserActive(user)
          ) {

            throw new Error(
              "Account is not active"
            );

          }


          //////////////////////////////////////////////////////
          // SECURITY:
          // CONFIRM PHONE BELONGS TO SAME USER
          //////////////////////////////////////////////////////

          const phoneRecord =
            await prisma.userPhone.findUnique({

              where: {

                phone,

              },

            });


          if (
            phoneRecord &&
            phoneRecord.userId !==
              user.id
          ) {

            throw new Error(
              "This phone number belongs to another account"
            );

          }


          //////////////////////////////////////////////////////
          // UPDATE LAST LOGIN
          //////////////////////////////////////////////////////

          await prisma.user.update({

            where: {

              id:
                user.id,

            },

            data: {

              lastLoginAt:
                new Date(),

            },

          });


          //////////////////////////////////////////////////////
          // RETURN CANONICAL USER
          //////////////////////////////////////////////////////

          return buildAuthUser(
            user,
            phone
          );

        }


        ////////////////////////////////////////////////////////
        // EMAIL + PASSWORD LOGIN
        ////////////////////////////////////////////////////////

        const email =
          normalizeEmail(
            credentials?.email
          );


        const password =
          credentials?.password || "";


        ////////////////////////////////////////////////////////
        // VALIDATION
        ////////////////////////////////////////////////////////

        if (!email) {

          throw new Error(
            "Email is required"
          );

        }


        if (!password) {

          throw new Error(
            "Password is required"
          );

        }


        ////////////////////////////////////////////////////////
        // FIND CANONICAL USER
        ////////////////////////////////////////////////////////

        const user =
          await prisma.user.findUnique({

            where: {

              email,

            },

          });


        ////////////////////////////////////////////////////////
        // USER NOT FOUND
        ////////////////////////////////////////////////////////

        if (!user) {

          throw new Error(
            "User not found"
          );

        }


        ////////////////////////////////////////////////////////
        // ACCOUNT STATUS
        ////////////////////////////////////////////////////////

        if (
          !isUserActive(user)
        ) {

          throw new Error(
            "Account is not active"
          );

        }


        ////////////////////////////////////////////////////////
        // PASSWORD LOGIN REQUIRED
        ////////////////////////////////////////////////////////

        if (!user.password) {

          throw new Error(
            "This account does not have a password login"
          );

        }


        ////////////////////////////////////////////////////////
        // VERIFY PASSWORD
        ////////////////////////////////////////////////////////

        const validPassword =
          await bcrypt.compare(

            password,

            user.password

          );


        if (!validPassword) {

          throw new Error(
            "Invalid password"
          );

        }


        ////////////////////////////////////////////////////////
        // UPDATE LAST LOGIN
        ////////////////////////////////////////////////////////

        await prisma.user.update({

          where: {

            id:
              user.id,

          },

          data: {

            lastLoginAt:
              new Date(),

          },

        });


        ////////////////////////////////////////////////////////
        // RETURN CANONICAL USER
        ////////////////////////////////////////////////////////

        return buildAuthUser(
          user
        );

      },

    }),


    ////////////////////////////////////////////////////////////
    // GOOGLE
    ////////////////////////////////////////////////////////////

    GoogleProvider({

      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,

    }),

  ],


  ////////////////////////////////////////////////////////////
  // SESSION
  ////////////////////////////////////////////////////////////

  session: {

    strategy:
      "jwt",

  },


  ////////////////////////////////////////////////////////////
  // NEXTAUTH SECRET
  ////////////////////////////////////////////////////////////

  secret:
    process.env.NEXTAUTH_SECRET,


  ////////////////////////////////////////////////////////////
  // AUTH PAGES
  ////////////////////////////////////////////////////////////

  pages: {

    signIn:
      "/login",

  },


  ////////////////////////////////////////////////////////////
  // CALLBACKS
  ////////////////////////////////////////////////////////////

  callbacks: {


    ////////////////////////////////////////////////////////////
    // SIGN IN
    ////////////////////////////////////////////////////////////

    async signIn({

      user,
      account,

    }) {


      ////////////////////////////////////////////////////////
      // GOOGLE LOGIN
      ////////////////////////////////////////////////////////

      if (
        account?.provider ===
        "google"
      ) {


        //////////////////////////////////////////////////////
        // GOOGLE EMAIL
        //////////////////////////////////////////////////////

        const email =
          normalizeEmail(
            user.email
          );


        if (!email) {

          return false;

        }


        //////////////////////////////////////////////////////
        // FIND CANONICAL USER
        //////////////////////////////////////////////////////

        let existingUser =
          await prisma.user.findUnique({

            where: {

              email,

            },

          });


        //////////////////////////////////////////////////////
        // CREATE GOOGLE USER
        //////////////////////////////////////////////////////

        if (!existingUser) {

          existingUser =
            await prisma.user.create({

              data: {

                name:
                  user.name ||
                  "Google User",

                email,

                avatar:
                  user.image ||
                  null,

                provider:
                  "google",

                providerId:
                  account.providerAccountId ||
                  null,

                role:
                  "user",

                status:
                  "active",

                isActive:
                  true,

                lastLoginAt:
                  new Date(),

              },

            });

        }


        //////////////////////////////////////////////////////
        // EXISTING GOOGLE USER
        //////////////////////////////////////////////////////

        else {


          ////////////////////////////////////////////////////
          // ACCOUNT STATUS
          ////////////////////////////////////////////////////

          if (
            !isUserActive(
              existingUser
            )
          ) {

            return false;

          }


          ////////////////////////////////////////////////////
          // SYNC GOOGLE DATA
          ////////////////////////////////////////////////////

          existingUser =
            await prisma.user.update({

              where: {

                id:
                  existingUser.id,

              },

              data: {

                lastLoginAt:
                  new Date(),

                avatar:
                  user.image ||
                  existingUser.avatar,

                provider:
                  existingUser.provider ===
                  "credentials"

                    ? "google"

                    : existingUser.provider,

                providerId:
                  existingUser.providerId ||
                  account.providerAccountId ||
                  null,

              },

            });

        }


        //////////////////////////////////////////////////////
        // PASS CANONICAL USER
        //////////////////////////////////////////////////////

        (user as any).id =
          existingUser.id;

        (user as any).role =
          existingUser.role;

        (user as any).name =
          existingUser.name;

        (user as any).email =
          existingUser.email;

        (user as any).image =
          existingUser.avatar;

      }


      ////////////////////////////////////////////////////////
      // ALLOW LOGIN
      ////////////////////////////////////////////////////////

      return true;

    },


    ////////////////////////////////////////////////////////////
    // JWT
    ////////////////////////////////////////////////////////////

    async jwt({

      token,
      user,

    }) {


      ////////////////////////////////////////////////////////
      // INITIAL AUTHENTICATION
      ////////////////////////////////////////////////////////

      if (user) {

        token.id =
          (user as any).id;

        token.role =
          (user as any).role;

        token.name =
          user.name;

        token.email =
          user.email;

        token.picture =
          (user as any).image;


        //////////////////////////////////////////////////////
        // OTP PHONE
        //////////////////////////////////////////////////////

        if (
          (user as any).phone
        ) {

          token.phone =
            (user as any).phone;

        }

      }


      ////////////////////////////////////////////////////////
      // RETURN TOKEN
      ////////////////////////////////////////////////////////

      return token;

    },


    ////////////////////////////////////////////////////////////
    // SESSION
    ////////////////////////////////////////////////////////////

    async session({

      session,
      token,

    }) {


      if (
        session.user
      ) {

        session.user.id =
          token.id as string;

        session.user.role =
          token.role as string;

        session.user.name =
          (token.name as string | null)
          ?? null;

        session.user.email =
          (token.email as string | null)
          ?? null;

        session.user.image =
          (token.picture as string | null)
          ?? null;


        //////////////////////////////////////////////////////
        // OPTIONAL PHONE
        //////////////////////////////////////////////////////

        if (
          token.phone
        ) {

          (session.user as any).phone =
            token.phone;

        }

      }


      return session;

    },

  },

};