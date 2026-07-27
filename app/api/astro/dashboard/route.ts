//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS DASHBOARD API
//
// GET
// Astro CMS statistics
//
// Provides:
// - Total astro content
// - Published
// - Draft
// - Horoscope coverage
// - Recent activity
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { PostStatus } from "@prisma/client";


export const dynamic = "force-dynamic";



const ZODIAC_SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];




export async function GET(){


try{


//////////////////////////////////////////////////////////////
// TOTAL ASTRO CONTENT
//////////////////////////////////////////////////////////////


const totalContent =
await prisma.article.count({

where:{
isAstrology:true
}

});





//////////////////////////////////////////////////////////////
// STATUS COUNTS
//////////////////////////////////////////////////////////////


const published =
await prisma.article.count({

where:{

isAstrology:true,

status:
PostStatus.approved

}

});




const drafts =
await prisma.article.count({

where:{

isAstrology:true,

status:
PostStatus.draft

}

});





const pending =
await prisma.article.count({

where:{

isAstrology:true,

status:
PostStatus.pending

}

});






//////////////////////////////////////////////////////////////
// RECENT CONTENT
//////////////////////////////////////////////////////////////


const recentAdded =
await prisma.article.findMany({

where:{
isAstrology:true
},

orderBy:{
createdAt:"desc"
},

take:5,


select:{

id:true,

title:true,

zodiacSign:true,

status:true,

createdAt:true

}


});





const recentlyUpdated =
await prisma.article.findMany({

where:{
isAstrology:true
},

orderBy:{
updatedAt:"desc"
},

take:5,


select:{

id:true,

title:true,

zodiacSign:true,

status:true,

updatedAt:true

}


});







//////////////////////////////////////////////////////////////
// TODAY HOROSCOPE COVERAGE
//////////////////////////////////////////////////////////////


const today =
new Date();


today.setHours(
0,
0,
0,
0
);



const tomorrow =
new Date(today);


tomorrow.setDate(
tomorrow.getDate()+1
);




const horoscopeArticles =
await prisma.article.findMany({

where:{

isAstrology:true,

horoscopeDate:{

gte:today,

lt:tomorrow

}

},


select:{

id:true,

zodiacSign:true,

status:true,

aiGenerated:true,

updatedAt:true,

publishedAt:true


}


});







const zodiac =
ZODIAC_SIGNS.map((slug)=>{


const article =
horoscopeArticles.find(
(item)=>
item.zodiacSign===slug
);



return {


slug,


articleId:
article?.id ?? null,


exists:
!!article,


status:
article?.status ?? "missing",


aiGenerated:
article?.aiGenerated ?? false,


updatedAt:
article?.updatedAt ?? null,


publishedAt:
article?.publishedAt ?? null,


};


});






//////////////////////////////////////////////////////////////
// MODULE SUMMARY
//////////////////////////////////////////////////////////////


const modules = [

"horoscope",

"zodiac",

"panchang",

"planet-intelligence",

"nakshatra-intelligence",

"house-intelligence",

"lagna-intelligence",

"dasha-intelligence",

"dosha-intelligence",

"yoga-intelligence",

"muhurat",

"remedy-intelligence",

"compatibility-intelligence",

"career-intelligence",

"education-intelligence",

"finance-intelligence",

"health-intelligence",

"business-intelligence",

"foreign-settlement-intelligence",

"birth-chart-interpretation",

"astro-templates",

"astro-faq",

];








return NextResponse.json({

success:true,


data:{


summary:{


totalContent,


published,


drafts,


pending,


activeModules:
modules.length


},



modules,



recentAdded,



recentlyUpdated,



horoscope:{


total:
ZODIAC_SIGNS.length,


completed:
zodiac.filter(
(z)=>z.exists
).length,


missing:
zodiac.filter(
(z)=>!z.exists
).length,


zodiac


}



},


message:
"Astro dashboard loaded successfully."


});





}catch(error){


console.error(
"ASTRO DASHBOARD API ERROR:",
error
);



return NextResponse.json(

{


success:false,


data:null,


message:
"Failed to load Astro dashboard."

},


{
status:500
}


);


}



}