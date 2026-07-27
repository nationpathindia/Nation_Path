//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
// Admin Horoscope CRUD
//
// PUT    -> Update Horoscope CMS
// DELETE -> Remove Horoscope CMS
//
// Responsibility:
// Premium horoscope editorial management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
// - use AI logic
//////////////////////////////////////////////////////////////


import {
  NextRequest,
  NextResponse,
} from "next/server";


import mongoose from "mongoose";


import Horoscope from "@/app/models/Horoscope";


import {
  connectMongoDB,
} from "@/lib/mongodb";









//////////////////////////////////////////////////////////////
// PUT - UPDATE HOROSCOPE CMS
//////////////////////////////////////////////////////////////

export async function PUT(
  req: NextRequest,
  context:{
    params:Promise<{
      id:string;
    }>;
  }
){


try{


await connectMongoDB();





const {
  id,
}=

await context.params;







//////////////////////////////////////////////////////////////
// ID VALIDATION
//////////////////////////////////////////////////////////////

if(
!mongoose.Types.ObjectId.isValid(id)
){


return NextResponse.json(

{

success:false,

message:
"Invalid horoscope ID",

},

{
status:400,
}

);


}








const body =

await req.json();








if(
!body ||
Object.keys(body).length===0
){


return NextResponse.json(

{

success:false,

message:
"No update data provided",

},

{
status:400,
}

);


}









//////////////////////////////////////////////////////////////
// UPDATE DATA
//////////////////////////////////////////////////////////////

const updateData:any = {

...body,

};









//////////////////////////////////////////////////////////////
// NORMALIZE BASIC FIELDS
//////////////////////////////////////////////////////////////

if(body.zodiac){


updateData.zodiac =

String(body.zodiac)

.trim()

.toLowerCase();


}





if(body.slug){


updateData.slug =

String(body.slug)

.trim()

.toLowerCase();


}









//////////////////////////////////////////////////////////////
// STATUS CONTROL
//////////////////////////////////////////////////////////////

if(body.status){


updateData.status =

body.status === "published"

?

"published"

:

"draft";



}









//////////////////////////////////////////////////////////////
// UPDATE HOROSCOPE
//////////////////////////////////////////////////////////////

const updatedHoroscope =

await (Horoscope as any)

.findByIdAndUpdate(

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









if(!updatedHoroscope){


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

data:
updatedHoroscope,

},

{
status:200,
}

);



}



catch(error){


console.error(

"[HOROSCOPE_UPDATE_ERROR]",

error

);





return NextResponse.json(

{

success:false,

message:
"Failed to update horoscope",

},

{
status:500,
}

);



}



}












//////////////////////////////////////////////////////////////
// DELETE - REMOVE HOROSCOPE CMS
//////////////////////////////////////////////////////////////

export async function DELETE(
req:NextRequest,
context:{
params:Promise<{
id:string;
}>;
}
){


try{


await connectMongoDB();





const {
id,
}=

await context.params;








//////////////////////////////////////////////////////////////
// ID VALIDATION
//////////////////////////////////////////////////////////////

if(
!mongoose.Types.ObjectId.isValid(id)
){


return NextResponse.json(

{

success:false,

message:
"Invalid horoscope ID",

},

{
status:400,
}

);


}









//////////////////////////////////////////////////////////////
// DELETE DOCUMENT
//////////////////////////////////////////////////////////////

const deletedHoroscope =

await (Horoscope as any)

.findByIdAndDelete(id);









if(!deletedHoroscope){


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

data:
deletedHoroscope,

},

{
status:200,
}

);



}



catch(error){


console.error(

"[HOROSCOPE_DELETE_ERROR]",

error

);





return NextResponse.json(

{

success:false,

message:
"Failed to delete horoscope",

},

{
status:500,
}

);



}



}