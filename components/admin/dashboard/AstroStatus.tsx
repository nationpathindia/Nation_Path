"use client";


interface Props{

astro:any;

}



export default function AstroStatus({

astro

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


<h2 className="text-lg font-semibold mb-5">

Astro Intelligence

</h2>




<div className="grid grid-cols-2 gap-4">



<div>

<p className="text-gray-400 text-sm">

CMS Horoscope

</p>

<p className="text-2xl font-bold">

{astro?.horoscopeCount || 0}

</p>

</div>




<div>

<p className="text-gray-400 text-sm">

Published

</p>

<p className="text-2xl font-bold">

{astro?.published || 0}

</p>

</div>



<div>

<p className="text-gray-400 text-sm">

Drafts

</p>

<p className="text-2xl font-bold">

{astro?.drafts || 0}

</p>

</div>




<div>

<p className="text-gray-400 text-sm">

Automation

</p>


<p className="text-orange-400">

{astro?.automationStatus}

</p>


</div>



</div>



</div>


)


}