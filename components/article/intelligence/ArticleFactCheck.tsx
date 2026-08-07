interface FactCheckItem {

  claim:string;

  status:string;

  explanation?:string;

}



interface ArticleFactCheckProps {

  factCheck:FactCheckItem[];

}



export default function ArticleFactCheck({

  factCheck,

}:ArticleFactCheckProps){



if(

  !Array.isArray(factCheck)

  ||

  factCheck.length===0

){

  return null;

}





function getStatus(status:string){


const value =

status?.toLowerCase() || "";





if(

value.includes("true")

||

value.includes("verified")

||

value.includes("confirmed")

){

return {

label:"Verified",

icon:"✓",

color:"#15803D",

soft:"#F4FBF7"

};

}





if(

value.includes("false")

||

value.includes("wrong")

){

return {

label:"False",

icon:"✕",

color:"#DC2626",

soft:"#FEF2F2"

};

}





if(

value.includes("partial")

){

return {

label:"Partly True",

icon:"!",

color:"#D97706",

soft:"#FFFBEB"

};

}





return {

label:status,

icon:"•",

color:"#163C80",

soft:"#F3F7FF"

};



}





return (

<div

className="
mx-auto
w-full
md:w-[85%]
space-y-4
"

>


{

factCheck.map(

(item,index)=>{


const status =

getStatus(item.status);



return (

<article

key={`${item.claim}-${index}`}

className="
relative
overflow-hidden
rounded-xl
border
border-gray-200
bg-white
px-5
py-4
shadow-sm
transition-all
duration-300
hover:shadow-md
"

style={{

background:

`linear-gradient(135deg,${status.soft},#ffffff)`

}}

>



{/* ANALYSIS ACCENT SYSTEM */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
"

style={{

backgroundColor:status.color

}}

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
opacity-40
"

style={{

backgroundColor:status.color

}}

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
opacity-20
"

style={{

backgroundColor:status.color

}}

/>





<div

className="
pl-6
"

>



<div

className="
flex
items-start
justify-between
gap-4
"

>



<h3

className="
text-[15px]
font-bold
leading-7
text-gray-900
"

>

{item.claim}

</h3>





<span

className="
shrink-0
rounded-full
border
px-3
py-1
text-[11px]
font-bold
"

style={{

color:status.color,

borderColor:`${status.color}40`

}}

>

{status.icon}

{" "}

{status.label}

</span>



</div>







{

item.explanation &&

<div

className="
mt-3
border-t
border-gray-200/70
pt-3
"

>


<p

className="
text-sm
leading-7
text-gray-600
"

>

{item.explanation}

</p>


</div>

}



</div>





</article>

)

}

)

}



</div>

);

}