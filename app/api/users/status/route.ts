import { NextResponse } from "next/server";

import User from "@/app/models/User";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {

  try {


    const currentUser = await getCurrentUser();


    if(!currentUser){

      return NextResponse.json(
        {
          error:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    if(
      currentUser.role !== "superadmin" &&
      currentUser.role !== "admin"
    ){

      return NextResponse.json(
        {
          error:"Forbidden"
        },
        {
          status:403
        }
      );

    }




    const body = await req.json();


    const {
      id,
      status
    } = body;



    if(!id || !status){

      return NextResponse.json(
        {
          error:"Invalid data"
        },
        {
          status:400
        }
      );

    }




    if(
      status !== "active" &&
      status !== "blocked"
    ){

      return NextResponse.json(
        {
          error:"Invalid status"
        },
        {
          status:400
        }
      );

    }





    const user = await User.findById(id);



    if(!user){

      return NextResponse.json(
        {
          error:"User not found"
        },
        {
          status:404
        }
      );

    }



    if(
      user._id.toString() === currentUser._id.toString()
    ){

      return NextResponse.json(
        {
          error:"Cannot change your own status"
        },
        {
          status:403
        }
      );

    }





    await User.findByIdAndUpdate(
      id,
      {
        status
      }
    );



    return NextResponse.json({

      success:true

    });



  }
  catch(error){


    console.error(
      "USER STATUS ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:"Server error"
      },
      {
        status:500
      }
    );


  }

}