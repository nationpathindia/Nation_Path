"use client";


import type {
  PostFormData
} from "../types";






interface Props {


  form:PostFormData;


  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;


}








export default function ControlsSection({


form,


updateField


}:Props){





/*
 EDITORIAL DOES NOT USE NEWS CONTROLS
*/


if(form.postType==="editorial"){


return null;


}









return (



<div


className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-6
"

>







<h2 className="font-semibold">

News Controls

</h2>









{/* BREAKING */}



<div

className="
flex
justify-between
items-center
"

>



<div>


<p className="text-sm">

Breaking News

</p>


<p className="text-xs text-gray-400">

Show in breaking bar

</p>


</div>





<input


type="checkbox"


checked={form.breaking}



onChange={(e)=>

updateField(

"breaking",

e.target.checked

)

}


/>



</div>









{
form.breaking &&



<div className="space-y-3">



<label className="text-xs text-gray-400">

Breaking Duration

</label>





<select


className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={form.breakingDuration}



onChange={(e)=>

updateField(

"breakingDuration",

e.target.value

)

}



>


<option value="30">

30 Minutes

</option>


<option value="60">

1 Hour

</option>


<option value="180">

3 Hours

</option>


<option value="1440">

24 Hours

</option>


</select>



</div>


}









{/* FEATURED */}



<div

className="
flex
justify-between
items-center
"

>



<div>


<p className="text-sm">

Featured Article

</p>


<p className="text-xs text-gray-400">

Homepage featured placement

</p>


</div>





<input


type="checkbox"


checked={form.featured}



onChange={(e)=>

updateField(

"featured",

e.target.checked

)

}


/>



</div>









{
form.featured &&



<div className="space-y-3">



<label className="text-xs text-gray-400">

Featured Duration

</label>





<select


className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={form.featuredDuration}



onChange={(e)=>

updateField(

"featuredDuration",

e.target.value

)

}



>


<option value="24">

24 Hours

</option>


<option value="48">

48 Hours

</option>


<option value="72">

72 Hours

</option>



</select>



</div>


}









{/* PRIORITY */}



<div className="grid md:grid-cols-2 gap-4">



<div>


<label className="text-xs text-gray-400">

Breaking Priority

</label>



<input


type="number"


className="
w-full
mt-2
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={form.breakingPriority}



onChange={(e)=>

updateField(

"breakingPriority",

Number(e.target.value)

)

}


/>



</div>







<div>


<label className="text-xs text-gray-400">

Homepage Priority

</label>



<input


type="number"


className="
w-full
mt-2
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={form.homepagePriority}



onChange={(e)=>

updateField(

"homepagePriority",

Number(e.target.value)

)

}


/>



</div>





</div>









</div>



);


}