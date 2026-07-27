"use client";

import { useState } from "react";
import {
  MessageCircle,
  X,
} from "lucide-react";


export default function TeamChat() {

  const [chatOpen, setChatOpen] = useState(false);


  return (
    <>

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setChatOpen(true)}
        className="
        fixed
        bottom-6
        right-6
        bg-gradient-to-r
        from-[#ff4d4d]
        to-[#ffb347]
        p-4
        rounded-full
        "
      >

        <MessageCircle size={24}/>

      </button>



      {/* CHAT WINDOW */}

      {chatOpen && (

        <div
          className="
          fixed
          bottom-24
          right-6
          w-80
          bg-[#111827]
          border
          border-white/10
          rounded-xl
          "
        >


          {/* HEADER */}

          <div
            className="
            flex
            justify-between
            px-4
            py-3
            border-b
            border-white/10
            "
          >

            <span>
              Team Chat
            </span>


            <X

              onClick={() => setChatOpen(false)}

              className="cursor-pointer"

            />

          </div>




          {/* MESSAGES */}

          <div
            className="
            p-4
            h-60
            overflow-y-auto
            text-sm
            text-gray-300
            "
          >

            <p>
              Reporter: Article ready
            </p>

            <p>
              Editor: Send headline
            </p>

            <p>
              Admin: Publish tonight
            </p>


          </div>




          {/* INPUT */}

          <div
            className="
            flex
            border-t
            border-white/10
            "
          >

            <input

              placeholder="Type..."

              className="
              flex-1
              bg-transparent
              px-3
              py-2
              text-sm
              outline-none
              "

            />


            <button
              className="
              px-4
              text-red-400
              "
            >

              Send

            </button>


          </div>


        </div>

      )}


    </>
  );

}