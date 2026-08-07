interface ArticleWhatsNextProps {

  whatsNext:string;

}



export default function ArticleWhatsNext({

  whatsNext,

}:ArticleWhatsNextProps){



if(

  !whatsNext

  ||

  !whatsNext.trim()

){

  return null;

}





return (

<div

className="
mx-auto
my-10
w-full
md:w-[85%]
"

>


<section

className="
relative
overflow-hidden
rounded-xl
border
border-orange-200
bg-gradient-to-br
from-orange-50
via-white
to-white
p-5
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* ORANGE ACCENT */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#EA661B]
"

/>





<div

className="
pl-5
"

>



{/* HEADER */}

<div

className="
mb-4
"

>


<p

className="
text-[11px]
font-bold
uppercase
tracking-[0.22em]
text-[#EA661B]
"

>

Future Outlook

</p>



<h2

className="
mt-1
text-2xl
font-black
tracking-tight
text-[#EA661B]
"

>

What's Next

</h2>





{/* THREE SHADE MARK */}

<div

className="
mt-4
flex
items-center
gap-2
"

>


<div

className="
h-1
w-10
rounded-full
bg-[#EA661B]
"

/>



<div

className="
h-1
w-10
rounded-full
bg-orange-300
"

/>



<div

className="
h-1
w-10
rounded-full
bg-orange-100
"

/>



</div>



</div>







{/* CONTENT */}

<p

className="
text-[15px]
leading-8
text-gray-700
sm:text-[16px]
"

>

{whatsNext}

</p>



</div>



</section>



</div>

);

}