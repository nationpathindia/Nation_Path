"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO SETTINGS
//
// User Account Preferences
//
// Production Ready UI
//
// Future:
// - User API
// - Profile Update API
// - Notification Engine
// - Security Management
// - Subscription Backend
//////////////////////////////////////////////////////////////

import {
  User,
  CalendarDays,
  MapPin,
  Bell,
  Shield,
  Crown,
  Settings,
  Mail,
  Phone,
  Lock,
  Sparkles,
  Globe2,
  MessageCircle,
  Smartphone,
  CreditCard,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";
import Link from "next/link";



const profileData = [
  {
    label: "Full Name",
    value: "Rahul Sharma",
    icon: User,
  },
  {
    label: "Email",
    value: "rahul@example.com",
    icon: Mail,
  },
  {
    label: "Mobile",
    value: "+91 XXXXX XXXXX",
    icon: Phone,
  },
];



const birthDetails = [
  {
    label: "Date of Birth",
    value: "12 January 1990",
    icon: CalendarDays,
  },
  {
    label: "Birth Time",
    value: "10:30 AM",
    icon: Settings,
  },
  {
    label: "Birth Place",
    value: "Vadodara, India",
    icon: MapPin,
  },
];



const astroPreferences = [
  {
    title: "Zodiac System",
    value: "Vedic Astrology",
  },
  {
    title: "Language",
    value: "Hindi",
  },
  {
    title: "Daily Rashifal",
    value: "Enabled",
  },
  {
    title: "Panchang Updates",
    value: "Enabled",
  },
];



const notifications = [
  {
    title: "Email Alerts",
    description: "Receive astrology reports on email.",
    icon: Mail,
  },
  {
    title: "WhatsApp Updates",
    description: "Daily rashifal and important alerts.",
    icon: MessageCircle,
  },
  {
    title: "Mobile Push",
    description: "Instant astrology notifications.",
    icon: Smartphone,
  },
];



const securityOptions = [
  {
    title: "Change Password",
    description: "Update your account password.",
    icon: Lock,
  },
  {
    title: "Account Protection",
    description: "Manage login security.",
    icon: Shield,
  },
];



export default function AstroSettingsPage() {


return (

<div className="space-y-8">



{/* Header */}

<section>

<h1
className="
flex
items-center
gap-3
text-3xl
font-bold
"
>

<Settings
className="text-yellow-400"
/>

Astro Settings

</h1>


<p
className="
mt-2
text-gray-400
"
>
Manage your Astro profile, preferences and account settings.
</p>

</section>







{/* Profile */}

<motion.section
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"
>


<div
className="
flex
flex-col
gap-6
md:flex-row
md:items-center
"
>


<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-yellow-400
text-3xl
font-bold
text-black
"
>
R
</div>



<div>

<h2
className="
text-2xl
font-bold
"
>
Rahul Sharma
</h2>


<p
className="
text-gray-400
"
>
Premium Astro Member
</p>

</div>



</div>





<div
className="
mt-8
grid
gap-4
md:grid-cols-3
"
>

{
profileData.map((item)=>{

const Icon=item.icon;

return (

<div
key={item.label}
className="
rounded-2xl
bg-white/5
p-5
"
>

<Icon
className="text-yellow-400"
/>


<p
className="
mt-3
text-sm
text-gray-400
"
>
{item.label}
</p>


<p
className="
mt-1
font-semibold
"
>
{item.value}
</p>


</div>

)

})
}


</div>


</motion.section>








{/* Birth Details */}

<section>

<h2
className="
mb-4
flex
items-center
gap-2
text-xl
font-bold
"
>

<CalendarDays
className="text-yellow-400"
/>

Birth Details

</h2>



<div
className="
grid
gap-5
md:grid-cols-3
"
>


{
birthDetails.map((item)=>{

const Icon=item.icon;


return (

<div
key={item.label}
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>


<Icon
className="text-yellow-400"
/>


<p
className="
mt-4
text-sm
text-gray-400
"
>
{item.label}
</p>


<p
className="
mt-2
font-semibold
"
>
{item.value}
</p>


</div>

)

})
}



</div>


</section>








{/* Astro Preferences */}


<section
className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"
>


<h2
className="
flex
items-center
gap-2
text-xl
font-bold
"
>

<Sparkles
className="text-yellow-400"
/>

Astro Preferences

</h2>



<div
className="
mt-6
grid
gap-4
md:grid-cols-2
"
>


{
astroPreferences.map(item=>(

<div
key={item.title}
className="
rounded-xl
bg-white/5
p-4
"
>

<p
className="
text-sm
text-gray-400
"
>
{item.title}
</p>

<p
className="
mt-1
font-semibold
"
>
{item.value}
</p>


</div>

))
}



</div>


</section>








{/* Notifications */}


<section>

<h2
className="
mb-4
flex
items-center
gap-2
text-xl
font-bold
"
>

<Bell
className="text-yellow-400"
/>

Notifications

</h2>


<div
className="
grid
gap-5
md:grid-cols-3
"
>


{
notifications.map(item=>{

const Icon=item.icon;


return (

<div
key={item.title}
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>


<Icon
className="text-yellow-400"
/>


<h3
className="
mt-4
font-bold
"
>
{item.title}
</h3>


<p
className="
mt-2
text-sm
text-gray-400
"
>
{item.description}
</p>


</div>

)

})
}


</div>


</section>








{/* Security */}


<section
className="
rounded-3xl
border
border-white/10
bg-[#10152f]
p-8
"
>


<h2
className="
flex
items-center
gap-2
text-xl
font-bold
"
>

<Shield
className="text-yellow-400"
/>

Privacy & Security

</h2>



<div
className="
mt-6
grid
gap-5
md:grid-cols-2
"
>


{
securityOptions.map(item=>{

const Icon=item.icon;


return (

<div
key={item.title}
className="
flex
items-center
justify-between
rounded-2xl
bg-white/5
p-5
"
>


<div
className="
flex
gap-4
"
>

<Icon
className="text-yellow-400"
/>


<div>

<h3
className="font-bold"
>
{item.title}
</h3>


<p
className="
text-sm
text-gray-400
"
>
{item.description}
</p>


</div>


</div>


<ChevronRight
className="text-gray-400"
/>


</div>

)

})
}


</div>


</section>








{/* Subscription */}


<section
className="
rounded-3xl
border
border-yellow-400/30
bg-yellow-400/10
p-8
"
>


<div
className="
flex
items-center
justify-between
"
>


<div
className="
flex
gap-4
"
>

<Crown
className="text-yellow-400"
/>


<div>

<h2
className="font-bold text-xl"
>
Astro Premium
</h2>


<p
className="
text-sm
text-gray-400
"
>
Manage your subscription plan.
</p>


</div>


</div>



<Link
href="/dashboard/astro/subscription"
className="
flex
items-center
gap-2
rounded-xl
bg-yellow-400
px-5
py-3
font-semibold
text-black
"
>

<CreditCard
size={18}
/>

Manage Plan

</Link>


</div>


</section>





</div>

);

}