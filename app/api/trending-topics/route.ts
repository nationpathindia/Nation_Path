import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";


export async function GET(){


try{


const since =
new Date(
Date.now() -
24 * 60 * 60 * 1000
);




const articles =
await prisma.article.findMany({

where:{

status:PostStatus.approved,

isDeleted:false,

createdAt:{
gte:since
}

},


include:{

category:true

},


orderBy:{

views:"desc"

},


take:100


});





const topics:any={};





articles.forEach((article:any)=>{


const category =
article.category;


if(!category)

return;




const key =
category.slug;



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



});






const result =
Object.values(topics)
.sort(
(a:any,b:any)=>
b.score-a.score
)
.slice(0,6);






return NextResponse.json(result);



}
catch(error){


console.log(
"Trending Topic Error",
error
);



return NextResponse.json([]);

}


}