"use client";


interface Props{

system:any;

}



export default function SystemHealth({

system

}:Props){



return(


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
p-6
"

>


<h2

className="
text-lg
font-semibold
mb-5
"

>

System Health

</h2>





<div className="space-y-4">



<StatusRow

label="Database"

value={system?.database}

/>



<StatusRow

label="API"

value={system?.api}

/>




<StatusRow

label="Automation"

value={system?.automation}

/>



</div>



</div>


)


}





function StatusRow({

label,

value

}:{

label:string;

value:string;

}){


const healthy =

value === "connected"

||

value === "healthy"

||

value === "active";




return(


<div

className="
flex
justify-between
items-center
border-b
border-white/10
pb-3
"

>


<span className="text-gray-300">

{label}

</span>



<span

className={

healthy

?

"text-green-400 text-sm"

:

"text-red-400 text-sm"

}

>

{value || "unknown"}

</span>



</div>


)

}