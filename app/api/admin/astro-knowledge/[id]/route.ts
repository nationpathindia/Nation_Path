//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE CMS DYNAMIC API
//
// GET    -> Single knowledge article
// PUT    -> Update knowledge article
// DELETE -> Delete knowledge article
//
// Responsibility:
// Astrology educational content management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import { connectMongoDB } from "@/lib/mongodb";

import AstroKnowledge from "@/app/models/AstroKnowledge";



export const dynamic = "force-dynamic";









//////////////////////////////////////////////////////////////
// GET SINGLE KNOWLEDGE
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






    const knowledge =


      await (AstroKnowledge as any)

      .findById(id)

      .lean();







    if(!knowledge){


      return NextResponse.json(

        {


          success:false,


          message:

            "Knowledge article not found",


        },


        {


          status:404,


        }


      );


    }









    return NextResponse.json(

      {


        success:true,


        data:knowledge,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_KNOWLEDGE_SINGLE_GET_ERROR]",

      error

    );








    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to fetch knowledge article",


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
// UPDATE KNOWLEDGE
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









    if(body.title){


      body.title =


        String(body.title)

        .trim();


    }









    if(body.slug){


      body.slug =


        String(body.slug)

        .trim()

        .toLowerCase();


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


      await (AstroKnowledge as any)

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

            "Knowledge article not found",


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

          "Astro knowledge updated successfully",



        data:updated,


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_KNOWLEDGE_UPDATE_ERROR]",

      error

    );









    if(error.code === 11000){


      return NextResponse.json(

        {


          success:false,


          message:

            "Duplicate knowledge slug",


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

          "Failed to update astro knowledge",


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
// DELETE KNOWLEDGE
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


      await (AstroKnowledge as any)

      .findByIdAndDelete(id);









    if(!deleted){


      return NextResponse.json(

        {


          success:false,


          message:

            "Knowledge article not found",


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

          "Astro knowledge deleted successfully",


      }


    );



  }


  catch(error:any){



    console.error(

      "[ASTRO_KNOWLEDGE_DELETE_ERROR]",

      error

    );







    return NextResponse.json(

      {


        success:false,


        message:

          "Failed to delete astro knowledge",


        error:

          error.message,


      },


      {


        status:500,


      }


    );



  }


}