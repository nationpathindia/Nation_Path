"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro CMS Filter Component
//////////////////////////////////////////////////////////////

import {
  Filter,
} from "lucide-react";


interface AstroFilterOption {

  label: string;

  value: string;

}


interface AstroFilterProps {

  label?: string;

  value: string;

  options: AstroFilterOption[];

  onChange: (
    value: string
  ) => void;

}


export default function AstroFilter({
  label = "Filter",
  value,
  options,
  onChange,
}: AstroFilterProps) {


  return (

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
          items-center
          gap-2
          text-sm
          text-slate-400
        "
      >

        <Filter size={16}/>

        <span>
          {label}
        </span>

      </div>



      <select

        value={value}

        onChange={(e)=>
          onChange(e.target.value)
        }

        className="
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-2.5
          text-sm
          text-white
          outline-none
          transition
          focus:border-yellow-500
          focus:ring-1
          focus:ring-yellow-500
        "

      >

        {
          options.map(
            (option)=>(

              <option

                key={
                  option.value
                }

                value={
                  option.value
                }

                className="
                  bg-slate-900
                  text-white
                "

              >

                {
                  option.label
                }

              </option>

            )
          )
        }


      </select>


    </div>

  );

}