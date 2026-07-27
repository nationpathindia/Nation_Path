"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD SIDEBAR
//
// Production SaaS Dashboard Navigation
//
// Features:
// - Responsive Desktop / Mobile
// - Active Route Highlight
// - Subscription Ready
// - Premium Badge
// - Future Expansion Ready
//////////////////////////////////////////////////////////////

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  UserCircle,
  Sparkles,
  FileText,
  BrainCircuit,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Crown,
  Star,
} from "lucide-react";


const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/astro",
    icon: LayoutDashboard,
  },
  {
    name: "Astro Profile",
    href: "/dashboard/astro/profiles",
    icon: UserCircle,
  },
  {
    name: "Kundali Intelligence",
    href: "/dashboard/astro/kundali",
    icon: Sparkles,
    premium: true,
  },
  {
    name: "Reports",
    href: "/dashboard/astro/reports",
    icon: FileText,
    premium: true,
  },
  {
    name: "AI Guidance",
    href: "/dashboard/astro/guidance",
    icon: BrainCircuit,
    premium: true,
  },
  {
    name: "Family Astrology",
    href: "/dashboard/astro/family",
    icon: Users,
  },
  {
    name: "Subscription",
    href: "/dashboard/astro/subscription",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/astro/settings",
    icon: Settings,
  },
];


export default function AstroSidebar() {

  const pathname = usePathname();


  return (

    <aside
      className="
      hidden md:flex
      fixed
      left-0
      top-0
      h-screen
      w-72
      flex-col
      border-r
      border-white/10
      bg-gradient-to-b
      from-[#080b1c]
      via-[#10152f]
      to-[#050711]
      text-white
      "
    >


      {/* Brand */}

      <div
        className="
        px-6
        py-6
        border-b
        border-white/10
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-yellow-400
            to-orange-500
            "
          >

            <Sparkles
              size={22}
              className="text-black"
            />

          </div>


          <div>

            <h2
              className="
              text-lg
              font-bold
              tracking-wide
              "
            >
              NationPath
            </h2>


            <p
              className="
              text-xs
              text-yellow-400
              "
            >
              Astro Intelligence
            </p>


          </div>

        </div>


      </div>



      {/* User Plan */}

      <div
        className="
        mx-5
        mt-5
        rounded-xl
        border
        border-yellow-400/20
        bg-yellow-400/10
        p-4
        "
      >

        <div className="flex items-center gap-3">


          <Crown
            size={20}
            className="text-yellow-400"
          />


          <div>

            <p
              className="
              text-sm
              font-semibold
              "
            >
              Premium Plan
            </p>


            <p
              className="
              text-xs
              text-gray-400
              "
            >
              Astro Unlimited
            </p>


          </div>


        </div>


      </div>




      {/* Navigation */}


      <nav
        className="
        flex-1
        space-y-2
        px-4
        py-6
        "
      >


        {
          navigation.map((item)=>{


            const active =
              pathname === item.href;


            const Icon = item.icon;



            return (

              <Link
                key={item.href}
                href={item.href}
              >


                <motion.div

                  whileHover={{
                    x:4
                  }}

                  className={`
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  cursor-pointer

                  ${
                    active
                    ?
                    "bg-yellow-400 text-black shadow-lg"
                    :
                    "text-gray-300 hover:bg-white/10"
                  }

                  `}
                >


                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >

                    <Icon
                      size={20}
                    />


                    <span
                      className="
                      text-sm
                      font-medium
                      "
                    >
                      {item.name}
                    </span>


                  </div>




                  {
                    item.premium &&
                    <Star
                      size={15}
                      className={
                        active
                        ?
                        "text-black"
                        :
                        "text-yellow-400"
                      }
                    />
                  }



                </motion.div>


              </Link>

            )


          })
        }


      </nav>





      {/* Logout */}


      <div
        className="
        border-t
        border-white/10
        p-5
        "
      >


        <button
          className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-sm
          text-gray-300
          hover:bg-red-500/10
          hover:text-red-400
          transition
          "
        >

          <LogOut
            size={20}
          />

          Logout


        </button>


      </div>



    </aside>

  );
}