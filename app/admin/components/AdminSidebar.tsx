"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";


import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  Bell,
  DollarSign,
  BarChart3,
  Settings,
  Megaphone,
  ChevronDown,
  Menu,
  LogOut,

  // Astro
  Sparkles,
  Telescope,
  Star,
  CalendarDays,
  Orbit,
  Moon,
  Home,
  Sun,
  Heart,
  Briefcase,
  GraduationCap,
  Wallet,
  Activity,
  Globe2,
  FileSearch,

  // Poll Intelligence
  Vote,

} from "lucide-react";




export default function AdminSidebar(){



const pathname =
usePathname();



const {data:session}=
useSession();




const role =
session?.user?.role || "user";



const userName =
session?.user?.name || "Admin";




const [collapsed,setCollapsed]=
useState(false);



const [openAstro,setOpenAstro]=
useState(true);



const [openAds,setOpenAds]=
useState(true);







const navItems=[



{
name:"Dashboard",

href:"/admin",

icon:LayoutDashboard,

roles:[

"superadmin",
"admin",
"editor",
"reporter",
"advertiser"

]

},





{
name:"News Control",

href:"/admin/posts",

icon:FileText,

roles:[

"superadmin",
"admin",
"editor",
"reporter"

]

},





{
name:"Categories",

href:"/admin/categories",

icon:Folder,

roles:[

"superadmin",
"admin",
"editor"

]

},





{
name:"Users",

href:"/admin/users",

icon:Users,

roles:[

"superadmin",
"admin"

]

},





{
name:"Newsletter",

href:"/admin/newsletter",

icon:Bell,

roles:[

"superadmin",
"admin"

]

},





{
name:"Revenue",

href:"/admin/revenue",

icon:DollarSign,

roles:[

"superadmin",
"admin"

]

},




{
name:"Poll Management",

href:"/admin/polls",

icon:Vote,

roles:[

"superadmin",
"admin",
"editor"

]

},





{
name:"Settings",

href:"/admin/settings",

icon:Settings,

roles:[

"superadmin"

]

},



];






const astroItems=[



{
name:"Astro Dashboard",

href:"/admin/astro",

icon:Telescope

},



{
name:"Horoscope",

href:"/admin/astro/horoscope",

icon:Sun

},



{
name:"Zodiac",

href:"/admin/astro/zodiac",

icon:Star

},



{
name:"Panchang",

href:"/admin/astro/panchang",

icon:CalendarDays

},



{
name:"Planet Intelligence",

href:"/admin/astro/planet-intelligence",

icon:Orbit

},



{
name:"Nakshatra",

href:"/admin/astro/nakshatra-intelligence",

icon:Moon

},



{
name:"House Intelligence",

href:"/admin/astro/house-intelligence",

icon:Home

},



{
name:"Lagna Intelligence",

href:"/admin/astro/lagna-intelligence",

icon:Sparkles

},



{
name:"Dasha Intelligence",

href:"/admin/astro/dasha-intelligence",

icon:Activity

},



{
name:"Yoga Intelligence",

href:"/admin/astro/yoga-intelligence",

icon:Star

},



{
name:"Remedy Intelligence",

href:"/admin/astro/remedy-intelligence",

icon:Heart

},



{
name:"Career Intelligence",

href:"/admin/astro/career-intelligence",

icon:Briefcase

},



{
name:"Education Intelligence",

href:"/admin/astro/education-intelligence",

icon:GraduationCap

},



{
name:"Finance Intelligence",

href:"/admin/astro/finance-intelligence",

icon:Wallet

},



{
name:"Health Intelligence",

href:"/admin/astro/health-intelligence",

icon:Activity

},



{
name:"Business Intelligence",

href:"/admin/astro/business-intelligence",

icon:Briefcase

},



{
name:"Foreign Settlement",

href:"/admin/astro/foreign-settlement-intelligence",

icon:Globe2

},



{
name:"Birth Chart",

href:"/admin/astro/birth-chart-interpretation",

icon:FileSearch

},


];









/*
========================================
ROLE ACCESS CONTROL
========================================
*/


const canSeeAstro =

[

"superadmin",

"admin"

].includes(role);





const canSeeAds =

[

"superadmin",

"admin",

"advertiser"

].includes(role);









return(



<aside


className={`

${collapsed?"w-20":"w-72"}

transition-all duration-300

bg-black/50

backdrop-blur-xl

border-r border-white/10

flex flex-col justify-between

text-white

`}


>







<div>







<div

className="

flex items-center justify-between

px-5 py-6

border-b border-white/10

"

>




{

!collapsed &&

<h2

className="

text-xl

font-bold

"

>

NationPath Admin

</h2>

}



<button


onClick={()=>setCollapsed(!collapsed)}


className="

p-2 rounded-lg

hover:bg-white/10

"


>

<Menu size={20}/>


</button>



</div>









{

!collapsed &&


<div

className="

px-5 py-5

border-b border-white/10

flex gap-3 items-center

"

>


<div

className="

w-12 h-12

rounded-full

bg-gradient-to-br

from-orange-400

to-red-500

flex items-center justify-center

font-bold text-black

"

>

{userName.charAt(0)}

</div>





<div>


<p className="font-semibold">

{userName}

</p>



<p

className="

text-xs

text-orange-400

capitalize

"

>

{role}

</p>



</div>



</div>


}







<nav className="p-4 space-y-2">






{

navItems

.filter(

item=>

item.roles.includes(role)

)

.map(item=>(



<NavItem

key={item.href}

item={item}

pathname={pathname}

collapsed={collapsed}

/>



))


}






{

canSeeAstro &&



<div>



<button



onClick={()=>setOpenAstro(!openAstro)}



className="

w-full flex justify-between

px-4 py-3

rounded-xl

hover:bg-white/10

"



>


<span className="flex gap-3 items-center">


<Sparkles size={18}/>



{

!collapsed &&

"Astro Intelligence"

}


</span>






{

!collapsed &&

<ChevronDown

size={16}

className={

openAstro

?

"rotate-180 transition"

:

"transition"

}

/>


}



</button>









{

openAstro &&

!collapsed &&



<div

className="

ml-6 mt-2 space-y-1

"

>


{


astroItems.map(item=>(



<SubItem


key={item.href}


href={item.href}


label={item.name}


pathname={pathname}



/>



))


}





</div>


}





</div>


}













{

canSeeAds &&



<div>



<button



onClick={()=>setOpenAds(!openAds)}



className="

w-full flex justify-between

px-4 py-3

rounded-xl

hover:bg-white/10

"



>



<span className="flex gap-3 items-center">


<Megaphone size={18}/>



{

!collapsed &&

"Advertisements"

}



</span>







{

!collapsed &&

<ChevronDown size={16}/>


}



</button>









{

openAds &&

!collapsed &&



<div

className="

ml-6 mt-2 space-y-1

"

>



<SubItem

href="/admin/ads"

label="All Ads"

pathname={pathname}

/>





<SubItem

href="/admin/ads/create"

label="Create Ad"

pathname={pathname}

/>





<SubItem

href="/admin/ads/performance"

label="Performance"

pathname={pathname}

/>





</div>


}



</div>


}






</nav>





</div>









<div

className="

p-4

border-t

border-white/10

"

>



<button



onClick={()=>signOut()}



className="

w-full flex gap-3

px-4 py-3

rounded-xl

bg-red-600/20

hover:bg-red-600/40

"



>



<LogOut size={18}/>



{

!collapsed &&

"Logout"

}



</button>



</div>







</aside>



);



}












function NavItem({

item,

pathname,

collapsed

}:any){



const Icon = item.icon;



const active =

item.href === "/admin"

?

pathname === "/admin"

:

pathname.startsWith(item.href);





return(



<Link



href={item.href}



className={`

flex items-center gap-3

px-4 py-3

rounded-xl



${

active

?

"bg-gradient-to-r from-orange-500 to-red-500"

:

"hover:bg-white/10 text-gray-300"

}



`}



>



<Icon size={18}/>



{

!collapsed &&

item.name

}



</Link>



);



}









function SubItem({

href,

label,

pathname

}:any){



const active =

pathname === href

||

pathname.startsWith(

href + "/"

);





return(



<Link



href={href}



className={`

block px-4 py-2

rounded-lg text-sm



${

active

?

"bg-orange-500 text-white"

:

"text-gray-300 hover:bg-white/10"

}



`}



>



{label}



</Link>



);



}