import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


/* =====================================================
   GET BREAKING NEWS
   Used by BreakingNewsBar
===================================================== */

export async function GET() {

  try {


    const breakingArticles =
      await prisma.article.findMany({

        where: {

          breaking: true,

          isDeleted: false,

          status: "approved"

        },


        select: {

          id: true,

          title: true,

          slug: true,

          breakingPriority: true,

          createdAt: true

        },


        orderBy: [

          {
            breakingPriority: "desc"
          },

          {
            createdAt: "desc"
          }

        ],


        take: 10

      });



    return NextResponse.json({

      success: true,

      breaking: breakingArticles

    });



  } catch(error) {


    console.error(
      "PUSH BREAKING GET ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        error:"Failed to fetch breaking news"
      },

      {
        status:500
      }

    );


  }

}





/* =====================================================
   POST BREAKING REFRESH
   Future use:
   cache refresh / revalidation / realtime trigger
===================================================== */

export async function POST() {

  try {


    return NextResponse.json({

      success:true,

      message:
      "Breaking news refresh triggered"

    });



  } catch(error) {


    console.error(
      "PUSH BREAKING POST ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        error:"Breaking refresh failed"
      },

      {
        status:500
      }

    );


  }

}