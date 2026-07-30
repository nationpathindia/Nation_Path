"use client";

import { useState } from "react";


export default function NewsletterForm() {


const [email,setEmail] = useState("");

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");

const [success,setSuccess] = useState(false);




const handleSubmit = async (
e:React.FormEvent<HTMLFormElement>
) => {


e.preventDefault();


if(!email.trim()){

return;

}



setLoading(true);

setMessage("");

setSuccess(false);



try{


const res = await fetch(
"/api/newsletter",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email
})

}
);



const data = await res.json();



setMessage(
data.message || "Something went wrong"
);



setSuccess(
Boolean(data.success)
);



if(data.success){

setEmail("");

}



}

catch(error){


console.error(
"Newsletter Submit Error",
error
);


setMessage(
"Unable to subscribe. Please try again."
);


setSuccess(false);



}

finally{


setLoading(false);


}



};





return (


<div>


<form

onSubmit={handleSubmit}

className="
flex
items-center
gap-2
"

>


<div

className="
flex
items-center
gap-2
flex-1
bg-white/5
border
border-white/10
rounded-lg
px-3
py-2
"

>


<input

type="email"

required

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="Email updates"

className="
flex-1
bg-transparent
outline-none
text-xs
text-white
placeholder:text-white/50
"

/>


</div>





<button

type="submit"

disabled={loading}

className="
bg-[var(--news-orange)]
text-white
text-xs
font-bold
px-4
py-2
rounded-lg
hover:opacity-90
transition
disabled:opacity-50
"

>


{
loading
?
"Joining..."
:
"Join"
}


</button>




</form>




{

message && (

<p

className={`
text-xs
mt-3
${
success
?
"text-green-400"
:
"text-red-400"
}
`}

>

{message}

</p>

)

}



</div>


);


}