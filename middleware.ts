import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(
  req: NextRequest
){

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });


  const path = req.nextUrl.pathname;


  const role = token?.role as string | undefined;



  /*
  ==============================
  ADMIN PANEL SECURITY
  ==============================
  */


  if(path.startsWith("/admin")){


    if(!token){

      return NextResponse.redirect(
        new URL("/login",req.url)
      );

    }



    const allowed = [
      "superadmin",
      "admin",
      "editor",
      "reporter",
      "advertiser",
    ];



    if(!allowed.includes(role || "")){


      return NextResponse.redirect(
        new URL("/dashboard",req.url)
      );

    }


  }



  /*
  ==============================
  USER MANAGEMENT
  ONLY SUPERADMIN + ADMIN
  ==============================
  */


  if(
    path.startsWith("/admin/user")
  ){


    if(
      role !== "superadmin" &&
      role !== "admin"
    ){

      return NextResponse.redirect(
        new URL("/admin",req.url)
      );

    }

  }





  /*
  ==============================
  ADMIN ONLY FEATURES
  ==============================
  */


  if(
    path.startsWith("/admin/settings")
  ){


    if(role !== "superadmin"){

      return NextResponse.redirect(
        new URL("/admin",req.url)
      );

    }


  }





  /*
  ==============================
  ADS MODULE
  ==============================
  */


  if(
    path.startsWith("/admin/ads")
  ){


    if(

      role !== "superadmin" &&
      role !== "admin" &&
      role !== "advertiser"

    ){

      return NextResponse.redirect(
        new URL("/admin",req.url)
      );

    }

  }





  /*
  ==============================
  POSTS / NEWS
  ==============================
  */


  if(
    path.startsWith("/admin/posts")
  ){


    if(

      role !== "superadmin" &&
      role !== "admin" &&
      role !== "editor" &&
      role !== "reporter"

    ){

      return NextResponse.redirect(
        new URL("/admin",req.url)
      );

    }


  }



  return NextResponse.next();

}



export const config = {

 matcher:[
   "/admin/:path*"
 ]

};