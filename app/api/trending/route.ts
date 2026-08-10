import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";


export const revalidate = 300;



export async function GET() {


try {


const last24Hours =

new Date(

Date.now() -

24 * 60 * 60 * 1000

);






const trending = await prisma.article.findMany({


where:{


status:PostStatus.approved,


isDeleted:false,


lastViewAt:{

gte:last24Hours

}


},



orderBy:{


trendingScore:"desc"


},



take:10,



select:{


id:true,


title:true,


slug:true,


images:true,


views:true,


trendingScore:true,


createdAt:true,



category:{


select:{


id:true,


name:true,


slug:true


}


}


}


});






return NextResponse.json(


{

success:true,

articles:trending

},


{


headers:{


"Cache-Control":

"public, s-maxage=300, stale-while-revalidate=600"


}


}



);




}

catch(error){


console.error(

"TRENDING API ERROR:",

error

);



return NextResponse.json(

{

success:false,

error:"Failed to fetch trending articles"

},

{

status:500

}

);


}


}