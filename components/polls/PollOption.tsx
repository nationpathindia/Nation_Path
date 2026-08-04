"use client";



interface PollOptionType {

  id:string;

  text:string;

  votes:number;

  percentage:number;

}



interface Props {

  option:PollOptionType;

  selected:boolean;

  onSelect:(id:string)=>void;

}





export default function PollOption({

  option,

  selected,

  onSelect

}:Props){



return (

<button

type="button"

onClick={()=>onSelect(option.id)}


className={`
w-full
text-left
border-b
py-5
transition
group

${
selected

?

"border-[#EA661B]"

:

"border-gray-200 hover:border-[#163C80]"

}

`}


>



<div

className="
flex
items-center
justify-between
gap-5
"

>


<div

className="
flex
items-center
gap-4
"

>


{/* Radio */}

<div

className={`
w-5
h-5
rounded-full
border
flex
items-center
justify-center

${
selected

?

"border-[#EA661B]"

:

"border-gray-400"

}

`}

>


{
selected &&

<div

className="
w-2
h-2
rounded-full
bg-[#EA661B]
"

/>

}


</div>





<span

className={`
text-lg
font-medium

${
selected

?

"text-[#163C80]"

:

"text-gray-800"

}

`}

>

{option.text}

</span>



</div>





<span

className="
text-sm
font-bold
text-[#163C80]
"

>

{option.percentage}%

</span>



</div>







{/* Progress */}


<div

className="
mt-3
h-1.5
bg-gray-100
overflow-hidden
"

>


<div

className="
h-full
bg-[#EA661B]
transition-all
duration-700
"

style={{

width:

`${option.percentage}%`

}}


/>


</div>





</button>


);


}