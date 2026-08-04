import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";




/*
=====================================================
 SUBMIT POLL VOTE
=====================================================
*/


export async function POST(

req:Request,

context:{
params:{
id:string
}
}

){


try{


const pollId = context.params.id;



const body = await req.json();





if(!body.optionId){


return NextResponse.json({

success:false,

error:"Option required"

},{

status:400

});


}







const poll = await prisma.poll.findUnique({

where:{


id:pollId


},


include:{


options:true


}


});







if(!poll){


return NextResponse.json({

success:false,

error:"Poll not found"

},{

status:404

});


}







const now = new Date();






if(

poll.status !== "published"

||

!poll.expiresAt

||

poll.expiresAt <= now

){


return NextResponse.json({

success:false,

error:"Poll expired"

},{

status:400

});


}









const option = poll.options.find(

(item)=>

item.id === body.optionId

);






if(!option){


return NextResponse.json({

success:false,

error:"Invalid option"

},{

status:400

});


}







/*
=====================================================
 DUPLICATE CHECK
 IP BASED
=====================================================
*/


const forwarded =

req.headers.get(
"x-forwarded-for"
);



const ip =

forwarded

?

forwarded.split(",")[0]

:

"unknown";






const existingVote = await prisma.pollVote.findFirst({

where:{


pollId,


ip


}


});







if(existingVote){


return NextResponse.json({

success:false,

error:"You already voted"

},{

status:400

});


}









/*
=====================================================
 CREATE VOTE + UPDATE COUNTS
=====================================================
*/


await prisma.$transaction([




prisma.pollVote.create({


data:{


pollId,


optionId:body.optionId,


ip,


userAgent:

req.headers.get(
"user-agent"
)

||


null



}


}),






prisma.pollOption.update({


where:{


id:body.optionId


},


data:{


votes:{


increment:1


}


}


}),






prisma.poll.update({


where:{


id:pollId


},


data:{


totalVotes:{


increment:1


}


}


})





]);










const updatedPoll = await prisma.poll.findUnique({

where:{


id:pollId


},


include:{


options:true


}


});









const options =

updatedPoll?.options.map(

(item)=>(


{


id:item.id,


text:item.text,


votes:item.votes,


percentage:

updatedPoll.totalVotes > 0

?

Math.round(

(item.votes / updatedPoll.totalVotes)

*

100

)

:

0



}



)


);








return NextResponse.json({

success:true,


poll:{


id:updatedPoll?.id,


totalVotes:updatedPoll?.totalVotes,


options


}


});







}
catch(error:any){


console.error(

"VOTE POLL ERROR",

error

);



return NextResponse.json({

success:false,

error:error?.message || "Vote failed"


},{

status:500

});


}


}