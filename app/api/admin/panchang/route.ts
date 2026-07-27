//////////////////////////////////////////////////////////////
// NATIONPATH PANCHANG CMS ADMIN API
//
// GET  -> List Panchang database
// POST -> Create Panchang entry
//
// Responsibility:
// Admin master data management only.
//
// Does NOT:
// - calculate astronomy
// - run Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import Panchang from "@/app/models/Panchang";



export const dynamic = "force-dynamic";








//////////////////////////////////////////////////////////////
// GET ALL PANCHANG
//////////////////////////////////////////////////////////////

export async function GET(){


  try{


    await connectMongoDB();




    const panchangList =


      await (Panchang as any)

        .find({})

        .sort({

          date:-1,

          createdAt:-1,

        })

        .lean();






    return NextResponse.json(

      {


        success:true,


        count:panchangList.length,


        data:panchangList,


      }


    );



  }


  catch(error:any){



    console.error(

      "[PANCHANG_GET_ERROR]",

      error

    );




    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch Panchang data",


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
// CREATE PANCHANG
//////////////////////////////////////////////////////////////

export async function POST(

  req:NextRequest

){


  try{


    await connectMongoDB();





    const body =

      await req.json();







    if(

      !body.date ||

      !body.location

    ){


      return NextResponse.json(

        {


          success:false,


          message:

            "Date and location are required",


        },


        {


          status:400,


        }


      );


    }









    const date =

      String(body.date)

      .trim();








    const location =

      String(body.location)

      .trim();









    const existing =


      await (Panchang as any)

      .findOne({

        date,

        location,

      });








    if(existing){


      return NextResponse.json(

        {


          success:false,


          message:

            "Panchang already exists for this date and location",


        },


        {


          status:409,


        }


      );


    }









    const payload = {



      date,



      location,








      sunrise:

        body.sunrise || "",



      sunset:

        body.sunset || "",









      tithi:{


        name:

          body.tithi?.name || "",



        paksha:

          body.tithi?.paksha || "",



        endingTime:

          body.tithi?.endingTime || "",


      },








      nakshatra:{


        name:

          body.nakshatra?.name || "",



        endingTime:

          body.nakshatra?.endingTime || "",


      },








      yoga:

        body.yoga || "",





      karana:

        body.karana || "",









      moonRashi:

        body.moonRashi || "",





      sunRashi:

        body.sunRashi || "",









      timings:{


        rahuKaal:

          body.timings?.rahuKaal || "",



        yamaganda:

          body.timings?.yamaganda || "",



        gulika:

          body.timings?.gulika || "",


      },








      festival:

        body.festival || "",





      muhurat:

        body.muhurat || "",








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








    const panchang =


      await (Panchang as any)

      .create(payload);









    return NextResponse.json(

      {


        success:true,


        message:

          "Panchang created successfully",


        data:panchang,


      },


      {


        status:201,


      }


    );






  }


  catch(error:any){



    console.error(

      "[PANCHANG_CREATE_ERROR]",

      error

    );







    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Panchang already exists",


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

          "Failed to create Panchang",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}