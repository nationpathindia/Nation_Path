"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro CMS Search Component
//////////////////////////////////////////////////////////////

import {
  Search,
  X,
} from "lucide-react";


interface AstroSearchProps {

  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;

  onClear?: () => void;

}


export default function AstroSearch({
  value,
  onChange,
  placeholder = "Search Astro knowledge...",
  onClear,
}: AstroSearchProps) {


  return (

    <div
      className="
        relative
        w-full
        max-w-md
      "
    >

      <Search
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />


      <input

        type="text"

        value={value}

        onChange={(e)=> 
          onChange(e.target.value)
        }

        placeholder={placeholder}

        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          py-3
          pl-10
          pr-10
          text-sm
          text-white
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-yellow-500
          focus:ring-1
          focus:ring-yellow-500
        "

      />


      {
        value && (

          <button

            type="button"

            onClick={()=>{
              onChange("");

              if(onClear){
                onClear();
              }
            }}

            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
            "

          >

            <X size={16}/>

          </button>

        )
      }


    </div>

  );

}