import { NextResponse } from "next/server";

import User from "@/app/models/User";

export const dynamic = "force-dynamic";


export async function GET() {

  try {


    const users = await User.find({})

      .select(
        "name email role avatar"
      )

      .sort({
        name: 1,
      });



    return NextResponse.json({

      success: true,

      users: users.map((user) => ({

        id: user._id.toString(),

        name: user.name,

        email: user.email,

        role: user.role,

        avatar: user.avatar,

      })),

    });



  } catch (error) {


    console.error(
      "Chat users error:",
      error
    );


    return NextResponse.json(
      {
        error: "Failed to load users",
      },
      {
        status: 500,
      }
    );

  }

}