import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    /* ================= AUTH CHECK ================= */

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      ![
        "superadmin",
        "admin",
        "editor",
      ].includes(currentUser.role)
    ) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    /* ================= FETCH USERS ================= */

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error("USERS API ERROR:", error);

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