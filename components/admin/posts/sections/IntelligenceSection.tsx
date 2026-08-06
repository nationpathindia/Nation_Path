// components/admin/posts/sections/IntelligenceSection.tsx


"use client";


import ArticleIntelligenceForm from "@/components/admin/article/ArticleIntelligenceForm";


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







export default function IntelligenceSection({

  form,

  updateField

}:Props){





return (



<div


className="
space-y-6
"

>



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>



<div className="mb-4">


<h2 className="text-lg font-semibold">

Article Intelligence

</h2>


<p className="text-sm text-gray-400 mt-1">

Editorial analysis, context and AI enhanced information

</p>


</div>







<ArticleIntelligenceForm


form={form}



updateField={updateField}


/>







</div>



</div>



);



}