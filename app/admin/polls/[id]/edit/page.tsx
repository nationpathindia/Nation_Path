import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import EditPollForm from "./EditPollForm";


export const dynamic = "force-dynamic";



export default async function EditPollPage({

params

}:{

params:{
id:string
}

}){


const poll = await prisma.poll.findUnique({

where:{
id:params.id
},

include:{
options:true
}

});




if(!poll){

notFound();

}





return (

<div

className="
min-h-screen
bg-[#050816]
text-white
p-6
md:p-8
"

>


<div className="mb-8">


<h1

className="
text-3xl
font-bold
"

>

Edit Poll

</h1>



<p

className="
text-orange-400
mt-2
"

>

NationPath Poll Intelligence

</p>


</div>





<EditPollForm

poll={poll}

/>




</div>

);


}