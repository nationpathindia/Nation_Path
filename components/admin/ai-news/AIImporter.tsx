"use client";

import {
  useMemo,
  useState
} from "react";


interface Props {

  onGenerated?:
  (article:any)=>void;

}





export default function AIImporter({

  onGenerated

}:Props){



const [rawNews,setRawNews] =
useState("");



const [loading,setLoading] =
useState(false);



const [error,setError] =
useState("");



const [validation,setValidation] =
useState<any>(null);



const [progress,setProgress] =
useState(0);



const [lastGenerated,setLastGenerated] =
useState(false);





const characterCount =
rawNews.length;



const wordCount =
useMemo(()=>{

if(!rawNews.trim())
return 0;


return rawNews
.trim()
.split(/\s+/)
.length;


},[rawNews]);





const readingTime =
Math.max(
1,
Math.ceil(wordCount / 200)
);






const progressMessages = [

"Reading source material",

"Extracting news intelligence",

"Building article structure",

"Generating editorial insights",

"Preparing AI draft"

];





const currentProgressText =
progressMessages[
Math.min(
Math.floor(progress / 20),
progressMessages.length - 1
)
];









async function generate(){



if(!rawNews.trim()){


setError(
"Paste news content first"
);


return;


}





setLoading(true);

setError("");

setValidation(null);

setProgress(5);





const timer = setInterval(()=>{


setProgress(prev=>{


if(prev >= 90)

return prev;



return prev + 10;



});


},700);







try{



const res =

await fetch(

"/api/admin/ai/import",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify({

rawText:rawNews

})


}


);







const data =

await res.json();






if(!data.success){


throw new Error(

data.error ||

"AI generation failed"

);


}






setProgress(100);






if(data.validation){


setValidation(
data.validation
);


}







const generatedArticle = {


...data.article,


aiGenerated:true,


aiVersion:

"nationpath-ai-v1"


};





setLastGenerated(true);






if(onGenerated){


onGenerated(
generatedArticle
);


}





}


catch(error:any){



setError(

error.message ||

"Something went wrong"

);



}



finally{


clearInterval(timer);


setLoading(false);



}



}









function clearInput(){



setRawNews("");

setError("");

setValidation(null);

setLastGenerated(false);

setProgress(0);



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





<div className="
flex
items-center
justify-between
"

>


<div>


<h2 className="text-xl font-semibold">

🤖 AI News Generator

</h2>


<p className="
text-sm
text-gray-400
mt-1
">

NationPath AI Intelligence Engine

</p>


</div>





<div className="
px-3
py-1
rounded-full
bg-orange-600/20
border
border-orange-500/30
text-orange-400
text-xs
font-semibold
"

>

AI ENGINE v1

</div>


</div>







<textarea



className="
w-full
h-72
p-4
rounded-xl
bg-black/30
border
border-white/10
outline-none
resize-none
"




placeholder="Paste raw news, agency copy, press release..."



value={rawNews}



onChange={

e=>

setRawNews(
e.target.value
)

}



/>








<div className="
grid
grid-cols-3
gap-3
text-sm
"

>


<div className="
bg-black/20
rounded-lg
p-3
border
border-white/10
"

>

<p className="text-gray-400">

Characters

</p>


<p className="font-semibold">

{characterCount}

</p>


</div>






<div className="
bg-black/20
rounded-lg
p-3
border
border-white/10
"

>

<p className="text-gray-400">

Words

</p>


<p className="font-semibold">

{wordCount}

</p>


</div>







<div className="
bg-black/20
rounded-lg
p-3
border
border-white/10
"

>

<p className="text-gray-400">

Reading Time

</p>


<p className="font-semibold">

{readingTime} min

</p>


</div>



</div>









{

loading &&

<div className="
space-y-2
"

>


<div className="
flex
justify-between
text-sm
text-gray-300
"

>

<span>

{currentProgressText}

</span>


<span>

{progress}%

</span>


</div>



<div className="
h-2
bg-black/40
rounded-full
overflow-hidden
"

>


<div

className="
h-full
bg-orange-600
transition-all
duration-500
"

style={{

width:`${progress}%`

}}

/>


</div>



</div>


}









<div className="
flex
gap-3
flex-wrap
"

>



<button



onClick={generate}



disabled={loading}



className="
bg-orange-600
px-6
py-3
rounded-xl
font-semibold
disabled:opacity-50
"

>





{

loading

?

"Generating..."

:

lastGenerated

?

"Regenerate AI Article"

:

"Generate AI Article"

}



</button>







<button



onClick={clearInput}



disabled={loading}



className="
px-5
py-3
rounded-xl
border
border-white/10
bg-white/5
disabled:opacity-50
"

>


Clear


</button>





</div>









{

error &&


<div className="
rounded-xl
border
border-red-500/30
bg-red-500/10
p-4
text-red-300
"

>


<p className="font-semibold">

AI Generation Error

</p>


<p className="text-sm mt-1">

{error}

</p>


</div>


}









{

validation &&


<div className="
rounded-xl
border
border-yellow-500/30
bg-yellow-500/10
p-4
"

>


<p className="
font-semibold
text-yellow-300
"

>

Validation Review

</p>



<pre className="
text-xs
mt-2
whitespace-pre-wrap
text-gray-300
"

>

{

JSON.stringify(

validation,

null,

2

)

}

</pre>



</div>


}









<div className="
rounded-xl
border
border-blue-500/20
bg-blue-500/10
p-4
text-sm
text-blue-200
"

>


<p className="font-semibold">

Human Editorial Review Required

</p>


<p className="mt-1">

AI creates a structured draft only. Editors must verify facts, sources, images and final content before sending it to CMS or publishing.

</p>



</div>






</div>


);


}