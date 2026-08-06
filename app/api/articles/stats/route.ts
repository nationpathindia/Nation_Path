import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";



export async function GET() {

  try {


    const now = new Date();



    const newsFilter = {

      isDeleted:false,

      isAstrology:false,

    };





    const [

      totalArticles,

      pendingArticles,

      approvedArticles,

      scheduledArticles,

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

        where:newsFilter

      }),







      // PENDING

      prisma.article.count({

        where:{

          ...newsFilter,

          status:PostStatus.pending

        }

      }),








      // LIVE / PUBLISHED

      // Approved articles whose publish date has arrived

      prisma.article.count({

        where:{

          ...newsFilter,

          status:PostStatus.approved,


          OR:[

            {

              publishedAt:null

            },

            {

              publishedAt:{

                lte:now

              }

            }

          ]

        }

      }),








      // SCHEDULED

      // Approved articles with future publish date

      prisma.article.count({

        where:{

          ...newsFilter,

          status:PostStatus.approved,


          publishedAt:{

            gt:now

          }

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








      // LIVE FLAG

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


        scheduledArticles,


        rejectedArticles,


        draftArticles,





        // CONTENT TYPES


        editorialArticles,


        featuredArticles,


        breakingArticles,


        liveArticles,





        // ANALYTICS


        totalViews:

          totalViews._sum.views ?? 0



      }


    });




  }

  catch(error:any){


    console.error(

      "ARTICLE STATS ERROR:",

      error

    );



    return NextResponse.json(

      {

        success:false,

        error:

          error?.message ||

          "Failed to fetch article stats"

      },

      {

        status:500

      }

    );


  }


}