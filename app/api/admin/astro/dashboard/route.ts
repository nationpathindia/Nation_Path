//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO ADMIN DASHBOARD API
//
// CMS INTELLIGENCE CENTER
//
// Tracks:
//
// Horoscope CMS
// Automation
// Publishing
// Archive
// Analytics
// Page Views
// Live Visitors
// Future Intelligence
//
//////////////////////////////////////////////////////////////


import {
 NextResponse
} from "next/server";


import {
 connectMongoDB
} from "@/lib/mongodb";


import Horoscope from "@/app/models/Horoscope";

import AstroAutoLock from "@/app/models/AstroAutoLock";

import HoroscopeViewSession from "@/app/models/HoroscopeViewSession";



export const dynamic="force-dynamic";





export async function GET(){


try{


await connectMongoDB();



const now = new Date();



const today = new Date();

today.setHours(
0,
0,
0,
0
);



const threeDaysAgo = new Date();

threeDaysAgo.setDate(
threeDaysAgo.getDate()-3
);





//////////////////////////////////////////////////////////////
//
// CMS COUNTS
//
//////////////////////////////////////////////////////////////


const [

totalContent,

published,

draft,

review,

approved,

archived,

publishedToday

]=await Promise.all([


Horoscope.countDocuments({}),


Horoscope.countDocuments({

"meta.status":"published"

}),


Horoscope.countDocuments({

"meta.status":"draft"

}),


Horoscope.countDocuments({

"meta.status":"review"

}),


Horoscope.countDocuments({

"meta.status":"approved"

}),


Horoscope.countDocuments({

"meta.status":"archived"

}),


Horoscope.countDocuments({

"meta.status":"published",

"meta.publishedAt":{

$gte:today

}

})

]);







//////////////////////////////////////////////////////////////
//
// AUTOMATION
//
//////////////////////////////////////////////////////////////


const automationLock:any =

await AstroAutoLock.findOne({

expiresAt:{

$gt:now

}

})
.lean();








//////////////////////////////////////////////////////////////
//
// TODAY COVERAGE
//
//////////////////////////////////////////////////////////////


const liveToday =

await Horoscope.find({

"meta.status":"published",

"meta.period":"daily",

"meta.publishedAt":{

$gte:today

}

})

.select({

zodiac:1,

slug:1,

analytics:1,

meta:1

})

.lean();





const zodiacSigns=[

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
"pisces"

];





const liveMap:any={};



liveToday.forEach((item:any)=>{

liveMap[item.zodiac]=item;

});





const zodiacStatus = zodiacSigns.map(sign=>{


const item = liveMap[sign];


return {

zodiac:sign,

published:Boolean(item),

views:item?.analytics?.views || 0,

publishedAt:item?.meta?.publishedAt || null

};


});









//////////////////////////////////////////////////////////////
//
// PAGE VIEW ANALYTICS
//
//////////////////////////////////////////////////////////////


const totalViewAgg =

await Horoscope.aggregate([

{

$group:{

_id:null,

views:{

$sum:{

$ifNull:[

"$analytics.views",

0

]

}

}

}

}

]);



const totalViews =

totalViewAgg?.[0]?.views || 0;








const todayViewAgg =

await Horoscope.aggregate([

{

$match:{

"meta.status":"published",

"meta.publishedAt":{

$gte:today

}

}

},


{

$group:{

_id:null,

views:{

$sum:{

$ifNull:[

"$analytics.views",

0

]

}

}

}

}

]);



const todayViews =

todayViewAgg?.[0]?.views || 0;









//////////////////////////////////////////////////////////////
//
// TOP VIEWED RASHIFAL
//
//////////////////////////////////////////////////////////////


const topViewed =

await Horoscope.find({

"meta.status":"published"

})

.sort({

"analytics.views":-1

})

.limit(5)

.select({

zodiac:1,

analytics:1,

meta:1

})

.lean();









//////////////////////////////////////////////////////////////
//
// RECENT GENERATED
//
//////////////////////////////////////////////////////////////


const recentGeneration =

await Horoscope.find({

createdAt:{

$gte:threeDaysAgo

}

})

.sort({

createdAt:-1

})

.limit(20)

.select({

zodiac:1,

slug:1,

createdAt:1

})

.lean();









//////////////////////////////////////////////////////////////
//
// RECENT PUBLISHED
//
//////////////////////////////////////////////////////////////


const recentPublished =

await Horoscope.find({

"meta.status":"published",

"meta.publishedAt":{

$gte:threeDaysAgo

}

})

.sort({

"meta.publishedAt":-1

})

.limit(20)

.select({

zodiac:1,

slug:1,

meta:1

})

.lean();









//////////////////////////////////////////////////////////////
//
// ARCHIVE HISTORY
//
//////////////////////////////////////////////////////////////


const archiveHistory =

await Horoscope.find({

"meta.status":"archived",

"meta.archivedAt":{

$gte:threeDaysAgo

}

})

.sort({

"meta.archivedAt":-1

})

.limit(50)

.select({

zodiac:1,

slug:1,

meta:1

})

.lean();









//////////////////////////////////////////////////////////////
//
// LIVE HOROSCOPE VISITORS
//
//////////////////////////////////////////////////////////////


const liveThreshold = new Date();


liveThreshold.setMinutes(

liveThreshold.getMinutes()-5

);



const liveSessions =

await HoroscopeViewSession.find({

lastActive:{

$gte:liveThreshold

}

})

.select({

zodiac:1

})

.lean();





const liveMapCount:any={};



liveSessions.forEach((item:any)=>{


liveMapCount[item.zodiac] =

(liveMapCount[item.zodiac] || 0)+1;


});





const liveVisitors={


total:liveSessions.length,


byZodiac:Object.entries(liveMapCount)

.map(([zodiac,viewers])=>({

zodiac,

viewers

}))


};









//////////////////////////////////////////////////////////////
//
// RESPONSE
//
//////////////////////////////////////////////////////////////


return NextResponse.json({

success:true,


data:{



summary:{

totalContent,

published,

draft,

review,

approved,

archived,

publishedToday

},




automation:{

running:Boolean(automationLock),

expiresAt:

automationLock?.expiresAt || null

},




today:{

completed:liveToday.length,

total:12,

ready:

liveToday.length===12

},




zodiacStatus,




analytics:{

totalViews,

todayViews,

topViewed

},




liveVisitors,




recentPublished,



recentGeneration,



archiveHistory,





modules:{


horoscope:true,

zodiac:true,

panchang:false,

planet:false,

nakshatra:false,

lagna:false,

dasha:false,

dosha:false,

yoga:false,

compatibility:false,

career:false,

finance:false,

health:false,

birthChart:false


}



}


});


}


catch(error){


console.error(

"NATIONPATH ASTRO DASHBOARD ERROR",

error

);



return NextResponse.json({

success:false,

message:"Astro dashboard failed"

},{

status:500

});


}


}