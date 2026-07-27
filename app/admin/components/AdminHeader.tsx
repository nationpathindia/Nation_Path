"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";


export default function AdminHeader() {

  const { data: session } = useSession();

  const userName = session?.user?.name || "Admin";

  const [profileOpen, setProfileOpen] = useState(false);


  return (

    <header
      className="
      h-20
      px-8
      flex
      items-center
      justify-between
      bg-black/30
      backdrop-blur-xl
      border-b
      border-white/10
      "
    >


      <div
        className="
        flex
        items-center
        gap-3
        bg-white/10
        px-4
        py-2
        rounded-xl
        w-96
        "
      >

        <Search
          size={16}
          className="text-gray-400"
        />

        <input

          placeholder="Search articles, users..."

          className="
          bg-transparent
          outline-none
          text-sm
          w-full
          "

        />

      </div>





      <div
        className="
        flex
        items-center
        gap-6
        relative
        "
      >


        <Bell
          className="
          cursor-pointer
          text-gray-300
          hover:text-white
          "
        />





        <div
          onClick={()=>setProfileOpen(!profileOpen)}
          className="
          flex
          items-center
          gap-2
          cursor-pointer
          "
        >

          <div
            className="
            w-9
            h-9
            rounded-full
            bg-gradient-to-br
            from-[#ff4d4d]
            to-[#ffb347]
            flex
            items-center
            justify-center
            text-black
            font-bold
            "
          >

            {userName.charAt(0)}

          </div>


          <ChevronDown size={16}/>


        </div>





        {profileOpen && (

          <div
            className="
            absolute
            right-0
            top-14
            bg-black/80
            backdrop-blur-xl
            border
            border-white/10
            rounded-xl
            p-4
            w-48
            "
          >


            <p
              className="
              text-sm
              mb-3
              "
            >

              {userName}

            </p>



            <button

              onClick={()=>signOut({
                callbackUrl:"/login"
              })}

              className="
              text-red-400
              hover:text-white
              text-sm
              "

            >

              Logout

            </button>


          </div>

        )}


      </div>


    </header>

  );

}