interface Props {
  planetInfluence?: string | null;

  currentTransit?: string | null;

  moonSign?: string | null;
  sunSign?: string | null;
  ascendant?: string | null;
  moonPhase?: string | null;

  mercuryStatus?: string | null;
  venusStatus?: string | null;
  marsStatus?: string | null;
  jupiterStatus?: string | null;
  saturnStatus?: string | null;
  rahuStatus?: string | null;
  ketuStatus?: string | null;
}


const planets = [
  {
    key: "mercuryStatus",
    name: "Mercury",
    emoji: "☿️",
  },
  {
    key: "venusStatus",
    name: "Venus",
    emoji: "♀️",
  },
  {
    key: "marsStatus",
    name: "Mars",
    emoji: "♂️",
  },
  {
    key: "jupiterStatus",
    name: "Jupiter",
    emoji: "♃",
  },
  {
    key: "saturnStatus",
    name: "Saturn",
    emoji: "♄",
  },
  {
    key: "rahuStatus",
    name: "Rahu",
    emoji: "☊",
  },
  {
    key: "ketuStatus",
    name: "Ketu",
    emoji: "☋",
  },
];



export default function PlanetaryInfluence({

  planetInfluence,
  currentTransit,

  moonSign,
  sunSign,
  ascendant,
  moonPhase,

  mercuryStatus,
  venusStatus,
  marsStatus,
  jupiterStatus,
  saturnStatus,
  rahuStatus,
  ketuStatus,

}:Props){



const data:Record<string,string|null|undefined> = {

mercuryStatus,
venusStatus,
marsStatus,
jupiterStatus,
saturnStatus,
rahuStatus,
ketuStatus,

};




return (

<section

aria-labelledby="planetary-heading"

className="my-14"

>


<div

className="
overflow-hidden
rounded-2xl
bg-[#071426]
p-6
text-white
md:p-10
"

>



<div className="mb-10">


<span

className="
inline-flex
rounded-full
border
border-[#C9A227]/40
bg-[#C9A227]/10
px-4
py-1.5
text-xs
font-semibold
uppercase
tracking-[0.2em]
text-[#E8C75A]
"

>

Cosmic Intelligence

</span>




<h2

id="planetary-heading"

className="
mt-5
font-serif
text-3xl
font-bold
md:text-4xl
"

>

Planetary Influence

</h2>





<p

className="
mt-4
max-w-3xl
leading-8
text-slate-300
"

>

{
planetInfluence ??
"Planetary movements are shaping today's cosmic energies."
}

</p>



</div>







<div

className="
grid
gap-5
md:grid-cols-2
"

>


<CosmicCard
title="Current Transit"
value={currentTransit ?? "Active planetary movement"}
emoji="🌌"
/>


<CosmicCard
title="Moon Sign"
value={moonSign ?? "Calculating"}
emoji="🌙"
/>


<CosmicCard
title="Sun Sign"
value={sunSign ?? "Calculating"}
emoji="☀️"
/>


<CosmicCard
title="Ascendant"
value={ascendant ?? "Calculating"}
emoji="✨"
/>


<CosmicCard
title="Moon Phase"
value={moonPhase ?? "Current lunar phase"}
emoji="🌒"
/>


</div>







<div

className="
mt-10
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
"

>


{
planets.map((planet)=>(


<div

key={planet.key}

className="
rounded-2xl
border
border-white/10
bg-white/[0.04]
p-5
transition
hover:border-[#C9A227]/40
"

>


<div className="flex items-center gap-3">


<span className="text-2xl">

{planet.emoji}

</span>



<h3 className="font-semibold">

{planet.name}

</h3>



</div>




<p

className="
mt-3
text-sm
leading-6
text-slate-300
"

>

{
data[planet.key] ??
"Balanced influence"
}

</p>




</div>



))
}



</div>





</div>



</section>


);

}







function CosmicCard({

title,
value,
emoji,

}:{
title:string;
value:string;
emoji:string;
}){


return (

<div

className="
rounded-2xl
border
border-white/10
bg-white/[0.04]
p-5
"

>


<div className="text-3xl">

{emoji}

</div>



<p

className="
mt-3
text-sm
text-slate-400
"

>

{title}

</p>




<p

className="
mt-1
font-semibold
text-white
"

>

{value}

</p>



</div>


);

}