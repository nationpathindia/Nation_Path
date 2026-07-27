//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CAREER REPORT GENERATOR
//////////////////////////////////////////////////////////////

import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";


import CareerIntelligenceModel from "@/app/models/CareerIntelligence";


import dbConnect from "@/lib/mongodb";





export interface CareerReportInput {

  horoscopeDate:
    Date | string;


  language?:
    | "english"
    | "hindi"
    | "nepali";

}





export async function generateCareerReport(

  input: CareerReportInput

) {


  //////////////////////////////////////////////////////
  // DATABASE CONNECTION
  //////////////////////////////////////////////////////

  const db =
    await dbConnect();

console.log(
  "CAREER GENERATOR HIT"
);

  console.log(
    "MONGO READY STATE:",
    db.connection.readyState
  );





  //////////////////////////////////////////////////////
  // HOROSCOPE ENGINE
  //////////////////////////////////////////////////////
console.time("HOROSCOPE GENERATION");


  const horoscope =
    await generateHoroscope({

      horoscopeDate:
        input.horoscopeDate,


      language:
        input.language,

    });
console.timeEnd("HOROSCOPE GENERATION");





  //////////////////////////////////////////////////////
  // CAREER INTELLIGENCE DATA
  //////////////////////////////////////////////////////
console.time("CAREER DB QUERY");
  const intelligence =
    await CareerIntelligenceModel.findOne({

      
      category:
        "career",


      status:
        "published",

    })
    .lean();

console.timeEnd("CAREER DB QUERY");


  //////////////////////////////////////////////////////
  // FINAL REPORT
  //////////////////////////////////////////////////////

  return {


    type:
      "career",



    horoscope,



    intelligence,



    generatedAt:
      new Date(),


  };


}