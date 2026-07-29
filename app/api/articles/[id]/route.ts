// app/api/articles/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";


/* ================= UTIL ================= */

function stripHtml(html:string){

  return html?.replace(/<[^>]*>?/gm,"") || "";

}



function calculateReadingTime(content:string){

  const clean =
    stripHtml(content)
      .replace(/\s+/g," ")
      .trim();


  const words =
    clean
      ? clean.split(" ").length
      : 0;


  return Math.max(
    1,
    Math.ceil(words / 200)
  );

}




function generateExcerpt(content:string){

  const clean =
    stripHtml(content)
      .replace(/\s+/g," ")
      .trim();


  if(!clean)
    return "";


  const words =
    clean.split(" ");


  const excerpt =
    words.slice(0,35).join(" ");


  return excerpt.length < clean.length
    ? `${excerpt}...`
    : excerpt;

}






async function generateUniqueSlug(
 title:string,
 currentId:string
){

 const baseSlug =
 title
 .toLowerCase()
 .trim()
 .replace(/\s+/g,"-")
 .replace(/[^\w-]+/g,"");


 let slug = baseSlug;

 let counter = 1;



 while(true){


 const existing =
 await prisma.article.findFirst({

 where:{
 slug,
 NOT:{
 id:currentId
 }
 }

 });


 if(!existing)
 break;


 slug =
 `${baseSlug}-${counter++}`;


 }


 return slug;

}







/* ================= GET ================= */


export async function GET(
 req:Request,
 {params}:{params:{id:string}}
){

try{


const article =
await prisma.article.findUnique({

where:{
id:params.id
},

include:{

category:true,

author:true,

comments:true

}

});



if(!article){

return NextResponse.json(
{
success:false
},
{
status:404
}
);

}



return NextResponse.json({

success:true,

article,

breakingActive:
article.breaking &&
article.breakingEnd !== null &&
article.breakingEnd > new Date()

});


}

catch(error){


console.error(
"GET ARTICLE ERROR",
error
);


return NextResponse.json(
{
success:false
},
{
status:500
}
);


}

}









/* ================= PATCH ================= */


export async function PATCH(
req:Request,
{params}:{params:{id:string}}
){

try{


const body =
await req.json();


const existing =
await prisma.article.findUnique({

where:{
id:params.id
}

});



if(!existing){

return NextResponse.json(
{
success:false
},
{
status:404
}
);

}



let status =
existing.status;



if(
body.status &&
Object.values(PostStatus)
.includes(
body.status as PostStatus
)
){

status =
body.status;

}



const updated =
await prisma.article.update({

where:{
id:params.id
},


data:{


status,


publishedAt:

status === PostStatus.approved

?

new Date()

:

existing.publishedAt


}


});



return NextResponse.json({

success:true,

article:updated

});


}

catch(error){


console.error(
"PATCH ERROR",
error
);


return NextResponse.json(
{
success:false
},
{
status:500
}
);


}

}









/* ================= PUT ================= */


export async function PUT(
req:Request,
{params}:{params:{id:string}}
){

try{


const body =
await req.json();




const existing =
await prisma.article.findUnique({

where:{
id:params.id
}

});



if(!existing){

return NextResponse.json(
{
success:false
},
{
status:404
}
);

}





const content =
body.content ??
existing.content;






const slug =

body.title &&
body.title !== existing.title

?

await generateUniqueSlug(
body.title,
params.id
)

:

existing.slug;








const cleanImages =

Array.isArray(body.images)

?

body.images.filter(
(img:any)=>
typeof img==="string"
&&
img.trim()
)

:

existing.images;









let breakingStart =
existing.breakingStart;


let breakingEnd =
existing.breakingEnd;




if(body.breaking === true){


const duration =
Number(body.breakingDuration) || 60;



breakingStart =
new Date();



breakingEnd =
new Date(
Date.now()
+
duration * 60 * 1000
);


}



if(body.breaking === false){

breakingStart = null;

breakingEnd = null;

}








const updated =
await prisma.article.update({

where:{
id:params.id
},



data:{



title:

body.title ??
existing.title,



slug,



content,



excerpt:

body.excerpt ??
existing.excerpt ??
generateExcerpt(content),





images:
cleanImages,





videoUrl:

body.videoUrl ??
existing.videoUrl,







breaking:

body.breaking ??
existing.breaking,



breakingStart,


breakingEnd,





breakingPriority:

body.breakingPriority ??
existing.breakingPriority,






flash:

body.flash ??
existing.flash,



flashPriority:

body.flashPriority ??
existing.flashPriority,







featured:

body.featured ??
existing.featured,





homepagePriority:

body.homepagePriority ??
existing.homepagePriority,









keyHighlights:

Array.isArray(body.keyHighlights)

?

body.keyHighlights

:

existing.keyHighlights,








whyItMatters:

body.whyItMatters ??
existing.whyItMatters,








faqItems:

Array.isArray(body.faqItems)

?

body.faqItems
.filter(
(item:any)=>
item.question?.trim()
&&
item.answer?.trim()
)

.map(
(item:any)=>({

question:
item.question.trim(),

answer:
item.answer.trim()

})
)

:

existing.faqItems,








publishedAt:

body.publishedAt !== undefined

?

(
body.publishedAt
?
new Date(body.publishedAt)
:
null
)

:

existing.publishedAt,










readingTime:

body.readingTime

?

Number(body.readingTime)

:

existing.readingTime ??
calculateReadingTime(content),








status:

body.status ??
existing.status,







isEditorial:

body.isEditorial ??
existing.isEditorial,





isAstrology:

body.isAstrology ??
existing.isAstrology,







zodiacSign:

body.zodiacSign ??
existing.zodiacSign,







horoscopeDate:

body.horoscopeDate

?

new Date(body.horoscopeDate)

:

existing.horoscopeDate,









categoryId:

body.isEditorial ||
body.isAstrology

?

null

:

body.categoryId ??
existing.categoryId,











metaTitle:

body.metaTitle ??
existing.metaTitle ??
body.title,







metaDescription:

body.metaDescription ??
existing.metaDescription ??
generateExcerpt(content),





metaKeywords:

body.metaKeywords ??
existing.metaKeywords





}


});






return NextResponse.json({

success:true,

article:updated

});



}

catch(error:any){


console.error(
"UPDATE ERROR",
error
);



return NextResponse.json(

{

success:false,

error:
error?.message ||
"Update failed"

},

{
status:500
}

);


}

}









/* ================= DELETE ================= */


export async function DELETE(
req:Request,
{params}:{params:{id:string}}
){

try{


await prisma.article.delete({

where:{
id:params.id
}

});



return NextResponse.json({

success:true

});


}

catch(error){


console.error(
"DELETE ERROR",
error
);


return NextResponse.json(

{
success:false
},

{
status:500
}

);


}

}