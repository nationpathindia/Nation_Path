"use client";

import React from "react";


interface VideoPreviewProps {

url:string;

}



function getEmbedUrl(url:string){

try{


const parsed =
new URL(url);



/*
================================================
YOUTUBE WATCH
https://youtube.com/watch?v=xxxx
================================================
*/

if(
parsed.hostname.includes("youtube.com")
){

const id =
parsed.searchParams.get("v");


if(id){

return `https://www.youtube.com/embed/${id}`;

}

}



/*
================================================
YOUTUBE SHORTS
https://youtube.com/shorts/xxxx
================================================
*/

if(
parsed.pathname.includes("/shorts/")
){


const id =
parsed.pathname.split("/shorts/")[1];


return `https://www.youtube.com/embed/${id}`;


}




/*
================================================
YOUTUBE EMBED
================================================
*/


if(
parsed.hostname.includes("youtu.be")
){


const id =
parsed.pathname.replace(
"/",
""
);


return `https://www.youtube.com/embed/${id}`;


}



return null;


}
catch{

return null;

}


}







export default function VideoPreview({

url

}:VideoPreviewProps){



if(!url){

return null;

}





const embedUrl =
getEmbedUrl(url);





if(!embedUrl){


return (

<div

className="
mt-5
rounded-xl
border
border-red-500/30
bg-red-500/10
p-4
text-red-300
"

>

Invalid video URL

</div>

);


}







return (

<div

className="
mt-6
rounded-2xl
overflow-hidden
border
border-white/10
bg-black
"

>


<div

className="
aspect-video
w-full
"

>


<iframe

src={embedUrl}

title="Video Preview"

className="
w-full
h-full
"

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

allowFullScreen

/>

</div>



</div>

);


}