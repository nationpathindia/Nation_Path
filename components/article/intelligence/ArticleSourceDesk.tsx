interface ArticleSourceDeskProps {

  sourceDesk:string;

}



export default function ArticleSourceDesk({

  sourceDesk,

}:ArticleSourceDeskProps){


if(
  !sourceDesk ||
  !sourceDesk.trim()
){

  return null;

}



return (

<div

className="
relative
overflow-hidden
rounded-2xl
border
border-gray-200
bg-gradient-to-br
from-gray-50
to-white
p-6
"

>


<div

className="
absolute
right-5
top-4
text-5xl
font-serif
text-gray-100
"

>

"

</div>




<div

className="
relative
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[0.18em]
text-[#EA661B]
"

>

Editorial Source

</p>




<h4

className="
mt-3
text-lg
font-bold
text-gray-900
"

>

{sourceDesk}

</h4>




<div

className="
mt-4
flex
items-center
gap-2
text-sm
text-gray-500
"

>


<span

className="
h-2
w-2
rounded-full
bg-green-500
"

/>


Verified Editorial Desk



</div>



</div>



</div>


);

}