import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
    } = body;

    /* ================= VALIDATION ================= */

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* ================= DUPLICATE CHECK ================= */

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 409,
        }
      );
    }

    /* ================= PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* ================= ROLE ================= */

    const allowedRoles = [
      "superadmin",
      "admin",
      "editor",
      "reporter",
      "advertiser",
      "user",
    ];

    const safeRole = allowedRoles.includes(role)
      ? role
      : "user";

    /* ================= CREATE USER ================= */

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: safeRole,
        status: "active",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "CREATE USER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}