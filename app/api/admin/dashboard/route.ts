import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {

try {


/* ================= TIME WINDOWS ================= */


const today = new Date();
today.setHours(0,0,0,0);


const weekAgo = new Date();
weekAgo.setDate(
  weekAgo.getDate() - 7
);


const day24 = new Date();
day24.setDate(
  day24.getDate() - 1
);



/*
  NEWS ONLY FILTER

  Astrology CMS is separate
*/

const newsFilter = {

  isDeleted:false,

  isAstrology:false,

};



/* ================= CORE STATS ================= */


const [

totalArticles,

pendingArticles,

drafts,

publishedToday,

weekArticles,

totalUsers,

totalComments,

activeAds


] = await Promise.all([



prisma.article.count({

where:newsFilter

}),



prisma.article.count({

where:{
...newsFilter,
status:"pending"
}

}),



prisma.article.count({

where:{
...newsFilter,
status:"draft"
}

}),




prisma.article.count({

where:{

...newsFilter,

status:"approved",

createdAt:{
gte:today
}

}

}),




prisma.article.count({

where:{

...newsFilter,

status:"approved",

createdAt:{
gte:weekAgo
}

}

}),



prisma.user.count(),



prisma.comment.count(),



prisma.ad.count({

where:{
status:"active"
}

})



]);




/* ================= VIEWS ================= */


const totalViewsAgg =
await prisma.article.aggregate({

where:newsFilter,

_sum:{
views:true
}

});


const totalViews =
totalViewsAgg._sum.views ?? 0;




/* ================= ADS ================= */


const [

adViewsAgg,

adClicksAgg


]=await Promise.all([


prisma.ad.aggregate({

_sum:{
views:true
}

}),



prisma.ad.aggregate({

_sum:{
clicks:true
}

})


]);



const adViews =
adViewsAgg._sum.views ?? 0;


const adClicks =
adClicksAgg._sum.clicks ?? 0;




/* ================= LATEST ================= */


const latest =
await prisma.article.findMany({

where:{

...newsFilter,

status:"approved"

},


orderBy:{
createdAt:"desc"
},


take:5,


select:{

id:true,

title:true,

views:true,

createdAt:true

}


});




/* ================= MOST VIEWED ================= */


const top =
await prisma.article.findMany({

where:{

...newsFilter,

status:"approved"

},


orderBy:{
views:"desc"
},


take:5,


select:{

id:true,

title:true,

views:true

}


});




/* ================= TRENDING ================= */


const trending =
await prisma.article.findMany({

where:{

...newsFilter,

status:"approved",

lastViewAt:{
gte:day24
}

},


orderBy:{

trendingScore:"desc"

},


take:5,


select:{

id:true,

title:true,

views:true,

trendingScore:true

}


});





/* ================= VIRAL ================= */


const viral =
await prisma.article.findMany({

where:{

...newsFilter,

status:"approved",

views:{
gt:500
}

},


orderBy:{
views:"desc"
},


take:5,


select:{

id:true,

title:true,

views:true

}


});






/* ================= ACTIVITY ================= */


const activityRaw =
await prisma.activityLog.findMany({

orderBy:{
createdAt:"desc"
},


take:10,


include:{

user:{

select:{

name:true,

email:true

}

}

}


});




const activity =
activityRaw.map((item)=>({

id:item.id,

title:item.action,

user:item.user?.name || "System",

time:item.createdAt.toLocaleDateString()

}));






/* ================= TRAFFIC CHART ================= */


const weekData =
await prisma.article.findMany({

where:{

...newsFilter,

createdAt:{
gte:weekAgo
}

},


select:{

createdAt:true,

views:true

}


});




const chartMap:any={};



weekData.forEach((article)=>{


const day =
new Date(article.createdAt)
.toLocaleDateString(
"en-US",
{
weekday:"short"
}
);



if(!chartMap[day])
chartMap[day]=0;



chartMap[day]+=article.views;


});



const chart =
Object.keys(chartMap)
.map(day=>({

day,

views:chartMap[day]

}));







/* ================= CATEGORY ================= */


const categories =
await prisma.category.findMany({

include:{

articles:{

where:{

...newsFilter,

status:"approved"

},

select:{
id:true
}

}

}


});




const categoriesChart =
categories
.map(category=>({

name:category.name,

count:category.articles.length

}))


.sort(
(a,b)=>b.count-a.count
)


.slice(0,6);






/* ================= RESPONSE ================= */


return NextResponse.json({


success:true,


stats:{


totalArticles,

pendingArticles,

totalUsers,

totalComments,

totalViews,

activeAds,

drafts,

publishedToday,

weekArticles,

adViews,

adClicks


},



latest,

top,

trending,

viral,

activity,

chart,

categories:categoriesChart



});



}
catch(error){


console.error(
"ADMIN DASHBOARD ERROR",
error
);



return NextResponse.json({

success:false,

error:"Dashboard failed"

},

{
status:500
}

);


}


}