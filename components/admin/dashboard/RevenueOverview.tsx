"use client";


interface Props{

revenue:any;

}



export default function RevenueOverview({

revenue

}:Props){


return(

<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
p-6
"

>


<h2 className="
text-lg
font-semibold
mb-5
">

Stripe Revenue

</h2>



<div className="
grid
grid-cols-4
gap-4
">



<div>

<p className="text-2xl font-bold">

₹{revenue?.revenueToday || 0}

</p>

<span className="text-gray-400 text-sm">

Today

</span>

</div>



<div>

<p className="text-2xl font-bold">

₹{revenue?.mrr || 0}

</p>

<span className="text-gray-400 text-sm">

MRR

</span>

</div>



<div>

<p className="text-2xl font-bold">

{revenue?.activeSubscriptions || 0}

</p>

<span className="text-gray-400 text-sm">

Subscriptions

</span>

</div>



<div>

<p className="text-2xl font-bold">

{revenue?.status || "Offline"}

</p>

<span className="text-gray-400 text-sm">

Stripe Status

</span>

</div>


</div>



</div>

)


}