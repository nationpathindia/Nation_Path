import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";


export const revalidate = 300;



export async function GET(){


try{


const since = new Date(

Date.now() -

24 * 60 * 60 * 1000

);





const articles = await prisma.article.findMany({


where:{


status:PostStatus.approved,


isDeleted:false,


createdAt:{

gte:since

}


},



select:{


views:true,


category:{


select:{


slug:true,


name:true


}


}


},



orderBy:{


views:"desc"


},



take:50



});






const topics:any = {};





for(const article of articles){


const category = article.category;



if(!category)

continue;





const key = category.slug;



if(!topics[key]){


topics[key]={


id:key,


name:category.name,


slug:key,


articles:0,


score:0


};


}





topics[key].articles++;



topics[key].score +=


10 +

Math.floor(

(article.views || 0) / 100

);



}







const result = Object.values(topics)

.sort(

(a:any,b:any)=>

b.score - a.score

)

.slice(0,6);







return NextResponse.json(

result,

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

"Trending Topic Error",

error

);




return NextResponse.json(

[],

{

status:500

}

);



}


}