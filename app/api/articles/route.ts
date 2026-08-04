import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";


export const dynamic = "force-dynamic";





/* =====================================================
   UTILITIES
===================================================== */


function stripHtml(html:string){

  return html?.replace(/<[^>]*>?/gm,"") || "";

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
    words
      .slice(0,35)
      .join(" ");




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
            {}
          )


        }


      });





    if(!existing)
      break;





    slug =
      `${baseSlug}-${counter++}`;


  }





  return slug;


}









/* =====================================================
   IMAGE INTELLIGENCE
===================================================== */



type ImageGalleryItem = {

  url:string;

  alt:string;

  caption:string;

  isPrimary:boolean;

};








function normalizeImageGallery(
images:any
):ImageGalleryItem[]{



  if(
    !Array.isArray(images)
  ){

    return [];

  }





  const gallery =

    images

    .filter(
      (img:any)=>

        img

        &&
        typeof img.url==="string"

        &&
        img.url.trim()

    )

    .slice(0,5)

    .map(
      (img:any)=>({


        url:
        img.url.trim(),



        alt:

        img.alt?.trim()

        ||

        "NationPath Editorial Image",




        caption:

        img.caption?.trim()

        ||

        "",





        isPrimary:

        Boolean(
          img.isPrimary
        )


      })

    );







  if(
    gallery.length
    &&
    !gallery.some(
      img=>img.isPrimary
    )
  ){

    gallery[0].isPrimary=true;

  }







  if(
    gallery.filter(
      img=>img.isPrimary
    ).length > 1
  ){


    let found=false;


    gallery.forEach(
      img=>{


        if(
          img.isPrimary
        ){

          if(found){

            img.isPrimary=false;

          }
          else{

            found=true;

          }


        }


      }
    );


  }






  return gallery;


}









/* =====================================================
   GET ARTICLES
===================================================== */


export async function GET(req:Request){


try{


const {searchParams} =

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



const type =

searchParams.get("type");



const category =

searchParams.get("category");



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






if(editorial==="true"){

where.isEditorial=true;

}


if(editorial==="false"){

where.isEditorial=false;

}





if(type==="editorial"){

where.isEditorial=true;

}



if(type==="news"){

where.isEditorial=false;

where.isAstrology=false;

}



if(category){


where.category={

name:{

equals:category,

mode:"insensitive"

}

};


}







const [

articles,

total

]=

await Promise.all([


prisma.article.findMany({

where,

skip,

take:limit,


orderBy:{

createdAt:"desc"

},


include:{


category:true,

author:true


}


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

total,

totalPages:

Math.ceil(total/limit)


}


});



}
catch(error:any){


console.error(
"GET ARTICLES ERROR",
error
);



return NextResponse.json({

success:false,

error:
error.message || "Server error"

},{
status:500
});


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

Boolean(
body.isEditorial
);





if(!body.title?.trim()){


return NextResponse.json({

success:false,

error:"Title required"

},{
status:400
});


}






if(!body.content?.trim()){


return NextResponse.json({

success:false,

error:"Content required"

},{
status:400
});


}







if(
!isEditorial
&&
!body.categoryId
){


return NextResponse.json({

success:false,

error:"Category required"

},{
status:400
});


}








if(
body.categoryId
&&
!isEditorial
){



const category =

await prisma.category.findUnique({

where:{

id:body.categoryId

}

});




if(!category){


return NextResponse.json({

success:false,

error:"Invalid category"

},{
status:400
});


}


}









const slug =

await generateUniqueSlug(

body.title

);









/* =====================================================
   IMAGE INTELLIGENCE
===================================================== */



const imageGallery =

normalizeImageGallery(

body.imageGallery

);






const primaryImage =

imageGallery.find(

(img)=>

img.isPrimary

)

||

imageGallery[0];








/*

Backward compatibility

Old images:String[]

continues.

Primary image gets priority.

*/

const images =

primaryImage

?

[
primaryImage.url
]

:

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

(img:string)=>

img.trim()

)

:

[];













/* =====================================================
   BREAKING
===================================================== */


let breakingStart:null|Date=null;

let breakingEnd:null|Date=null;





if(body.breaking){


const duration =

Number(
body.breakingDuration
)
||
60;



breakingStart =

new Date();




breakingEnd =

new Date(

Date.now()

+

duration * 60 * 1000

);



}









/* =====================================================
   PUBLISH DATE
===================================================== */


let publishedAt:null|Date=null;





if(body.publishedAt){


const date =

new Date(
body.publishedAt
);




if(
!isNaN(
date.getTime()
)
){


publishedAt=date;


}



}









/* =====================================================
   STATUS
===================================================== */


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



/* BASIC */


title:

body.title.trim(),





slug,





content:

body.content,





excerpt:

body.excerpt

||

generateExcerpt(

body.content

),







/* IMAGE STORAGE */


images,





imageGallery:

imageGallery.length

?

imageGallery

:

undefined,








/* VIDEO */


videoUrl:

body.videoUrl || null,









/* FLAGS */


breaking:

Boolean(
body.breaking
),



breakingStart,



breakingEnd,



flash:

Boolean(
body.flash
),



featured:

Boolean(
body.featured
),



isEditorial,



isAstrology:

Boolean(
body.isAstrology
),






breakingPriority:

Number(
body.breakingPriority
)
||
0,



flashPriority:

Number(
body.flashPriority
)
||
0,



homepagePriority:

Number(
body.homepagePriority
)
||
0,







/* ARTICLE INTELLIGENCE */


keyHighlights:

Array.isArray(
body.keyHighlights
)

?

body.keyHighlights.filter(

(item:any)=>

typeof item==="string"

&&

item.trim()

)

:

[],







whyItMatters:

body.whyItMatters || null,



shortBrief:

body.shortBrief || null,



background:

body.background || null,



timeline:

body.timeline || null,



expertOpinion:

body.expertOpinion || null,



factCheck:

body.factCheck || null,



whatsNext:

body.whatsNext || null,







keyTakeaways:

Array.isArray(
body.keyTakeaways
)

?

body.keyTakeaways.filter(

(item:any)=>

typeof item==="string"

&&

item.trim()

)

:

[],







sourceDesk:

body.sourceDesk || null,









/* FAQ */


faqItems:

Array.isArray(
body.faqItems
)

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









/* SEO */


readingTime:

body.readingTime

?

Number(
body.readingTime
)

:

calculateReadingTime(

body.content

),






metaTitle:

body.metaTitle

||

body.title,






metaDescription:

body.metaDescription

||

generateExcerpt(

body.content

),






metaKeywords:

body.metaKeywords

||

body.title

.toLowerCase()

.split(" ")

.slice(0,10)

.join(","),









/* PUBLISH */


publishedAt,



status:

validStatus,



categoryId:

isEditorial

?

null

:

body.categoryId



},


include:{


category:true,

author:true


}



});

