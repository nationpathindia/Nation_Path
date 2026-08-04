import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";



/* =====================================================
   UTILITIES
===================================================== */


function stripHtml(html:string){

  return (
    html?.replace(/<[^>]*>?/gm,"")
    ||
    ""
  );

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


  if(!clean){

    return "";

  }



  const words =
    clean.split(" ");



  const excerpt =
    words
      .slice(0,35)
      .join(" ");



  return excerpt.length < clean.length

    ?

    `${excerpt}...`

    :

    excerpt;

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



    if(!existing){

      break;

    }



    slug =
      `${baseSlug}-${counter++}`;


  }



  return slug;

}









/* =====================================================
   GET SINGLE ARTICLE
===================================================== */


export async function GET(
  req:Request,
  {
    params
  }:{
    params:{
      id:string
    }
  }
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

        success:false,

        error:"Article not found"

      },

      {

        status:404

      }

    );

  }







  return NextResponse.json({

    success:true,

    article

  });



}
catch(error:any){


  console.error(

    "GET ARTICLE ERROR",

    error

  );



  return NextResponse.json(

    {

      success:false,

      error:error.message

    },

    {

      status:500

    }

  );


}


}









/* =====================================================
   PATCH STATUS UPDATE
===================================================== */


export async function PATCH(
  req:Request,
  {
    params
  }:{
    params:{
      id:string
    }
  }
){



try{


  const body =
    await req.json();




  const updated =

    await prisma.article.update({


      where:{

        id:params.id

      },



      data:{


        status:


        Object.values(PostStatus)

        .includes(body.status)


        ?


        body.status


        :


        undefined



      }



    });






  return NextResponse.json({

    success:true,

    article:updated

  });




}
catch(error:any){


  console.error(

    "PATCH ARTICLE ERROR",

    error

  );



  return NextResponse.json({

    success:false,

    error:error.message

  },{


    status:500


  });



}


}
 
/* =====================================================
   PUT UPDATE ARTICLE
===================================================== */


export async function PUT(
  req:Request,
  {
    params
  }:{
    params:{
      id:string
    }
  }
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


    return NextResponse.json({

      success:false,

      error:"Article not found"


    },{

      status:404

    });


  }








/* =====================================================
   BASIC DATA
===================================================== */


const content =

body.content !== undefined

?

body.content

:

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









/* =====================================================
   IMAGES
===================================================== */


const cleanImages =


Array.isArray(body.images)


?


body.images.filter(

(img:any)=>

typeof img === "string"

&&

img.trim()

)


:


existing.images;







const cleanImageGallery =


Array.isArray(body.imageGallery)


?


body.imageGallery.filter(

(item:any)=>

item &&

typeof item.url === "string"

&&

item.url.trim()

)


:


existing.imageGallery;









/* =====================================================
   BREAKING LOGIC
===================================================== */


let breakingStart =
existing.breakingStart;


let breakingEnd =
existing.breakingEnd;






if(body.breaking === true){


const duration =

Number(body.breakingDuration)

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






if(body.breaking === false){


breakingStart = null;

breakingEnd = null;


}










/* =====================================================
   INTELLIGENCE DATA
===================================================== */



const normalizeArray = (value:any, fallback:any)=>{


if(Array.isArray(value)){

return value;

}



if(typeof value === "string"){


return value

.split("\n")

.map((x:string)=>x.trim())

.filter(Boolean);


}



return fallback;


};







const keyHighlights =

normalizeArray(

body.keyHighlights,

existing.keyHighlights

);







const keyTakeaways =

normalizeArray(

body.keyTakeaways,

existing.keyTakeaways

);








const timeline =


body.timeline !== undefined


?


body.timeline


:


existing.timeline;









const expertOpinion =


body.expertOpinion !== undefined


?


body.expertOpinion


:


existing.expertOpinion;







const factCheck =


body.factCheck !== undefined


?


body.factCheck


:


existing.factCheck;









const faqItems =


Array.isArray(body.faqItems)


?


body.faqItems.filter(

(item:any)=>

item.question?.trim()

&&

item.answer?.trim()

)


:


existing.faqItems;



 
const updated =

await prisma.article.update({


where:{

id:params.id

},



data:{







/* =====================================================
   BASIC ARTICLE
===================================================== */


title:

body.title

??

existing.title,




slug,




content,






excerpt:

body.excerpt

??

existing.excerpt

??

generateExcerpt(content),






/* =====================================================
   MEDIA
===================================================== */


images:

cleanImages,




imageGallery:

cleanImageGallery,




videoUrl:

body.videoUrl

??

existing.videoUrl,





videoPosition:

body.videoPosition

??

existing.videoPosition,











/* =====================================================
   NEWS CONTROLS
===================================================== */


breaking:

body.breaking

??

existing.breaking,




breakingStart,




breakingEnd,




breakingPriority:

body.breakingPriority

??

existing.breakingPriority,





featured:

body.featured

??

existing.featured,





homepagePriority:

body.homepagePriority

??

existing.homepagePriority,









/* =====================================================
   ARTICLE INTELLIGENCE
===================================================== */


shortBrief:

body.shortBrief

??

existing.shortBrief,






background:

body.background

??

existing.background,






timeline,






expertOpinion,






factCheck,







whatsNext:

body.whatsNext

??

existing.whatsNext,







keyHighlights,







keyTakeaways,







whyItMatters:

body.whyItMatters

??

existing.whyItMatters,








sourceDesk:

body.sourceDesk

??

existing.sourceDesk,











/* =====================================================
   FAQ
===================================================== */


faqItems,











/* =====================================================
   SEO
===================================================== */


readingTime:

body.readingTime !== undefined


?


Number(body.readingTime)


:


existing.readingTime

??

calculateReadingTime(content),







metaTitle:

body.metaTitle

??

existing.metaTitle

??

body.title,








metaDescription:

body.metaDescription

??

existing.metaDescription

??

generateExcerpt(content),








metaKeywords:

body.metaKeywords

??

existing.metaKeywords,












/* =====================================================
   PUBLISHING
===================================================== */


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








status:

body.status

??

existing.status,









/* =====================================================
   CATEGORY
===================================================== */


categoryId:

body.categoryId !== undefined


?


body.categoryId


:


existing.categoryId





}


});








return NextResponse.json({


success:true,


article:updated



});



 
}
catch(error:any){


console.error(

"UPDATE ARTICLE ERROR",

error

);




return NextResponse.json({

success:false,

error:

error.message

||

"Update failed"


},{

status:500

});



}


}









/* =====================================================
   DELETE ARTICLE
===================================================== */


export async function DELETE(
  req:Request,
  {
    params
  }:{
    params:{
      id:string
    }
  }
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
catch(error:any){


console.error(

"DELETE ARTICLE ERROR",

error

);





return NextResponse.json({


success:false,


error:

error.message

||

"Delete failed"



},{

status:500


});



}


}