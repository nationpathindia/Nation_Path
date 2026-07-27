"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro Tag Input Component
//////////////////////////////////////////////////////////////

import {
  useState,
  KeyboardEvent,
} from "react";

import {
  X,
  Plus,
} from "lucide-react";


interface AstroTagInputProps {

  label?: string;

  value: string[];

  onChange: (
    tags: string[]
  ) => void;

  placeholder?: string;

}


export default function AstroTagInput({

  label = "Tags",

  value,

  onChange,

  placeholder = "Add tag and press Enter",

}: AstroTagInputProps) {


  const [input, setInput] =
    useState("");



  function addTag(){

    const newTag =
      input.trim();


    if(
      !newTag ||
      value.includes(newTag)
    ){
      return;
    }


    onChange([
      ...value,
      newTag
    ]);


    setInput("");

  }



  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ){

    if(
      e.key === "Enter"
    ){

      e.preventDefault();

      addTag();

    }


  }



  function removeTag(
    tag:string
  ){

    onChange(
      value.filter(
        item => item !== tag
      )
    );

  }



  return (

    <div
      className="
        space-y-3
      "
    >


      <label

        className="
          text-sm
          font-medium
          text-slate-300
        "

      >

        {label}

      </label>




      <div

        className="
          flex
          min-h-[46px]
          flex-wrap
          items-center
          gap-2
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-2
        "

      >


        {
          value.map(
            (tag)=>(

              <span

                key={tag}

                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-yellow-500/30
                  bg-yellow-500/10
                  px-3
                  py-1
                  text-xs
                  text-yellow-300
                "

              >

                {tag}


                <button

                  type="button"

                  onClick={()=>
                    removeTag(tag)
                  }

                  className="
                    hover:text-white
                  "

                >

                  <X size={13}/>

                </button>


              </span>

            )
          )
        }



        <input

          value={input}

          onChange={(e)=>
            setInput(e.target.value)
          }

          onKeyDown={handleKeyDown}

          placeholder={placeholder}

          className="
            min-w-[180px]
            flex-1
            bg-transparent
            px-2
            py-1
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
          "

        />



        <button

          type="button"

          onClick={addTag}

          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-yellow-500/20
            text-yellow-400
            transition
            hover:bg-yellow-500/30
          "

        >

          <Plus size={16}/>

        </button>


      </div>


    </div>

  );

}