return NextResponse.json({

success:true,

article

});



}
catch(error:any){


console.error(
"CREATE ARTICLE ERROR",
error
);



return NextResponse.json({

success:false,

error:
error?.message || "Server error"


},{
status:500
});


}


}









/* =====================================================
   UPDATE ARTICLE STATUS / FLAGS
===================================================== */


export async function PATCH(req:Request){


try{


const body =

await req.json();





if(!body.id){


return NextResponse.json({

success:false,

error:"ID required"

},{
status:400
});


}








const updateData:any = {};










/* =====================================================
   IMAGE INTELLIGENCE UPDATE
===================================================== */


if(
Array.isArray(
body.imageGallery
)
){


const imageGallery =

normalizeImageGallery(

body.imageGallery

);




const primaryImage =

imageGallery.find(

(img)=>

img.isPrimary

)

||

imageGallery[0];





updateData.imageGallery =

imageGallery.length

?

imageGallery

:

undefined;





updateData.images =

primaryImage

?

[
primaryImage.url
]

:

[];


}









/* STATUS */


if(body.status){



const value =

body.status.toLowerCase();





if(

Object.values(PostStatus)

.includes(

value as PostStatus

)

){


updateData.status =

value;


}


}









/* FLAGS */


if(
typeof body.featured === "boolean"
){


updateData.featured =

body.featured;


}






if(
typeof body.breaking === "boolean"
){


updateData.breaking =

body.breaking;


}






if(
typeof body.flash === "boolean"
){


updateData.flash =

body.flash;


}









/* EDITORIAL */


if(
typeof body.isEditorial === "boolean"
){


updateData.isEditorial =

body.isEditorial;


}









/* SCHEDULE */


if(body.publishedAt){


const date =

new Date(
body.publishedAt
);




if(
!isNaN(
date.getTime()
)
){


updateData.publishedAt =

date;


}


}











const article =

await prisma.article.update({

where:{

id:body.id

},


data:updateData,


include:{


category:true,

author:true


}


});








return NextResponse.json({

success:true,

article


});





}
catch(error:any){


console.error(

"PATCH ARTICLE ERROR",

error

);



return NextResponse.json({

success:false,

error:

error?.message || "Update failed"


},{
status:500
});


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


return NextResponse.json({

success:false,

error:"ID required"


},{
status:400
});


}








await prisma.article.update({

where:{

id:body.id

},


data:{


isDeleted:true,


status:

PostStatus.archived


}


});








return NextResponse.json({

success:true

});






}
catch(error:any){


console.error(

"DELETE ARTICLE ERROR",

error

);





return NextResponse.json({

success:false,


error:

error?.message || "Delete failed"


},{
status:500
});


}


}
