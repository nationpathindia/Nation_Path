import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { canAccessFeature } from "@/lib/subscription";

import {
  FileText,
  Lock,
  Download,
  Sparkles,
  CalendarDays,
} from "lucide-react";



const reports = [

  {
    title: "Career Report",
    description:
      "Professional growth, opportunities and career direction.",
    featureKey:
      "career-report",
  },


  {
    title: "Marriage Report",
    description:
      "Relationship compatibility and marriage analysis.",
    featureKey:
      "marriage-report",
  },


  {
    title: "Finance Report",
    description:
      "Money patterns, wealth potential and financial guidance.",
    featureKey:
      "finance-report",
  },


  {
    title: "Health Report",
    description:
      "Health related astrology insights.",
    featureKey:
      "health-report",
  },


  {
    title: "Detailed Kundali Analysis",
    description:
      "Advanced kundali and planetary analysis.",
    featureKey:
      "detailed-kundali-analysis",
  },


  {
    title: "AI Astrology Guidance",
    description:
      "AI powered astrology assistant.",
    featureKey:
      "ai-astrology-guidance",
  },


];




const history = [

  {
    name:
      "Basic Kundali Summary",

    date:
      "16 July 2026",

    status:
      "Generated",

  },

];





export default async function AstroReportsPage(){



  const session =
    await getServerSession(authOptions);



  const userId =
    session?.user?.id;



  const reportAccess =
    userId

    ?

    await Promise.all(

      reports.map(

        async(report)=>({

          ...report,


          unlocked:
            await canAccessFeature(
              userId,
              report.featureKey
            ),


        })

      )

    )

    :

    [];







return (

<div className="space-y-8">





<section>

<h1 className="text-3xl font-bold">
Astro Reports ✨
</h1>


<p className="mt-2 text-gray-400">

Access your personalized astrology
reports and intelligence insights.

</p>


</section>









<section>


<h2 className="mb-5 text-xl font-bold">

Available Reports

</h2>





<div
className="
grid
gap-6
md:grid-cols-2
"
>



{

reportAccess.map((report)=>(



<div

key={report.featureKey}

className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-6
"

>




<div
className="
flex
items-center
justify-between
"
>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-yellow-400/10
"

>

<FileText
className="text-yellow-400"
/>


</div>





{

!report.unlocked &&

<Lock

size={18}

className="text-yellow-400"

/>

}


</div>







<h3
className="
mt-5
text-lg
font-bold
"
>

{report.title}

</h3>





<p
className="
mt-2
text-sm
text-gray-400
"
>

{report.description}

</p>








<Link

href={

report.unlocked

?

`/dashboard/astro/reports/${report.featureKey}`

:

"/dashboard/astro/subscription"

}


className="
mt-5
block
w-full
rounded-xl
border
border-yellow-400/30
bg-yellow-400/10
py-3
text-center
text-sm
font-semibold
text-yellow-400
"

>


{

report.unlocked

?

"Generate Report"

:

"Unlock Premium Report"

}



</Link>







</div>


))

}




</div>



</section>









<section>


<h2 className="mb-5 text-xl font-bold">

Report History

</h2>





{

history.map((item)=>(


<div

key={item.name}

className="
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-white/5
p-5
"

>


<div
className="
flex
items-center
gap-4
"
>


<Sparkles
className="text-yellow-400"
/>



<div>


<h3 className="font-semibold">

{item.name}

</h3>



<p

className="
flex
items-center
gap-2
text-xs
text-gray-400
"

>

<CalendarDays size={14}/>

{item.date}

</p>


</div>


</div>





<button

className="
rounded-xl
bg-white/10
p-3
"

>

<Download size={18}/>

</button>




</div>



))


}



</section>









<section

className="
rounded-3xl
border
border-yellow-400/20
bg-gradient-to-r
from-yellow-400/10
to-transparent
p-8
"

>


<div
className="
flex
gap-3
"
>


<Sparkles
className="text-yellow-400"
/>



<div>


<h2 className="text-xl font-bold">

Unlock Complete Astro Intelligence

</h2>



<p
className="
mt-2
text-sm
text-gray-400
"
>

Get detailed reports powered by
premium astrology analysis.

</p>



</div>



</div>



</section>





</div>


);


}