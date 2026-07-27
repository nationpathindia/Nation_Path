"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function UpgradeButton({

  planSlug,

}:{

  planSlug:string;

}){


const router = useRouter();


const [loading,setLoading] =
useState(false);



async function handleUpgrade(){


try{


setLoading(true);



const response =
await fetch(
"/api/subscription/upgrade",
{
  method:"POST",
  credentials:"include",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify({
    planSlug,
  }),
}
);

const data =
await response.json();



if(!response.ok){

throw new Error(
data.error ||
"Upgrade failed"
);

}



router.refresh();



}
catch(error:any){

alert(error.message);

}
finally{

setLoading(false);

}


}





return (

<button

onClick={handleUpgrade}

disabled={loading}

className="
mt-6
w-full
rounded-xl
bg-yellow-400
py-3
font-semibold
text-black
transition
hover:bg-yellow-300
disabled:opacity-50
"

>

{

loading

?

"Processing..."

:

"Continue Upgrade"

}


</button>


);

}