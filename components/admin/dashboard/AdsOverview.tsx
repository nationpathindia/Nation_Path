"use client";


interface Props {

ads:any;

}



export default function AdsOverview({

ads

}:Props){



return(


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
px-5
py-4
"

>



<div

className="
flex
justify-between
items-center
mb-3
"

>


<h2

className="
text-sm
font-semibold
text-gray-200
"

>

Advertising Intelligence

</h2>



<span

className="
text-xs
text-gray-400
"

>

Live Ads

</span>



</div>







<div

className="
grid
grid-cols-3
gap-4
"

>



<div>

<p className="text-xs text-gray-400">

Active Ads

</p>

<p className="text-xl font-bold">

{ads.activeAds || 0}

</p>

</div>







<div>

<p className="text-xs text-gray-400">

Impressions

</p>

<p className="text-xl font-bold">

{ads.adViews || 0}

</p>

</div>







<div>

<p className="text-xs text-gray-400">

Clicks

</p>

<p className="text-xl font-bold">

{ads.adClicks || 0}

</p>

</div>





</div>





</div>


)

}