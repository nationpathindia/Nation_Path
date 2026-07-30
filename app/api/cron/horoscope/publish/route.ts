import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Horoscope from "@/app/models/Horoscope";

export async function GET(request: Request) {
  const now = new Date();

  try {
    //////////////////////////////////////////////////////////////
    // CRON AUTHENTICATION
    //////////////////////////////////////////////////////////////

    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (
      !cronSecret ||
      authHeader !== `Bearer ${cronSecret}`
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized cron request",
        },
        {
          status: 401,
        }
      );
    }

    //////////////////////////////////////////////////////////////
    // DATABASE CONNECTION
    //////////////////////////////////////////////////////////////

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    //////////////////////////////////////////////////////////////
    // FIND ELIGIBLE SCHEDULED HOROSCOPES
    //////////////////////////////////////////////////////////////

    const scheduledHoroscopes = await Horoscope.find({
      "meta.status": "approved",
      "meta.scheduledAt": {
        $lte: now,
      },
      $or: [
        { "meta.publishedAt": { $exists: false } },
        { "meta.publishedAt": null },
      ],
    }).select("_id zodiac meta.period");

    if (!scheduledHoroscopes.length) {
      return NextResponse.json({
        success: true,
        message: "No scheduled horoscope found",
        published: 0,
        timestamp: now.toISOString(),
      });
    }

    //////////////////////////////////////////////////////////////
    // PUBLISH CONTENT (ATOMIC)
    //////////////////////////////////////////////////////////////

    let publishedCount = 0;

    for (const horoscope of scheduledHoroscopes) {
      const result = await Horoscope.updateOne(
        {
          _id: horoscope._id,
          "meta.status": "approved",
          "meta.scheduledAt": {
            $lte: now,
          },
          $or: [
            { "meta.publishedAt": { $exists: false } },
            { "meta.publishedAt": null },
          ],
        },
        {
          $set: {
            "meta.status": "published",
            "meta.publishedAt": now,
          },
        }
      );

      if (result.modifiedCount === 1) {
        publishedCount++;
      }
    }

    //////////////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
      message: "Scheduled horoscope publish completed",
      published: publishedCount,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Horoscope Publish Cron Failed", error);

    return NextResponse.json(
      {
        success: false,
        message: "Cron execution failed",
      },
      {
        status: 500,
      }
    );
  } finally {
    await mongoose.disconnect();
  }
}