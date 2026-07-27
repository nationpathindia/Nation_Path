"use client";

import { useEffect, useState } from "react";


type Category = {

  id:string;

  name:string;

  slug:string;

  description?:string;

  intelligenceLabel?:string;

  color?:string;

  priority?:number;

  seoTitle?:string;

  seoDescription?:string;

  status:"active" | "hidden";

};



type FormType = {

  name:string;

  slug:string;

  intelligenceLabel:string;

  description:string;

  color:string;

  priority:number;

  seoTitle:string;

  seoDescription:string;

  status:"active" | "hidden";

};



const initialForm:FormType = {

  name:"",
  slug:"",
  intelligenceLabel:"",
  description:"",
  color:"#EA661B",
  priority:0,
  seoTitle:"",
  seoDescription:"",
  status:"active"

};



export default function AdminCategories(){


const [categories,setCategories]=useState<Category[]>([]);


const [form,setForm]=useState<FormType>(initialForm);


const [loading,setLoading]=useState(false);


const [message,setMessage]=useState("");



useEffect(()=>{

 fetchCategories();

},[]);





const fetchCategories=async()=>{

 const res=await fetch("/api/categories");

 const data=await res.json();


 if(data.success){

   setCategories(data.categories);

 }

};






const handleChange=(

e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>

)=>{


const {name,value}=e.target;


setForm(prev=>({

...prev,

[name]:

name==="priority"

? Number(value)

:value


}));

};







const handleSubmit=async(

e:React.FormEvent

)=>{


e.preventDefault();


setLoading(true);

setMessage("");



try{


const res=await fetch(
"/api/categories",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(form)

}

);



const data=await res.json();



if(!res.ok){


setMessage(

data.error ||
"Category creation failed"

);


return;


}





setMessage(
"✅ Category created successfully"
);



setForm(initialForm);



fetchCategories();



}

catch(error){


console.error(error);


setMessage(
"❌ Something went wrong"
);


}

finally{


setLoading(false);


}



};









return(

<div className="
min-h-screen
bg-[#0f172a]
text-white
p-6
">


<h1 className="
text-3xl
font-bold
mb-8
">

Category Management

</h1>





{message && (

<div className="
mb-5
bg-[#1f2937]
border
border-gray-700
p-4
rounded-lg
">

{message}

</div>

)}









<div className="
bg-[#1f2937]
p-6
rounded-xl
">


<form

onSubmit={handleSubmit}

className="
grid
md:grid-cols-2
gap-4
"

>




<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Category Name"

className="
p-3
rounded
bg-[#111827]
"

required

/>





<input

name="slug"

value={form.slug}

onChange={handleChange}

placeholder="Slug (example: politics)"

className="
p-3
rounded
bg-[#111827]
"

/>







<input

name="intelligenceLabel"

value={form.intelligenceLabel}

onChange={handleChange}

placeholder="Intelligence Label"

className="
p-3
rounded
bg-[#111827]
"

/>








<input

type="color"

name="color"

value={form.color}

onChange={handleChange}

className="
h-12
"

/>








<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Category Description"

className="
p-3
rounded
bg-[#111827]
md:col-span-2
"

/>








<input

type="number"

name="priority"

value={form.priority}

onChange={handleChange}

placeholder="Priority"

className="
p-3
rounded
bg-[#111827]
"

/>









<input

name="seoTitle"

value={form.seoTitle}

onChange={handleChange}

placeholder="SEO Title"

className="
p-3
rounded
bg-[#111827]
md:col-span-2
"

/>









<textarea

name="seoDescription"

value={form.seoDescription}

onChange={handleChange}

placeholder="SEO Description"

className="
p-3
rounded
bg-[#111827]
md:col-span-2
"

/>









<select

name="status"

value={form.status}

onChange={handleChange}

className="
p-3
rounded
bg-[#111827]
"

>


<option value="active">

Active

</option>


<option value="hidden">

Hidden

</option>


</select>









<button

type="submit"

disabled={loading}

className="
bg-orange-600
rounded
p-3
font-semibold
md:col-span-2
disabled:opacity-50
"

>


{
loading

?

"Creating..."

:

"Create Category"

}


</button>




</form>


</div>








<div className="
mt-8
bg-[#1f2937]
rounded-xl
overflow-hidden
">


<table className="w-full">


<thead className="bg-[#111827]">

<tr>

<th className="p-3 text-left">
Name
</th>

<th>
Slug
</th>

<th>
Intelligence
</th>

<th>
Priority
</th>

</tr>


</thead>



<tbody>


{
categories.map(cat=>(


<tr
key={cat.id}
className="
border-t
border-gray-700
"
>


<td className="p-3">

{cat.name}

</td>


<td>

{cat.slug}

</td>


<td>

{cat.intelligenceLabel}

</td>


<td>

{cat.priority}

</td>



</tr>


))

}



</tbody>


</table>


</div>





</div>

);


}