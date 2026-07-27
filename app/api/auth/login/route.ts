import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {

    /* ================= SAFE BODY PARSE ================= */

    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email, password } = body;


    /* ================= VALIDATION ================= */

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }


    const normalizedEmail = email.toLowerCase().trim();


    /* ================= FIND USER ================= */

    const user = await User.findOne({
      email: normalizedEmail,
    });


    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }


    /* ================= PASSWORD CHECK ================= */

    const match = await bcrypt.compare(
      password,
      user.password
    );


    if (!match) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }


    /* ================= ACCOUNT STATUS ================= */

    if (user.status === "blocked") {
      return NextResponse.json(
        { success: false, error: "Account blocked" },
        { status: 403 }
      );
    }


    /* ================= CREATE TOKEN ================= */

    const token = signToken({
      id: user._id.toString(),
      role: user.role,
    });


    /* ================= RESPONSE ================= */

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    });


    /* ================= COOKIE ================= */

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });


    return response;


  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      {
        status: 500,
      }
    );

  }
}