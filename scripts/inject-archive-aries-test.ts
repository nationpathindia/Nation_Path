//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// TEST ARCHIVE HOROSCOPE INJECTOR
//
// PURPOSE:
// Create archived Aries horoscope
// for archive page testing
//
// CMS ONLY
//
//////////////////////////////////////////////////////////////

import "dotenv/config";

import mongoose from "mongoose";

import Horoscope from "../app/models/Horoscope";





async function connectMongoDB(){


const uri = process.env.MONGODB_URI;


if(!uri){

throw new Error(
"MONGODB_URI missing"
);

}


await mongoose.connect(uri);


console.log(
"MongoDB Connected Successfully"
);


}







async function injectArchive(){


try{


await connectMongoDB();





const archiveDate = new Date(
"2026-07-28T00:00:00.000Z"
);



const endDate = new Date(
"2026-07-28T23:59:59.999Z"
);







const doc = await Horoscope.create({



zodiac:"aries",



slug:"aries-daily-2026-07-28-archive",






meta:{


period:"daily",


language:"english",


status:"archived",


startDate:archiveDate,


endDate:endDate,


publishedAt:archiveDate,


archivedAt:new Date(),


slugDate:"2026-07-28",


version:"1.0",


contentVersion:1,


priority:1,


featured:{


homepage:false,


trending:false,


seo:true


}


},







hero:{


badge:"Historical Horoscope",


title:"Aries Daily Horoscope 28 July 2026",


subtitle:"Archive Test Content",


description:
"Historical Aries horoscope content for archive system testing."

},






editorial:{


headline:
"Aries Horoscope Archive Test",


overview:
"This is archived horoscope content created to verify NationPath Astro historical pages.",


prediction:
"Archive system verification successful."


},






life:{


career:
"Career archive insight test.",


love:
"Love archive insight test.",


finance:
"Finance archive insight test.",


health:
"Health archive insight test."

},






seo:{


title:
"Aries Horoscope 28 July 2026 | NationPath Astro Archive",


description:
"Read Aries historical horoscope for 28 July 2026 on NationPath Astro.",


keywords:[

"Aries Horoscope",

"Aries Archive",

"Daily Horoscope"

]


},






createdBy:"test",


updatedBy:"test"


});






console.log(
"✅ ARCHIVE TEST CREATED:",
doc.slug
);



}


catch(error){


console.error(
"❌ Archive Injection Failed",
error
);


}



finally{


await mongoose.disconnect();


}



}





injectArchive();