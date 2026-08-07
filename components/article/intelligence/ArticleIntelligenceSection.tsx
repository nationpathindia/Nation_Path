import React from "react";


interface ArticleIntelligenceSectionProps {

  title:string;

  description?:string;

  theme?:
  | "background"
  | "timeline"
  | "opinion"
  | "fact"
  | "takeaway"
  | "source";

  children:React.ReactNode;

}



const themeMap = {

background:{
  color:"#8B6A25",
  soft:"#FAF7F1",
},

timeline:{
  color:"#163C80",
  soft:"#F3F7FF",
},

opinion:{
  color:"#6D5CE7",
  soft:"#F7F5FF",
},

fact:{
  color:"#15803D",
  soft:"#F4FBF7",
},

takeaway:{
  color:"#EA661B",
  soft:"#FFF8F0",
},

source:{
  color:"#334155",
  soft:"#F8FAFC",
},

};





export default function ArticleIntelligenceSection({

title,

description,

theme="timeline",

children,

}:ArticleIntelligenceSectionProps){



const activeTheme = themeMap[theme];



return (

<section

className="
border-b
border-gray-200
pb-8
last:border-b-0
"

>


{/* GLASS HEADER */}

<header

className="
relative
mb-6
overflow-hidden
rounded-2xl
border
px-5
py-4
shadow-sm
"

style={{

borderColor:`${activeTheme.color}30`,

background:

`linear-gradient(
135deg,
${activeTheme.soft},
rgba(255,255,255,0.85)
)`

}}

>


<div

className="
absolute
inset-0
backdrop-blur-md
"

style={{

background:
"rgba(255,255,255,0.25)"

}}

/>



<div

className="
relative
z-10
"

>


<div

className="
flex
items-center
gap-3
"

>


<h2

className="
text-2xl
font-black
tracking-tight
"

style={{

color:activeTheme.color

}}

>

{title}

</h2>



<div

className="
flex
items-center
gap-1
"

>


<span

className="
h-3
w-1
rounded-full
"

style={{

backgroundColor:activeTheme.color

}}

/>



<span

className="
h-3
w-1
rounded-full
opacity-60
"

style={{

backgroundColor:activeTheme.color

}}

/>



<span

className="
h-3
w-1
rounded-full
opacity-30
"

style={{

backgroundColor:activeTheme.color

}}

/>



</div>


</div>




{

description &&

<p

className="
mt-2
text-sm
font-medium
leading-6
text-gray-500
"

>

{description}

</p>

}



</div>


</header>





{/* CONTENT */}

<div>

{children}

</div>



</section>

);

}