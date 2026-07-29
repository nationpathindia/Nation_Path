import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


/* =====================================================
   GET ACTIVE BREAKING NEWS

   Used by BreakingNewsBar

   Only returns:
   breaking = true
   AND
   breakingEnd > current time
===================================================== */

export async function GET() {

  try {

    const now = new Date();


    const breakingArticles =
      await prisma.article.findMany({

        where: {

          breaking: true,

          isDeleted: false,

          status: "approved",

          breakingEnd: {
            gt: now
          }

        },


        select: {

          id: true,

          title: true,

          slug: true,

          excerpt: true,

          images: true,

          breakingPriority: true,

          breakingStart: true,

          breakingEnd: true,

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

      success:true,

      breaking:breakingArticles

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

   Future:
   cache refresh / realtime trigger
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