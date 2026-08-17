import { NextResponse } from "next/server";
import { Prisma, Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";

/*
========================================
ALLOWED ROLES
========================================

Must remain aligned with CREATE USER.
*/

const ALLOWED_ROLES = [
  "superadmin",
  "admin",
  "editor",
  "reporter",
  "advertiser",
  "user",
] as const;

/*
========================================
ROLE VALIDATION
========================================
*/

function isValidRole(
  value: unknown
): value is Role {
  return (
    typeof value === "string" &&
    (ALLOWED_ROLES as readonly string[]).includes(
      value
    )
  );
}

/*
========================================
JSON VALUE HELPER
========================================

Prisma's generated Json input type does not
accept Prisma.JsonNull directly in this
project's generated client typings.

The runtime value is still Prisma.JsonNull,
but the final value is normalized to the
generated InputJsonValue type for Prisma.
*/

function toPrismaJsonValue(
  value: unknown
): Prisma.InputJsonValue {
  if (value === null) {
    return Prisma.JsonNull as unknown as Prisma.InputJsonValue;
  }

  return value as Prisma.InputJsonValue;
}

/*
========================================
UPDATE USER
========================================
*/

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    /*
    ======================================
    AUTHENTICATION
    ======================================
    */

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    ======================================
    TARGET USER
    ======================================
    */

    const targetUser =
      await prisma.user.findUnique({
        where: {
          id: params.id,
        },
      });

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
    ======================================
    REQUEST BODY
    ======================================
    */

    const body = await req.json();

    const isSelf =
      currentUser.id === targetUser.id;

    /*
    ======================================
    ROLE VALIDATION
    ======================================
    */

    if (
      body.role !== undefined &&
      !isValidRole(body.role)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid role",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ======================================
    SANITIZED UPDATE DATA
    ======================================

    Only explicitly supplied fields are
    added to the update.

    This prevents accidental overwriting
    of existing user data.
    */

    const updateData: Prisma.UserUpdateInput = {};

    /*
    --------------------------------------
    NAME
    --------------------------------------
    */

    if (body.name !== undefined) {
      updateData.name =
        body.name === null
          ? null
          : String(body.name).trim();
    }

    /*
    --------------------------------------
    AVATAR
    --------------------------------------
    */

    if (body.avatar !== undefined) {
      updateData.avatar =
        body.avatar === null
          ? null
          : String(body.avatar).trim();
    }

    /*
    --------------------------------------
    STATUS
    --------------------------------------
    */

    if (body.status !== undefined) {
      updateData.status =
        String(body.status);
    }

    /*
    --------------------------------------
    PROFILE JSON
    --------------------------------------
    */

    if (body.profile !== undefined) {
      updateData.profile =
        toPrismaJsonValue(
          body.profile
        );
    }

    /*
    --------------------------------------
    PERMISSIONS JSON
    --------------------------------------
    */

    if (
      body.permissions !== undefined
    ) {
      updateData.permissions =
        toPrismaJsonValue(
          body.permissions
        );
    }

    /*
    ======================================
    SUPERADMIN
    ======================================

    Full user-management access.
    */

    if (
      currentUser.role === "superadmin"
    ) {
      if (body.role !== undefined) {
        updateData.role = body.role;
      }

      await prisma.user.update({
        where: {
          id: params.id,
        },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message:
          "User updated successfully",
      });
    }

    /*
    ======================================
    ADMIN
    ======================================
    */

    if (
      currentUser.role === "admin"
    ) {
      /*
      Admin cannot modify superadmin.
      */

      if (
        targetUser.role ===
        "superadmin"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Cannot modify superadmin",
          },
          {
            status: 403,
          }
        );
      }

      /*
      Admin cannot modify another admin.
      Self-edit remains allowed.
      */

      if (
        targetUser.role === "admin" &&
        !isSelf
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Admin account protected",
          },
          {
            status: 403,
          }
        );
      }

      /*
      Admin cannot assign protected roles.
      */

      if (
        body.role === "admin" ||
        body.role === "superadmin"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Cannot assign protected role",
          },
          {
            status: 403,
          }
        );
      }

      if (body.role !== undefined) {
        updateData.role = body.role;
      }

      await prisma.user.update({
        where: {
          id: params.id,
        },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message:
          "User updated successfully",
      });
    }

    /*
    ======================================
    EDITOR
    ======================================

    Editor can manage reporters and
    update their own profile.

    Editor cannot:
    - change roles
    - change permissions
    - modify protected roles
    */

    if (
      currentUser.role === "editor"
    ) {
      if (
        targetUser.role !==
          "reporter" &&
        !isSelf
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Forbidden",
          },
          {
            status: 403,
          }
        );
      }

      delete updateData.role;
      delete updateData.permissions;

      await prisma.user.update({
        where: {
          id: params.id,
        },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message: isSelf
          ? "Profile updated successfully"
          : "Reporter updated successfully",
      });
    }

    /*
    ======================================
    NORMAL USER
    ======================================

    User can update own profile only.
    */

    if (isSelf) {
      delete updateData.role;
      delete updateData.permissions;

      await prisma.user.update({
        where: {
          id: params.id,
        },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message:
          "Profile updated successfully",
      });
    }

    /*
    ======================================
    FORBIDDEN
    ======================================
    */

    return NextResponse.json(
      {
        success: false,
        error: "Forbidden",
      },
      {
        status: 403,
      }
    );
  } catch (error) {
    console.error(
      "UPDATE USER ERROR:",
      error
    );

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

/*
========================================
DELETE USER
========================================
*/

export async function DELETE(
  _req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    /*
    ======================================
    AUTHENTICATION
    ======================================
    */

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    ======================================
    TARGET USER
    ======================================
    */

    const targetUser =
      await prisma.user.findUnique({
        where: {
          id: params.id,
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
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
    ======================================
    SELF DELETE PROTECTION
    ======================================
    */

    if (
      currentUser.id === targetUser.id
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot delete yourself",
        },
        {
          status: 403,
        }
      );
    }

    /*
    ======================================
    SUPERADMIN
    ======================================
    */

    if (
      currentUser.role === "superadmin"
    ) {
      await prisma.user.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "User deleted",
      });
    }

    /*
    ======================================
    ADMIN
    ======================================
    */

    if (
      currentUser.role === "admin"
    ) {
      /*
      Admin cannot delete:
      - superadmin
      - admin
      */

      if (
        targetUser.role ===
          "superadmin" ||
        targetUser.role === "admin"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Protected account",
          },
          {
            status: 403,
          }
        );
      }

      await prisma.user.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "User deleted",
      });
    }

    /*
    ======================================
    EDITOR
    ======================================
    */

    if (
      currentUser.role === "editor"
    ) {
      /*
      Editor can delete reporters only.
      */

      if (
        targetUser.role !==
        "reporter"
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Forbidden",
          },
          {
            status: 403,
          }
        );
      }

      await prisma.user.delete({
        where: {
          id: params.id,
        },
      });

      return NextResponse.json({
        success: true,
        message:
          "Reporter deleted",
      });
    }

    /*
    ======================================
    FORBIDDEN
    ======================================
    */

    return NextResponse.json(
      {
        success: false,
        error: "Forbidden",
      },
      {
        status: 403,
      }
    );
  } catch (error) {
    console.error(
      "DELETE USER ERROR:",
      error
    );

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

