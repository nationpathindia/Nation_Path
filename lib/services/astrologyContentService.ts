//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE CMS CONTENT SERVICE
//
// CMS FIRST HOROSCOPE EDITORIAL FETCH LAYER
//
// Responsibility:
//
// Horoscope CMS MongoDB
//          ↓
// Service Layer
//          ↓
// Horoscope API
//          ↓
// Premium Horoscope Experience
//
// Does NOT:
// - calculate astrology
// - modify Astro Engine
// - generate predictions
// - call AI
//
// Source:
// Horoscope CMS Model ONLY
//////////////////////////////////////////////////////////////


import Horoscope from "@/app/models/Horoscope";


import {
  connectMongoDB,
} from "@/lib/mongodb";





//////////////////////////////////////////////////////////////
// RESPONSE CONTRACT
//////////////////////////////////////////////////////////////

export interface AstrologyContentResult {


  headline?: string;


  prediction?: string;


  quote?: string;



  luckyNumber?: string;


  luckyColor?: string;


  luckyTime?: string;



  energy?: number;


  image?: string;





  experience?: {


    hero?: {


      title?: string;


      subtitle?: string;


      description?: string;


      image?: string;


    };



    insights?: Array<{


      category?: string;


      title?: string;


      content?: string;


    }>;



    remedy?: {


      title?: string;


      description?: string;


      steps?: string[];


    };


  };





  seoTitle?: string;


  seoDescription?: string;


}









//////////////////////////////////////////////////////////////
// GET HOROSCOPE CMS CONTENT
//////////////////////////////////////////////////////////////

export async function getAstrologyContent(


  zodiacSign:string,


  date:string


):Promise<AstrologyContentResult|null>{



try{



//////////////////////////////////////////////////////////////
// DATABASE
//////////////////////////////////////////////////////////////

await connectMongoDB();








//////////////////////////////////////////////////////////////
// NORMALIZATION
//////////////////////////////////////////////////////////////

const zodiac =

zodiacSign

.trim()

.toLowerCase();




const targetDate = new Date(date);


if(
  Number.isNaN(
    targetDate.getTime()
  )
){
  return null;
}


const startOfDay = new Date(targetDate);

startOfDay.setUTCHours(
  0,
  0,
  0,
  0
);


const endOfDay = new Date(targetDate);

endOfDay.setUTCHours(
  23,
  59,
  59,
  999
);



if(

!zodiac ||

Number.isNaN(

targetDate.getTime()

)

){

return null;

}









//////////////////////////////////////////////////////////////
// HOROSCOPE CMS QUERY
//
// Daily Horoscope
// Current Date Range
// All Editorial States
//////////////////////////////////////////////////////////////

const content = await Horoscope.findOne({



zodiac,



"meta.period":

"daily",




"meta.language":

"english",




"meta.startDate":

{

$lte: endOfDay

},



"meta.endDate":

{

$gte: startOfDay

},



"meta.status":

{
$in:[

"draft",

"approved",

"published"

]

}





})

.lean();









//////////////////////////////////////////////////////////////
// CMS NOT FOUND
//////////////////////////////////////////////////////////////

if(!content){


return null;


}










//////////////////////////////////////////////////////////////
// HOROSCOPE CMS → EXPERIENCE CONTRACT
//////////////////////////////////////////////////////////////

return {


headline:

content.editorial?.headline,





prediction:

content.editorial?.prediction,





quote:

content.editorial?.quote,







//////////////////////////////////////////////////////////////
// LUCK
//////////////////////////////////////////////////////////////

luckyNumber:

content.lucky?.number,



luckyColor:

content.lucky?.color,



luckyTime:

content.lucky?.time,









//////////////////////////////////////////////////////////////
// EXPERIENCE
//////////////////////////////////////////////////////////////

experience:{



hero:{


title:

content.hero?.title,


subtitle:

content.hero?.subtitle,


description:

content.hero?.description,


image:

content.hero?.image,


},



remedy:{


title:

content.remedy?.title,


description:

content.remedy?.guidance,


steps:

content.remedy?.practice

?

[

content.remedy.practice

]

:

[],



},



},







//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

seoTitle:

content.seo?.title,



seoDescription:

content.seo?.description,



};



}

catch(error){



console.error(

"[HOROSCOPE_CMS_SERVICE_ERROR]",

error

);



return null;



}



}