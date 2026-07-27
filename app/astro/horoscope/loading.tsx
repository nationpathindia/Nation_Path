//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE LOADING EXPERIENCE
//
// PREMIUM VEDIC SKELETON
//
//////////////////////////////////////////////////////////////

export default function HoroscopeLoading() {

  return (

    <main

      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#FFF9E8]
      px-5
      py-10
      "

    >


      {/* Ambient Glow */}

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
        blur-[120px]
        "

      />



      <div

        className="
        relative
        z-10
        mx-auto
        max-w-6xl
        space-y-8
        "

      >


        {/* Hero Skeleton */}

        <section

          className="
          rounded-3xl
          border
          border-[#D4AF37]/30
          bg-white/60
          p-6
          shadow-xl
          "

        >

          <div

            className="
            h-8
            w-3/4
            animate-pulse
            rounded-xl
            bg-[#D4AF37]/20
            "

          />


          <div

            className="
            mt-4
            h-4
            w-full
            animate-pulse
            rounded-lg
            bg-[#D4AF37]/15
            "

          />


          <div

            className="
            mt-3
            h-4
            w-2/3
            animate-pulse
            rounded-lg
            bg-[#D4AF37]/15
            "

          />


        </section>





        {/* Panchang Skeleton */}

        <section

          className="
          rounded-3xl
          border
          border-[#7A1F1F]/20
          bg-white/70
          p-6
          "

        >

          <div

            className="
            h-6
            w-48
            animate-pulse
            rounded-lg
            bg-[#7A1F1F]/15
            "

          />


          <div

            className="
            mt-6
            grid
            grid-cols-2
            gap-4
            "

          >

            {[1,2,3,4].map((item)=>(

              <div

                key={item}

                className="
                h-24
                animate-pulse
                rounded-2xl
                bg-[#D4AF37]/15
                "

              />

            ))}


          </div>


        </section>





        {/* Zodiac Skeleton */}

        <section

          className="
          rounded-3xl
          border
          border-[#D4AF37]/30
          bg-white/60
          p-6
          "

        >

          <div

            className="
            h-6
            w-40
            animate-pulse
            rounded-lg
            bg-[#D4AF37]/20
            "

          />


          <div

            className="
            mt-6
            grid
            grid-cols-3
            gap-3
            sm:grid-cols-6
            "

          >

            {[1,2,3,4,5,6].map((item)=>(

              <div

                key={item}

                className="
                aspect-square
                animate-pulse
                rounded-full
                bg-[#D4AF37]/15
                "

              />

            ))}


          </div>


        </section>



      </div>


    </main>

  );

}