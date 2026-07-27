import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


/* =========================
   SLUG GENERATOR
========================= */

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}



/* =========================
   GET ACTIVE CATEGORIES
========================= */

export async function GET() {

  try {

    const categories = await prisma.category.findMany({

      where: {
        status: "active",
      },

      orderBy: [
        {
          priority: "desc",
        },
        {
          name: "asc",
        },
      ],


      select: {

        id: true,

        name: true,

        slug: true,

        description: true,

        intelligenceLabel: true,

        color: true,

        status: true,

        priority: true,

        seoTitle: true,

        seoDescription: true,

        createdAt: true,

      }

    });


    return NextResponse.json({

      success: true,

      categories,

    });


  } catch (error) {


    console.error(
      "CATEGORY GET ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        error:"Failed to fetch categories"
      },

      {
        status:500
      }

    );

  }

}




/* =========================
   CREATE CATEGORY
========================= */

export async function POST(
  req:Request
) {


  try {


    const body = await req.json();



    const name =
      body?.name?.trim();



    if(!name){


      return NextResponse.json(

        {
          success:false,
          error:"Category name required"
        },

        {
          status:400
        }

      );

    }




    const slug =
      generateSlug(name);





    const existing =
      await prisma.category.findUnique({

        where:{
          slug
        }

      });





    if(existing){


      return NextResponse.json(

        {
          success:false,
          error:"Category already exists"
        },

        {
          status:409
        }

      );

    }





    const category =
      await prisma.category.create({


        data:{


          name,


          slug,


          description:
            body.description || null,



          intelligenceLabel:
            body.intelligenceLabel || null,



          color:
            body.color || null,



          priority:
            Number(body.priority) || 0,



          seoTitle:
            body.seoTitle || null,



          seoDescription:
            body.seoDescription || null,



          status:
            body.status || "active",


        },


        select:{


          id:true,

          name:true,

          slug:true,

          description:true,

          intelligenceLabel:true,

          color:true,

          priority:true,

          status:true,

          seoTitle:true,

          seoDescription:true,

          createdAt:true,


        }


      });





    return NextResponse.json({

      success:true,

      category,

    });




  } catch(error){



    console.error(
      "CATEGORY CREATE ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,
        error:"Failed to create category"
      },

      {
        status:500
      }

    );


  }


}