//////////////////////////////////////////////////////////////
// NATIONPATH ZODIAC CMS ADMIN API
//
// GET  -> List zodiac database
// POST -> Create zodiac entry
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate horoscope
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";



export const dynamic = "force-dynamic";







//////////////////////////////////////////////////////////////
// GET ALL ZODIAC
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const zodiacList =


      await (Zodiac as any)

        .find({})

        .sort({

          createdAt:-1,

        })

        .lean();






    return NextResponse.json(

      {

        success:true,

        count:zodiacList.length,

        data:zodiacList,

      }

    );



  }


  catch(error:any){



    console.error(

      "[ZODIAC_GET_ERROR]",

      error

    );



    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch zodiac data",

        error:

          error.message,

      },

      {

        status:500,

      }

    );


  }


}









//////////////////////////////////////////////////////////////
// CREATE ZODIAC
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();




    const body =

      await req.json();







    if(

      !body.zodiac ||

      !body.slug ||

      !body.names

    ){


      return NextResponse.json(

        {

          success:false,

          message:

            "Zodiac, slug and names are required",

        },

        {

          status:400,

        }

      );


    }








    const zodiacName =

      String(body.zodiac)

      .trim()

      .toLowerCase();






    const slug =

      String(body.slug)

      .trim()

      .toLowerCase();







    const duplicate =

      await (Zodiac as any)

      .findOne({

        $or:[

          {

            zodiac:zodiacName,

          },

          {

            slug,

          }

        ]

      });







    if(duplicate){


      return NextResponse.json(

        {

          success:false,

          message:

            "Zodiac already exists",

        },

        {

          status:409,

        }

      );


    }









    const payload = {



      zodiac:

        zodiacName,




      slug,




      names:{


        english:

          body.names.english || "",


        hindi:

          body.names.hindi || "",


        sanskrit:

          body.names.sanskrit || "",


        gujarati:

          body.names.gujarati || "",


        nepali:

          body.names.nepali || "",


      },

//////////////////////////////////////////////////////////////
// HOROSCOPE IDENTITY CONTENT
//////////////////////////////////////////////////////////////

identity:{


  rashi:

    body.identity?.rashi || "",



  sanskritName:

    body.identity?.sanskritName || "",



  dates:

    body.identity?.dates || "",



  description:

    body.identity?.description || "",



  energy:

    body.identity?.energy || "",


},




      symbol:

        body.symbol || "",




      element:

        body.element || undefined,




      modality:

        body.modality || undefined,




      rulingPlanet:

        body.rulingPlanet || "",







      traits:{


        strengths:

          body.traits?.strengths || [],



        weaknesses:

          body.traits?.weaknesses || [],



        personality:

          body.traits?.personality || "",


      },








      lucky:{


        color:

          body.lucky?.color || "",



        number:

          body.lucky?.number || "",



        day:

          body.lucky?.day || "",


      },








      media:{


        icon:

          body.media?.icon || "",



        banner:

          body.media?.banner || "",


      },








      seo:{


        title:

          body.seo?.title || "",



        description:

          body.seo?.description || "",


      },








      status:

        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const zodiac =

      await (Zodiac as any)

      .create(payload);








    return NextResponse.json(

      {

        success:true,

        message:

          "Zodiac created successfully",

        data:zodiac,

      },

      {

        status:201,

      }

    );







  }


  catch(error:any){



    console.error(

      "[ZODIAC_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){


      return NextResponse.json(

        {

          success:false,

          message:

            "Zodiac already exists",

        },

        {

          status:409,

        }

      );


    }







    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to create zodiac",

        error:

          error.message,

      },

      {

        status:500,

      }

    );



  }


}