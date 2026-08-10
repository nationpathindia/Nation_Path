import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {


try {


const body = await req.json();


const { adId } = body;



if(!adId){

return NextResponse.json(

{
 success:false,
 message:"Ad ID missing"
},

{
 status:400
}

);

}





const result = await prisma.ad.updateMany({


where:{


id:adId,


status:"active"


},


data:{


views:{
 increment:1
}


}


});







if(result.count === 0){


return NextResponse.json(

{
 success:false
}

);


}







return NextResponse.json(

{
 success:true
}

);






}

catch(error){


console.error(

"Ad impression error:",

error

);



return NextResponse.json(

{
 success:false,
 message:"Impression failed"
},

{
 status:500
}

);


}


}