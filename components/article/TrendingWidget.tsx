"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


interface TrendingArticle {

  id:string;

  title:string;

  slug:string;

  category?:{
    slug:string;
    name?:string;
  };

}



export default function TrendingWidget(){


const [articles,setArticles] = useState<TrendingArticle[]>([]);



useEffect(()=>{


async function loadTrending(){


try{


const res = await fetch("/api/trending");


const data = await res.json();


setArticles(
data?.articles || data || []
);


}

catch(error){

console.error(
"Trending fetch failed",
error
);

}


}


loadTrending();


},[]);





if(!articles.length){

return (

<p className="
text-sm
text-gray-500
">

Loading trending stories...

</p>

);

}





return (


<div>



<div

className="
mb-6
flex
items-center
justify-between
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
h-[2px]
w-8
bg-[#D4AF37]
"

/>


<h3

className="
text-xs
font-bold
uppercase
tracking-[0.35em]
text-[#111]
"

>

Trending

</h3>


</div>





<span

className="
flex
items-center
gap-2
rounded-full
border
border-red-200
bg-red-50
px-3
py-1
text-[10px]
font-bold
uppercase
tracking-widest
text-red-600
"

>


<span

className="
h-2
w-2
rounded-full
bg-red-500
animate-pulse
"

/>


Live


</span>



</div>







<div

className="
rounded-2xl
border
border-[#163C80]/15
bg-[#F8FAFC]
p-5
shadow-sm
"

>



<div

className="
divide-y
divide-[#163C80]/10
"

>


{

articles.slice(0,5).map((item,index)=>(


<Link

key={item.id}

href={`/${item.category?.slug}/${item.slug}`}

className="
group
flex
gap-4
py-4
first:pt-0
last:pb-0
"

>


<span

className="
font-serif
text-3xl
font-bold
leading-none
text-[#163C80]/20
transition
group-hover:text-[#D4AF37]
"

>

{
String(index+1)
.padStart(2,"0")
}

</span>





<div>


<p

className="
text-sm
font-serif
leading-relaxed
text-[#111]
transition
group-hover:text-[#163C80]
"

>

{item.title}

</p>



{
item.category?.name && (

<p

className="
mt-2
text-[10px]
uppercase
tracking-[0.2em]
text-gray-500
"

>

{item.category.name}

</p>

)

}



</div>



</Link>


))

}



</div>


</div>



</div>


);


}