import { NextResponse } from "next/server";

import User from "@/app/models/User";
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

    const users = await User.find({})
      .select(
        "name email role status createdAt"
      )
      .sort({
        createdAt: -1,
      });


    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        id: user._id.toString(),
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