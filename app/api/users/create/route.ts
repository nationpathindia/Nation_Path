import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";

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



    const existingUser = await User.findOne({
      email: normalizedEmail,
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



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



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



    const user = await User.create({

      name,

      email: normalizedEmail,

      password: hashedPassword,

      role: safeRole,

      status: "active",

    });



    return NextResponse.json({

      success: true,

      user: {

        id: user._id.toString(),

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });



  } catch(error) {


    console.error(
      "CREATE USER ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:"Server error",
      },
      {
        status:500,
      }
    );

  }

}