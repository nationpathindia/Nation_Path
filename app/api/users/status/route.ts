import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    /* ================= AUTH CHECK ================= */

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      currentUser.role !== "superadmin" &&
      currentUser.role !== "admin"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    /* ================= REQUEST ================= */

    const body = await req.json();

    const {
      id,
      status,
    } = body;

    if (!id || !status) {
      return NextResponse.json(
        {
          error: "Invalid data",
        },
        {
          status: 400,
        }
      );
    }

    /* ================= STATUS VALIDATION ================= */

    if (
      status !== "active" &&
      status !== "blocked"
    ) {
      return NextResponse.json(
        {
          error: "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    /* ================= FIND USER ================= */

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    /* ================= SELF STATUS CHECK ================= */

    if (user.id === currentUser.id) {
      return NextResponse.json(
        {
          error: "Cannot change your own status",
        },
        {
          status: 403,
        }
      );
    }

    /* ================= UPDATE ================= */

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "USER STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}