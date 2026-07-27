//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS ADMIN API
//
// GET  -> List dosha intelligence
// POST -> Create dosha intelligence
//
// Responsibility:
// Astrology dosha knowledge management only.
//
// Does NOT:
// - calculate dosha
// - analyze horoscope
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import DoshaIntelligence from "@/app/models/DoshaIntelligence";


export const dynamic = "force-dynamic";





//////////////////////////////////////////////////////////////
// GET ALL DOSHA INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const doshas =


      await (DoshaIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();






    return NextResponse.json(

      {

        success:true,

        count:doshas.length,

        data:doshas,

      }

    );



  }


  catch(error:any){



    console.error(

      "[DOSHA_INTELLIGENCE_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {

        success:false,

        message:

          "Failed to fetch dosha intelligence",


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
// CREATE DOSHA INTELLIGENCE
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();







    if(

      !body.dosha ||

      !body.slug

    ){


      return NextResponse.json(

        {

          success:false,


          message:

            "Dosha name and slug are required",

        },


        {

          status:400,

        }

      );


    }









    const dosha =


      String(body.dosha)

      .trim();







    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const existing =


      await (DoshaIntelligence as any)

      .findOne({

        slug,

      });







    if(existing){


      return NextResponse.json(

        {

          success:false,


          message:

            "Dosha intelligence already exists",

        },


        {

          status:409,

        }

      );


    }












    const payload = {


      dosha,



      slug,





      multilingualNames:

        body.multilingualNames || {},






      category:

        body.category || "other",






      planetsInvolved:

        body.planetsInvolved || [],






      housesInvolved:

        body.housesInvolved || [],






      formationExplanation:

        body.formationExplanation || "",






      causes:

        body.causes || [],






      positiveEffects:

        body.positiveEffects || [],






      negativeEffects:

        body.negativeEffects || [],






      challenges:

        body.challenges || [],






      lifeAreas:

        body.lifeAreas || {},






      remedies:

        body.remedies || [],






      mantras:

        body.mantras || [],






      rituals:

        body.rituals || [],






      gemstones:

        body.gemstones || [],






      metals:

        body.metals || [],






      relatedDoshas:

        body.relatedDoshas || [],






      description:

        body.description || "",






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


      await (DoshaIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Dosha intelligence created successfully",



        data:created,


      },


      {


        status:201,


      }


    );








  }


  catch(error:any){





    console.error(

      "[DOSHA_INTELLIGENCE_CREATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate dosha intelligence entry",


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

          "Failed to create dosha intelligence",



        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}