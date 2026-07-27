//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// ARRAY EDITOR COMPONENT
//
// Responsibility:
// Manage repeatable CMS text fields
//
// Does NOT:
// - call API
// - save data
// - contain business rules
//////////////////////////////////////////////////////////////

"use client";



interface ArrayEditorProps {


  title:string;


  items:string[];


  onAdd:()=>void;


  onChange:(

    index:number,

    value:string

  )=>void;



  onRemove:(

    index:number

  )=>void;


}







export default function ArrayEditor({

  title,

  items=[],

  onAdd,

  onChange,

  onRemove,

}:ArrayEditorProps){



return (

<div

className="
space-y-4
"

>





<h3

className="
text-sm
font-semibold
uppercase
tracking-wide
text-yellow-400
"

>

{title}

</h3>







<div

className="
space-y-3
"

>


{

items.map((item,index)=>(



<div

key={index}

className="
flex
gap-3
"

>


<input



value={item || ""}



onChange={(e)=>

onChange(

index,

e.target.value

)

}



className="
flex-1
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
focus:border-yellow-400/50
focus:ring-2
focus:ring-yellow-400/20
"



placeholder={

`${title} ${index + 1}`

}



/>






<button

type="button"



onClick={()=>onRemove(index)}



className="
rounded-xl
border
border-red-500/30
bg-red-500/10
px-4
text-sm
font-semibold
text-red-400
transition
hover:bg-red-500/20
"

>

Remove

</button>




</div>



))

}



</div>







<button

type="button"



onClick={onAdd}



className="
rounded-xl
border
border-yellow-400/30
bg-yellow-400/10
px-5
py-2.5
text-sm
font-semibold
text-yellow-300
transition
hover:bg-yellow-400/20
"

>

+ Add {title}

</button>





</div>

);


}