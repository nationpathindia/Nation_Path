//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS ADMIN API
//
// GET  -> List Horoscope CMS
// POST -> Create Horoscope CMS
//
// FINAL CMS FIRST ARCHITECTURE
//
// Does NOT:
// - Calculate astrology
// - Use Swiss Ephemeris
// - Touch Prediction Engine
// - Generate AI content
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



const limit =
Number(
searchParams.get("limit") || 50
);






const filter:any = {};





if(status){

filter.status=status;

}





if(zodiac){

filter.zodiac =
zodiac
.trim()
.toLowerCase();

}





const data =

await (Horoscope as any)

.find(filter)

.sort({

createdAt:-1,

})

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
// DUPLICATE CHECK
//////////////////////////////////////////////////////////////

const existing = await (Horoscope as any).findOne(

{

$or:[

{
zodiac
},

{
slug
}

]

}

);





if(existing){


return NextResponse.json(

{


success:false,


message:
"Horoscope already exists"


},

{

status:409

}

);


}









//////////////////////////////////////////////////////////////
// SCHEDULE STATUS CONTROL
//////////////////////////////////////////////////////////////

let status = "draft";





const publishAt =

body.publishAt

?

new Date(body.publishAt)

:

null;





const expireAt =

body.expireAt

?

new Date(body.expireAt)

:

null;








if(

publishAt &&

publishAt > new Date()

){

status="scheduled";

}





else if(

body.status === "published"

){

status="published";

}






if(

expireAt &&

publishAt &&

expireAt <= publishAt

){


return NextResponse.json(

{


success:false,


message:
"Expire date must be after publish date"


},

{

status:400

}

);


}









//////////////////////////////////////////////////////////////
// CREATE DOCUMENT
//////////////////////////////////////////////////////////////

const horoscope = await (Horoscope as any).create(

{


...body,


zodiac,


slug,


status,


publishAt,


expireAt,



publishedAt:

status==="published"

?

new Date()

:

null,



createdBy:

body.createdBy || "admin",


updatedBy:

body.updatedBy || "admin",



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
"Failed to create horoscope CMS"


},

{

status:500

}

);



}



}