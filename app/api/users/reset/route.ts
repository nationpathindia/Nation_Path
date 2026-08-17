import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";

/*
=====================================================
ROLE PERMISSION CHECK
=====================================================
*/

function canResetPassword(
  currentRole: string,
  targetRole: string
) {
  /*
  SUPERADMIN
  Full control
  */

  if (currentRole === "superadmin") {
    return true;
  }

  /*
  ADMIN

  Can manage:
  editor
  reporter
  advertiser
  user

  Cannot manage:
  superadmin
  admin
  */

  if (currentRole === "admin") {
    return [
      "editor",
      "reporter",
      "advertiser",
      "user",
    ].includes(targetRole);
  }

  /*
  EDITOR

  Reporter only
  */

  if (currentRole === "editor") {
    return targetRole === "reporter";
  }

  /*
  REPORTER
  ADVERTISER
  USER

  No permission
  */

  return false;
}

/*
=====================================================
RESET PASSWORD API
=====================================================
*/

export async function POST(req: Request) {
  try {
    /*
    =====================================================
    AUTH CHECK
    =====================================================
    */

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    =====================================================
    REQUEST BODY
    =====================================================
    */

    const body = await req.json();

    const userId = body?.userId;

    const newPassword =
      typeof body?.newPassword === "string"
        ? body.newPassword.trim()
        : "";

    if (!userId || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User ID and new password required",
        },
        {
          status: 400,
        }
      );
    }

    /*
    =====================================================
    PASSWORD VALIDATION
    =====================================================
    */

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must contain minimum 8 characters",
        },
        {
          status: 400,
        }
      );
    }

    /*
    =====================================================
    TARGET USER
    =====================================================
    */

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
    =====================================================
    ROLE CHECK
    =====================================================
    */

    const currentRole = currentUser.role;

    const targetRole = targetUser.role;

    const allowed = canResetPassword(
      currentRole,
      targetRole
    );

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to reset this user's password",
        },
        {
          status: 403,
        }
      );
    }

    /*
    =====================================================
    HASH PASSWORD
    =====================================================
    */

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    /*
    =====================================================
    UPDATE PASSWORD
    =====================================================
    */

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    /*
    =====================================================
    RESPONSE
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}