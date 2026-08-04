type Props = {

  highlights:any;

};





export default function EditorialHighlights({

highlights

}:Props){

  console.log(
  "EDITORIAL HIGHLIGHTS DATA",
  highlights
);



if(

!highlights ||

!Array.isArray(highlights) ||

highlights.length === 0

){

return null;

}



return (

<section

className="
rounded-2xl
border
border-gray-200
bg-white
p-6
shadow-sm
"

>



<div

className="
mb-6
flex
items-center
gap-3
"

>

<div

className="
h-8
w-1
rounded-full
bg-[#EA661B]
"

/>



<div>

<h2

className="
text-2xl
font-bold
text-gray-900
"

>

Key Highlights

</h2>


<p

className="
mt-1
text-sm
text-gray-500
"

>

Important points from this analysis

</p>


</div>


</div>







<div

className="
space-y-4
"

>


{

highlights.map(

(item:any,index:number)=>(


<div

key={index}

className="
rounded-xl
border
border-gray-100
bg-gray-50
p-5
"

>



<div

className="
mb-3
text-xs
font-semibold
uppercase
tracking-wider
text-[#EA661B]
"

>

Highlight {String(index + 1).padStart(2,"0")}

</div>








{

typeof item === "string"

?

(

<p

className="
text-gray-700
leading-relaxed
"

>

{item}

</p>

)

:

(

<>


{

item?.title &&

<h3

className="
mb-2
text-lg
font-semibold
text-gray-900
"

>

{item.title}

</h3>

}






<p

className="
text-gray-700
leading-relaxed
"

>

{

item?.description ||

item?.text ||

item?.content ||

""

}

</p>


</>

)

}





</div>


)

)


}



</div>







</section>

);

}