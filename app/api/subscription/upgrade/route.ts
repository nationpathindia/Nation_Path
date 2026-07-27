import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  upgradeSubscription,
} from "@/lib/subscription/plan.service";


export async function POST(
  req: Request
) {

  try {


    console.log(
      "UPGRADE API HIT"
    );


    console.log(
      "COOKIE:",
      req.headers.get("cookie")
    );



    const session =
      await getServerSession(authOptions);



    console.log(
      "API SESSION:",
      session
    );



    if(!session?.user?.id){

      return NextResponse.json(
        {
          success:false,
          error:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const body =
      await req.json();



    const {
      planSlug
    } = body;



    if(!planSlug){

      return NextResponse.json(
        {
          success:false,
          error:"Plan slug required"
        },
        {
          status:400
        }
      );

    }




    const subscription =
      await upgradeSubscription(
        session.user.id,
        planSlug
      );




    return NextResponse.json(
      {
        success:true,
        subscription
      },
      {
        status:200
      }
    );



  }
  catch(error:any){


    console.error(
      "UPGRADE ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:error.message
      },
      {
        status:500
      }
    );


  }


}