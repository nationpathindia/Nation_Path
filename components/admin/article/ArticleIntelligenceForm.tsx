"use client";


interface Props {

  form:any;

  updateField:
  (
    key:string,
    value:any
  )=>void;

}




export default function ArticleIntelligenceForm({

  form,

  updateField

}:Props){





/* =====================================================
   SAFE NORMALIZATION
===================================================== */


const expertOpinion =

Array.isArray(form.expertOpinion)

?

form.expertOpinion

:

[];



const factCheck =

Array.isArray(form.factCheck)

?

form.factCheck

:

[];



const keyTakeaways =

Array.isArray(form.keyTakeaways)

?

form.keyTakeaways

:

[];

const timeline =

Array.isArray(form.timeline)

?

form.timeline

:

[];






/* =====================================================
   EXPERT HANDLERS
===================================================== */


function addExpert(){


updateField(

"expertOpinion",

[

...expertOpinion,

{

name:"",

role:"",

quote:"",

opinion:""

}

]

);


}





function updateExpert(

index:number,

key:string,

value:string

){


updateField(

"expertOpinion",

expertOpinion.map(

(item:any,i:number)=>

i===index

?

{

...item,

[key]:value

}

:

item

)

);


}




function removeExpert(index:number){


updateField(

"expertOpinion",

expertOpinion.filter(

(_:any,i:number)=>

i!==index

)

);


}

/* =====================================================
   TIMELINE HANDLERS
===================================================== */

function addTimeline(){

updateField(
"timeline",
[
...timeline,
{
date:"",
title:"",
description:""
}
]
);

}


function updateTimeline(
index:number,
key:string,
value:string
){

updateField(
"timeline",
timeline.map(
(item:any,i:number)=>

i===index
?
{
...item,
[key]:value
}
:
item

)
);

}


function removeTimeline(index:number){

updateField(
"timeline",
timeline.filter(
(_:any,i:number)=>
i!==index
)
);

}





return (

<>



{/* =====================================================
    SHORT BRIEF
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Short Brief

</h2>



<textarea

className="
w-full
h-28
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="2-4 line quick summary..."

value={form.shortBrief || ""}


onChange={(e)=>

updateField(

"shortBrief",

e.target.value

)

}

/>


</div>



{/* =====================================================
    KEY HIGHLIGHTS
===================================================== */}

<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div

className="
flex
justify-between
items-center
mb-5
"

>


<h2 className="font-semibold">

Key Highlights ⭐

</h2>





<button

type="button"


disabled={
(
Array.isArray(form.keyHighlights)

?

form.keyHighlights

:

[]

).length >= 7
}


onClick={()=>{


const currentHighlights =

Array.isArray(form.keyHighlights)

?

form.keyHighlights

:

[];




if(currentHighlights.length >= 7){

return;

}




updateField(

"keyHighlights",

[

...currentHighlights,

""

]

);



}}


className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
disabled:opacity-40
"

>


+ Add Highlight


</button>



</div>









{

(

Array.isArray(form.keyHighlights)

?

form.keyHighlights

:

[]

).map(

(item:string,index:number)=>(



<div

key={index}

className="
flex
gap-3
mb-4
items-center
"

>





<div

className="
w-8
h-8
rounded-full
bg-orange-600/20
text-orange-400
flex
items-center
justify-center
text-sm
font-semibold
"

>

{index+1}

</div>









<input

className="
flex-1
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder={`Highlight ${index+1}`}



value={item || ""}



onChange={(e)=>{


const updated =

[

...(form.keyHighlights || [])

];




updated[index] = e.target.value;



updateField(

"keyHighlights",

updated

);



}}



/>









<button

type="button"


disabled={
(
Array.isArray(form.keyHighlights)

?

form.keyHighlights

:

[]

).length <= 1
}


onClick={()=>{


updateField(

"keyHighlights",

form.keyHighlights.filter(

(_:string,i:number)=>

i!==index

)

);



}}



className="
text-red-400
px-3
disabled:opacity-30
"

>


Remove


</button>







</div>



)

)



}









{

(

Array.isArray(form.keyHighlights)

?

form.keyHighlights.length

:

0

)

=== 0

&&


<p className="
text-gray-400
text-sm
"

>

No highlights added yet. Add 5-7 important story points.

</p>



}





{

Array.isArray(form.keyHighlights)

&&

form.keyHighlights.length >= 7

&&


<p className="
text-xs
text-orange-400
mt-3
"

>

Maximum 7 key highlights reached.

</p>



}



</div>

{/* =====================================================
    WHY IT MATTERS
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Why It Matters ⭐⭐⭐

</h2>



<textarea

className="
w-full
h-36
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Explain why this story matters to readers..."

value={form.whyItMatters || ""}


onChange={(e)=>

updateField(

"whyItMatters",

e.target.value

)

}

/>


</div>









{/* =====================================================
    BACKGROUND
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Background

</h2>



<textarea

className="
w-full
h-40
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Historical context..."

value={form.background || ""}


onChange={(e)=>

updateField(

"background",

e.target.value

)

}

/>


</div>





{/* =====================================================
    TIMELINE
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>

<h2 className="font-semibold mb-4">
Timeline
</h2>


<div className="space-y-4">

{
timeline.map(
(item:any,index:number)=>(

<div
key={index}
className="
rounded-xl
border
border-white/10
bg-black/20
p-4
"
>

<input
className="
w-full
mb-3
p-3
rounded-lg
bg-black/30
border
border-white/10
"
placeholder="Year / Period"
value={item.date || ""}
onChange={(e)=>
updateTimeline(
index,
"date",
e.target.value
)
}
/>


<input
className="
w-full
mb-3
p-3
rounded-lg
bg-black/30
border
border-white/10
"
placeholder="Event Title"
value={item.title || ""}
onChange={(e)=>
updateTimeline(
index,
"title",
e.target.value
)
}
/>


<textarea
className="
w-full
p-3
rounded-lg
bg-black/30
border
border-white/10
"
placeholder="Description"
value={item.description || ""}
onChange={(e)=>
updateTimeline(
index,
"description",
e.target.value
)
}
/>


<button
type="button"
onClick={()=>
removeTimeline(index)
}
className="
mt-3
text-sm
text-red-400
"
>
Remove
</button>


</div>

)

)
}


<button
type="button"
onClick={addTimeline}
className="
rounded-xl
bg-[#EA661B]
px-4
py-2
font-semibold
"
>
+ Add Timeline Event
</button>


</div>

</div>









{/* =====================================================
    EXPERT PERSPECTIVE
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div

className="
flex
justify-between
mb-5
"

>


<h2 className="font-semibold">

Expert Perspective

</h2>



<button

type="button"

onClick={addExpert}

className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
"

>

+ Add Expert

</button>


</div>







{

expertOpinion.map(

(item:any,index:number)=>(


<div

key={index}

className="
mb-6
p-5
rounded-xl
bg-black/20
border
border-white/10
"

>


<div

className="
flex
justify-between
mb-4
"

>


<span className="text-orange-400">

Expert {index+1}

</span>



<button

type="button"

onClick={()=>removeExpert(index)}

className="
text-red-400
"

>

Remove

</button>


</div>







<input

className="
w-full
p-3
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Expert Name"

value={item.name || ""}


onChange={(e)=>

updateExpert(

index,

"name",

e.target.value

)

}

/>







<input

className="
w-full
p-3
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Designation / Role"

value={item.role || ""}


onChange={(e)=>

updateExpert(

index,

"role",

e.target.value

)

}

/>







<textarea

className="
w-full
h-28
p-4
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Expert Quote"

value={item.quote || ""}


onChange={(e)=>

updateExpert(

index,

"quote",

e.target.value

)

}

/>









<textarea

className="
w-full
h-28
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Expert Opinion"

value={item.opinion || ""}


onChange={(e)=>

updateExpert(

index,

"opinion",

e.target.value

)

}

/>



</div>


)

)


}



</div>







{/* =====================================================
    FACT CHECK
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div

className="
flex
justify-between
mb-5
"

>


<h2 className="font-semibold">

Fact Check

</h2>



<button

type="button"

onClick={()=>


updateField(

"factCheck",

[

...factCheck,

{

claim:"",

status:"",

explanation:"",

sources:""

}

]

)


}

className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
"

>

+ Add Fact

</button>


</div>







{

factCheck.map(

(item:any,index:number)=>(


<div

key={index}

className="
mb-6
p-5
rounded-xl
bg-black/20
border
border-white/10
"

>


<div

className="
flex
justify-between
mb-4
"

>


<span className="text-orange-400">

Fact {index+1}

</span>



<button

type="button"

onClick={()=>


updateField(

"factCheck",

factCheck.filter(

(_:any,i:number)=>

i!==index

)

)


}

className="
text-red-400
"

>

Remove

</button>


</div>








<input

className="
w-full
p-3
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Claim"

value={item.claim || ""}


onChange={(e)=>


updateField(

"factCheck",

factCheck.map(

(f:any,i:number)=>

i===index

?

{

...f,

claim:e.target.value

}

:

f

)

)


}

/>









<select

className="
w-full
p-3
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

value={item.status || ""}


onChange={(e)=>


updateField(

"factCheck",

factCheck.map(

(f:any,i:number)=>

i===index

?

{

...f,

status:e.target.value

}

:

f

)

)


}

>


<option value="">

Select Status

</option>


<option value="True">

True

</option>


<option value="Mostly True">

Mostly True

</option>


<option value="Partly True">

Partly True

</option>


<option value="Misleading">

Misleading

</option>


<option value="False">

False

</option>


<option value="Unverified">

Unverified

</option>


</select>








<textarea

className="
w-full
h-28
p-4
mb-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Explanation"

value={item.explanation || ""}


onChange={(e)=>


updateField(

"factCheck",

factCheck.map(

(f:any,i:number)=>

i===index

?

{

...f,

explanation:e.target.value

}

:

f

)

)


}

/>








<textarea

className="
w-full
h-24
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Sources"

value={item.sources || ""}


onChange={(e)=>


updateField(

"factCheck",

factCheck.map(

(f:any,i:number)=>

i===index

?

{

...f,

sources:e.target.value

}

:

f

)

)


}

/>


</div>


)

)


}



</div>












{/* =====================================================
    KEY TAKEAWAYS
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div

className="
flex
justify-between
mb-5
"

>


<h2 className="font-semibold">

Key Takeaways

</h2>



<button

type="button"

onClick={()=>


updateField(

"keyTakeaways",

[

...keyTakeaways,

""

]

)


}

className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
"

>

+ Add Point

</button>


</div>








{

keyTakeaways.map(

(item:string,index:number)=>(


<div

key={index}

className="
flex
gap-3
mb-3
"

>


<input

className="
flex-1
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder={`Takeaway ${index+1}`}


value={item || ""}


onChange={(e)=>


updateField(

"keyTakeaways",

keyTakeaways.map(

(v:string,i:number)=>

i===index

?

e.target.value

:

v

)

)


}

/>





<button

type="button"

onClick={()=>


updateField(

"keyTakeaways",

keyTakeaways.filter(

(_:string,i:number)=>

i!==index

)

)


}

className="
text-red-400
px-3
"

>

×

</button>



</div>


)

)


}



</div>







{/* =====================================================
    WHAT'S NEXT
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

What's Next

</h2>




<textarea

className="
w-full
h-32
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="
Future developments,
policy direction,
upcoming impact...
"


value={form.whatsNext || ""}


onChange={(e)=>

updateField(

"whatsNext",

e.target.value

)

}

/>


</div>









{/* =====================================================
    SOURCE DESK
===================================================== */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Source Desk

</h2>




<textarea

className="
w-full
h-32
p-4
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="
Sources reviewed:

Official reports

Government publications

Research papers
"


value={form.sourceDesk || ""}


onChange={(e)=>

updateField(

"sourceDesk",

e.target.value

)

}

/>


</div>






</>

);


}