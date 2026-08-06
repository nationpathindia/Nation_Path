import {
  Suspense
} from "react";


import ArticleForm from "@/components/admin/posts/ArticleForm";



export const dynamic = "force-dynamic";






function CreatePostLoading(){


return (

<div

className="
min-h-screen
bg-[#050816]
text-white
p-8
flex
items-center
justify-center
"

>


<div

className="
text-gray-400
text-sm
"

>

Loading Editorial CMS...

</div>


</div>

);


}








export default function CreatePostPage(){



return (


<Suspense

fallback={

<CreatePostLoading />

}

>


<ArticleForm />


</Suspense>


);


}