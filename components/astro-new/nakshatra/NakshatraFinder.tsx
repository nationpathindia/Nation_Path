"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA FINDER
//
// Premium Birth Star Discovery Experience
//
// UI Layer Only
//
// Flow:
//
// Birth Data
// ↓
// Location Selection
// ↓
// Future Astro Engine
// ↓
// Nakshatra Result
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Moon,
  Star,
  Sparkles,
  Calendar,
  Orbit,
  MapPin,
  Check,
} from "lucide-react";



//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

interface LocationItem {

  city:string;

  country?:string;

  latitude?:number;

  longitude?:number;

}




interface NakshatraPayload {

  birthDate:string;

  birthTime:string;

  place:LocationItem | null;

}





//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function NakshatraFinder(){



const [

birthDate,

setBirthDate

]=useState("");



const [

birthTime,

setBirthTime

]=useState("");




const [

place,

setPlace

]=useState("");





const [

locations,

setLocations

]=useState<LocationItem[]>([]);





const [

selectedPlace,

setSelectedPlace

]=useState<LocationItem | null>(null);









//////////////////////////////////////////////////////////////
// LOCATION SEARCH
//////////////////////////////////////////////////////////////

async function searchLocation(
value:string
){


setPlace(value);

setSelectedPlace(null);



if(value.trim().length < 3){

setLocations([]);

return;

}




try{


const response = await fetch(

`/api/location?query=${encodeURIComponent(value)}`

);



const data = await response.json();




setLocations(

Array.isArray(data)

?

data

:

data.locations || []

);



}

catch(error){


console.error(

"Nakshatra location search failed",

error

);


setLocations([]);


}



}









//////////////////////////////////////////////////////////////
// LOCATION SELECT
//////////////////////////////////////////////////////////////

function selectLocation(

item:LocationItem

){


setSelectedPlace(item);



setPlace(

`${item.city}${
item.country
?
`, ${item.country}`
:
""
}`

);



setLocations([]);


}









//////////////////////////////////////////////////////////////
// FUTURE ASTRO REQUEST
//////////////////////////////////////////////////////////////

function discoverNakshatra(){



const payload:NakshatraPayload = {


birthDate,


birthTime,


place:selectedPlace,


};





console.log(

"Nakshatra Discovery Request",

{

event:
"nakshatra_discovery_request",

payload,

}

);




/*

Future:

POST

/api/astro/nakshatra


Response:

{

nakshatra,

pada,

moonDegree,

planet,

}

*/



}






return (
  <section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-4
py-20
md:px-8
"

>


{/* AMBIENT GOLD ENERGY */}

<div

className="
pointer-events-none
absolute
left-1/2
top-0
h-[380px]
w-[380px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[140px]
"

/>





<motion.div

initial={{
opacity:0,
y:30,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:0.7,
}}

className="
relative
mx-auto
max-w-5xl
"

>






{/* MAIN CHAMBER */}

<div

className="
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/40
bg-[#F8F1DE]
shadow-[0_25px_80px_rgba(139,94,0,0.12)]
"

>







{/* HEADER */}

<div

className="
relative
bg-[#120C08]
px-6
py-10
text-center
md:px-12
"

>


<div

className="
mx-auto
flex
w-fit
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#1B120A]
px-4
py-2
text-sm
text-[#D4AF37]
"

>

<Moon size={16}/>

Moon Intelligence

</div>





<h2

className="
mt-6
font-serif
text-3xl
font-semibold
text-[#FFF9E8]
md:text-5xl
"

>

Discover Your Birth Star

</h2>





<p

className="
mx-auto
mt-4
max-w-2xl
leading-relaxed
text-[#D8C49A]
"

>

Enter your birth details to reveal
the lunar constellation connected
with your personality and inner nature.

</p>




</div>










{/* FORM AREA */}

<div

className="
p-6
md:p-12
"

>



<div

className="
grid
gap-6
md:grid-cols-3
"

>






{/* DATE */}

<div>

<label

className="
mb-2
flex
items-center
gap-2
text-sm
text-[#5A3908]
"

>

<Calendar size={16}/>

Birth Date

</label>



<input

type="date"

value={birthDate}

onChange={(e)=>
setBirthDate(e.target.value)
}

className="
w-full
rounded-xl
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-4
py-3
text-[#3B2600]
outline-none
transition
focus:border-[#8B5E00]
focus:ring-2
focus:ring-[#D4AF37]/20
"

/>


</div>









{/* TIME */}

<div>

<label

className="
mb-2
flex
items-center
gap-2
text-sm
text-[#5A3908]
"

>

<Moon size={16}/>

Birth Time

</label>



<input

type="time"

value={birthTime}

onChange={(e)=>
setBirthTime(e.target.value)
}

className="
w-full
rounded-xl
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-4
py-3
text-[#3B2600]
outline-none
transition
focus:border-[#8B5E00]
focus:ring-2
focus:ring-[#D4AF37]/20
"

/>


</div>









{/* LOCATION */}

<div

className="
relative
"

>


<label

className="
mb-2
flex
items-center
gap-2
text-sm
text-[#5A3908]
"

>

<Orbit size={16}/>

Birth Place

</label>





<div

className="
relative
"

>

<MapPin

size={17}

className="
absolute
left-3
top-1/2
-translate-y-1/2
text-[#8B5E00]
"

/>



<input

type="text"

value={place}

onChange={(e)=>
searchLocation(e.target.value)
}

placeholder="Search city"

className="
w-full
rounded-xl
border
border-[#D4AF37]/40
bg-[#FFF9E8]
py-3
pl-10
pr-4
text-[#3B2600]
outline-none
transition
focus:border-[#8B5E00]
focus:ring-2
focus:ring-[#D4AF37]/20
"

/>



</div>









{/* LOCATION RESULTS */}

{

locations.length > 0 && (

<div

className="
absolute
left-0
right-0
top-full
z-30
mt-2
overflow-hidden
rounded-xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]
shadow-xl
"

>


{

locations.map((item,index)=>(


<button

key={index}

type="button"

onClick={()=>selectLocation(item)}

className="
flex
w-full
items-center
justify-between
px-4
py-3
text-left
text-[#3B2600]
transition
hover:bg-[#F8F1DE]
"

>


<span>

{item.city}

{item.country &&
`, ${item.country}`}

</span>



<MapPin size={15}/>



</button>


))


}


</div>


)

}







{

selectedPlace && (

<div

className="
mt-3
flex
items-center
gap-2
text-xs
text-[#8B5E00]
"

>

<Check size={14}/>

Location selected

</div>

)

}



</div>





</div>









{/* CTA */}

<div

className="
mt-10
flex
justify-center
"

>


<button

type="button"

onClick={discoverNakshatra}

className="
group
flex
items-center
gap-3
rounded-full
bg-[#120C08]
px-8
py-4
text-[#D4AF37]
shadow-lg
transition
hover:bg-[#1B120A]
hover:shadow-xl
"

>


<Star

size={18}

className="
transition
group-hover:rotate-12
"

/>



Discover My Nakshatra



<Sparkles size={18}/>


</button>


</div>






</div>



</div>





</motion.div>


</section>


);


}