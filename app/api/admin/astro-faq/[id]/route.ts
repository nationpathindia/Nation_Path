//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS DYNAMIC API
//
// GET    -> Single FAQ
// PUT    -> Update FAQ
// DELETE -> Delete FAQ
//
// Responsibility:
// Astrology FAQ knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroFAQ from "@/app/models/AstroFAQ";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE FAQ
//////////////////////////////////////////////////////////////

export async function GET(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();





    const { id } = context.params;






    const faq =


      await (AstroFAQ as any)

      .findById(id)

      .lean();







    if(!faq){


      return NextResponse.json(

        {


          success:false,


          message:

            "FAQ not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        data:faq,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_FAQ_SINGLE_GET_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch FAQ",



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
// UPDATE FAQ
//////////////////////////////////////////////////////////////

export async function PUT(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();




    const { id } = context.params;






    const body =

      await req.json();









    if(body.question){


      body.question =


        String(body.question)

        .trim();


    }









    if(body.slug){


      body.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


    }









    if(body.answer){


      body.answer =


        String(body.answer)

        .trim();


    }









    if(body.status){


      body.status =


        body.status === "published"

        ?

        "published"

        :

        "draft";


    }









    const updated =


      await (AstroFAQ as any)

      .findByIdAndUpdate(


        id,


        {


          $set:body,


        },


        {


          new:true,


          runValidators:true,


        }


      );









    if(!updated){


      return NextResponse.json(

        {


          success:false,


          message:

            "FAQ not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json(

      {


        success:true,


        message:

          "FAQ updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_FAQ_UPDATE_ERROR]",

      error

    );








    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate FAQ slug",


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

          "Failed to update FAQ",



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
// DELETE FAQ
//////////////////////////////////////////////////////////////

export async function DELETE(

  req:NextRequest,

  context:{
    params:{
      id:string;
    }
  }

){


  try{


    await connectMongoDB();




    const { id } = context.params;








    const deleted =


      await (AstroFAQ as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

            "FAQ not found",


        },


        {


          status:404,


        }


      );


    }








    return NextResponse.json(

      {


        success:true,


        message:

          "FAQ deleted successfully",


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_FAQ_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete FAQ",



        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}