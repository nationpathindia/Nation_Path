"use client";


interface Props {

  career?: number | null;
  love?: number | null;
  finance?: number | null;
  health?: number | null;

  overallLuck?: number | null;
  mentalPeace?: number | null;
  familyHarmony?: number | null;
  travelLuck?: number | null;

  dayEnergy?: string | null;
  mood?: string | null;
  bestTime?: string | null;
  warning?: string | null;

}



function ProgressBar({

  label,
  value,

}:{

  label:string;
  value:number;

}) {


  const safeValue = Math.min(
    100,
    Math.max(0,value)
  );


  return (

    <div>


      <div className="mb-2 flex justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>


        <span className="text-sm font-semibold text-[#8a6d12]">
          {safeValue}%
        </span>


      </div>



      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-slate-200
        "
      >


        <div

          className="
            h-full
            rounded-full
            bg-[#C9A227]
            transition-all
            duration-700
          "

          style={{
            width:`${safeValue}%`
          }}

        />


      </div>



    </div>

  );

}






export default function PredictionBlocks({

  career,
  love,
  finance,
  health,

  overallLuck,
  mentalPeace,
  familyHarmony,
  travelLuck,

  dayEnergy,
  mood,
  bestTime,
  warning,

}:Props){


return (

<section

 aria-labelledby="prediction-heading"

 className="my-14"

>


<div

 className="
   rounded-2xl
   border
   border-slate-200
   bg-white
   p-6
   md:p-8
 "

>



<div className="mb-8">


<span

className="
 inline-flex
 rounded-full
 border
 border-[#C9A227]/30
 bg-[#C9A227]/10
 px-4
 py-1.5
 text-xs
 font-semibold
 uppercase
 tracking-[0.2em]
 text-[#8a6d12]
"

>

Cosmic Energy Report

</span>





<h2

id="prediction-heading"

className="
mt-5
font-serif
text-3xl
font-bold
text-[#071426]
md:text-4xl
"

>

Today's Prediction Scores

</h2>





<p className="mt-3 text-slate-600">

A numerical overview of today's planetary influence.

</p>



</div>






<div

className="
grid
gap-10
lg:grid-cols-2
"

>



<div className="space-y-6">


<ProgressBar
label="Career"
value={career ?? 50}
/>


<ProgressBar
label="Love"
value={love ?? 50}
/>


<ProgressBar
label="Finance"
value={finance ?? 50}
/>


<ProgressBar
label="Health"
value={health ?? 50}
/>


</div>







<div className="space-y-6">


<ProgressBar
label="Overall Luck"
value={overallLuck ?? 50}
/>


<ProgressBar
label="Mental Peace"
value={mentalPeace ?? 50}
/>


<ProgressBar
label="Family Harmony"
value={familyHarmony ?? 50}
/>


<ProgressBar
label="Travel Luck"
value={travelLuck ?? 50}
/>


</div>



</div>








<div

className="
mt-10
grid
gap-5
sm:grid-cols-2
"

>


<InfoCard
title="Day Energy"
value={dayEnergy ?? "Balanced"}
emoji="⚡"
/>



<InfoCard
title="Mood Forecast"
value={mood ?? "Positive"}
emoji="☀️"
/>



<InfoCard
title="Best Time"
value={bestTime ?? "Throughout the Day"}
emoji="⏰"
/>



<InfoCard
title="Advice"
value={warning ?? "Trust your intuition today."}
emoji="🧿"
/>



</div>





</div>


</section>


);

}






function InfoCard({

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
border-slate-200
bg-[#FAFAF7]
p-5
transition
hover:border-[#C9A227]/40
"

>


<div className="text-3xl">

{emoji}

</div>



<p className="mt-3 text-sm text-slate-500">

{title}

</p>




<p

className="
mt-2
font-semibold
leading-7
text-[#071426]
"

>

{value}

</p>



</div>


);


}