import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";



export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      sign: string;
    };
  }
) {


  try {


    await connectMongoDB();



    const sign = params.sign
      .trim()
      .toLowerCase();



    console.log(
      "========== ZODIAC API DEBUG =========="
    );


    console.log(
      "REQUEST SIGN:",
      sign
    );



    //////////////////////////////////////////////////////////////
    // DATABASE CHECK
    //////////////////////////////////////////////////////////////


    const total = await (Zodiac as any)
      .countDocuments();


    console.log(
      "TOTAL ZODIAC DOCUMENTS:",
      total
    );



    const samples = await (Zodiac as any)
      .find({})
      .limit(5)
      .lean();



    console.log(
      "ZODIAC SAMPLE:",
      JSON.stringify(
        samples,
        null,
        2
      )
    );





    //////////////////////////////////////////////////////////////
    // SEARCH
    //////////////////////////////////////////////////////////////


    const zodiac = await (Zodiac as any)
      .findOne({

        $or:[

          {
            slug:{
              $regex:`^${sign}$`,
              $options:"i",
            }
          },


          {
            zodiac:{
              $regex:`^${sign}$`,
              $options:"i",
            }
          },

        ],

      })
      .lean();





    console.log(
      "FOUND ZODIAC:",
      zodiac
        ? {
            id:zodiac._id,
            slug:zodiac.slug,
            zodiac:zodiac.zodiac,
            status:zodiac.status,
          }
        : "NOT FOUND"
    );





    if(!zodiac){


      return NextResponse.json(

        {
          success:false,

          message:"Zodiac not found",

          debug:{
            requested:sign,
            totalDocuments:total,
          }

        },

        {
          status:404
        }

      );


    }






    return NextResponse.json({

      success:true,

      data:zodiac,

    });





  }
  catch(error:any){


    console.error(
      "ZODIAC API ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,

        message:error.message

      },

      {
        status:500
      }

    );


  }


}