import { NextResponse } from "next/server";

import User from "@/app/models/User";
import Article from "@/app/models/Article";

export const dynamic = "force-dynamic";


export async function GET() {

  try {


    const reporters = await User.find({
      role: "reporter",
    })
    .select(
      "name email"
    );



    const data = await Promise.all(

      reporters.map(async (r) => {


        const articles = await Article.find({
          authorId: r._id,
        })
        .select("views");



        const totalViews = articles.reduce(
          (sum, a) =>
            sum + (a.views || 0),
          0
        );



        return {

          id: r._id.toString(),

          name: r.name,

          email: r.email,

          articles: articles.length,

          views: totalViews,

          avgViews: articles.length
            ? Math.round(
                totalViews / articles.length
              )
            : 0,

        };


      })

    );



    return NextResponse.json({

      success: true,

      reporters: data,

    });



  } catch (error) {


    console.error(
      "Reporter performance API error:",
      error
    );


    return NextResponse.json(
      {
        error:
          "Failed to load reporter performance",
      },
      {
        status: 500,
      }
    );

  }

}