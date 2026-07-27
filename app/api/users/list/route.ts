import { NextResponse } from "next/server";

import User from "@/app/models/User";

export const dynamic = "force-dynamic";


export async function GET() {

  try {


    const users = await User.find({})

      .select(
        "name email role status createdAt"
      )

      .sort({
        createdAt: -1,
      });



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


    console.error(
      "USERS LIST ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );

  }

}