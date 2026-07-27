"use client";

import {
  useEffect,
  useState
} from "react";


type BreakingArticle = {

  id:string;

  title:string;

  slug:string;

};





export default function BreakingNewsBar(){


const [
breaking,
setBreaking
] = useState<BreakingArticle[]>([]);



const [
loading,
setLoading
] = useState(true);






async function loadBreaking(){


try{


const res =
await fetch(
"/api/push-breaking",
{
cache:"no-store"
}
);



const data =
await res.json();




if(data.success){

setBreaking(
data.breaking || []
);

}


}

catch(error){


console.error(
"BREAKING BAR ERROR:",
error
);


}

finally{


setLoading(false);


}


}







useEffect(()=>{


loadBreaking();



const interval =
setInterval(
loadBreaking,
60000
);



return ()=>{

clearInterval(interval);

};


},[]);









const headlines =

loading

?

[
"Loading breaking news..."
]

:

breaking.length

?

breaking.map(
(item)=>item.title
)

:

[
"Latest news updates from NationPath India"
];







const ticker = [

...headlines,

...headlines

];







return (


<div


className="

relative

news-breaking

overflow-hidden

group

"


>







<div


className="

news-container

flex

items-center

h-9

md:h-10

relative

z-10

"


>










{/* BREAKING LABEL */}


<div


className="

flex

items-center

gap-2

bg-[var(--news-breaking-badge)]

px-2.5

py-1

rounded-sm

shrink-0

"


>


<span


className="

w-1.5

h-1.5

rounded-full

bg-white

animate-pulse

"


/>





<span


className="

text-[10px]

font-bold

uppercase

tracking-[0.18em]

text-white

"


>

Breaking

</span>




</div>












{/* TICKER */}


<div


className="

overflow-hidden

ml-3

flex-1

"


>



<div


className="

flex

whitespace-nowrap

animate-marquee

group-hover:[animation-play-state:paused]

"


>


{


ticker.map(

(item,index)=>(


<span


key={index}


className="

text-xs

md:text-sm

font-medium

text-[var(--news-breaking-text)]

mx-4

"


>


{item}





<span


className="

ml-4

text-[var(--news-breaking-dot)]

"


>

•

</span>




</span>


)


)


}



</div>



</div>








</div>







<style jsx>{`

.animate-marquee {

display:inline-flex;

width:max-content;

animation:

marquee 35s linear infinite;

}



@keyframes marquee {


from {

transform:

translateX(0);

}



to {

transform:

translateX(-50%);

}


}



`}</style>






</div>


);


}