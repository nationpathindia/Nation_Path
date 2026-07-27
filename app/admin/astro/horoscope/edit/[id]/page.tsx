//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// EDIT HOROSCOPE PAGE
//
// Responsibility:
// Load existing CMS horoscope
// Pass data to shared HoroscopeForm
//
// Does NOT:
// - calculate astrology
// - touch Swiss Ephemeris
// - touch Prediction Engine
// - generate AI content
//////////////////////////////////////////////////////////////


"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import HoroscopeForm from "../../create/HoroscopeForm";







export default function EditHoroscopePage(){



const params = useParams();


const router = useRouter();





const id =

params?.id as string;






const [loading,setLoading] =

useState(true);





const [

horoscope,

setHoroscope

] = useState<any>(null);








//////////////////////////////////////////////////////////////
// LOAD HOROSCOPE DATA
//////////////////////////////////////////////////////////////

useEffect(()=>{


if(!id){

return;

}



async function loadHoroscope(){



try{


const response = await fetch(

`/api/admin/horoscope/${id}`

);





const result = await response.json();







if(result.success){


setHoroscope(

result.data

);


}

else{


alert(

result.message ||

"Horoscope not found"

);


router.push(

"/admin/astro/horoscope"

);


}




}

catch(error){


console.error(

"HOROSCOPE EDIT LOAD ERROR",

error

);



alert(

"Failed to load horoscope"

);



router.push(

"/admin/astro/horoscope"

);



}

finally{


setLoading(false);


}




}




loadHoroscope();




},[id,router]);









//////////////////////////////////////////////////////////////
// LOADING STATE
//////////////////////////////////////////////////////////////

if(loading){


return (

<main

className="

min-h-screen

bg-[#050816]

flex

items-center

justify-center

text-white

"

>


<div

className="

rounded-2xl

border

border-yellow-400/20

bg-white/5

px-8

py-6

backdrop-blur-xl

"

>


<p

className="

text-yellow-400

tracking-widest

uppercase

text-sm

"

>

Loading Horoscope CMS...

</p>


</div>


</main>

);


}









//////////////////////////////////////////////////////////////
// ERROR STATE
//////////////////////////////////////////////////////////////

if(!horoscope){


return (

<main

className="

min-h-screen

bg-[#050816]

flex

items-center

justify-center

text-white

"

>


<p>

No horoscope data found

</p>


</main>

);


}









//////////////////////////////////////////////////////////////
// EDIT FORM
//////////////////////////////////////////////////////////////

return (

<main

className="

min-h-screen

bg-[#050816]

px-4

py-6

md:px-8

md:py-10

text-white

"

>


<div

className="

mx-auto

max-w-7xl

"

>





<section

className="

mb-8

overflow-hidden

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

Edit Horoscope Experience

</h1>






<p

className="

mt-3

max-w-2xl

text-sm

leading-relaxed

text-gray-400

md:text-base

"

>

Update premium Vedic horoscope content using the

CMS-first architecture.

</p>



</section>








<HoroscopeForm

mode="edit"

id={id}

initialData={horoscope}

/>








</div>

</main>

);


}