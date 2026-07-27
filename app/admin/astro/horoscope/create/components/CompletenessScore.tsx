//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// COMPLETENESS SCORE COMPONENT
//
// Responsibility:
// Show CMS content completion progress
//
// Does NOT:
// - save data
// - validate business rules
// - call API
// - calculate astrology
//////////////////////////////////////////////////////////////

"use client";



interface CompletenessScoreProps {


  form:any;


}







export default function CompletenessScore({

  form,

}:CompletenessScoreProps){



const calculateScore = ()=>{


const sections = [


form?.hero?.title,

form?.identity?.description,

form?.editorial?.headline,

form?.editorial?.prediction,

form?.life?.career,

form?.life?.love,

form?.life?.finance,

form?.life?.health,

form?.insights?.planetaryInfluence,

form?.remedy?.title,

form?.premium?.title,

form?.seo?.title,


];




const completed = sections.filter(

(item)=>

item &&

String(item).trim().length>0

).length;





return Math.round(

(completed / sections.length) * 100

);



};






const score = calculateScore();






return (

<div

className="
rounded-2xl
border
border-white/10
bg-black/30
p-5
space-y-4
"

>



<div

className="
flex
items-center
justify-between
"

>


<div>


<p

className="
text-sm
text-gray-400
"

>

CMS Completeness

</p>



<h3

className="
text-2xl
font-bold
text-white
"

>

{score}%

</h3>


</div>





<div

className="
text-right
"

>


<p

className="
text-xs
uppercase
tracking-wider
text-gray-500
"

>

Experience Ready

</p>



<p

className="
mt-1
text-sm
font-semibold
text-yellow-400
"

>

{

score >= 80

?

"Premium Ready"

:

score >= 50

?

"Needs Content"

:

"Draft Stage"

}

</p>


</div>



</div>








<div

className="
h-2
overflow-hidden
rounded-full
bg-white/10
"

>


<div

className="
h-full
rounded-full
bg-gradient-to-r
from-yellow-400
to-orange-500
transition-all
duration-500
"

style={{

width:`${score}%`

}}

/>


</div>





</div>

);


}