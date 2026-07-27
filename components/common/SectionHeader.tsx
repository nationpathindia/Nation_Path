interface SectionHeaderProps {
  title:string;
}


export default function SectionHeader({
  title,
}:SectionHeaderProps){


return (

<div

className="
mb-6
"

>


<div

className="
flex
items-center
gap-4
"

>


<h2
className="
shrink-0
text-xs
sm:text-sm
tracking-[0.35em]
uppercase
font-semibold
text-[#111]
whitespace-nowrap
"
>

{title}

</h2>




<div

className="
flex-1
h-px
bg-black/10
"

/>



</div>






<div

className="
mt-3
flex
items-center
gap-2
"

>

<div

className="
w-10
h-[2px]
bg-[#b8862d]
"

/>


<div

className="
w-2
h-[2px]
bg-black/20
"

/>


</div>






</div>

);

}