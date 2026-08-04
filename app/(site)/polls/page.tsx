import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";


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








export const metadata: Metadata = {


metadataBase:
new URL(SITE_URL),



title:
"NationPath Polls | Public Opinion & Live Results",



description:

"Participate in NationPath public opinion polls, vote on important issues and explore live reader sentiment with real-time results.",



alternates:{

canonical:"/polls"

},



robots:{

index:true,

follow:true

},



keywords:[

"NationPath Polls",

"India Opinion Poll",

"Public Opinion",

"Live Poll Results",

"News Polls"

],





openGraph:{


type:"website",

url:
`${SITE_URL}/polls`,

siteName:
"NationPath India",



title:
"NationPath Polls | Public Opinion & Live Results",



description:

"Vote on important issues and discover what NationPath readers think.",



images:[

{

url:`${SITE_URL}/logo.png`,

width:1200,

height:630,

alt:"NationPath Polls"

}

]


},





twitter:{


card:"summary_large_image",


title:
"NationPath Polls | Public Opinion & Live Results",



description:

"Participate in NationPath opinion polls and view live results.",



images:[

`${SITE_URL}/logo.png`

]


}


};









interface PollOption {

id:string;

text:string;

votes:number;

percentage:number;

}







interface Poll {

id:string;

question:string;

category?:string|null;

totalVotes:number;

expiresAt:string;

options:PollOption[];

slug?:string|null;

}







interface PollResponse {

success:boolean;

poll:Poll|null;

archive:Poll[];

}









function publishedFilter(){


return {


OR:[

{

publishedAt:null

},


{

publishedAt:{

lte:new Date()

}

}


]


};


}











async function getPolls():Promise<PollResponse>{



try{



const baseUrl =

process.env.NEXT_PUBLIC_SITE_URL ||

"http://localhost:3000";






const res =
await fetch(

`${baseUrl}/api/polls`,

{

cache:"no-store"

}

);





if(!res.ok){


return {

success:false,

poll:null,

archive:[]

};

}





return await res.json();




}
catch(error){


console.error(

"Poll API error",

error

);



return {

success:false,

poll:null,

archive:[]

};


}



}











export default async function PollsPage(){





const [

pollData,

mostRead,

topStories


]=await Promise.all([



getPolls(),



prisma.article.findMany({


where:{


status:PostStatus.approved,

isDeleted:false,


...publishedFilter()


},


include:{


category:true


},


orderBy:{


views:"desc"


},


take:5


}),






prisma.article.findMany({


where:{


status:PostStatus.approved,

isDeleted:false,


...publishedFilter()


},


include:{


category:true


},


orderBy:{


createdAt:"desc"


},


take:5


})



]);







const activePoll =

pollData.poll;



const archive =

pollData.archive || [];













const breadcrumbSchema = {


"@context":"https://schema.org",


"@type":"BreadcrumbList",


itemListElement:[


{

"@type":"ListItem",

position:1,

name:"Home",

item:SITE_URL

},



{

"@type":"ListItem",

position:2,

name:"Polls",

item:`${SITE_URL}/polls`

}


]


};








const collectionSchema = {


"@context":"https://schema.org",


"@type":"CollectionPage",


name:"NationPath Polls",


description:

"Public opinion polls, surveys and reader sentiment from NationPath India.",


url:

`${SITE_URL}/polls`


};








return (

<>



<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify(

breadcrumbSchema

)

}}

/>





<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify(

collectionSchema

)

}}

/>







<main

className="
news-container
"

>









{/* TOP AD */}



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









{/* HEADER */}



<section

className="
mb-12
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
text-5xl
md:text-6xl
font-bold
text-[#163C80]
"

>

Polls

</h1>







<p

className="
mt-4
max-w-3xl
text-gray-600
text-lg
"

>

Vote on important national conversations
and discover what NationPath readers think.

</p>



</section>









<div

className="
grid
grid-cols-1
lg:grid-cols-12
gap-8
lg:gap-12
"

>








<div

className="
lg:col-span-8
space-y-14
"

>





{

activePoll ?



<PollExperience

poll={activePoll}

/>



:


<section

className="
border
p-10
text-center
"

>


<h2

className="
text-xl
font-bold
text-[#163C80]
"

>

No Active Poll

</h2>


</section>



}







</div>









<aside

className="
lg:col-span-4
space-y-6
lg:sticky
lg:top-24
h-fit
"

>


<TrendingTopics />



<WeatherWidget />



<TrendingNews />



<MostRead

articles={mostRead}

/>



<TopStories

articles={topStories}

/>





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



</aside>









</div>









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









<PollArchive

polls={archive}

/>









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