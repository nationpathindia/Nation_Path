"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro Media Upload Component
//////////////////////////////////////////////////////////////

import {
  useRef,
  useState,
} from "react";

import {
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";


interface AstroMediaUploadProps {

  value?: string;

  onChange: (
    url: string
  ) => void;

  label?: string;

  accept?: string;

}


export default function AstroMediaUpload({

  value = "",

  onChange,

  label = "Upload Image",

  accept = "image/*",

}: AstroMediaUploadProps) {


  const inputRef =
    useRef<HTMLInputElement>(null);


  const [preview,setPreview] =
    useState(value);



  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(!file){
      return;
    }


    const url =
      URL.createObjectURL(file);


    setPreview(url);


    // Future:
    // Replace with Cloudinary / S3 upload API

    onChange(url);

  }



  function removeImage(){

    setPreview("");

    onChange("");

    if(inputRef.current){

      inputRef.current.value="";

    }

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




      {
        preview ? (

          <div

            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
            "

          >


            <img

              src={preview}

              alt="Preview"

              className="
                h-48
                w-full
                object-cover
              "

            />



            <button

              type="button"

              onClick={removeImage}

              className="
                absolute
                right-3
                top-3
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-red-500/80
                text-white
              "

            >

              <X size={16}/>

            </button>


          </div>


        ) : (


          <button

            type="button"

            onClick={()=>
              inputRef.current?.click()
            }

            className="
              flex
              h-48
              w-full
              flex-col
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-dashed
              border-slate-700
              bg-slate-900
              text-slate-400
              transition
              hover:border-yellow-500
              hover:text-yellow-400
            "

          >

            <ImageIcon size={36}/>


            <span
              className="
                text-sm
              "
            >

              Click to upload media

            </span>


            <Upload size={18}/>


          </button>


        )
      }



      <input

        ref={inputRef}

        type="file"

        accept={accept}

        onChange={handleFile}

        className="
          hidden
        "

      />


    </div>

  );

}