"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD HEADER
//
// Props Driven SaaS Header
//////////////////////////////////////////////////////////////

import {
  Bell,
  ChevronDown,
  Crown,
  Sparkles,
  Search,
} from "lucide-react";

import { useState } from "react";


interface AstroDashboardHeaderProps {

  userName: string;

  plan: string;

  role: string;

  notifications?: number;

}



export default function AstroDashboardHeader({

  userName,

  plan,

  role,

  notifications = 0,

}: AstroDashboardHeaderProps) {


  const [openProfile,setOpenProfile] = useState(false);



  return (

    <header
      className="
      flex
      items-center
      justify-between
      border-b
      border-white/10
      bg-[#080b1c]
      px-6
      py-5
      text-white
      "
    >



      {/* Greeting */}

      <div>

        <div
          className="
          flex
          items-center
          gap-2
          "
        >

          <Sparkles
            size={20}
            className="text-yellow-400"
          />


          <h1
            className="
            text-xl
            font-bold
            "
          >
            Good Morning, {userName.split(" ")[0]}
          </h1>


        </div>


        <p
          className="
          mt-1
          text-sm
          text-gray-400
          "
        >
          Your cosmic intelligence dashboard
        </p>


      </div>




      {/* Actions */}

      <div
        className="
        flex
        items-center
        gap-5
        "
      >



        <button
          className="
          hidden
          lg:flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-sm
          "
        >

          <Search size={18}/>

          Search

        </button>




        <button
          className="
          relative
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-3
          "
        >

          <Bell size={20}/>


          {
            notifications > 0 &&
            <span
              className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-yellow-400
              "
            />
          }


        </button>




        {/* Plan */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-3
          rounded-xl
          border
          border-yellow-400/20
          bg-yellow-400/10
          px-4
          py-2
          "
        >

          <Crown
            size={18}
            className="text-yellow-400"
          />


          <div>

            <p
              className="
              text-sm
              font-semibold
              "
            >
              {plan}
            </p>


            <p
              className="
              text-xs
              text-gray-400
              "
            >
              {role}
            </p>


          </div>


        </div>




        {/* Profile */}

        <div className="relative">


          <button
            onClick={()=>setOpenProfile(!openProfile)}
            className="
            flex
            items-center
            gap-2
            "
          >

            <div
              className="
              h-10
              w-10
              rounded-full
              bg-yellow-400
              flex
              items-center
              justify-center
              font-bold
              text-black
              "
            >

              {userName.charAt(0)}

            </div>


            <ChevronDown size={18}/>


          </button>



          {
            openProfile &&

            <div
              className="
              absolute
              right-0
              mt-3
              w-48
              rounded-xl
              bg-[#10152f]
              border
              border-white/10
              p-2
              "
            >

              <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded">
                Profile
              </button>

              <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded">
                Subscription
              </button>

              <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-white/10 rounded">
                Logout
              </button>


            </div>

          }


        </div>


      </div>


    </header>

  );

}