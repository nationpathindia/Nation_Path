"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


interface AdType {

  id:string;

  type:
    | "image"
    | "adsense"
    | "script";

  imageUrl?:string;

  link?:string;

  adsenseCode?:string;

}



interface Props {

  placement:string;

}




declare global {

  interface Window {

    adsbygoogle:any[];

  }

}




export default function AdRenderer({

  placement,

}:Props){



const [ad,setAd] =
useState<AdType | null>(null);



const [visible,setVisible] =
useState(false);



const [loaded,setLoaded] =
useState(false);




const containerRef =
useRef<HTMLDivElement|null>(null);



const impressionSent =
useRef<string|null>(null);



const adsenseLoaded =
useRef(false);





/*
================================
SLOT HEIGHT
Prevent CLS
================================
*/


function slotHeight(){

if(
 placement.includes("top") ||
 placement.includes("header")
){

return "min-h-[90px]";

}


return "min-h-[250px]";


}








/*
================================
LAZY OBSERVER
================================
*/


useEffect(()=>{


const element =
containerRef.current;


if(!element)
return;



const observer =
new IntersectionObserver(

([entry])=>{


if(entry.isIntersecting){


setVisible(true);


observer.disconnect();


}


},

{

rootMargin:"300px",

threshold:0.1

}

);



observer.observe(element);



return()=>{

observer.disconnect();

};


},[]);









/*
================================
FETCH AD
================================
*/


useEffect(()=>{


if(
 !visible ||
 !placement
)

return;



const controller =
new AbortController();




async function loadAd(){


try{


const res =
await fetch(

`/api/ads/serve?placement=${encodeURIComponent(
placement
)}`,

{

signal:
controller.signal,

cache:"no-store"

}

);



const data =
await res.json();



if(
 data?.success &&
 data?.ad
){

setAd(data.ad);


}


}

catch(error:any){


if(
error?.name !== "AbortError"
){

console.error(
"Ad loading failed",
error
);

}


}

finally{


setLoaded(true);


}



}



loadAd();



return()=>{

controller.abort();

};



},[
visible,
placement
]);









/*
================================
REAL IMPRESSION
================================
*/


useEffect(()=>{


if(
 !ad?.id ||
 !containerRef.current
)

return;




const observer =
new IntersectionObserver(

([entry])=>{


if(
entry.isIntersecting &&
entry.intersectionRatio >= 0.5
){



setTimeout(()=>{


if(
impressionSent.current === ad.id
)

return;




fetch(
"/api/ads/impression",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
adId:ad.id
})

}

)
.catch(()=>{});



impressionSent.current =
ad.id;



},1000);



}


},

{

threshold:0.5

}

);



observer.observe(
containerRef.current
);



return()=>{

observer.disconnect();

};



},[
ad
]);









/*
================================
ADSENSE PUSH
================================
*/


useEffect(()=>{


if(
ad?.type !== "adsense"
)

return;



if(
adsenseLoaded.current
)

return;




try{


window.adsbygoogle =
window.adsbygoogle || [];



window.adsbygoogle.push({});



adsenseLoaded.current =
true;



}

catch{}



},[
ad
]);









async function handleClick(){


if(
!ad?.id
)

return;



try{


await fetch(
"/api/ads/click",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
adId:ad.id
})

}

);



if(ad.link){


window.open(
ad.link,
"_blank",
"noopener,noreferrer"
);


}


}

catch{}



}









return (

<div

ref={containerRef}

className={`
w-full
flex
justify-center
overflow-hidden
${slotHeight()}
`}

>


{

!loaded && (

<div
className="
w-full
max-w-[970px]
h-[90px]
"
/>

)

}




{

loaded && !ad && (

<div

className="
w-full
max-w-[970px]
h-[90px]
border
border-dashed
border-gray-300
bg-gray-50
rounded
flex
items-center
justify-center
text-gray-400
text-xs
tracking-[0.25em]
uppercase
"

>

Advertisement

</div>

)

}





{

ad?.type==="image" &&
ad.imageUrl && (


<button

type="button"

onClick={handleClick}

className="
block
max-w-full
"

>


<Image

src={ad.imageUrl}

alt="Advertisement"

width={970}

height={250}

loading="lazy"

className="
rounded
max-w-full
h-auto
"

/>


</button>


)

}







{

ad?.type==="adsense" &&
ad.adsenseCode && (


<div

className="
w-full
flex
justify-center
"

dangerouslySetInnerHTML={{

__html:
ad.adsenseCode

}}


/>


)

}





{

ad?.type==="script" &&
ad.adsenseCode && (


<div

className="w-full"

dangerouslySetInnerHTML={{

__html:
ad.adsenseCode

}}


/>


)

}



</div>


);


}