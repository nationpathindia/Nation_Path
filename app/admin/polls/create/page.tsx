"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";




export default function CreatePollPage(){


const router = useRouter();


const [loading,setLoading] =
useState(false);


const [error,setError] =
useState("");



const [form,setForm] =
useState({

question:"",

category:"",

options:[

"",
""

],

status:"published"

});







function updateField(
key:string,
value:string
){

setForm(prev=>({

...prev,

[key]:value

}));

}








function updateOption(
index:number,
value:string
){


const options =
[...form.options];


options[index]=value;


setForm(prev=>({

...prev,

options

}));


}









function addOption(){


if(form.options.length>=6)
return;



setForm(prev=>({

...prev,

options:[

...prev.options,

""

]

}));


}









function removeOption(
index:number
){


if(form.options.length<=2)
return;



setForm(prev=>({

...prev,

options:

prev.options.filter(
(_,i)=>i!==index
)

}));


}











async function submit(){


setError("");



const cleanOptions =

form.options

.map(
(item)=>item.trim()
)

.filter(Boolean);






if(!form.question.trim()){

setError(
"Poll question required"
);

return;

}





if(cleanOptions.length<2){

setError(
"Minimum two options required"
);

return;

}






try{


setLoading(true);





const res =
await fetch(
"/api/polls",
{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

question:

form.question.trim(),


category:

form.category.trim(),


status:

form.status,


options:

cleanOptions


})

}

);






const data =
await res.json();






if(!data.success){


setError(

data.error ||

"Create failed"

);


return;


}







router.push(
"/admin/polls"
);


router.refresh();




}
catch(err){


console.error(
"CREATE POLL ERROR",
err
);


setError(
"Server error"
);


}
finally{

setLoading(false);

}


}









return (

<div

className="
min-h-screen
bg-[#050816]
text-white
p-4
md:p-8
"

>





{/* HEADER */}



<div className="
mb-8
">


<h1 className="
text-3xl
font-bold
">

Create Poll

</h1>



<p className="
text-orange-400
mt-2
">

NationPath Poll Management

</p>


</div>







{
error &&


<div

className="
mb-6
p-4
rounded-xl
bg-red-600/20
border
border-red-500
text-red-300
"

>

{error}

</div>


}








<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
md:p-8
space-y-8
"

>







{/* QUESTION */}



<div>


<label className="
block
font-semibold
mb-3
">

Poll Question

</label>




<textarea

rows={4}

value={form.question}

onChange={(e)=>

updateField(
"question",
e.target.value
)

}

placeholder="Example: Should India increase defence spending?"

className="
w-full
p-4
rounded-xl
bg-black/30
border
border-white/10
outline-none
focus:border-orange-500
"

/>



<p className="
text-xs
text-gray-400
mt-2
">

Keep question clear and neutral

</p>



</div>








{/* CATEGORY */}



<div>


<label className="
block
font-semibold
mb-3
">

Category

</label>



<input

value={form.category}

onChange={(e)=>

updateField(
"category",
e.target.value
)

}

placeholder="National Security"

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
outline-none
focus:border-orange-500
"

/>


</div>









{/* OPTIONS */}



<div>


<div className="
flex
justify-between
items-center
mb-4
">


<label className="
font-semibold
">

Poll Options

</label>



<span className="
text-xs
text-gray-400
">

{form.options.length}/6

</span>



</div>





<div className="
space-y-3
">


{

form.options.map(

(option,index)=>(


<div

key={index}

className="
flex
gap-3
items-center
"

>


<input


value={option}


onChange={(e)=>

updateOption(

index,

e.target.value

)

}


placeholder={`Option ${index+1}`}


className="
flex-1
p-3
rounded-xl
bg-black/30
border
border-white/10
outline-none
focus:border-orange-500
"

/>



<button

type="button"

onClick={()=>removeOption(index)}

disabled={
form.options.length<=2
}

className="
text-sm
text-red-400
disabled:text-gray-600
"

>

Remove

</button>



</div>


)

)

}


</div>
{/* ADD OPTION */}

<button

type="button"

onClick={addOption}

disabled={
form.options.length>=6
}

className="
mt-4
border
border-orange-500
text-orange-400
px-4
py-2
rounded-xl
text-sm
disabled:opacity-50
"

>

+ Add Option

</button>


</div>









{/* STATUS */}



<div>


<label className="
block
font-semibold
mb-3
">

Publication Status

</label>



<select

value={form.status}

onChange={(e)=>

updateField(
"status",
e.target.value
)

}

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

>


<option value="published">

Published

</option>



<option value="draft">

Draft

</option>


</select>


</div>









{/* INFO CARD */}



<div

className="
bg-blue-600/10
border
border-blue-500/30
rounded-xl
p-5
text-blue-300
text-sm
"

>


<p>

Poll duration:

<strong className="
ml-1
text-white
">

24 hours

</strong>

</p>


<p className="
mt-2
text-gray-300
">

After expiry it will automatically disappear from homepage.

</p>


</div>









{/* ACTION */}



<div

className="
pt-4
"

>


<button

onClick={submit}

disabled={loading}

className="
bg-[#EA661B]
hover:bg-[#d95712]
text-white
px-7
py-3
rounded-xl
font-semibold
transition
disabled:opacity-50
"

>


{

loading

?

"Creating..."

:

"Create Poll"

}



</button>


</div>








</div>






</div>

);


}