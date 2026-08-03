//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// TEST HOROSCOPE ARCHIVE SEED
//
// Purpose:
// Create archived horoscope entries for testing
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
// NO AI
//////////////////////////////////////////////////////////////
import "dotenv/config";


import {
  connectMongoDB,
} from "@/lib/mongodb";


import Horoscope from "@/app/models/Horoscope";





async function seedArchive(){



try{


await connectMongoDB();



console.log(
"CONNECTED MONGODB"
);





const archiveDate = new Date(
"2026-07-31T00:00:00.000Z"
);


const archiveEnd = new Date(
"2026-07-31T23:59:59.999Z"
);






const signs = [
"aries",
"taurus"
];







for(const zodiac of signs){



const result = await Horoscope.updateOne(

{

zodiac,


"meta.period":"daily",

"meta.language":"english"

},


{

$set:{


"meta.status":"archived",


"meta.archivedAt":

new Date(),



"meta.startDate":

archiveDate,



"meta.endDate":

archiveEnd,



"meta.slugDate":

"2026-07-31",



}


}

);







console.log(

"ARCHIVE UPDATED",

{

zodiac,

matched:

result.matchedCount,

modified:

result.modifiedCount

}

);


}







console.log(
"ARCHIVE SEED COMPLETED"
);



process.exit(0);



}


catch(error){



console.error(

"ARCHIVE SEED FAILED",

error

);



process.exit(1);



}



}




seedArchive();