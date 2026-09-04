import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* =========================================================
   NATIONPATH LOGIN API

   POST /api/auth/login

   PURPOSE:
   - Canonical Prisma User authentication
   - Email + Password login
   - Website authentication through HTTP-only cookie
   - Mobile authentication through JSON token
   - Same JWT/token for both clients

   IMPORTANT:
   - Does NOT create another User
   - Does NOT use Mongoose User
   - Does NOT change website authentication behavior
   - Website continues using the "token" cookie
   - Mobile receives the same token in JSON response
========================================================= */

export async function POST(req: Request) {
  try {
    /* =======================================================
       SAFE BODY PARSE
    ======================================================= */

    let body: any;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        {
          status: 400,
        },
      );
    }

    /* =======================================================
       INPUT
    ======================================================= */

    const email =
      typeof body?.email === "string"
        ? body.email
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password required",
        },
        {
          status: 400,
        },
      );
    }

    /* =======================================================
       NORMALIZE EMAIL
    ======================================================= */

    const normalizedEmail =
      email
        .toLowerCase()
        .trim();

    if (!normalizedEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password required",
        },
        {
          status: 400,
        },
      );
    }

    /* =======================================================
       FIND CANONICAL USER
    ======================================================= */

    const user =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },

        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          status: true,
          isActive: true,
          avatar: true,
        },
      });

    /* =======================================================
       USER NOT FOUND
    ======================================================= */

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    /* =======================================================
       PASSWORD CHECK
    ======================================================= */

    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    const match =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    /* =======================================================
       ACCOUNT STATUS
    ======================================================= */

    if (user.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          error: "Account blocked",
        },
        {
          status: 403,
        },
      );
    }

    if (user.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          error: "Account inactive",
        },
        {
          status: 403,
        },
      );
    }

    /* =======================================================
       UPDATE LAST LOGIN
    ======================================================= */

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        lastLoginAt: new Date(),
      },
    });

    /* =======================================================
       CREATE AUTH TOKEN
    ======================================================= */

    const token =
      signToken({
        id: user.id,
        role: user.role,
      });

    /* =======================================================
       RESPONSE
       
       IMPORTANT:
       
       1. Website:
          Uses HTTP-only "token" cookie below.

       2. Mobile:
          Reads "token" from JSON response and stores
          it in AsyncStorage.

       DO NOT REMOVE token FROM JSON.
    ======================================================= */

    const response =
      NextResponse.json({
        success: true,

        token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          status: user.status,
          isActive: user.isActive,
        },
      });

    /* =======================================================
       WEBSITE AUTH COOKIE

       KEEP THIS EXACTLY FOR WEBSITE AUTH.

       The website continues to authenticate through
       the HTTP-only cookie.

       Mobile does NOT depend on this cookie.
    ======================================================= */

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
      },
    );

    /* =======================================================
       RETURN
    ======================================================= */

    return response;

  } catch (error) {
    /* =======================================================
       INTERNAL ERROR
    ======================================================= */

    console.error(
      "LOGIN ERROR:",
      error instanceof Error
        ? error.message
        : "Unknown error",
    );

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}