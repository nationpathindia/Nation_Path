"use client";


import {
  TrendingUp
} from "lucide-react";



interface Props{

  stats:any;

}



export default function PostsStatsCards({

  stats

}:Props){



const cards=[


{
title:"Total Articles",
value:stats?.totalArticles || 0
},


{
title:"Published",
value:stats?.approvedArticles || 0
},


{
title:"Drafts",
value:stats?.draftArticles || 0
},


{
title:"Pending Review",
value:stats?.pendingArticles || 0
},


{
title:"Breaking News",
value:stats?.breakingArticles || 0
},


{
title:"Featured",
value:stats?.featuredArticles || 0
},


{
title:"Scheduled",
value:stats?.scheduledArticles || 0
},


{
title:"Editorial",
value:stats?.editorialArticles || 0
}


];





return(


<div

className="
grid
grid-cols-2
md:grid-cols-4
xl:grid-cols-8
gap-4
mb-8
"

>


{

cards.map((card)=>(


<div

key={card.title}

className="
group
relative
overflow-hidden
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
px-3
py-2.5
h-[78px]
hover:border-orange-500/40
hover:-translate-y-0.5
hover:shadow-lg
transition-all
duration-300
cursor-pointer
"

>


<div

className="
absolute
right-0
top-0
w-14
h-14
bg-orange-500/10
blur-2xl
rounded-full
"

></div>





<div

className="
relative
z-10
flex
items-center
justify-between
h-full
"

>


<div>


<p

className="
text-[10px]
uppercase
tracking-widest
text-gray-400
"

>

{card.title}

</p>




<h3

className="
text-xl
font-bold
mt-1
text-white
leading-none
"

>

{card.value?.toLocaleString()}

</h3>



</div>






<div

className="
w-6
h-6
rounded-md
bg-white/5
flex
items-center
justify-center
group-hover:bg-orange-500/20
transition
"

>


<TrendingUp

size={12}

className="
text-orange-400
"

/>


</div>



</div>



</div>


))


}



</div>


);


}