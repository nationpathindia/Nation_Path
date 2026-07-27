interface Props {
  color?: string | null;
  number?: string | null;
  time?: string | null;
  direction?: string | null;
  gemstone?: string | null;
  mantra?: string | null;
  flower?: string | null;
  plant?: string | null;
  food?: string | null;
  metal?: string | null;
}


export default function LuckyInsights({

  color,
  number,
  time,
  direction,
  gemstone,
  mantra,
  flower,
  plant,
  food,
  metal,

}:Props){



const items = [

{
label:"Lucky Color",
value:color ?? "Cosmic Blue",
emoji:"🎨",
},

{
label:"Lucky Number",
value:number ?? "7",
emoji:"🔢",
},

{
label:"Lucky Time",
value:time ?? "Morning Hours",
emoji:"⏰",
},

{
label:"Lucky Direction",
value:direction ?? "North-East",
emoji:"🧭",
},

{
label:"Lucky Gemstone",
value:gemstone ?? "Not specified",
emoji:"💎",
},

{
label:"Today's Mantra",
value:mantra ?? "Om Namah Shivaya",
emoji:"🕉️",
},

{
label:"Lucky Flower",
value:flower ?? "Lotus",
emoji:"🌸",
},

{
label:"Lucky Plant",
value:plant ?? "Tulsi",
emoji:"🌿",
},

{
label:"Lucky Metal",
value:metal ?? "Gold",
emoji:"✨",
},

{
label:"Lucky Food",
value:food ?? "Satvik Food",
emoji:"🍎",
},

];





return (

<section

aria-labelledby="lucky-insights-heading"

className="my-14"

>


<div

className="
rounded-2xl
border
border-slate-200
bg-[#FAFAF7]
p-6
md:p-10
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

Positive Elements

</span>





<h2

id="lucky-insights-heading"

className="
mt-5
font-serif
text-3xl
font-bold
text-[#071426]
md:text-4xl
"

>

Lucky Insights

</h2>





<p

className="
mt-3
max-w-3xl
text-slate-600
"

>

Discover today's positive cosmic energies
and favorable elements.

</p>



</div>








<div

className="
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
"

>


{
items.map((item)=>(


<div

key={item.label}

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
transition
hover:border-[#C9A227]/40
hover:shadow-md
"

>


<div

className="
flex
items-center
gap-4
"

>


<div

className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-[#071426]
text-xl
"

>

{item.emoji}

</div>



<div>


<p

className="
text-xs
uppercase
tracking-wide
text-slate-500
"

>

{item.label}

</p>




<h3

className="
mt-1
font-semibold
text-[#071426]
"

>

{item.value}

</h3>



</div>



</div>




</div>



))
}



</div>





</div>



</section>


);

}