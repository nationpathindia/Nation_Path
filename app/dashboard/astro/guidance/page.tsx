//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO AI GUIDANCE CENTER
//
// Future:
// - AI Astrology Assistant
// - Personalized Answers
// - Kundali Context Engine
// - Premium Access Control
//////////////////////////////////////////////////////////////

import {
  Sparkles,
  MessageCircle,
  Lock,
  Send,
  BrainCircuit,
} from "lucide-react";



const guidanceCards = [
  {
    title: "Career Guidance",
    description:
      "Understand career opportunities and professional growth.",
    premium: true,
  },
  {
    title: "Relationship Guidance",
    description:
      "Get insights about relationships and compatibility.",
    premium: true,
  },
  {
    title: "Daily Cosmic Advice",
    description:
      "Personalized daily astrology suggestions.",
    premium: false,
  },
];



export default function AstroGuidancePage(){


  return (

    <div
      className="
      space-y-8
      "
    >



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

          <BrainCircuit
            className="text-yellow-400"
          />

          AI Astro Guidance

        </h1>


        <p
          className="
          mt-2
          text-gray-400
          "
        >
          Your personalized astrology assistant
          powered by cosmic intelligence.
        </p>


      </section>







      {/* AI Chat Box */}

      <section
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
            bg-yellow-400/10
            "
          >

            <Sparkles
              className="text-yellow-400"
            />

          </div>



          <div>

            <h2
              className="
              font-bold
              "
            >
              Ask Astro AI
            </h2>


            <p
              className="
              text-sm
              text-gray-400
              "
            >
              Ask questions about your life journey.
            </p>


          </div>


        </div>





        <div
          className="
          mt-6
          flex
          gap-3
          "
        >

          <input

            placeholder="Ask your astrology question..."

            className="
            flex-1
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-sm
            outline-none
            "

          />


          <button
            className="
            rounded-xl
            bg-yellow-400
            px-5
            text-black
            "
          >

            <Send size={18}/>

          </button>


        </div>



      </section>








      {/* Guidance Modules */}

      <section>


        <h2
          className="
          mb-5
          text-xl
          font-bold
          "
        >
          Intelligence Modules
        </h2>




        <div
          className="
          grid
          gap-6
          md:grid-cols-3
          "
        >


          {
            guidanceCards.map((item)=>(

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


                <div
                  className="
                  flex
                  justify-between
                  "
                >

                  <MessageCircle
                    className="text-yellow-400"
                  />


                  {
                    item.premium &&
                    <Lock
                      size={18}
                      className="text-yellow-400"
                    />
                  }


                </div>



                <h3
                  className="
                  mt-5
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


            ))
          }



        </div>


      </section>







      {/* Premium Banner */}

      <section
        className="
        rounded-3xl
        border
        border-yellow-400/20
        bg-yellow-400/10
        p-8
        "
      >


        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <Lock
            className="text-yellow-400"
          />


          <p>
            Premium members get unlimited AI Astro
            guidance with personalized insights.
          </p>


        </div>


      </section>




    </div>

  );

}