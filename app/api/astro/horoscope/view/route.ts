//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE VIEW TRACKER
//
// Responsibilities:
//
// 1. Count Horoscope Page Views
// 2. Update Live Reader Session
//
// Flow:
//
// Visitor Opens Horoscope
//        ↓
// View API
//        ↓
// Horoscope.analytics.views + 1
//        ↓
// HoroscopeViewSession lastActive update
//
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";


import {
  connectMongoDB
} from "@/lib/mongodb";


import Horoscope from "@/app/models/Horoscope";


import HoroscopeViewSession from "@/app/models/HoroscopeViewSession";



export const dynamic="force-dynamic";





export async function POST(
request:Request
){


try{


await connectMongoDB();



const body = await request.json();



const {

sessionId,

zodiac,

slug,

userId

}=body;



if(
!sessionId ||
!zodiac ||
!slug
){


return NextResponse.json(

{

success:false,

message:"Missing view information"

},

{

status:400

}

);


}





//////////////////////////////////////////////////////////////
//
// 1. INCREASE PAGE VIEW COUNT
//
//////////////////////////////////////////////////////////////


const horoscope =

await Horoscope.findOneAndUpdate(

{

zodiac,

slug

},

{

$inc:{

"analytics.views":1

}

},

{

new:true

}

);







//////////////////////////////////////////////////////////////
//
// 2. UPDATE LIVE SESSION
//
//////////////////////////////////////////////////////////////


const session =

await HoroscopeViewSession.findOneAndUpdate(

{

sessionId

},

{


zodiac,

slug,

lastActive:new Date(),


...(userId && {

userId

})


},


{

upsert:true,

new:true

}


);







return NextResponse.json(

{

success:true,

data:{


views:

horoscope?.analytics?.views || 0,


liveSession:{

sessionId:session.sessionId,

zodiac:session.zodiac,

lastActive:session.lastActive

}


}


}

);


}


catch(error){


console.error(

"NATIONPATH HOROSCOPE VIEW ERROR",

error

);



return NextResponse.json(

{

success:false,

message:"Horoscope view tracking failed"

},

{

status:500

}

);


}


}