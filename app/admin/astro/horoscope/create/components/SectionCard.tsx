//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// SECTION CARD COMPONENT
//
// Responsibility:
// Premium reusable CMS section container
//
// Does NOT:
// - handle state
// - handle API
// - modify form data
//////////////////////////////////////////////////////////////

import React from "react";



interface SectionCardProps {

  title:string;

  subtitle?:string;

  children:React.ReactNode;

  icon?:string;

}





export default function SectionCard({

  title,

  subtitle,

  children,

  icon,

}:SectionCardProps){


return (

<section

className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-5
md:p-7
space-y-6
shadow-xl
"

>


{/* HEADER */}

<div

className="
flex
items-start
gap-3
"

>


{

icon && (

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-2xl
bg-yellow-400/10
text-xl
"

>

{icon}

</div>

)

}



<div>


<h2

className="
text-lg
md:text-xl
font-bold
text-white
"

>

{title}

</h2>




{

subtitle && (

<p

className="
mt-1
text-sm
text-gray-400
leading-relaxed
"

>

{subtitle}

</p>

)

}



</div>


</div>







{/* CONTENT */}

<div

className="
space-y-5
"

>

{children}

</div>






</section>

);


}