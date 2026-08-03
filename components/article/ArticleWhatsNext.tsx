interface ArticleWhatsNextProps {
  whatsNext: string;
}


export default function ArticleWhatsNext({
  whatsNext,
}: ArticleWhatsNextProps) {


if(!whatsNext){

return null;

}



return (

<section

className="

my-12

rounded-2xl

border

border-orange-200

bg-orange-50

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

bg-[#EA661B]

"

/>



<p

className="

text-xs

font-semibold

uppercase

tracking-[0.2em]

text-[#EA661B]

"

>

What's Next

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

{whatsNext}

</p>




</section>

);

}