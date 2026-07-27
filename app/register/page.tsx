"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Sparkles } from "lucide-react";


export default function RegisterPage(){

const router = useRouter();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [error,setError] = useState("");
const [loading,setLoading] = useState(false);



async function handleRegister(e:any){

e.preventDefault();

setError("");
setLoading(true);


try{


const res = await fetch(
"/api/auth/register",
{
method:"POST",
headers:{
"Content-Type":"application/json",
},
body:JSON.stringify({
name,
email,
password,
}),
}
);



const data = await res.json();



if(!data.success){

setError(data.error);
setLoading(false);
return;

}



router.push("/login");



}
catch{

setError("Registration failed");

}


setLoading(false);


}






return (

<div
className="
relative
min-h-screen
overflow-hidden
bg-[#070B1A]
flex
items-center
justify-center
px-4
"
>


<div
className="
absolute
top-0
left-1/2
h-[500px]
w-[500px]
-translate-x-1/2
rounded-full
bg-[#C6A15B]/10
blur-[120px]
"
/>




<div className="relative z-10 w-full max-w-md">


<div
className="
rounded-3xl
border
border-[#C6A15B]/20
bg-[#10152F]/90
p-8
shadow-2xl
"
>



<div className="text-center mb-8">


<div
className="
mx-auto
mb-5
flex
h-20
w-20
items-center
justify-center
rounded-full
border
border-[#C6A15B]/30
bg-[#C6A15B]/10
"
>

<img
src="/idlogo.png"
alt="NationPath"
className="h-14"
/>

</div>



<div
className="
flex
justify-center
items-center
gap-2
text-xs
tracking-[0.35em]
uppercase
text-[#C6A15B]
"
>

<Sparkles size={14}/>

NationPath Astro

</div>




<h1
className="
mt-4
text-3xl
font-bold
text-white
"
>
Create Account
</h1>



<p className="mt-2 text-gray-400">
Start your personalized cosmic journey
</p>


</div>







<form
onSubmit={handleRegister}
className="space-y-4"
>



<div className="relative">

<User
size={20}
className="
absolute
left-3
top-3
text-[#C6A15B]
"
/>


<input
required
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="
w-full
rounded-xl
border
border-white/10
bg-black/20
p-3
pl-10
text-white
outline-none
focus:border-[#C6A15B]
"
/>


</div>







<div className="relative">

<Mail
size={20}
className="
absolute
left-3
top-3
text-[#C6A15B]
"
/>


<input
required
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="
w-full
rounded-xl
border
border-white/10
bg-black/20
p-3
pl-10
text-white
outline-none
focus:border-[#C6A15B]
"
/>


</div>







<div className="relative">

<Lock
size={20}
className="
absolute
left-3
top-3
text-[#C6A15B]
"
/>


<input
required
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="
w-full
rounded-xl
border
border-white/10
bg-black/20
p-3
pl-10
text-white
outline-none
focus:border-[#C6A15B]
"
/>


</div>







<button
disabled={loading}
className="
w-full
rounded-xl
bg-[#C6A15B]
py-3
font-semibold
text-[#070B1A]
hover:bg-[#D5B978]
transition
"
>

{
loading
?
"Creating..."
:
"Create Account"
}

</button>






<div className="flex items-center gap-3 text-gray-500 text-sm">

<div className="h-px bg-white/10 flex-1"/>

OR

<div className="h-px bg-white/10 flex-1"/>

</div>







<button
type="button"
onClick={()=>signIn("google")}
className="
w-full
rounded-xl
border
border-white/20
py-3
text-white
hover:border-[#C6A15B]
transition
"
>

Continue with Google

</button>







{
error &&
<p className="text-center text-red-400 text-sm">
{error}
</p>
}




</form>


</div>


</div>


</div>


)

}