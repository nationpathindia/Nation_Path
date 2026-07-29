import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  generateArticleSummary
} from "@/lib/article-ai/summary.generator";


export const dynamic = "force-dynamic";



interface Props {

  params: Promise<{

    id:string;

  }>;

}




export async function POST(
  req:Request,
  {
    params
  }:Props
){


try{


const {
  id
}=await params;



if(!id){

return NextResponse.json(

{
success:false,
error:"Article ID required"
},

{
status:400
}

);

}




const article =

await prisma.article.findUnique({

where:{

id

},

select:{

id:true,

title:true,

excerpt:true,

content:true

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







const summary =

generateArticleSummary({

title:article.title,

excerpt:article.excerpt,

content:article.content

});







await prisma.article.update({

where:{

id:article.id

},

data:{

aiSummary: {
  overview: summary.overview,
  impact: summary.impact,
  takeaway: summary.takeaway,
},

aiGenerated:true,


aiVersion:"v1",


generatedAt:new Date()


}


});







return NextResponse.json({

success:true,


summary


});





}

catch(error:any){


console.error(

"AI SUMMARY ERROR:",

error

);



return NextResponse.json(

{

success:false,

error:

error?.message ||

"Failed to generate summary"

},

{

status:500

}

);


}


}