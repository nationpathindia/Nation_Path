//////////////////////////////////////////////////////////////
// NATIONPATH PLANET INTELLIGENCE CMS ADMIN API
//
// GET  -> List planets
// POST -> Create planet
//
// Responsibility:
// Planet knowledge master management only.
//
// Does NOT:
// - calculate planetary positions
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import PlanetIntelligence from "@/app/models/PlanetIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL PLANETS
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const planets =


      await (PlanetIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();








    return NextResponse.json(

      {


        success:true,


        count:planets.length,


        data:planets,


      }


    );



  }


  catch(error:any){



    console.error(

      "[PLANET_INTELLIGENCE_GET_ERROR]",

      error

    );





    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch planets",


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
// CREATE PLANET
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();




    const body =

      await req.json();








    if(

      !body.planet ||

      !body.slug

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Planet and slug are required",


        },


        {


          status:400,


        }


      );


    }









    const planet =

      String(body.planet)

      .trim()

      .toLowerCase();






    const slug =

      String(body.slug)

      .trim()

      .toLowerCase();









    const existing =


      await (PlanetIntelligence as any)

      .findOne({

        slug,

      });








    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "Planet already exists",


        },


        {


          status:409,


        }


      );


    }









    const payload = {



      planet,



      slug,





      names:


        body.names || {},






      nature:


        body.nature || "neutral",





      element:


        body.element || "",






      category:


        body.category || "",









      karakatva:


        Array.isArray(body.karakatva)

        ?

        body.karakatva

        :

        [],









      profession:


        Array.isArray(body.profession)

        ?

        body.profession

        :

        [],








      relationships:


        Array.isArray(body.relationships)

        ?

        body.relationships

        :

        [],










      positiveEffects:


        Array.isArray(body.positiveEffects)

        ?

        body.positiveEffects

        :

        [],









      negativeEffects:


        Array.isArray(body.negativeEffects)

        ?

        body.negativeEffects

        :

        [],









      weaknesses:


        Array.isArray(body.weaknesses)

        ?

        body.weaknesses

        :

        [],









      remedies:


        Array.isArray(body.remedies)

        ?

        body.remedies

        :

        [],










      mantra:


        body.mantra || "",






      gemstone:


        body.gemstone || "",






      metal:


        body.metal || "",






      day:


        body.day || "",






      color:


        body.color || "",










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


      await (PlanetIntelligence as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Planet created successfully",


        data:created,


      },


      {


        status:201,


      }


    );







  }


  catch(error:any){



    console.error(

      "[PLANET_INTELLIGENCE_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate planet entry",


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

          "Failed to create planet",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}