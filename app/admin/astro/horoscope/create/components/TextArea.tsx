//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// TEXT AREA COMPONENT
//
// Responsibility:
// Reusable CMS multiline input
//
// Does NOT:
// - manage state
// - call API
// - contain business logic
//////////////////////////////////////////////////////////////

"use client";


interface TextAreaProps {


  label:string;

  value:any;

  onChange:(value:string)=>void;

  placeholder?:string;

  rows?:number;

  disabled?:boolean;


}





export default function TextArea({

  label,

  value,

  onChange,

  placeholder,

  rows=5,

  disabled=false,

}:TextAreaProps){



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





<textarea



value={value ?? ""}



placeholder={placeholder || ""}



rows={rows}



disabled={disabled}



onChange={(e)=>

onChange(

e.target.value

)

}



className="
w-full
resize-y
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-sm
leading-relaxed
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