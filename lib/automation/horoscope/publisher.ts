//////////////////////////////////////////////////////////////
//
// NATIONPATH HOROSCOPE PUBLISHER
//
// CMS Publishing Layer
//
// Responsibility:
//
// Mapped Horoscope CMS Data
//          ↓
// IST Date Normalization
//          ↓
// Mongo Horoscope Collection
//          ↓
// Published Content
//
// Does NOT:
// - Generate content
// - Calculate astrology
// - Call AI
//
// Only CMS persistence + publish lifecycle.
//
//////////////////////////////////////////////////////////////


import Horoscope from "@/app/models/Horoscope";

import {
  connectMongoDB,
} from "@/lib/mongodb";





//////////////////////////////////////////////////////////////
// INDIA DATE RANGE
//
// Horoscope business date:
// Asia/Kolkata (IST)
//
// MongoDB stores UTC automatically
//
//////////////////////////////////////////////////////////////

function getIndianDayRange(
  date = new Date()
){


  const formatter =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:"Asia/Kolkata",
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
      }
    );



  const parts =
    formatter.formatToParts(date);



  const year =
    parts.find(
      p=>p.type==="year"
    )?.value;



  const month =
    parts.find(
      p=>p.type==="month"
    )?.value;



  const day =
    parts.find(
      p=>p.type==="day"
    )?.value;



  const start =
    new Date(
      `${year}-${month}-${day}T00:00:00+05:30`
    );



  const end =
    new Date(
      `${year}-${month}-${day}T23:59:59.999+05:30`
    );



  return {

    start,

    end,

  };

}





//////////////////////////////////////////////////////////////
// IST SLUG DATE
//
// Example:
// 2026-08-01
//
//////////////////////////////////////////////////////////////

function getIndianSlugDate(
  date = new Date()
){


  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:"Asia/Kolkata",
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
      }
    );



  return formatter.format(date);


}









//////////////////////////////////////////////////////////////
// PUBLISH HOROSCOPE
//////////////////////////////////////////////////////////////

export async function publishHoroscope(
  payload:any
){

  try {


    await connectMongoDB();



    const now = new Date();



    const {
      start,
      end,

    } = getIndianDayRange(now);



    const slugDate =
      getIndianSlugDate(now);





    console.log(

      "HOROSCOPE IST PUBLISH WINDOW",

      {

        start,

        end,

        slugDate,

      }

    );








    const horoscope =

  await Horoscope.findOneAndUpdate(

   {
      zodiac: payload.zodiac,
      slug: payload.slug,
      "meta.slugDate": slugDate,
      "meta.status": "published",
   },

  {

    ...payload,

    meta: {

      ...payload.meta,

      status: "published",

      startDate: start,

      endDate: end,

      slugDate,

      publishedAt: now,

      scheduledAt: now,

    },

  },

  {

    upsert: true,

    new: true,

    setDefaultsOnInsert: true,

  }

);



    console.log(

      "HOROSCOPE PUBLISHED",

      {


        zodiac:

          horoscope.zodiac,



        slug:

          horoscope.slug,



        startDate:

          horoscope.meta.startDate,



        endDate:

          horoscope.meta.endDate,



        slugDate:

          horoscope.meta.slugDate,


      }


    );






    return horoscope;



  }



  catch(error){


    console.error(

      "[HOROSCOPE_PUBLISH_ERROR]",

      error

    );



    throw error;


  }


}