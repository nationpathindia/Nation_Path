"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles } from "lucide-react";


export default function LoginPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [error,setError] = useState("");
const [loading,setLoading] = useState(false);



async function redirectByRole(){

const session:any = await getSession();

const role = session?.user?.role;



if(
role === "superadmin" ||
role === "admin" ||
role === "editor" ||
role === "reporter" ||
role === "advertiser"
){

router.push("/admin");

}

else{

router.push("/dashboard");

}


}




async function handleLogin(e:any){

e.preventDefault();

setError("");
setLoading(true);



const result = await signIn(
"credentials",
{
email,
password,
redirect:false,
}
);



if(result?.error){

setError("Invalid email or password");
setLoading(false);

return;

}



await redirectByRole();



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
items-center
justify-center
gap-2
text-xs
uppercase
tracking-[0.35em]
text-[#C6A15B]
"
>

<Sparkles size={14}/>

NationPath-Complete Media Platfrom

</div>






<h1
className="
mt-4
text-3xl
font-bold
text-white
"
>

Welcome Back

</h1>



<p
className="
mt-2
text-gray-400
"
>
Continue your journey with NationPath
</p>




</div>






<button

type="button"

onClick={()=>signIn(
"google",
{
callbackUrl:"/login"
}
)}

className="
w-full
rounded-xl
border
border-white/20
py-3
text-white
transition
hover:border-[#C6A15B]
hover:bg-white/5
"

>

Continue with Google

</button>







<div
className="
my-6
flex
items-center
gap-3
text-sm
text-gray-500
"
>

<div className="h-px flex-1 bg-white/10"/>

OR

<div className="h-px flex-1 bg-white/10"/>

</div>







<form
onSubmit={handleLogin}
className="space-y-4"
>





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
transition
hover:bg-[#D5B978]
"

>


{
loading
?
"Entering..."
:
"Continue"
}



</button>







{
error &&

<p
className="
text-center
text-sm
text-red-400
"
>

{error}

</p>

}







</form>







<p
className="
mt-6
text-center
text-sm
text-gray-400
"
>

New to NationPath?

<span
className="
ml-1
text-[#C6A15B]
cursor-pointer
"
onClick={()=>router.push("/register")}
>

Create account

</span>


</p>







</div>



</div>



</div>


)

}