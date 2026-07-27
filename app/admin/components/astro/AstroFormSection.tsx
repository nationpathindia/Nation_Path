"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro CMS Form Section Component
//////////////////////////////////////////////////////////////

import {
  ReactNode,
} from "react";


interface AstroFormSectionProps {

  title: string;

  description?: string;

  children: ReactNode;

  icon?: ReactNode;

}


export default function AstroFormSection({

  title,

  description,

  children,

  icon,

}: AstroFormSectionProps) {


  return (

    <section

      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-950
        p-6
        shadow-lg
      "

    >


      <div

        className="
          mb-6
          flex
          items-start
          gap-3
        "

      >


        {
          icon && (

            <div

              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-yellow-500/10
                text-yellow-400
              "

            >

              {icon}

            </div>

          )
        }



        <div>


          <h3

            className="
              text-lg
              font-semibold
              text-white
            "

          >

            {title}

          </h3>



          {
            description && (

              <p

                className="
                  mt-1
                  text-sm
                  text-slate-400
                "

              >

                {description}

              </p>

            )
          }


        </div>


      </div>




      <div

        className="
          space-y-5
        "

      >

        {children}

      </div>


    </section>

  );

}