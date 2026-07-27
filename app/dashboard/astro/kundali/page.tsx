//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KUNDALI INTELLIGENCE
//
// Free Kundali Journey
//
// Production Safe Version
//
// Does:
// - User birth profile
// - Horoscope calculation
//
// Does NOT:
// - Render unfinished SVG engine
//////////////////////////////////////////////////////////////

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import User from "@/app/models/User";

import {
  calculateHoroscope
} from "@/lib/astro/horoscope/engine";


import KundaliBirthForm from "@/components/astro/KundaliBirthForm";


import {
  CalendarDays,
  Clock,
  MapPin,
  Lock,
  Sun,
  Moon,
  CircleDot,
  Sparkles,
} from "lucide-react";








const planets = [


{
name:"Surya",
house:"9th House",
status:"Knowledge & Guidance",
icon:Sun,
},



{
name:"Chandra",
house:"4th House",
status:"Mind & Emotions",
icon:Moon,
},



{
name:"Mangal",
house:"3rd House",
status:"Energy & Action",
icon:CircleDot,
},



{
name:"Guru",
house:"5th House",
status:"Wisdom & Growth",
icon:Sparkles,
},



{
name:"Shani",
house:"10th House",
status:"Career & Discipline",
icon:CircleDot,
},


];






const premiumInsights=[


"Career Intelligence",

"Marriage Report",

"Finance Report",

"Dasha Timeline",


];









function KundliChartPlaceholder(){


return (

<div

className="
flex
aspect-square
items-center
justify-center
rounded-3xl
border
border-yellow-400/20
bg-yellow-400/5
text-center
"

>


<div>


<p

className="
text-sm
uppercase
tracking-[0.3em]
text-yellow-400
"

>

Vedic Chart Room

</p>


<h3

className="
mt-3
text-xl
font-bold
"

>

Kundali Visualization Coming Soon

</h3>


<p

className="
mt-2
text-sm
text-gray-400
"

>

Premium D1 SVG renderer will connect here.

</p>


</div>


</div>

);


}









export default async function KundaliPage(){





const session =

await getServerSession(

authOptions

);





const user:any =

session?.user?.id

?

await User.findById(

session.user.id

)

.lean()

.exec()

:

null;







const birthProfile =

user?.birthProfile;







const hasBirthProfile =

Boolean(

birthProfile?.name &&

birthProfile?.dateOfBirth &&

birthProfile?.birthPlace

);







let kundliReady = false;







if(hasBirthProfile){


const latitude =

birthProfile.location?.latitude;



const longitude =

birthProfile.location?.longitude;





if(latitude && longitude){


try{


const birthTime =

birthProfile.birthTime ?? "12:00";



const birthDate =

new Date(

`${

birthProfile.dateOfBirth

.toISOString()

.split("T")[0]

}T${birthTime}`

);





await calculateHoroscope({


date:

birthDate,


language:

"english",


birthDetails:{


date:

birthDate,


latitude,


longitude,


timezone:

birthProfile.location?.timezone

??

"Asia/Kolkata",


}



});



kundliReady = true;



}

catch(error){


console.error(

"Kundli calculation failed",

error

);


}


}


}








return (


<div className="space-y-8">





<section>


<h1

className="
text-3xl
font-bold
"

>

Kundali Intelligence ✨

</h1>



<p

className="
mt-2
text-gray-400
"

>

Generate your personalized Vedic birth chart.

</p>


</section>









{!hasBirthProfile && (


<section

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"

>


<h2 className="text-xl font-bold">

Create Your Birth Profile

</h2>



<p className="mt-2 text-gray-400">

Enter your birth details to unlock your free Kundali.

</p>



<div className="mt-6">

<KundaliBirthForm />

</div>


</section>


)}









{hasBirthProfile && (


<section

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"

>


<h2 className="text-xl font-bold">

{birthProfile.name}

</h2>




<div className="mt-5 space-y-3 text-sm text-gray-400">


<p className="flex gap-2 items-center">

<CalendarDays size={16}/>

{

new Date(

birthProfile.dateOfBirth

)

.toDateString()

}

</p>



<p className="flex gap-2 items-center">

<Clock size={16}/>

{

birthProfile.birthTime ??

"Birth time unknown"

}

</p>



<p className="flex gap-2 items-center">

<MapPin size={16}/>

{birthProfile.birthPlace}

</p>


</div>


</section>


)}









{kundliReady && (


<section

className="
rounded-3xl
border
border-white/10
bg-white/5
p-8
"

>


<h2 className="mb-6 text-xl font-bold">

North Indian Kundali Chart

</h2>


<KundliChartPlaceholder />


</section>


)}









<section>


<h2 className="mb-5 text-xl font-bold">

Free Astro Preview

</h2>



<div className="
grid
gap-5
md:grid-cols-2
lg:grid-cols-5
">


{

planets.map((planet)=>{


const Icon = planet.icon;


return (

<div

key={planet.name}

className="
rounded-2xl
border
border-white/10
bg-white/5
p-5
"

>


<Icon size={24}/>


<h3 className="mt-4 font-bold">

{planet.name}

</h3>



<p className="mt-2 text-yellow-400">

{planet.house}

</p>



<p className="mt-2 text-sm text-gray-400">

{planet.status}

</p>


</div>


)


})

}


</div>


</section>









<section

className="
rounded-3xl
border
border-yellow-400/20
bg-yellow-400/10
p-8
"

>


<div className="flex items-center gap-3">


<Lock className="text-yellow-400"/>


<h2 className="text-xl font-bold">

Premium Kundali Intelligence

</h2>


</div>





<div className="
mt-6
grid
gap-4
md:grid-cols-2
">


{

premiumInsights.map(item=>(


<div

key={item}

className="
flex
items-center
gap-3
rounded-xl
border
border-white/10
bg-white/5
p-4
"

>


<Lock size={16}/>

{item}


</div>


))


}



</div>


</section>





</div>


);


}