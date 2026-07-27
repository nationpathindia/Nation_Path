import {
  Sparkles,
  Brain,
  Rocket,
  Palette,
  Globe2,
  Code2,
  ShieldCheck,
  Star
} from "lucide-react";



const futureModules = [

{
icon:Brain,
title:"AI Learning Companion",
description:
"Personal AI mentor helping children learn, explore and grow with curiosity."
},


{
icon:Globe2,
title:"World Explorer",
description:
"Discover countries, cultures, geography and civilizations through interactive journeys."
},


{
icon:Code2,
title:"Future Skills",
description:
"Coding, robotics, artificial intelligence and digital creativity."
},


{
icon:Palette,
title:"Creative Studio",
description:
"Stories, art, imagination and expression powered by technology."
},


{
icon:Rocket,
title:"Future Missions",
description:
"Challenges that develop problem solving and innovation mindset."
},


{
icon:ShieldCheck,
title:"Safe Learning Universe",
description:
"A trusted environment designed for young explorers."
}

];






export default function KidsPage(){


return (


<main

className="
min-h-screen
bg-[#050816]
text-white
overflow-hidden
"

>





<section

className="
relative
px-6
py-20
sm:px-10
lg:px-20
"

>


<div

className="
absolute
top-[-150px]
right-[-100px]
h-[350px]
w-[350px]
rounded-full
bg-purple-500/20
blur-[120px]
"

/>



<div

className="
absolute
bottom-[-150px]
left-[-100px]
h-[300px]
w-[300px]
rounded-full
bg-blue-500/20
blur-[120px]
"

/>






<div

className="
relative
max-w-5xl
"

>



<div

className="
flex
items-center
gap-3
text-sm
uppercase
tracking-[0.4em]
text-[#D4AF37]
font-bold
"

>

<Sparkles size={18}/>

NationPath Kids

</div>






<h1

className="
mt-8
text-4xl
sm:text-6xl
lg:text-7xl
font-serif
font-bold
leading-tight
"

>

The Future
of Learning
Begins Here.

</h1>







<p

className="
mt-6
max-w-3xl
text-lg
leading-8
text-white/70
"

>

A next-generation learning universe where children
explore science, creativity, artificial intelligence,
stories and global knowledge through intelligent experiences.

</p>







<div

className="
mt-10
flex
flex-wrap
gap-4
"

>


<button

className="
rounded-full
bg-[#D4AF37]
px-7
py-3
font-bold
text-black
"

>

Coming Soon

</button>




<div

className="
rounded-full
border
border-white/20
px-7
py-3
text-white/80
"

>

Future Platform Preview

</div>



</div>



</div>



</section>









<section

className="
px-6
pb-20
sm:px-10
lg:px-20
"

>


<div

className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
"

>


{

futureModules.map((item)=>{


const Icon=item.icon;


return (

<div

key={item.title}

className="
group
rounded-3xl
border
border-white/10
bg-white/[0.05]
p-7
backdrop-blur
transition
hover:-translate-y-2
hover:border-[#D4AF37]/40
"

>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-[#D4AF37]/10
text-[#D4AF37]
"

>

<Icon size={25}/>

</div>





<h2

className="
mt-6
text-xl
font-bold
"

>

{item.title}

</h2>






<p

className="
mt-3
text-sm
leading-7
text-white/60
"

>

{item.description}

</p>




</div>


);


})


}


</div>


</section>









<section

className="
mx-6
mb-20
rounded-[32px]
border
border-[#D4AF37]/30
bg-gradient-to-br
from-[#D4AF37]/10
to-transparent
p-8
sm:p-12
lg:mx-20
"

>


<div

className="
flex
items-center
gap-3
"

>

<Star className="text-[#D4AF37]" />

<h2

className="
text-2xl
font-serif
font-bold
"

>

Building Tomorrow's Generation

</h2>


</div>




<p

className="
mt-5
max-w-3xl
text-white/70
leading-8
"

>

NationPath Kids will combine knowledge,
technology and imagination into one intelligent
learning ecosystem for the next generation.

</p>



</section>





</main>


);


}