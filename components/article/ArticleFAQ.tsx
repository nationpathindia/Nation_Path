"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


interface FAQItem {

  question:string;

  answer:string;

}



interface ArticleFAQProps {

  faqItems?: FAQItem[];

}





export default function ArticleFAQ({

  faqItems = []

}:ArticleFAQProps){



  const [openIndex,setOpenIndex] =
  useState<number | null>(0);





  if(!faqItems.length){

    return null;

  }







  return (


    <section

      className="
      my-12

      md:my-16

      "

    >





      {/* HEADER */}


      <div

        className="
        mb-8

        "

      >



        <div

          className="
          flex

          items-center

          gap-3

          mb-4

          "

        >



          <span

            className="
            h-[2px]

            w-8

            bg-[#EA661B]

            "

          />



          <p

            className="
            text-[11px]

            font-bold

            uppercase

            tracking-[0.35em]

            text-[#163C80]

            "

          >

            FAQ

          </p>



        </div>






        <h2

          className="
          font-serif

          text-2xl

          font-bold

          tracking-tight

          text-[#111]


          md:text-3xl

          "

        >

          Frequently Asked Questions

        </h2>






        <p

          className="
          mt-2

          text-sm

          text-gray-600

          "

        >

          Important questions explained for readers.

        </p>





      </div>









      {/* ACCORDION */}



      <div

        className="
        divide-y

        divide-black/10

        border-y

        border-black/10

        "

      >





        {

          faqItems.map((item,index)=>(



            <div

              key={index}

              className="
              "

            >





              <button

                type="button"

                onClick={()=>


                  setOpenIndex(

                    openIndex === index

                    ?

                    null

                    :

                    index

                  )


                }

                className="
                w-full

                flex

                items-start

                justify-between

                gap-5

                py-5

                text-left

                "

              >






                <div

                  className="
                  flex

                  gap-4

                  "

                >




                  <span

                    className="
                    font-serif

                    text-lg

                    font-bold

                    text-[#163C80]/30

                    "

                  >

                    {

                      String(index+1)
                      .padStart(2,"0")

                    }

                  </span>






                  <span

                    className="
                    font-semibold

                    text-sm

                    leading-relaxed

                    text-[#111]


                    md:text-base

                    "

                  >

                    {item.question}

                  </span>





                </div>









                <ChevronDown

                  size={20}

                  className={`

                  shrink-0

                  mt-1

                  text-[#EA661B]

                  transition-transform

                  duration-300


                  ${

                  openIndex === index

                  ?

                  "rotate-180"

                  :

                  ""

                  }

                  `}

                />





              </button>









              {

                openIndex === index && (


                  <div

                    className="
                    ml-10

                    pb-5

                    pr-4

                    text-sm

                    leading-7

                    text-gray-600


                    md:text-base

                    "

                  >

                    {item.answer}

                  </div>


                )

              }







            </div>



          ))

        }







      </div>








    </section>


  );

}