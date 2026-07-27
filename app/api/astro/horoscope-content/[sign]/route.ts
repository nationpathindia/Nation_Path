//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS API
//
// Source:
// MongoDB Horoscope Collection
//
// Does NOT:
// - Use Horoscope Engine
// - Generate prediction
// - Merge responses
// - Call AI
//////////////////////////////////////////////////////////////

import {
  NextRequest,
  NextResponse,
} from "next/server";


import connectDB from "@/lib/mongodb";


import Horoscope from "@/app/models/Horoscope";









//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface RouteContext {

  params: Promise<{

    sign:string;

  }>;

}









//////////////////////////////////////////////////////////////
// GET HOROSCOPE CONTENT BY ZODIAC SIGN
//////////////////////////////////////////////////////////////

export async function GET(

  request:NextRequest,

  context:RouteContext

){



try{



await connectDB();







const {

sign

}= await context.params;








if(!sign){



return NextResponse.json(

{

success:false,

message:

"Zodiac sign required",

},

{

status:400,

}

);



}









const slug =

String(sign)

.trim()

.toLowerCase();









//////////////////////////////////////////////////////////////
// FETCH CMS CONTENT
//////////////////////////////////////////////////////////////

const horoscope =

await (Horoscope as any)

.findOne(

{

slug,

status:"published",

}

)

.lean();









if(!horoscope){



return NextResponse.json(

{

success:false,

message:

"Horoscope content not found",

},

{

status:404,

}

);



}









return NextResponse.json(

{

success:true,

data:horoscope,

},

{

status:200,

}

);







}

catch(error:any){



console.error(

"[HOROSCOPE_CMS_API_ERROR]",

error

);







return NextResponse.json(

{

success:false,

message:

"Server error",

},

{

status:500,

}

);



}



}