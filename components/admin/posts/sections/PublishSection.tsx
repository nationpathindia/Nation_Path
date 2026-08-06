"use client";


import type {
  PostFormData
} from "../types";





interface Props {


  form:PostFormData;


  categories:any[];


  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;


}







export default function PublishSection({


form,


categories,


updateField


}:Props){





return (


<div className="space-y-6">







{/* CATEGORY */}



{

form.postType === "news"

?

(


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Category

</h2>






<select


className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

value={form.categoryId}


onChange={(e)=>

updateField(

"categoryId",

e.target.value

)

}



>


<option value="">


Select Category


</option>





{


categories.map((category)=>(


<option


key={category.id}


value={category.id}


>


{category.name}


</option>


))


}





</select>





</div>


)

:

(


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Category

</h2>





<div

className="
p-3
rounded-xl
bg-black/30
border
border-white/10
"

>

Editorial

</div>





</div>


)


}














{/* SCHEDULE */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Schedule Publish

</h2>






<input


type="datetime-local"


className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"





value={

form.publishedAt

?

form.publishedAt.substring(0,16)

:

""

}





onChange={(e)=>

updateField(

"publishedAt",

e.target.value

)

}





/>





<p className="text-xs text-gray-400 mt-2">

Optional scheduled publishing time

</p>





</div>













{/* STATUS */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Status

</h2>






<select



className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"



value={form.status}





onChange={(e)=>

updateField(

"status",

e.target.value

)

}



>





<option value="draft">

Draft

</option>





<option value="pending">

Pending Review

</option>





<option value="approved">

Approved

</option>





<option value="archived">

Archived

</option>





</select>







<p className="text-xs text-gray-400 mt-2">

Draft → Pending → Published workflow

</p>






</div>













{/* LIVE */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
flex
justify-between
items-center
"

>



<div>


<h2 className="font-semibold">

Frontend Visibility

</h2>





<p className="text-xs text-gray-400">

Controls whether approved content appears publicly

</p>



</div>







<input


type="checkbox"



checked={form.live}



onChange={(e)=>

updateField(

"live",

e.target.checked

)

}





className="
w-5
h-5
"




/>





</div>







</div>


);


}