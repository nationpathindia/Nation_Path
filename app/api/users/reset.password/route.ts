import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {

  try {


    const body = await req.json();

    const userId = body?.userId;

    const newPassword = body?.newPassword;



    /* ================= VALIDATION ================= */

    if (!userId || !newPassword) {

      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        {
          status: 400,
        }
      );

    }



    /* ================= CHECK USER ================= */

    const user = await User.findById(userId);



    if (!user) {

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



    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );



    /* ================= UPDATE PASSWORD ================= */

    await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      }
    );



    return NextResponse.json({

      success: true,

      message: "Password reset successful",

    });



  } catch (error) {


    console.error(
      "RESET PASSWORD ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}