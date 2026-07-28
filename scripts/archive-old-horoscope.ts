import mongoose from "mongoose";
import dotenv from "dotenv";
import Horoscope from "../app/models/Horoscope";

dotenv.config();


async function archiveOldHoroscopes() {

  const now = new Date();


  try {

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }


    await mongoose.connect(process.env.MONGODB_URI);


    console.log("MongoDB Connected Successfully");


    console.log(
      "Archive Current Time:",
      now.toISOString()
    );



    const oldPublishedHoroscopes =
      await Horoscope.find({

        "meta.status": "published",

        "meta.endDate": {
          $lt: now,
        },

      })
      .select(
        "zodiac slug meta.status meta.endDate meta.period"
      );



    console.log(
      `Archive Candidates Found: ${oldPublishedHoroscopes.length}`
    );



    if (!oldPublishedHoroscopes.length) {

      console.log(
        "No old published horoscope found"
      );

      return;
    }




    for (const horoscope of oldPublishedHoroscopes) {


      console.log(
        `Archiving: ${horoscope.zodiac} | ${horoscope.meta.period}`
      );



      await Horoscope.updateOne(

        {
          _id: horoscope._id,

          "meta.status": "published",
        },


        {
          $set: {

            "meta.status": "archived",

            "meta.archivedAt": now,

          },
        }

      );



      console.log(
        `✅ ${horoscope.zodiac}-${horoscope.meta.period} archived`
      );

    }




    console.log(
      "✅ Horoscope Archive Completed"
    );



  } catch (error) {


    console.error(
      "❌ Horoscope Archive Failed:",
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



archiveOldHoroscopes();