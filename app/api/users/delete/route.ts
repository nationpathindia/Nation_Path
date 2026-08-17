import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";

/*
=====================================================
DELETE PERMISSION
=====================================================
*/

function canDeleteUser(
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

  Can delete:
  editor
  reporter
  advertiser
  user

  Cannot delete:
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

  Only reporter
  */

  if (currentRole === "editor") {
    return targetRole === "reporter";
  }

  return false;
}

/*
=====================================================
DELETE USER
=====================================================
*/

export async function POST(req: Request) {
  try {
    /*
    =====================================================
    AUTH
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
    BODY
    =====================================================
    */

    const body = await req.json();

    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
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
        id,
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
    SELF DELETE BLOCK
    =====================================================
    */

    if (currentUser.id === targetUser.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot delete your own account",
        },
        {
          status: 403,
        }
      );
    }

    /*
    =====================================================
    ROLE CHECK
    =====================================================
    */

    const allowed = canDeleteUser(
      currentUser.role,
      targetUser.role
    );

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to delete this user",
        },
        {
          status: 403,
        }
      );
    }

    /*
    =====================================================
    DELETE
    =====================================================
    */

    await prisma.user.delete({
      where: {
        id,
      },
    });

    /*
    =====================================================
    RESPONSE
    =====================================================
    */

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE USER ERROR:",
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