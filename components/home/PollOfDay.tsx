"use client";

import { useState } from "react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollData {
  question: string;
  category: string;
  totalVotes: number;
  options: PollOption[];
}

const pollData: PollData = {
  question:
    "क्या भारत को अपनी रक्षा बजट और बढ़ाना चाहिए?",
  category: "National Security",
  totalVotes: 24850,

  options: [
    {
      id: "a",
      text: "हाँ, सुरक्षा के लिए जरूरी है",
      votes: 15420,
    },
    {
      id: "b",
      text: "नहीं, आर्थिक संतुलन जरूरी है",
      votes: 6950,
    },
    {
      id: "c",
      text: "बजट का बेहतर इस्तेमाल होना चाहिए",
      votes: 2480,
    },
  ],
};


export default function PollOfDay() {

  const [selected, setSelected] = useState<string | null>(null);


  return (

    <section className="
      w-full
      mt-10
      px-4
      md:px-0
    ">

      <div className="
        max-w-5xl
        mx-auto
        border
        border-black/10
        bg-white
        rounded-xl
        overflow-hidden
      ">


        {/* Header */}

        <div className="
          bg-[#0b1220]
          text-white
          px-5
          py-4
        ">

          <div className="
            text-xs
            uppercase
            tracking-widest
            text-yellow-400
          ">
            NationPath Poll
          </div>


          <h2 className="
            text-xl
            md:text-2xl
            font-semibold
            mt-1
          ">
            Poll of the Day
          </h2>

        </div>



        {/* Content */}

        <div className="
          p-5
        ">


          <span className="
            text-xs
            text-gray-500
            uppercase
          ">
            {pollData.category}
          </span>



          <h3 className="
            text-lg
            md:text-xl
            font-semibold
            mt-3
            leading-relaxed
            text-gray-900
          ">
            {pollData.question}
          </h3>



          <div className="
            mt-6
            space-y-4
          ">


          {pollData.options.map((option)=>{

            const percentage =
            Math.round(
              (option.votes / pollData.totalVotes) * 100
            );


            return (

              <button
                key={option.id}
                onClick={()=>setSelected(option.id)}
                className={`
                  w-full
                  text-left
                  border
                  rounded-lg
                  p-3
                  transition
                  ${
                    selected===option.id
                    ?
                    "border-yellow-500 bg-yellow-50"
                    :
                    "border-gray-200"
                  }
                `}
              >

                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">

                  <span>
                    {option.text}
                  </span>

                  <span className="
                    font-semibold
                  ">
                    {percentage}%
                  </span>

                </div>


                <div className="
                  h-2
                  bg-gray-100
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      bg-[#0b1220]
                    "
                    style={{
                      width:`${percentage}%`
                    }}
                  />

                </div>


              </button>

            )

          })}


          </div>



          <div className="
            mt-6
            flex
            justify-between
            items-center
            text-sm
            text-gray-500
          ">

            <span>
              {pollData.totalVotes.toLocaleString()} votes
            </span>


            <span>
              Updated Today
            </span>


          </div>


        </div>


      </div>


    </section>

  );

}