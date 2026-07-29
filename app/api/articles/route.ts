import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";


/* =====================================================
   UTILITIES
===================================================== */

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}


function generateExcerpt(content:string){

  const clean =
    stripHtml(content)
      .replace(/\s+/g," ")
      .trim();


  if(!clean) return "";


  const words =
    clean.split(" ");


  const excerpt =
    words.slice(0,35).join(" ");


  return excerpt.length < clean.length
    ? `${excerpt}...`
    : excerpt;

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




async function generateUniqueSlug(
  title:string,
  currentId?:string
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

          ...(currentId
            ?
            {
              NOT:{
                id:currentId
              }
            }
            :
            {})

        }

      });


    if(!existing) break;


    slug =
      `${baseSlug}-${counter++}`;

  }


  return slug;

}



/* =====================================================
   GET ARTICLES
===================================================== */

export async function GET(req:Request){

try{


const {searchParams}
=
new URL(req.url);



const page =
Math.max(
Number(searchParams.get("page")) || 1,
1
);



const limit =
Math.min(
Number(searchParams.get("limit")) || 20,
50
);



const status =
searchParams.get("status");


const search =
searchParams.get("search") || "";


const editorial =
searchParams.get("editorial");


const category =
searchParams.get("category");


const breaking =
searchParams.get("breaking");


const featured =
searchParams.get("featured");


const sort =
searchParams.get("sort") || "latest";


const lightweight =
searchParams.get("lightweight")
==="true";


const skip =
(page-1)*limit;



const where:any = {

isDeleted:false

};



if(status){

const value =
status.toLowerCase();


if(
Object.values(PostStatus)
.includes(
value as PostStatus
)
){

where.status=value;

}

}



if(search){

where.OR=[

{
title:{
contains:search,
mode:"insensitive"
}
},

{
excerpt:{
contains:search,
mode:"insensitive"
}
}

];

}




if(editorial==="true")
where.isEditorial=true;


if(editorial==="false")
where.isEditorial=false;




if(category){

where.category={

slug:category

};

}




if(breaking==="true"){

where.breaking=true;

where.breakingEnd={

gt:new Date()

};

}



if(breaking==="false"){

where.breaking=false;

}




if(featured==="true")
where.featured=true;


if(featured==="false")
where.featured=false;



let orderBy:any={

createdAt:"desc"

};



if(sort==="oldest"){

orderBy={

createdAt:"asc"

};

}



if(sort==="views"){

orderBy={

views:"desc"

};

}



if(sort==="featured"){

orderBy=[

{
homepagePriority:"desc"
},

{
createdAt:"desc"
}

];

}



const [
articles,
total
]
=
await Promise.all([


prisma.article.findMany({

where,


select:{


id:true,

title:true,

slug:true,

excerpt:true,

images:true,

videoUrl:true,

createdAt:true,

updatedAt:true,

views:true,


breaking:true,

breakingStart:true,

breakingEnd:true,

breakingPriority:true,


featured:true,

homepagePriority:true,


keyHighlights:true,

whyItMatters:true,

faqItems:true,

readingTime:true,


publishedAt:true,

status:true,

isEditorial:true,


category:
lightweight
?
undefined
:
{

select:{

id:true,

name:true,

slug:true

}

},


author:
lightweight
?
undefined
:
{

select:{

id:true,

name:true

}

}


},


orderBy,


skip,

take:limit


}),



prisma.article.count({

where

})


]);



return NextResponse.json({

success:true,

articles,

pagination:{

page,

limit,

totalArticles:total,

totalPages:
Math.ceil(
total/limit
)

}

});


}

catch(error){

console.error(
"GET ARTICLES ERROR:",
error
);


return NextResponse.json(

{

success:false,

error:"Failed to fetch articles"

},

{
status:500
}

);


}

}
/* =====================================================
   CREATE ARTICLE
===================================================== */

export async function POST(req:Request){

try{


const body =
await req.json();



const isEditorial =
Boolean(body.isEditorial);



if(!body.title?.trim()){

return NextResponse.json(

{
success:false,
error:"Title required"
},

{
status:400
}

);

}



if(!body.content?.trim()){

return NextResponse.json(

{
success:false,
error:"Content required"
},

{
status:400
}

);

}




if(
!isEditorial &&
!body.categoryId
){

return NextResponse.json(

{
success:false,
error:"Category required"
},

{
status:400
}

);

}




if(
body.categoryId &&
!isEditorial
){


const category =
await prisma.category.findUnique({

where:{
id:body.categoryId
}

});


if(!category){

return NextResponse.json(

{
success:false,
error:"Invalid category"
},

{
status:400
}

);

}

}




const slug =
await generateUniqueSlug(
body.title
);




let breakingStart:null|Date = null;

let breakingEnd:null|Date = null;



if(body.breaking){


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




let publishedAt:null|Date = null;



if(body.publishedAt){


const scheduleDate =
new Date(body.publishedAt);



if(
!isNaN(
scheduleDate.getTime()
)
){

publishedAt =
scheduleDate;

}

}




const images =
Array.isArray(body.images)

?

body.images
.filter(
(img:any)=>
typeof img==="string"
&&
img.trim()
)
.map(
(img:string)=>img.trim()
)

:

[];






let validStatus:
PostStatus =
PostStatus.pending;



if(body.status){

const value =
body.status.toLowerCase();


if(
Object.values(PostStatus)
.includes(
value as PostStatus
)
){

validStatus =
value as PostStatus;

}

}






const article =
await prisma.article.create({

data:{


title:
body.title.trim(),



slug,



content:
body.content,



excerpt:
body.excerpt ||
generateExcerpt(body.content),



images,



videoUrl:
body.videoUrl || null,




breaking:
Boolean(body.breaking),



breakingStart,



breakingEnd,




flash:
Boolean(body.flash),



featured:
Boolean(body.featured),




breakingPriority:
Number(body.breakingPriority)||0,



flashPriority:
Number(body.flashPriority)||0,



homepagePriority:
Number(body.homepagePriority)||0,





keyHighlights:

Array.isArray(body.keyHighlights)

?

body.keyHighlights
.filter(
(item:any)=>
typeof item==="string"
&&
item.trim()
)

:

[],





whyItMatters:

body.whyItMatters || null,





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

[],





readingTime:

body.readingTime

?

Number(body.readingTime)

:

calculateReadingTime(
body.content
),





publishedAt,





isEditorial,





status:
validStatus,





metaTitle:

body.metaTitle ||
body.title,




metaDescription:

body.metaDescription ||
generateExcerpt(body.content),




metaKeywords:

body.metaKeywords ||

body.title
.toLowerCase()
.split(" ")
.slice(0,10)
.join(","),





categoryId:

isEditorial

?

null

:

body.categoryId





},



include:{

category:true

}


});






return NextResponse.json({

success:true,

id:article.id,

slug:article.slug,

category:article.category

});



}

catch(error:any){


console.error(
"CREATE ARTICLE ERROR:",
error
);



return NextResponse.json(

{

success:false,

error:
error?.message ||
"Server error"

},

{
status:500
}

);


}

}







/* =====================================================
   DELETE ARTICLE
===================================================== */

export async function DELETE(req:Request){

try{


const body =
await req.json();



if(!body.id){

return NextResponse.json(

{
success:false,
error:"ID required"
},

{
status:400
}

);

}




await prisma.article.delete({

where:{
id:body.id
}

});




return NextResponse.json({

success:true

});



}

catch(error:any){


console.error(
"DELETE ARTICLE ERROR:",
error
);



return NextResponse.json(

{

success:false,

error:
error?.message ||
"Delete failed"

},

{
status:500
}

);


}

}