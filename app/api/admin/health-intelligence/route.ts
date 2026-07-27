//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HEALTH INTELLIGENCE CMS ADMIN API
//
// GET  -> List Health Intelligence
// POST -> Create Health Intelligence
//
// Responsibility:
// Astrology health knowledge management only.
//
// Does NOT:
// - provide medical diagnosis
// - calculate horoscope
// - modify astro engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import HealthIntelligence from "@/app/models/HealthIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL HEALTH INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const health =


      await (HealthIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();







    return NextResponse.json(

      {

        success:true,

        count:health.length,

        data:health,

      }

    );



  }


  catch(error:any){


    console.error(

      "[HEALTH_INTELLIGENCE_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch health intelligence",


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
// CREATE HEALTH INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function POST(

 req:NextRequest

){


 try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.title ||

      !body.slug ||

      !body.interpretation

    ){


      return NextResponse.json(

        {

          success:false,


          message:

          "Title, slug and interpretation are required",


        },

        {

          status:400,

        }

      );


    }









    const title =


      String(body.title)

      .trim();







    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const interpretation =


      String(body.interpretation)

      .trim();












    const existing =


      await (HealthIntelligence as any)

      .findOne({

        slug,

      });







    if(existing){


      return NextResponse.json(

        {

          success:false,


          message:

          "Health intelligence already exists",

        },

        {

          status:409,

        }

      );


    }









    const payload = {



      title,



      slug,





      category:

        body.category || "health",






      healthType:

        body.healthType || "general",






      planets:

        body.planets || [],






      zodiacSigns:

        body.zodiacSigns || [],






      houses:

        body.houses || [],






      bodyAreas:

        body.bodyAreas || [],






      healthAssociations:

        body.healthAssociations || [],






      wellnessGuidance:

        body.wellnessGuidance || [],






      lifestyleSuggestions:

        body.lifestyleSuggestions || [],






      strengths:

        body.strengths || [],






      challenges:

        body.challenges || [],






      planetaryInfluence:

        body.planetaryInfluence || "",






      zodiacInfluence:

        body.zodiacInfluence || "",






      houseInfluence:

        body.houseInfluence || "",






      interpretation,






      remedies:

        body.remedies || "",






      media:

        body.media || {},






      seo:

        body.seo || {},






      status:


        body.status === "published"

        ?

        "published"

        :

        "draft",



    };









    const created =


      await (HealthIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {

        success:true,


        message:

        "Health intelligence created successfully",



        data:created,


      },

      {

        status:201,

      }

    );







 }


 catch(error:any){



    console.error(

      "[HEALTH_INTELLIGENCE_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){



      return NextResponse.json(

        {

          success:false,


          message:

          "Duplicate slug",

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

        "Failed to create health intelligence",


        error:

        error.message,

      },

      {

        status:500,

      }

    );



 }


}