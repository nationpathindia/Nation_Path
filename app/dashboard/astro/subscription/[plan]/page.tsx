import Link from "next/link";
import { notFound } from "next/navigation";
import UpgradeButton from "@/components/astro/dashboard/UpgradeButton";
import {
  getPlanBySlug,
} from "@/lib/subscription/plan.service";


import {
  ArrowLeft,
  Crown,
  Check,
  Sparkles,
} from "lucide-react";



export default async function AstroPremiumPage({

  params,

}:{

  params: Promise<{
    plan:string
  }>

}){


  const { plan: planSlug } =
    await params;



  const plan:any =
    await getPlanBySlug(planSlug);




  if(
    !plan ||
    plan.product !== "astro"
  ){

    notFound();

  }





  return (

<div className="space-y-8">





<Link

href="/dashboard/astro/subscription"

className="
flex
items-center
gap-2
text-sm
text-gray-400
"

>

<ArrowLeft size={16}/>

Back to Subscription

</Link>








<section

className="
rounded-3xl
border
border-yellow-400/20
bg-gradient-to-br
from-yellow-400/10
to-transparent
p-8
"

>


<div className="flex items-center gap-4">



<div

className="
rounded-xl
bg-yellow-400
p-4
"

>

<Crown className="text-black"/>

</div>





<div>


<div className="flex items-center gap-3">


<h1 className="text-3xl font-bold">

{plan.name}

</h1>



{

plan.badge &&

<span

className="
rounded-full
bg-yellow-400
px-3
py-1
text-xs
font-bold
text-black
"

>

{plan.badge}

</span>


}



</div>



<p className="mt-2 text-gray-400">

{
plan.description ||
"Unlock complete astrology intelligence."
}

</p>



</div>



</div>


</section>










<section>


<h2 className="mb-5 text-xl font-bold">

Subscription Details

</h2>





<div

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"

>


<p

className="
text-4xl
font-bold
text-yellow-400
"

>

₹{plan.price}

</p>




<p className="mt-2 text-gray-400">

Validity:

{plan.durationDays}

Days

</p>





<p className="mt-2 text-gray-400">

Billing:

{
plan.billingCycle?.replace("_"," ")
}

</p>





{

plan.isPopular &&

<p className="mt-3 text-sm text-yellow-400">

⭐ Most Popular Plan

</p>

}





<UpgradeButton
  planSlug={plan.slug}
/>



</div>



</section>









<section

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"

>



<h2

className="
flex
items-center
gap-3
text-xl
font-bold
"

>


<Sparkles className="text-yellow-400"/>

What You Get

</h2>








<div

className="
mt-6
grid
gap-4
md:grid-cols-2
"

>


{

plan.features?.map((feature:any)=>(


<div

key={feature._id.toString()}

className="
flex
items-center
gap-3
rounded-xl
bg-white/5
p-4
"

>


<Check

size={18}

className="text-yellow-400"

/>


{feature.name}


</div>


))


}



</div>



</section>







</div>


  );

}