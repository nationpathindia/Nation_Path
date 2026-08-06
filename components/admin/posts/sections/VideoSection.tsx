// components/admin/posts/sections/VideoSection.tsx

"use client";


import type {
  PostFormData
} from "../types";



interface Props {

  form:PostFormData;


  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;

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
      ?.split("?")[0]
      ||
      "";

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







export default function VideoSection({

  form,

  updateField

}:Props){



const videoId =
getYoutubeId(
  form.videoUrl
);



const embedUrl =

videoId

?

`https://www.youtube.com/embed/${videoId}`

:

"";






function handleUrl(
  value:string
){


  updateField(
    "videoUrl",
    value
  );



  const id =
  getYoutubeId(value);



  updateField(
    "videoEmbed",
    id
    ?
    `https://www.youtube.com/embed/${id}`
    :
    ""
  );



  updateField(
    "videoThumbnail",
    id
    ?
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    :
    ""
  );


}






function removeVideo(){


  updateField(
    "videoUrl",
    ""
  );


  updateField(
    "videoEmbed",
    ""
  );


  updateField(
    "videoThumbnail",
    ""
  );


  updateField(
    "videoTitle",
    ""
  );


}








return (

<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-5
"

>


<h2 className="font-semibold text-lg">

Video

</h2>







<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
text-white
"

placeholder="Paste YouTube URL"


value={form.videoUrl}


onChange={(e)=>

handleUrl(
  e.target.value
)

}


/>







<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
text-white
"

placeholder="Video Title (optional)"


value={
(form as any).videoTitle || ""
}


onChange={(e)=>

updateField(
  "videoTitle" as keyof PostFormData,
  e.target.value
)

}


/>







<select

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
text-white
"


value={form.videoPosition}


onChange={(e)=>

updateField(

"videoPosition",

e.target.value

)

}

>


<option value="top">
Top
</option>


<option value="middle">
Middle
</option>


<option value="bottom">
Bottom
</option>


</select>








{
videoId &&

<div

className="
mt-5
space-y-4
"

>


<h3 className="text-sm text-gray-400">

Video Preview

</h3>





<div

className="
aspect-video
rounded-xl
overflow-hidden
border
border-white/10
"

>


<iframe

src={embedUrl}

title="YouTube Preview"

className="
w-full
h-full
"

allowFullScreen

/>


</div>






<button

type="button"

onClick={removeVideo}

className="
bg-red-600
hover:bg-red-700
px-4
py-2
rounded-lg
text-sm
font-semibold
"

>

Remove Video

</button>





</div>

}



{
form.videoUrl && !videoId &&

<div

className="
text-red-400
text-sm
"

>

Invalid YouTube URL

</div>

}



</div>

);


}