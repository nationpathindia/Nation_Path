//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE ERROR EXPERIENCE
//
// PREMIUM VEDIC FALLBACK
//
//////////////////////////////////////////////////////////////

"use client";


import { useEffect } from "react";



//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface HoroscopeErrorProps {

  error: Error & {

    digest?: string;

  };

  reset: () => void;

}





//////////////////////////////////////////////////////////////
// ERROR COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeError({

  error,

  reset,

}: HoroscopeErrorProps) {



  useEffect(() => {

    console.error(

      "HOROSCOPE PAGE ERROR:",

      error

    );

  }, [error]);





  return (

    <main

      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#FFF9E8]
      px-5
      py-16
      flex
      items-center
      justify-center
      "

    >



      {/* GOLD AMBIENT LIGHT */}

      <div

        className="
        absolute
        left-1/2
        top-[-120px]
        h-[420px]
        w-[420px]
        -translate-x-1/2
        rounded-full
        bg-[#D4AF37]/20
        blur-[130px]
        "

      />





      <section

        className="
        relative
        z-10
        w-full
        max-w-xl
        rounded-3xl
        border
        border-[#D4AF37]/30
        bg-white/70
        p-8
        text-center
        shadow-xl
        "

      >



        {/* SYMBOL */}

        <div

          className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-[#D4AF37]/40
          bg-[#7A1F1F]/10
          text-4xl
          "

        >

          ✦

        </div>





        <h1

          className="
          mt-6
          text-2xl
          font-semibold
          text-[#7A1F1F]
          "

        >

          Cosmic Intelligence Temporarily Unavailable

        </h1>





        <p

          className="
          mt-4
          text-sm
          leading-7
          text-[#5A4300]
          "

        >

          We are unable to load today&apos;s Vedic horoscope
          experience at this moment. Please try again and
          reconnect with your daily Astro guidance.

        </p>





        <button

          onClick={reset}

          className="
          mt-8
          rounded-full
          bg-[#7A1F1F]
          px-8
          py-3
          text-sm
          font-medium
          text-[#FFF9E8]
          transition
          hover:opacity-90
          "

        >

          Try Again

        </button>



      </section>



    </main>

  );

}