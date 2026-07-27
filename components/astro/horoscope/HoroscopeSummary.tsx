interface Props {
  love?: string | null;
  career?: string | null;
  finance?: string | null;
  health?: string | null;
  travel?: string | null;
  mood?: string | null;
}


const cards = [

  {
    key: "love",
    title: "Love",
    emoji: "❤️",
  },

  {
    key: "career",
    title: "Career",
    emoji: "💼",
  },

  {
    key: "finance",
    title: "Finance",
    emoji: "💰",
  },

  {
    key: "health",
    title: "Health",
    emoji: "🌿",
  },

  {
    key: "travel",
    title: "Travel",
    emoji: "✦",
  },

  {
    key: "mood",
    title: "Mood",
    emoji: "☀️",
  },

];



export default function HoroscopeSummary({

  love,
  career,
  finance,
  health,
  travel,
  mood,

}: Props) {


  const values = {

    love:
      love ?? "Positive energy",

    career:
      career ?? "Growth opportunities",

    finance:
      finance ?? "Stable financial flow",

    health:
      health ?? "Balanced wellbeing",

    travel:
      travel ?? "Favorable conditions",

    mood:
      mood ?? "Energetic and focused",

  };




  return (

    <section

      aria-labelledby="horoscope-summary-heading"

      className="
        mt-12
      "

    >




      {/* Header */}

      <div className="mb-8">


        <span

          className="
            inline-flex
            rounded-full
            border
            border-[#C9A227]/30
            bg-[#C9A227]/10
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#8a6d12]
          "

        >

          Today's Highlights

        </span>





        <h2

          id="horoscope-summary-heading"

          className="
            mt-5
            font-serif
            text-3xl
            font-bold
            text-[#071426]
            md:text-4xl
          "

        >

          Horoscope Summary

        </h2>





        <p

          className="
            mt-3
            text-slate-600
          "

        >

          A personalized overview of today's cosmic guidance.

        </p>



      </div>







      {/* Summary Cards */}

      <div

        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "

      >



        {
          cards.map((card)=>(


            <div

              key={card.key}

              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                transition
                hover:border-[#C9A227]/40
                hover:shadow-lg
              "

            >



              <div

                className="
                  flex
                  items-start
                  justify-between
                "

              >



                <div>


                  <div

                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#071426]
                      text-2xl
                    "

                  >

                    {card.emoji}

                  </div>





                  <h3

                    className="
                      mt-5
                      text-lg
                      font-semibold
                      text-[#071426]
                    "

                  >

                    {card.title}

                  </h3>






                  <p

                    className="
                      mt-3
                      leading-7
                      text-slate-600
                    "

                  >

                    {
                      values[
                        card.key as keyof typeof values
                      ]
                    }

                  </p>




                </div>





                <div

                  className="
                    h-10
                    w-10
                    rounded-full
                    border
                    border-[#C9A227]/30
                    bg-[#C9A227]/10
                  "

                />



              </div>




            </div>



          ))
        }



      </div>




    </section>

  );

}