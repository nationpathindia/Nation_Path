"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";


interface AstrologyWidgetProps {

  horoscopes:any[];

}



const zodiacSigns = [

{
name:"Aries",
slug:"aries",
image:"/zodiac/aries.png"
},

{
name:"Taurus",
slug:"taurus",
image:"/zodiac/taurus.png"
},

{
name:"Gemini",
slug:"gemini",
image:"/zodiac/gemini.png"
},

{
name:"Cancer",
slug:"cancer",
image:"/zodiac/cancer.png"
},

{
name:"Leo",
slug:"leo",
image:"/zodiac/leo.png"
},

{
name:"Virgo",
slug:"virgo",
image:"/zodiac/virgo.png"
},

{
name:"Libra",
slug:"libra",
image:"/zodiac/libra.png"
},

{
name:"Scorpio",
slug:"scorpio",
image:"/zodiac/scorpio.png"
},

{
name:"Sagittarius",
slug:"sagittarius",
image:"/zodiac/sagittarius.png"
},

{
name:"Capricorn",
slug:"capricorn",
image:"/zodiac/capricorn.png"
},

{
name:"Aquarius",
slug:"aquarius",
image:"/zodiac/aquarius.png"
},

{
name:"Pisces",
slug:"pisces",
image:"/zodiac/pisces.png"
}

];





function formatTime(value?:string){

if(!value) return "--";


try{

return new Date(value).toLocaleTimeString(
"en-IN",
{
hour:"2-digit",
minute:"2-digit"
}
);


}catch{

return "--";

}

}






export default function AstrologyWidget({

horoscopes=[]

}:AstrologyWidgetProps){



const [panchang,setPanchang]=useState<any>(null);

const [muhurta,setMuhurta]=useState<any>(null);

useEffect(()=>{


async function load(){


try{


const res = await fetch(

"/api/astro/home-astro",

{
cache:"force-cache"
}

);



const json =
await res.json();



setPanchang(

json?.data?.panchang
||
null

);



setMuhurta(

json?.data?.muhurta?.data
||
null

);



}
catch(error){


console.error(
"Astro Widget Error",
error
);


}



}



load();


},[]);




const auspicious=[

{
name:"Abhijit Muhurat",
start:muhurta?.auspicious?.abhijit?.start,
end:muhurta?.auspicious?.abhijit?.end
},


{
name:"Brahma Muhurat",
start:muhurta?.auspicious?.brahma?.start,
end:muhurta?.auspicious?.brahma?.end
},


{
name:"Amrit Kaal",
start:muhurta?.auspicious?.amritKaal?.[0]?.start,
end:muhurta?.auspicious?.amritKaal?.[0]?.end
}

];






const avoid=[

{
name:"Rahu Kaal",
start:muhurta?.inauspicious?.rahu?.start,
end:muhurta?.inauspicious?.rahu?.end
},


{
name:"Gulika Kaal",
start:muhurta?.inauspicious?.gulika?.start,
end:muhurta?.inauspicious?.gulika?.end
}

];







return (

<section

aria-label="NationPath Astro Intelligence"

className="
relative
overflow-hidden
rounded-[32px]
border
border-[#D4AF37]/40
bg-[#FFF9E8]
p-6
sm:p-8
shadow-xl
"

>


<div

className="
absolute
right-[-120px]
top-[-120px]
h-[280px]
w-[280px]
rounded-full
bg-[#D4AF37]/20
blur-[100px]
"

/>


<div

className="
relative
"

>



{/* HEADER */}

<div

className="
flex
items-center
gap-2
text-xs
uppercase
tracking-[0.35em]
font-bold
text-[#8B5E00]
"

>

<Sparkles size={15}/>

NationPath Astro

</div>





<p

className="
mt-4
max-w-xl
text-sm
leading-7
text-[#6B4A16]
"

>

Daily horoscope insights powered by
NationPath Astro Intelligence.

</p>









{/* ZODIAC EXPLORER */}


<div

className="
mt-8
grid
grid-cols-6
gap-3
sm:grid-cols-12
"

>


{

zodiacSigns.map((item)=>(


<Link

key={item.slug}

href={`/astro/horoscope/${item.slug}`}

className="
group
flex
flex-col
items-center
"

>


<div

className="
flex
h-11
w-11
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-gradient-to-br
from-[#7A1F1F]
to-[#3B2600]
shadow-md
transition
group-hover:-translate-y-1
group-hover:shadow-[0_0_25px_rgba(212,175,55,.5)]
"

>


<Image

src={item.image}

alt={item.name}

width={30}

height={30}

className="
object-contain
brightness-0
invert
"

/>


</div>


<span

className="
mt-2
text-[9px]
uppercase
font-bold
text-[#7A1F1F]
"

>

{item.name.slice(0,3)}

</span>


</Link>


))


}



</div>









{/* COSMIC SNAPSHOT */}



<div

className="
mt-8
grid
gap-4
sm:grid-cols-2
"

>



<div

className="
rounded-2xl
border
border-[#D4AF37]/30
bg-white/70
p-5
"

>


<h3

className="
font-serif
font-bold
text-[#3B2600]
"

>

Today's Panchang

</h3>



<div

className="
mt-4
space-y-2
text-sm
text-[#6B4A16]
"

>

<p>

🌞 Vara :
{" "}
{panchang?.vara?.name || "--"}

</p>


<p>

🌙 Tithi :
{" "}
{panchang?.tithi?.name || "--"}

</p>


<p>

⭐ Nakshatra :
{" "}
{panchang?.nakshatra?.name || "--"}

</p>


<p>

🔱 Yoga :
{" "}
{panchang?.yoga?.name || "--"}

</p>


</div>



</div>








<div

className="
rounded-2xl
border
border-[#D4AF37]/30
bg-white/70
p-5
"

>


<h3

className="
font-serif
font-bold
text-[#3B2600]
"

>

Auspicious Time

</h3>



<div

className="
mt-4
space-y-3
text-xs
"

>


{

auspicious.map((item,i)=>(


<div key={i}

className="
flex
justify-between
gap-3
"

>

<span className="text-[#8B5E00]">

✓ {item.name}

</span>


<span className="font-bold">

{formatTime(item.start)}
-
{formatTime(item.end)}

</span>


</div>


))


}


</div>


</div>




</div>









{/* AVOID STRIPE */}


<div

className="
mt-5
rounded-2xl
border
border-red-200
bg-red-50
p-4
"

>


<p

className="
text-xs
uppercase
tracking-[0.25em]
font-bold
text-red-700
"

>

Avoid Time

</p>



<div

className="
mt-3
flex
flex-wrap
gap-4
text-xs
"

>

{

avoid.map((item,i)=>(


<div key={i}

className="text-red-800"

>

✕ {item.name}

{" "}
{formatTime(item.start)}
-
{formatTime(item.end)}

</div>


))


}


</div>


</div>








{/* BUTTON */}


<Link

href="/astro/horoscope/aries"

className="
mt-6
inline-flex
rounded-full
bg-[#8B5E00]
px-6
py-3
text-sm
font-bold
text-white
transition
hover:bg-[#6F4800]
"

>

Explore Horoscope →

</Link>





</div>


</section>


);


}