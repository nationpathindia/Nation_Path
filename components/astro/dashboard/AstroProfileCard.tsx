"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Astro Profile Card Component
//////////////////////////////////////////////////////////////

import {
  UserRound,
  CalendarDays,
  MapPin,
  Sparkles,
  Plus,
} from "lucide-react";


interface AstroProfileCardProps {

  name?: string;

  relation?: string;

  dob?: string;

  birthPlace?: string;

  zodiac?: string;

  nakshatra?: string;

  isAddCard?: boolean;

}


export default function AstroProfileCard({

  name = "Rahul Sharma",

  relation = "Self",

  dob = "15 July 1995",

  birthPlace = "Vadodara, India",

  zodiac = "Leo Ascendant",

  nakshatra = "Pushya",

  isAddCard = false,

}: AstroProfileCardProps) {


  if(isAddCard){

    return (

      <button
        className="
          flex
          min-h-[260px]
          flex-col
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
          border-dashed
          border-slate-700
          bg-slate-950
          text-slate-400
          transition
          hover:border-yellow-500
          hover:text-yellow-400
        "
      >

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-yellow-500/10
          "
        >

          <Plus size={28}/>

        </div>


        <span
          className="
            text-sm
            font-medium
          "
        >

          Add Astro Profile

        </span>


      </button>

    );

  }



  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-950
        p-6
        shadow-lg
        transition
        hover:-translate-y-1
      "
    >


      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-indigo-500/10
              text-indigo-300
            "
          >

            <UserRound size={24}/>

          </div>



          <div>

            <h3
              className="
                font-semibold
                text-white
              "
            >

              {name}

            </h3>


            <p
              className="
                text-xs
                text-yellow-400
              "
            >

              {relation}

            </p>


          </div>


        </div>



        <Sparkles
          size={20}
          className="text-yellow-400"
        />


      </div>




      <div
        className="
          mt-6
          space-y-3
        "
      >


        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            text-slate-300
          "
        >

          <CalendarDays size={16}/>

          {dob}

        </div>



        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            text-slate-300
          "
        >

          <MapPin size={16}/>

          {birthPlace}

        </div>


      </div>




      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-3
        "
      >

        <div
          className="
            rounded-xl
            bg-slate-900
            p-3
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >

            Ascendant

          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-white
            "
          >

            {zodiac}

          </p>


        </div>



        <div
          className="
            rounded-xl
            bg-slate-900
            p-3
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >

            Nakshatra

          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-white
            "
          >

            {nakshatra}

          </p>


        </div>


      </div>


    </section>

  );

}