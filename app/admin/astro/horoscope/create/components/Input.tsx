//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// INPUT COMPONENT
//
// Responsibility:
// Reusable CMS text input
//
// Does NOT:
// - manage state
// - call API
// - contain business logic
//////////////////////////////////////////////////////////////

"use client";


interface InputProps {

  label:string;

  value:any;

  onChange:(value:string)=>void;

  placeholder?:string;

  type?:string;

  disabled?:boolean;

}




export default function Input({

  label,

  value,

  onChange,

  placeholder,

  type="text",

  disabled=false,

}:InputProps){



return (

<div

className="
space-y-2
"

>


<label

className="
block
text-sm
font-medium
text-gray-300
"

>

{label}

</label>





<input


type={type}


value={value ?? ""}



placeholder={placeholder || ""}



disabled={disabled}



onChange={(e)=>

onChange(

e.target.value

)

}



className="
w-full
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-sm
text-white
outline-none
transition
placeholder:text-gray-500
focus:border-yellow-400/50
focus:ring-2
focus:ring-yellow-400/20
disabled:opacity-50
"



/>



</div>

);


}