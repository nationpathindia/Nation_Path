import mongoose from "mongoose";
import dotenv from "dotenv";
import Horoscope from "../app/models/Horoscope";

dotenv.config();


async function publishScheduledHoroscopes() {

  const now = new Date();


  try {

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }


    await mongoose.connect(process.env.MONGODB_URI);


    console.log("MongoDB Connected Successfully");

    console.log(
      "Scheduler Current Time:",
      now.toISOString()
    );


    const scheduledHoroscopes =
      await Horoscope.find({
        "meta.status": "approved",

        "meta.scheduledAt": {
          $lte: now,
        },
      })
      .select(
        "zodiac slug meta.status meta.scheduledAt meta.period"
      );


    console.log(
      `Scheduled Candidates Found: ${scheduledHoroscopes.length}`
    );


    if (!scheduledHoroscopes.length) {

      console.log(
        "No scheduled horoscope found"
      );

      return;
    }



    for (const horoscope of scheduledHoroscopes) {


      console.log(
        `Publishing: ${horoscope.zodiac} | ${horoscope.meta.period}`
      );


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


      console.log(
        `✅ ${horoscope.zodiac}-${horoscope.meta.period} published`
      );

    }



    console.log(
      "✅ Scheduled Horoscope Publish Completed"
    );



  } catch (error) {


    console.error(
      "❌ Scheduled Horoscope Publish Failed:",
      error
    );


    process.exitCode = 1;


  } finally {


    await mongoose.disconnect();

    console.log(
      "MongoDB Disconnected"
    );

  }

}



publishScheduledHoroscopes();