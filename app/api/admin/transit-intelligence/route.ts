//////////////////////////////////////////////////////////////
// NATIONPATH TRANSIT INTELLIGENCE CMS ADMIN API
//
// GET  -> List transit rules
// POST -> Create transit rule
//
// Responsibility:
// Planetary transit knowledge management only.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import TransitIntelligence from "@/app/models/TransitIntelligence";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET ALL TRANSIT RULES
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();





    const transits =


      await (TransitIntelligence as any)

      .find({})

      .sort({

        createdAt:-1,

      })

      .lean();









    return NextResponse.json(

      {


        success:true,


        count:transits.length,


        data:transits,


      }


    );



  }


  catch(error:any){



    console.error(


      "[TRANSIT_INTELLIGENCE_GET_ERROR]",


      error


    );









    return NextResponse.json(

      {


        success:false,


        message:


          "Failed to fetch transit intelligence",



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
// CREATE TRANSIT RULE
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();









    if(

      !body.name ||

      !body.slug ||

      !body.planet

    ){


      return NextResponse.json(

        {


          success:false,


          message:


            "Name, slug and planet are required",


        },


        {


          status:400,


        }


      );


    }









    const name =


      String(body.name)

      .trim();









    const slug =


      String(body.slug)

      .trim()

      .toLowerCase();









    const planet =


      String(body.planet)

      .trim()

      .toLowerCase();













    const existing =


      await (TransitIntelligence as any)

      .findOne({

        slug,

      });









    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:


            "Transit rule already exists",


        },


        {


          status:409,


        }


      );


    }













    const payload = {




      name,



      slug,





      planet,








      fromSign:


        body.fromSign || "",









      toSign:


        body.toSign || "",









      transitType:


        body.transitType || "planetary",









      duration:


        body.duration || "",









      effects:


        body.effects || {

          positive:[],

          negative:[],

          neutral:[],

        },









      houseImpact:


        body.houseImpact || {},









      category:


        body.category || "career",









      remedies:


        Array.isArray(body.remedies)

        ?

        body.remedies

        :

        [],









      advice:


        body.advice || "",









      description:


        body.description || "",









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


      await (TransitIntelligence as any)

      .create(payload);












    return NextResponse.json(

      {


        success:true,


        message:


          "Transit rule created successfully",



        data:created,


      },


      {


        status:201,


      }


    );








  }


  catch(error:any){





    console.error(


      "[TRANSIT_INTELLIGENCE_CREATE_ERROR]",


      error


    );









    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:


            "Duplicate transit rule entry",


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


          "Failed to create transit rule",



        error:


          error.message,


      },


      {


        status:500,


      }


    );



  }


}