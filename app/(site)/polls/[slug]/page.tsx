import { prisma } from "@/lib/prisma";

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import PollExperience 
from "@/components/polls/PollExperience";

import PollArchive 
from "@/components/polls/PollArchive";


import AdRenderer 
from "@/components/ads/AdRenderer";


import TrendingTopics 
from "@/components/sidebar/TrendingTopics";

import WeatherWidget 
from "@/components/sidebar/WeatherWidget";

import TrendingNews 
from "@/components/sidebar/TrendingNews";

import MostRead 
from "@/components/sidebar/MostRead";

import TopStories 
from "@/components/sidebar/TopStories";







const SITE_URL =
process.env.NEXT_PUBLIC_SITE_URL ||
"https://nationpathindia.com";








interface Props {

params:{
slug:string;
}

}







interface PollOption {

id:string;

text:string;

votes:number;

percentage:number;

}





interface Poll {

id:string;

question:string;

category:string|null;

totalVotes:number;

expiresAt:string;

options:PollOption[];

}









async function getPoll(slug:string){


try{


const poll =
await prisma.poll.findUnique({

where:{
slug
},

include:{
options:true
}

});



if(!poll)
return null;





return {

id:poll.id,


question:poll.question,


category:poll.category,


totalVotes:poll.totalVotes,


expiresAt:

poll.expiresAt?.toISOString()
||
new Date().toISOString(),




options:

poll.options.map((option)=>({


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



}))



};



}
catch(error){


console.error(
"Poll detail fetch error",
error
);


return null;


}



}









export async function generateMetadata(
{
params
}:Props

):Promise<Metadata>{



const poll =
await getPoll(params.slug);




if(!poll){


return {


title:
"Poll Not Found | NationPath"


};


}







return {


metadataBase:
new URL(SITE_URL),



title:

`${poll.question} | NationPath Polls`,





description:

`Participate in NationPath opinion poll. Vote, explore public sentiment and see live reader results.`,






alternates:{


canonical:

`/polls/${params.slug}`


},





openGraph:{


type:"article",


url:

`${SITE_URL}/polls/${params.slug}`,



title:

poll.question,



description:

"NationPath public opinion poll and live reader sentiment.",




siteName:

"Nation Path India"



},





twitter:{


card:

"summary_large_image",



title:

poll.question,



description:

"Vote in NationPath public opinion poll."

}



};



}









function formatArchivePoll(item:any){



return {


id:item.id,


question:item.question,


category:item.category,



totalVotes:item.totalVotes,



expiresAt:

item.expiresAt?.toISOString()
||
new Date().toISOString(),



options:

item.options.map((option:any)=>({


id:option.id,


text:option.text,


votes:option.votes,



percentage:


item.totalVotes > 0

?

Math.round(

(option.votes /
item.totalVotes)
*
100

)

:

0


}))



};



}









export default async function PollDetailPage(
{
params
}:Props

){



const poll =
await getPoll(params.slug);



if(!poll){

notFound();

}






const archivePolls =

await prisma.poll.findMany({

where:{


status:"archived",


id:{
not:poll.id
}

},


include:{


options:true

},



orderBy:{


createdAt:"desc"

},


take:6


});





const archiveFormatted =

archivePolls.map(formatArchivePoll);







const schema = {


"@context":"https://schema.org",



"@graph":[



{


"@type":"BreadcrumbList",



"itemListElement":[



{


"@type":"ListItem",


"position":1,


"name":"Home",


"item":SITE_URL



},



{


"@type":"ListItem",


"position":2,


"name":"Polls",


"item":

`${SITE_URL}/polls`


},




{


"@type":"ListItem",


"position":3,


"name":poll.question,


"item":

`${SITE_URL}/polls/${params.slug}`


}



]

},






{


"@type":"Question",


"name":poll.question,



"interactionStatistic":{


"@type":"InteractionCounter",


"interactionType":

"https://schema.org/InteractionCounter",



"userInteractionCount":

poll.totalVotes



}



},







{


"@type":"WebPage",


"name":

poll.question,


url:

`${SITE_URL}/polls/${params.slug}`



}



]

};
return (

<>

<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:
JSON.stringify(schema)

}}

/>






<main

className="
news-container
min-h-screen
"

>






{/* ==================================================
    TOP AD
================================================== */}



<div

className="
flex
justify-center
mb-10
"

>

<AdRenderer

placement="homepage_top"

/>


</div>









{/* ==================================================
    MAIN GRID
================================================== */}



<div

className="
grid
grid-cols-1
lg:grid-cols-12
gap-8
lg:gap-12
"

>







{/* ================= LEFT ================= */}



<section

className="
lg:col-span-8
"

>






<div

className="
border-b
border-gray-200
pb-8
mb-10
"

>



<p

className="
text-xs
uppercase
tracking-[0.3em]
font-semibold
text-[#EA661B]
"

>

NationPath Opinion

</p>







<h1

className="
mt-3
text-3xl
md:text-5xl
font-bold
leading-tight
text-[#0B1220]
"

>

{poll.question}

</h1>








<div

className="
mt-5
flex
flex-wrap
gap-5
text-sm
text-gray-500
"

>


{

poll.category &&

<span

className="
uppercase
tracking-wide
"

>

{poll.category}

</span>

}



<span>

{poll.totalVotes.toLocaleString()} votes

</span>



<span>

Poll Results

</span>



</div>



</div>









<PollExperience

poll={poll}

/>









{/* MID AD */}



<div

className="
flex
justify-center
my-12
"

>


<AdRenderer

placement="homepage_mid"

/>


</div>









{/* ARCHIVE */}



<PollArchive

polls={archiveFormatted}

/>






</section>












{/* ================= SIDEBAR ================= */}



<aside

className="
lg:col-span-4
space-y-6
lg:sticky
lg:top-24
h-fit
"

>









{/* Opinion Box */}



<div

className="
border
border-gray-200
bg-white
p-6
"

>


<p

className="
text-xs
uppercase
tracking-[0.25em]
font-semibold
text-[#EA661B]
"

>

NationPath

</p>





<h3

className="
mt-3
text-xl
font-bold
text-[#0B1220]
"

>

Public Opinion

</h3>





<p

className="
mt-3
text-sm
leading-relaxed
text-gray-600
"

>

Participate in important conversations,
share your views and explore reader
sentiment across India.

</p>



</div>









{/* SIDEBAR AD */}



<div

className="
flex
justify-center
"

>


<AdRenderer

placement="homepage_sidebar_top"

/>


</div>











<TrendingTopics />









<WeatherWidget />









<TrendingNews />









<MostRead

articles={[]}

/>









<TopStories

articles={[]}

/>







</aside>








</div>












{/* ==================================================
    BOTTOM AD
================================================== */}



<div

className="
flex
justify-center
my-12
"

>


<AdRenderer

placement="homepage_bottom"

/>


</div>








</main>


</>


);
}