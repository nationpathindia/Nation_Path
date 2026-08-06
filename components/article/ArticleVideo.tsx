"use client";


import React from "react";



interface Props {

  url:string;

  title?:string;

}





function getYoutubeId(
  url:string
){

  if(!url)

  return "";



  try{


    const parsed =
    new URL(url);



    if(
      parsed.hostname.includes("youtu.be")
    ){

      return parsed.pathname
      .replace("/","")
      .split("?")[0];

    }




    if(
      parsed.pathname.includes("/shorts/")
    ){

      return parsed.pathname
      .split("/shorts/")[1]
      .split("?")[0];

    }




    if(
      parsed.hostname.includes("youtube.com")
    ){

      return (

        parsed.searchParams.get("v")

        ||

        parsed.pathname
        .split("/")
        .filter(Boolean)
        .pop()

        ||

        ""

      );

    }



    return "";

  }
  catch{

    return "";

  }


}







export default function ArticleVideo({

  url,

  title

}:Props){



const videoId =
getYoutubeId(url);





if(!videoId)

return null;






return (



<section

className="
my-10
space-y-4
"

>



{

title &&

<h3

className="
text-xl
font-semibold
text-gray-900
dark:text-white
"

>

{title}

</h3>

}




<div

className="
aspect-video
overflow-hidden
rounded-2xl
border
border-gray-200
bg-black
shadow-sm
"

>


<iframe


src={

`https://www.youtube.com/embed/${videoId}`

}



title={

title ||

"NationPath Video"

}



className="
w-full
h-full
"




allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"




allowFullScreen



loading="lazy"



/>


</div>





</section>



);


}