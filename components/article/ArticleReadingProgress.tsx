"use client";

import { useEffect, useState } from "react";


export default function ArticleReadingProgress(){


  const [progress,setProgress] = useState(0);



  useEffect(()=>{


    function updateProgress(){


      const scrollTop =
      window.scrollY;


      const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;



      const percentage =
      docHeight > 0
      ? 
      (scrollTop / docHeight) * 100
      :
      0;



      setProgress(
        Math.min(
          100,
          Math.max(0,percentage)
        )
      );


    }



    window.addEventListener(
      "scroll",
      updateProgress
    );


    updateProgress();



    return ()=>{

      window.removeEventListener(
        "scroll",
        updateProgress
      );

    };


  },[]);






  return (


    <div

      className="
      fixed
      top-0
      left-0
      z-50
      h-[3px]
      w-full
      bg-black/5

      "

    >



      <div

        className="
        h-full
        bg-[#EA661B]
        transition-all
        duration-150
        "

        style={{

          width:`${progress}%`

        }}

      />



    </div>


  );

}