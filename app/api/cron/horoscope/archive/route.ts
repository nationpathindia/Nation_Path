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
    // FIND EXPIRED PUBLISHED HOROSCOPES
    //////////////////////////////////////////////////////////////

    const oldPublishedHoroscopes = await Horoscope.find({
      "meta.status": "published",
      "meta.endDate": {
        $lt: now,
      },
      $or: [
        { "meta.archivedAt": { $exists: false } },
        { "meta.archivedAt": null },
      ],
    }).select("_id zodiac meta.period");

    if (!oldPublishedHoroscopes.length) {
      return NextResponse.json({
        success: true,
        message: "No old published horoscope found",
        archived: 0,
        timestamp: now.toISOString(),
      });
    }

    //////////////////////////////////////////////////////////////
    // ARCHIVE CONTENT (ATOMIC)
    //////////////////////////////////////////////////////////////

    let archivedCount = 0;

    for (const horoscope of oldPublishedHoroscopes) {
      const result = await Horoscope.updateOne(
        {
          _id: horoscope._id,
          "meta.status": "published",
          "meta.endDate": {
            $lt: now,
          },
          $or: [
            { "meta.archivedAt": { $exists: false } },
            { "meta.archivedAt": null },
          ],
        },
        {
          $set: {
            "meta.status": "archived",
            "meta.archivedAt": now,
          },
        }
      );

      if (result.modifiedCount === 1) {
        archivedCount++;
      }
    }

    //////////////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
      message: "Horoscope archive completed",
      archived: archivedCount,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Horoscope Archive Cron Failed", error);

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