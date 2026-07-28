//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS ADMIN API
//
// GET  -> List Horoscope CMS
// POST -> Create Horoscope CMS
//
// FINAL META CMS ARCHITECTURE
//
// Does NOT:
// - Calculate astrology
// - Use Swiss Ephemeris
// - Touch Prediction Engine
// - Generate AI content
//
// Responsibility:
// Pure CMS Content Management
//////////////////////////////////////////////////////////////


import {
  NextRequest,
  NextResponse,
} from "next/server";


import Horoscope from "@/app/models/Horoscope";


import {
  connectMongoDB,
} from "@/lib/mongodb";





export const dynamic = "force-dynamic";








//////////////////////////////////////////////////////////////
// GET HOROSCOPE CMS LIST
//////////////////////////////////////////////////////////////

export async function GET(

req:NextRequest

){


try{


await connectMongoDB();




const {
searchParams
}=new URL(req.url);




const status =
searchParams.get("status");



const zodiac =
searchParams.get("zodiac");



const period =
searchParams.get("period");



const limit =
Number(

searchParams.get("limit")
||
50

);






const filter:any = {};






if(status){

filter["meta.status"]=status;

}






if(zodiac){

filter.zodiac =

zodiac
.trim()
.toLowerCase();

}






if(period){

filter["meta.period"]=period;

}







const data =

await (Horoscope as any)

.find(filter)

.sort({

createdAt:-1,

})

.limit(limit)

.lean();








return NextResponse.json(

{

success:true,

count:data.length,

data,

},

{

status:200

}

);




}

catch(error){


console.error(

"[HOROSCOPE_ADMIN_GET_ERROR]",

error

);




return NextResponse.json(

{

success:false,

message:
"Failed to fetch horoscope CMS"

},

{

status:500

}

);



}


}









//////////////////////////////////////////////////////////////
// POST CREATE HOROSCOPE CMS
//////////////////////////////////////////////////////////////

export async function POST(

req:NextRequest

){


try{


await connectMongoDB();






const body =

await req.json();









//////////////////////////////////////////////////////////////
// BASIC VALIDATION
//////////////////////////////////////////////////////////////

if(

!body.zodiac ||

!body.slug

){


return NextResponse.json(

{

success:false,

message:
"Zodiac and slug are required"

},

{

status:400

}

);


}







const zodiac =

String(body.zodiac)

.trim()

.toLowerCase();






const slug =

String(body.slug)

.trim()

.toLowerCase();








//////////////////////////////////////////////////////////////
// META NORMALIZATION
//////////////////////////////////////////////////////////////

const meta = {


period:

body.meta?.period

||

"daily",



language:

body.meta?.language

||

"english",



status:

body.meta?.status

||

"draft",




startDate:

body.meta?.startDate

?

new Date(body.meta.startDate)

:

new Date(),




endDate:

body.meta?.endDate

?

new Date(body.meta.endDate)

:

new Date(),





publishedAt:

body.meta?.publishedAt

?

new Date(body.meta.publishedAt)

:

null,





scheduledAt:

body.meta?.scheduledAt

?

new Date(body.meta.scheduledAt)

:

null,





version:

body.meta?.version

||

"1.0",





priority:

Number(

body.meta?.priority

||

0

),






featured:{

homepage:

body.meta?.featured?.homepage

||

false,



trending:

body.meta?.featured?.trending

||

false,



seo:

body.meta?.featured?.seo

||

false,


}


};









//////////////////////////////////////////////////////////////
// DUPLICATE CHECK
//////////////////////////////////////////////////////////////

const existing =

await (Horoscope as any)

.findOne(

{


zodiac,


"meta.period":

meta.period,



"meta.language":

meta.language,


}

);







if(existing){


return NextResponse.json(

{

success:false,

message:
"Horoscope already exists for this zodiac period and language"

},

{

status:409

}

);


}










//////////////////////////////////////////////////////////////
// CREATE DOCUMENT
//////////////////////////////////////////////////////////////

const horoscope =

await (Horoscope as any)

.create(

{


...body,


zodiac,


slug,



meta,





createdBy:

body.createdBy

||

"admin",





updatedBy:

body.updatedBy

||

"admin",



}

);









return NextResponse.json(

{


success:true,


message:
"Horoscope created successfully",


data:horoscope,


},

{


status:201


}

);





}

catch(error){



console.error(

"[HOROSCOPE_CREATE_ERROR]",

error

);





return NextResponse.json(

{


success:false,


message:
"Failed to create horoscope CMS",



error:

error instanceof Error

?

error.message

:

"Unknown error"



},

{


status:500


}

);



}



}