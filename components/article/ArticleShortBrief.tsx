interface ArticleShortBriefProps {
  shortBrief: string;
}


export default function ArticleShortBrief({
  shortBrief,
}: ArticleShortBriefProps) {


if(!shortBrief){

return null;

}


return (

<section

className="

my-8

rounded-2xl

border

border-[#163C80]/10

bg-[#163C80]/5

p-6

sm:p-8

"

>


<div

className="

mb-4

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

bg-[#163C80]

"

/>



<p

className="

text-xs

font-semibold

uppercase

tracking-[0.2em]

text-[#163C80]

"

>

Intelligence Brief

</p>



</div>





<p

className="

text-base

leading-8

text-gray-800

sm:text-lg

"

>

{shortBrief}

</p>




</section>

);

}