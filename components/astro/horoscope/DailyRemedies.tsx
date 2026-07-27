interface Props {
  todayRemedy?: string | null;
  chantMantra?: string | null;
  donation?: string | null;
  auspiciousWork?: string | null;
  avoidToday?: string | null;

  fastingSuggestion?: string | null;
  deityOfTheDay?: string | null;
}


const remedies = [
  {
    key: "todayRemedy",
    title: "Today's Remedy",
    emoji: "🪔",
  },
  {
    key: "chantMantra",
    title: "Mantra",
    emoji: "🕉️",
  },
  {
    key: "donation",
    title: "Donation",
    emoji: "🙏",
  },
  {
    key: "auspiciousWork",
    title: "Auspicious Work",
    emoji: "✨",
  },
  {
    key: "avoidToday",
    title: "Avoid Today",
    emoji: "⚠️",
  },
  {
    key: "fastingSuggestion",
    title: "Fasting",
    emoji: "🌿",
  },
];



export default function DailyRemedies({

  todayRemedy,
  chantMantra,
  donation,
  auspiciousWork,
  avoidToday,
  fastingSuggestion,
  deityOfTheDay,

}: Props) {


  const values: Record<
    string,
    string | null | undefined
  > = {

    todayRemedy,
    chantMantra,
    donation,
    auspiciousWork,
    avoidToday,
    fastingSuggestion,

  };



  return (

    <section
      aria-labelledby="remedies-heading"
      className="
        my-14
      "
    >


      <div

        className="
          relative
          overflow-hidden
          rounded-[2.5rem]
          border
          border-yellow-400/20
          bg-gradient-to-br
          from-[#071426]
          via-[#0b1225]
          to-[#050816]
          p-8
          shadow-2xl
          md:p-10
        "

      >


        {/* Cosmic Glow */}

        <div
          aria-hidden="true"
          className="
            absolute
            -right-20
            -top-20
            h-80
            w-80
            rounded-full
            bg-yellow-400/20
            blur-3xl
          "
        />


        <div
          aria-hidden="true"
          className="
            absolute
            -bottom-20
            -left-20
            h-72
            w-72
            rounded-full
            bg-purple-500/20
            blur-3xl
          "
        />



        <div
          className="
            relative
            z-10
          "
        >


          {/* Header */}

          <div
            className="
              text-center
            "
          >


            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-yellow-400/30
                bg-yellow-400/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-yellow-300
              "
            >

              Spiritual Guidance

            </span>




            <h2

              id="remedies-heading"

              className="
                mt-5
                font-serif
                text-3xl
                font-bold
                text-white
                md:text-4xl
              "

            >

              Today's Remedies & Guidance

            </h2>



            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                leading-7
                text-slate-300
              "
            >

              Ancient Vedic remedies and spiritual practices
              for maintaining positive cosmic energy.

            </p>



            {
              deityOfTheDay && (

                <div
                  className="
                    mx-auto
                    mt-6
                    inline-flex
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                    text-sm
                    text-slate-200
                    backdrop-blur
                  "
                >

                  Divine Energy:

                  <span
                    className="
                      ml-2
                      font-semibold
                      text-yellow-300
                    "
                  >

                    {deityOfTheDay}

                  </span>


                </div>

              )
            }



          </div>





          {/* Remedy Cards */}


          <div

            className="
              mt-10
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "

          >


            {
              remedies.map((item)=>(


                <RemedyCard

                  key={item.key}

                  emoji={item.emoji}

                  title={item.title}

                  value={
                    values[item.key] ??
                    "Positive actions bring balanced energy."
                  }

                />


              ))
            }


          </div>



        </div>


      </div>


    </section>

  );

}







function RemedyCard({

  emoji,
  title,
  value,

}:{

  emoji:string;
  title:string;
  value:string;

}) {


  return (

    <div

      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        p-6
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-yellow-400/40
      "

    >



      <div
        aria-hidden="true"
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-yellow-400/10
          blur-2xl
          transition
          group-hover:bg-yellow-400/20
        "
      />



      <div
        className="
          relative
          z-10
        "
      >



        <div
          className="
            text-4xl
          "
        >

          {emoji}

        </div>




        <h3

          className="
            mt-5
            font-semibold
            text-white
          "

        >

          {title}

        </h3>




        <p

          className="
            mt-3
            text-sm
            leading-7
            text-slate-300
          "

        >

          {value}

        </p>



      </div>



    </div>

  );

}