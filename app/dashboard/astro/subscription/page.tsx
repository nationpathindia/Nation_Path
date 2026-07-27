import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Subscription from "@/app/models/Subscription";

import {
  getPlansByProduct,
  getDefaultPlan,
} from "@/lib/subscription/plan.service";

import {
  Crown,
  Check,
  Sparkles,
  CalendarDays,
  Star,
} from "lucide-react";


export default async function AstroSubscriptionPage() {


  const session =
    await getServerSession(authOptions);



  const userSubscription =
    session?.user?.id

      ?

      await Subscription.findOne({

        userId: session.user.id,

        product:"astro",

        status:"active",

      })
      .populate({

        path:"planId",

        populate:{

          path:"features",

        },

      })


      :

      null;





  const plans =
    await getPlansByProduct("astro");





  let currentPlan:any =
    userSubscription?.planId;





  // Free User Default Access

  if(!currentPlan){

    currentPlan =
      await getDefaultPlan("astro");

  }





  return (

<div className="space-y-10">





{/* HEADER */}

<section>


<div className="flex items-center gap-3">


<Crown
size={32}
className="text-yellow-400"
/>


<h1 className="text-3xl font-bold">

Astro Subscription

</h1>


</div>



<p className="mt-3 text-gray-400">

Choose the right astrology plan and unlock
personalized cosmic guidance.

</p>



</section>








{/* CURRENT PLAN */}

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


<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">



<div>


<p className="text-sm text-gray-400">

Current Membership

</p>



<h2 className="mt-2 text-3xl font-bold">

{currentPlan?.name ?? "Free Astro"}

</h2>



<p className="mt-2 text-gray-400">

{
userSubscription

?

"Your Astro membership is active"

:

"Currently using free astro access"

}

</p>



</div>





<div

className="
rounded-2xl
border
border-yellow-400/30
bg-yellow-400/10
px-6
py-4
"

>


<p className="text-xs text-gray-400">

Status

</p>


<p

className="
mt-1
font-bold
text-yellow-400
"

>


{
userSubscription

?

"ACTIVE"

:

"FREE"

}


</p>



</div>



</div>







{
userSubscription?.expiryDate &&


<div

className="
mt-6
flex
items-center
gap-3
text-sm
text-gray-300
"

>


<CalendarDays size={18}/>


Valid till:

{
new Date(
userSubscription.expiryDate
)
.toDateString()
}



</div>


}



</section>










{/* PLANS */}


<section>



<div className="mb-6">


<h2 className="text-2xl font-bold">

Choose Your Plan

</h2>


<p className="mt-2 text-gray-400">

Compare plans and select the best astrology experience.

</p>


</div>







<div

className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-4
"

>


{


plans.map((plan:any)=>(



<div

key={plan._id.toString()}


className={`

relative
rounded-3xl
border
p-6
transition
hover:-translate-y-1


${

plan.isPopular

?

"border-yellow-400 bg-yellow-400/10 shadow-lg"

:

"border-white/10 bg-white/5"

}



${

currentPlan?._id?.toString()
===
plan._id.toString()

?

"ring-2 ring-yellow-400"

:

""

}


`}


>






{


(plan.badge || plan.isPopular) &&



<div

className="
absolute
right-5
top-5
flex
items-center
gap-1
rounded-full
bg-yellow-400
px-3
py-1
text-xs
font-bold
text-black
"

>


<Star size={12}/>


{
plan.badge || "Popular"
}


</div>



}





<h3 className="text-xl font-bold">

{plan.name}

</h3>





<p className="mt-3 text-sm text-gray-400">

{
plan.shortDescription ||
plan.description
}


</p>








<div className="mt-6">


<span

className="
text-4xl
font-bold
text-yellow-400
"

>

₹{plan.price}

</span>


<span className="ml-2 text-sm text-gray-400">

/
{
plan.billingCycle?.replace("_"," ")
}

</span>


</div>






<p className="mt-2 text-sm text-gray-400">

Validity:

{plan.durationDays}

Days

</p>








<div className="mt-6 space-y-3">


{

plan.features?.map((feature:any)=>(


<div

key={feature._id.toString()}

className="
flex
items-center
gap-3
text-sm
text-gray-300
"

>


<Check

size={16}

className="text-yellow-400"

/>


{feature.name}


</div>


))


}


</div>








<Link

href={`/dashboard/astro/subscription/${plan.slug}`}

className="
mt-8
block
w-full
rounded-xl
bg-yellow-400
py-3
text-center
font-semibold
text-black
transition
hover:bg-yellow-300
"

>

{

currentPlan?._id?.toString()
===
plan._id.toString()

?

"Current Plan"

:

"Choose Plan"

}

</Link>




</div>



))


}



</div>



</section>










{/* FEATURES */}



<section

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"

>


<div className="flex items-center gap-3">


<Sparkles className="text-yellow-400"/>


<h2 className="text-xl font-bold">

Your Astro Features

</h2>


</div>





<div className="mt-6 grid gap-4 md:grid-cols-2">


{


currentPlan?.features?.map((feature:any)=>(


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