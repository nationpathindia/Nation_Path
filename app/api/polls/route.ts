import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";



/*
=====================================================
 POLL FORMATTER
=====================================================
*/


function formatPoll(poll:any){


const options =
poll.options.map((option:any)=>({


id:option.id,


text:option.text,


votes:option.votes,


percentage:

poll.totalVotes > 0

?

Math.round(

(option.votes /
poll.totalVotes)
*
100

)

:

0



}));





return {


id:poll.id,


question:poll.question,


category:poll.category,


totalVotes:poll.totalVotes,


expiresAt:poll.expiresAt,


slug:poll.slug || null,


options



};


}







/*
=====================================================
 GET POLLS

 Homepage
 Poll Page
 Archive

=====================================================
*/


export async function GET(){


try{


const now =
new Date();





/*
-----------------------------------------------------
 ACTIVE POLL
-----------------------------------------------------
*/


const activePoll =
await prisma.poll.findFirst({

where:{


status:"published",


publishedAt:{
lte:now
},


expiresAt:{
gt:now
}


},


include:{


options:true


},


orderBy:{


createdAt:"desc"


}


});








/*
-----------------------------------------------------
 ARCHIVE POLLS
-----------------------------------------------------
*/


const archivedPolls =
await prisma.poll.findMany({

where:{


OR:[


{

status:"archived"

},


{

expiresAt:{
lte:now
}

}


]


},


include:{


options:true


},


orderBy:{


createdAt:"desc"


},


take:50


});








return NextResponse.json({

success:true,



/*
 Homepage compatibility
*/

poll:

activePoll

?

formatPoll(activePoll)

:

null,




/*
 Poll archive
*/

archive:

archivedPolls.map(
formatPoll
)



});




}
catch(error:any){



console.error(

"GET POLLS ERROR",

error

);




return NextResponse.json({

success:false,


error:

error?.message ||
"Server error"


},{

status:500

});



}


}









/*
=====================================================
 CREATE POLL
 Admin
=====================================================
*/


export async function POST(
req:Request
){


try{


const body =
await req.json();





if(!body.question?.trim()){


return NextResponse.json({

success:false,

error:"Question required"


},{
status:400
});


}






if(
!Array.isArray(body.options)
||
body.options.length < 2
){


return NextResponse.json({

success:false,

error:"Minimum two options required"


},{
status:400
});


}







const options = body.options

.filter(
(item:any)=>
typeof item==="string"
&&
item.trim()
)

.map(
(item:string)=>
item.trim()
);







if(options.length < 2){


return NextResponse.json({

success:false,

error:"Valid options required"


},{
status:400
});


}








const publishedAt =

body.publishedAt

?

new Date(body.publishedAt)

:

new Date();






const expiresAt =

new Date(

publishedAt.getTime()

+

24 *
60 *
60 *
1000

);

const baseSlug =
createSlug(
body.question.trim()
);



let finalSlug = baseSlug;



const existingSlug =
await prisma.poll.findUnique({

where:{
slug:baseSlug
}

});



if(existingSlug){

finalSlug =
`${baseSlug}-${Date.now()}`;

}






const poll =
await prisma.poll.create({

data:{


question:
body.question.trim(),


slug:
finalSlug,


category:
body.category || null,


status:
body.status || "published",


publishedAt,


expiresAt,



options:{


create:

options.map(
(text:string)=>({

text

})

)


}



},



include:{


options:true


}



});






return NextResponse.json({

success:true,

poll


});



}
catch(error:any){


console.error(

"CREATE POLL ERROR",

error

);



return NextResponse.json({

success:false,

error:
error?.message ||
"Create failed"


},{
status:500
});


}


}









/*
=====================================================
 UPDATE POLL
 Admin
=====================================================
*/


export async function PATCH(
req:Request
){


try{


const body =
await req.json();





if(!body.id){


return NextResponse.json({

success:false,

error:"Poll ID required"


},{
status:400
});


}







const existing =
await prisma.poll.findUnique({

where:{
id:body.id
},


include:{
options:true
}


});







if(!existing){


return NextResponse.json({

success:false,

error:"Poll not found"


},{
status:404
});


}









const result =
await prisma.$transaction(async(tx)=>{



const updateData:any = {};





if(
typeof body.question==="string"
){


updateData.question =
body.question.trim();


}





if(
typeof body.category==="string"
){


updateData.category =
body.category;


}





if(
typeof body.status==="string"
){


updateData.status =
body.status;


}







if(body.publishedAt){


const date =
new Date(
body.publishedAt
);



if(!isNaN(date.getTime())){


updateData.publishedAt =
date;


updateData.expiresAt =

new Date(

date.getTime()

+

24 *
60 *
60 *
1000

);


}


}









await tx.poll.update({

where:{
id:body.id
},

data:updateData

});








if(
Array.isArray(body.options)
){



const cleanOptions =

body.options

.filter(
(item:any)=>
typeof item==="string"
&&
item.trim()
)

.map(
(item:string)=>
item.trim()
);







await tx.pollOption.deleteMany({

where:{

pollId:body.id

}

});






await tx.pollOption.createMany({

data:

cleanOptions.map(

(text:string)=>({

pollId:body.id,

text

})

)

});







await tx.poll.update({

where:{
id:body.id
},

data:{

totalVotes:0

}


});



}








return await tx.poll.findUnique({

where:{
id:body.id
},

include:{
options:true
}


});



});








return NextResponse.json({

success:true,

poll:result


});




}
catch(error:any){


console.error(

"UPDATE POLL ERROR",

error

);



return NextResponse.json({

success:false,


error:

error?.message ||
"Update failed"


},{
status:500
});


}


}









/*
=====================================================
 DELETE / ARCHIVE POLL
=====================================================
*/


export async function DELETE(
req:Request
){


try{


const body =
await req.json();





if(!body.id){


return NextResponse.json({

success:false,

error:"Poll ID required"


},{
status:400
});


}






await prisma.poll.update({

where:{

id:body.id

},


data:{


status:"archived"


}


});







return NextResponse.json({

success:true


});



}
catch(error:any){


console.error(

"DELETE POLL ERROR",

error

);



return NextResponse.json({

success:false,


error:

error?.message ||
"Delete failed"


},{
status:500
});


}


}