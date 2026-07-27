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
flex
min-h-screen
text-white
bg-gradient-to-br
from-[#0c0f17]
via-[#111827]
to-[#1a2238]
"
>


{/* SIDEBAR */}

<AdminSidebar />





{/* MAIN AREA */}

<div
className="
flex-1
flex
flex-col
"
>


<AdminHeader />





<main
className="
flex-1
p-8
"
>

{children}

</main>



</div>





{/* CHAT */}

<TeamChat />



</div>

);


}