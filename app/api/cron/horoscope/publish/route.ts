import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Horoscope from "@/app/models/Horoscope";


export async function GET() {

  const now = new Date();

  try {

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }


    await mongoose.connect(
      process.env.MONGODB_URI
    );


    const scheduledHoroscopes =
      await Horoscope.find({

        "meta.status": "approved",

        "meta.scheduledAt": {
          $lte: now,
        },

      })
      .select(
        "zodiac meta.period"
      );


    if (!scheduledHoroscopes.length) {

      return NextResponse.json({

        success: true,

        message:
          "No scheduled horoscope found",

        published: 0,

      });

    }



    let publishedCount = 0;



    for (const horoscope of scheduledHoroscopes) {


      await Horoscope.updateOne(

        {
          _id: horoscope._id,

          "meta.status": "approved",
        },


        {
          $set: {

            "meta.status": "published",

            "meta.publishedAt": now,

          },
        }

      );


      publishedCount++;


    }



    return NextResponse.json({

      success: true,

      message:
        "Scheduled horoscope publish completed",

      published: publishedCount,

      timestamp: now.toISOString(),

    });



  } catch (error) {


    console.error(
      "Horoscope Publish Cron Failed",
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:"Cron execution failed",
      },

      {
        status:500,
      }

    );


  } finally {

    await mongoose.disconnect();

  }

}