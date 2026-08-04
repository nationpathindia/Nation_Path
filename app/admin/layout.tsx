import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import TeamChat from "./components/TeamChat";



export default async function AdminLayout({

children,

}: {

children: React.ReactNode;

}) {



const session:any = await getServerSession(authOptions);



if(!session){

redirect("/login");

}



const role = session.user?.role;



const adminRoles = [

"superadmin",
"admin",
"editor",
"reporter",
"advertiser",

];




if(!adminRoles.includes(role)){

redirect("/dashboard");

}





return (

<div

className="

min-h-screen

flex

overflow-hidden

bg-[#020617]

text-white

relative

"

>


{/* BACKGROUND GLOW */}

<div

className="

fixed

inset-0

pointer-events-none

"

>


<div

className="

absolute

top-[-200px]

left-[-150px]

w-[500px]

h-[500px]

bg-orange-500/10

blur-[140px]

rounded-full

"

/>



<div

className="

absolute

bottom-[-200px]

right-[-150px]

w-[500px]

h-[500px]

bg-blue-500/10

blur-[140px]

rounded-full

"

/>



</div>







{/* SIDEBAR */}

<AdminSidebar />









{/* MAIN */}

<div

className="

flex-1

min-w-0

flex

flex-col

relative

z-10

"

>



{/* HEADER */}

<AdminHeader />







{/* CONTENT AREA */}


<main

className="

flex-1

p-3

sm:p-4

md:p-6

lg:p-8

overflow-y-auto

"

>


<div

className="

min-h-full

rounded-3xl

bg-white/[0.03]

backdrop-blur-xl

border

border-white/10

shadow-2xl

p-4

md:p-6

"

>


{children}


</div>


</main>





</div>







{/* FLOATING CHAT */}

<TeamChat />





</div>

);


}