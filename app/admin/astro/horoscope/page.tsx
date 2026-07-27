//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// HOROSCOPE CMS LIST PAGE
//
// Responsibility:
// Manage CMS horoscope entries
//
// Does NOT:
// - calculate astrology
// - use Swiss Ephemeris
// - touch prediction engine
// - generate AI content
//////////////////////////////////////////////////////////////


"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";









export default function HoroscopeCMSPage(){



const router = useRouter();





const [

data,

setData

] = useState<any[]>([]);





const [

loading,

setLoading

] = useState(true);





const [

search,

setSearch

] = useState("");





const [

status,

setStatus

] = useState("all");









//////////////////////////////////////////////////////////////
// LOAD HOROSCOPE CMS
//////////////////////////////////////////////////////////////

const loadHoroscopes = async()=>{


try{


setLoading(true);





let url =

"/api/admin/horoscope";






const params = new URLSearchParams();






if(status !== "all"){


params.append(

"status",

status

);


}






if(params.toString()){


url += `?${params.toString()}`;

}


const response = await fetch(url);





const result = await response.json();





if(result.success){


setData(

result.data || []

);


}




}

catch(error){


console.error(

"HOROSCOPE LIST ERROR",

error

);



}

finally{


setLoading(false);


}



};









useEffect(()=>{


loadHoroscopes();


},[status]);









//////////////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////////////

const deleteHoroscope = async(id:string)=>{


const confirmDelete = window.confirm(

"Delete this horoscope CMS entry?"

);



if(!confirmDelete){

return;

}






try{


const response = await fetch(

`/api/admin/horoscope/${id}`,

{

method:"DELETE"

}

);





const result = await response.json();





if(result.success){


loadHoroscopes();


}



}

catch(error){


console.error(

"DELETE ERROR",

error

);


}



};









//////////////////////////////////////////////////////////////
// SEARCH FILTER
//////////////////////////////////////////////////////////////

const filtered = data.filter((item)=>{


if(!search){

return true;

}



return (

item.zodiac

?.toLowerCase()

.includes(

search.toLowerCase()

)

);



});









//////////////////////////////////////////////////////////////
// RENDER
//////////////////////////////////////////////////////////////

return (

<main

className="

min-h-screen

bg-[#050816]

px-4

py-6

text-white

md:px-8

md:py-10

"

>


<div

className="

mx-auto

max-w-7xl

space-y-8

"

>








{/* HEADER */}

<section

className="

rounded-3xl

border

border-white/10

bg-gradient-to-br

from-white/10

via-white/5

to-transparent

p-6

backdrop-blur-xl

md:p-8

"

>


<p

className="

text-xs

uppercase

tracking-[0.35em]

text-yellow-400

"

>

NationPath Astro CMS

</p>






<h1

className="

mt-3

text-3xl

font-bold

md:text-5xl

"

>

Horoscope Experiences

</h1>






<p

className="

mt-3

text-gray-400

"

>

Manage premium Vedic horoscope content.

CMS is the single source of truth.

</p>



</section>









{/* FILTER BAR */}

<section

className="

grid

gap-4

rounded-3xl

border

border-white/10

bg-white/5

p-5

md:grid-cols-3

"

>





<input


value={search}

onChange={(e)=>

setSearch(e.target.value)

}

placeholder="Search zodiac..."

className="

rounded-xl

border

border-white/10

bg-black/20

px-4

py-3

text-white

outline-none

"

/>








<select


value={status}

onChange={(e)=>

setStatus(e.target.value)

}

className="

rounded-xl

border

border-white/10

bg-black/20

px-4

py-3

text-white

"

>


<option value="all">

All Status

</option>


<option value="draft">

Draft

</option>


<option value="published">

Published

</option>


<option value="scheduled">

Scheduled

</option>


</select>








<button

onClick={()=>


router.push(

"/admin/astro/horoscope/create"

)

}

className="

rounded-xl

bg-gradient-to-r

from-yellow-400

to-orange-500

px-5

py-3

font-bold

text-black

"

>


+ Create Horoscope


</button>





</section>









{/* LIST */}

<section

className="

space-y-4

"

>





{

loading

?

(

<div

className="

rounded-2xl

border

border-white/10

bg-white/5

p-6

text-center

"

>

Loading Horoscope CMS...

</div>

)

:

filtered.map((item)=>(



<div

key={item._id}

className="

rounded-3xl

border

border-white/10

bg-white/5

p-5

backdrop-blur-xl

"

>






<div

className="

flex

flex-col

gap-4

md:flex-row

md:items-center

md:justify-between

"

>


<div>


<h2

className="

text-2xl

font-bold

capitalize

"

>

{item.zodiac}

</h2>




<p

className="

mt-1

text-sm

text-gray-400

"

>

{item.slug}

</p>



</div>







<div

className="

flex

items-center

gap-3

"

>


<span

className={`

rounded-full

px-4

py-1

text-xs

uppercase

tracking-wider

${

item.status==="published"

?

"bg-green-500/20 text-green-300"

:

"bg-yellow-500/20 text-yellow-300"

}

`}

>


{item.status}


</span>




<button

onClick={()=>


router.push(

`/admin/astro/horoscope/edit/${item._id}`

)

}

className="

rounded-xl

border

border-yellow-400/30

px-4

py-2

text-yellow-400

"

>


Edit


</button>





<button

onClick={()=>deleteHoroscope(item._id)}

className="

rounded-xl

border

border-red-400/30

px-4

py-2

text-red-300

"

>


Delete


</button>





</div>


</div>






</div>



))


}





</section>









</div>


</main>

);


}