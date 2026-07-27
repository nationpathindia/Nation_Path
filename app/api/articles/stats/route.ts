import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";


export async function GET() {

  try {


    const newsFilter = {

      isDeleted: false,

      isAstrology: false,

    };



    const [
      totalArticles,
      pendingArticles,
      approvedArticles,
      rejectedArticles,
      draftArticles,
      featuredArticles,
      breakingArticles,
      editorialArticles,
      liveArticles,
      totalViews
    ] = await Promise.all([


      // TOTAL NEWS
      prisma.article.count({
        where: newsFilter
      }),



      // PENDING
      prisma.article.count({

        where:{
          ...newsFilter,
          status:PostStatus.pending
        }

      }),



      // APPROVED
      prisma.article.count({

        where:{
          ...newsFilter,
          status:PostStatus.approved
        }

      }),



      // REJECTED
      prisma.article.count({

        where:{
          ...newsFilter,
          status:PostStatus.rejected
        }

      }),



      // DRAFT
      prisma.article.count({

        where:{
          ...newsFilter,
          status:PostStatus.draft
        }

      }),



      // FEATURED
      prisma.article.count({

        where:{
          ...newsFilter,
          featured:true
        }

      }),



      // BREAKING
      prisma.article.count({

        where:{
          ...newsFilter,
          breaking:true
        }

      }),



      // EDITORIAL
      prisma.article.count({

        where:{
          ...newsFilter,
          isEditorial:true
        }

      }),



      // LIVE NEWS
      prisma.article.count({

        where:{
          ...newsFilter,
          isLive:true
        }

      }),



      // TOTAL VIEWS
      prisma.article.aggregate({

        where:newsFilter,

        _sum:{
          views:true
        }

      })



    ]);




    return NextResponse.json({

      success:true,


      stats:{


        // MAIN

        totalArticles,


        pendingArticles,


        approvedArticles,


        rejectedArticles,


        draftArticles,



        // CONTENT TYPES

        editorialArticles,


        featuredArticles,


        breakingArticles,


        liveArticles,



        // ANALYTICS

        totalViews:
          totalViews._sum.views ?? 0,


      }


    });



  } catch(error){


    console.error(
      "ARTICLE STATS ERROR:",
      error
    );


    return NextResponse.json(

      {

        success:false,

        error:"Failed to fetch article stats",

      },

      {
        status:500
      }

    );


  }


}