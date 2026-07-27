import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";

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


    const { name, email, password } = body;


    /* ================= VALIDATION ================= */

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }


    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }


    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }


    const normalizedEmail = email.toLowerCase().trim();


    /* ================= CHECK EXISTING USER ================= */

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });


    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }


    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(password, 10);


    /* ================= CREATE USER ================= */

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      status: "active",
    });


    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });


  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );

  }
}