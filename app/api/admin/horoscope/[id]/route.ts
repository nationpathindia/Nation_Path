//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS API
//
// SINGLE HOROSCOPE MANAGEMENT
//
// GET    -> Fetch single horoscope
// PUT    -> Update horoscope
// DELETE -> Remove horoscope
//
// CMS FIRST ARCHITECTURE
//
// Does NOT:
// - calculate astrology
// - run Swiss Ephemeris
// - generate prediction
// - touch engine
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
// TYPES
//////////////////////////////////////////////////////////////

interface RouteParams {

  params:{
    id:string;
  };

}









//////////////////////////////////////////////////////////////
// GET SINGLE HOROSCOPE
//////////////////////////////////////////////////////////////

export async function GET(

  req:NextRequest,

  {
    params
  }:RouteParams

){



try{


await connectMongoDB();





const id = params.id;





const horoscope =

await (Horoscope as any)

.findById(id)

.lean();







if(!horoscope){



return NextResponse.json(

{

success:false,

message:

"Horoscope not found",

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

}

);






}

catch(error:any){



console.error(

"[HOROSCOPE_GET_SINGLE_ERROR]",

error

);





return NextResponse.json(

{

success:false,

message:

"Failed to fetch horoscope",

},

{

status:500,

}

);



}



}









//////////////////////////////////////////////////////////////
// PUT UPDATE HOROSCOPE
//////////////////////////////////////////////////////////////

export async function PUT(

req:NextRequest,

{
params
}:RouteParams

){



try{


await connectMongoDB();





const id = params.id;





const body =

await req.json();








//////////////////////////////////////////////////////////////
// UPDATE PAYLOAD
//////////////////////////////////////////////////////////////

const updateData:any = {


...body,

updatedAt:

new Date(),


};








//////////////////////////////////////////////////////////////
// NORMALIZE
//////////////////////////////////////////////////////////////

if(updateData.zodiac){


updateData.zodiac =

String(updateData.zodiac)

.trim()

.toLowerCase();


}




if(updateData.slug){


updateData.slug =

String(updateData.slug)

.trim()

.toLowerCase();


}









//////////////////////////////////////////////////////////////
// UPDATE HOROSCOPE DOCUMENT
//////////////////////////////////////////////////////////////

const updated =

await (Horoscope as any).findByIdAndUpdate(

id,

{

$set:updateData,

},

{

new:true,

runValidators:true,

}

)

.lean();







//////////////////////////////////////////////////////////////
// UPDATE VALIDATION
//////////////////////////////////////////////////////////////

if(!updated){


return NextResponse.json(

{

success:false,

message:

"Horoscope not found",

},

{

status:404,

}

);


}







return NextResponse.json(

{

success:true,

message:

"Horoscope updated successfully",

data:updated,

}

);







}

catch(error:any){



console.error(

"[HOROSCOPE_UPDATE_ERROR]",

error

);





return NextResponse.json(

{

success:false,

message:

"Failed to update horoscope",

error:

process.env.NODE_ENV === "development"

?

error?.message

:

undefined,

},

{

status:500,

}

);



}



}









//////////////////////////////////////////////////////////////
// DELETE HOROSCOPE
//////////////////////////////////////////////////////////////

export async function DELETE(

req:NextRequest,

{
params
}:RouteParams

){



try{


await connectMongoDB();





const id = params.id;








const deleted =

await (Horoscope as any)

.findByIdAndDelete(id)

.lean();









if(!deleted){


return NextResponse.json(

{

success:false,

message:

"Horoscope not found",

},

{

status:404,

}

);


}








return NextResponse.json(

{

success:true,

message:

"Horoscope deleted successfully",

data:deleted,

}

);








}

catch(error:any){



console.error(

"[HOROSCOPE_DELETE_ERROR]",

error

);






return NextResponse.json(

{

success:false,

message:

"Failed to delete horoscope",

error:

process.env.NODE_ENV === "development"

?

error?.message

:

undefined,

},

{

status:500,

}

);



}



}