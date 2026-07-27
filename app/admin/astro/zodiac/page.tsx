"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";



export default function ZodiacCMSPage(){


  const [zodiacList,setZodiacList] =
    useState<any[]>([]);


  const [loading,setLoading] =
    useState(false);


  const [search,setSearch] =
    useState("");


  const [status,setStatus] =
    useState("");








  const fetchZodiac =
    useCallback(async()=>{


      setLoading(true);


      try{


        const res =
          await fetch(
            "/api/admin/zodiac"
          );


        const data =
          await res.json();



        if(data.success){

          setZodiacList(
            data.data || []
          );

        }


      }

      catch(error){


        console.error(
          "Zodiac fetch error",
          error
        );


      }


      setLoading(false);



    },[]);








  useEffect(()=>{

    fetchZodiac();

  },[fetchZodiac]);









  const deleteZodiac =
    async(id:string)=>{


      if(
        !confirm(
          "Delete zodiac permanently?"
        )
      )
      return;




      try{


        await fetch(

          `/api/admin/zodiac/${id}`,

          {

            method:"DELETE",

          }

        );


        fetchZodiac();



      }

      catch(error){

        console.error(error);

      }


    };









  const filteredData =

    zodiacList.filter((item)=>{


      const matchSearch =

        item.names?.english

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

        ||

        item.zodiac

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        );



      const matchStatus =

        status

        ?

        item.status === status

        :

        true;



      return (

        matchSearch &&

        matchStatus

      );


    });









  const Card = ({
    title,
    value,
    color,
    onClick,
    active
  }:any)=>(


    <div

      onClick={onClick}

      className={`

      cursor-pointer

      p-5

      rounded-xl

      ${color}

      transition

      hover:scale-105


      ${
        active
        ?
        "ring-2 ring-white"
        :
        ""
      }

      `}

    >


      <p className="text-sm opacity-80">

        {title}

      </p>


      <h2 className="text-3xl font-bold mt-2">

        {value}

      </h2>


    </div>


  );









  return (

    <div

      className="

      p-8

      bg-[#0f172a]

      text-white

      min-h-screen

      "

    >




      <h1

        className="

        text-3xl

        font-bold

        mb-8

        "

      >

        🔮 Zodiac Management CMS

      </h1>








      {/* STATS */}



      <div

        className="

        grid

        grid-cols-2

        md:grid-cols-4

        gap-5

        mb-8

        "

      >



        <Card

          title="Total Zodiac"

          value={zodiacList.length}

          color="bg-indigo-600"

          active={!status}

          onClick={()=>setStatus("")}

        />



        <Card

          title="Published"

          value={

            zodiacList.filter(

              x=>x.status==="published"

            ).length

          }

          color="bg-green-600"

          active={status==="published"}

          onClick={()=>

            setStatus("published")

          }

        />



        <Card

          title="Draft"

          value={

            zodiacList.filter(

              x=>x.status==="draft"

            ).length

          }

          color="bg-gray-600"

          active={status==="draft"}

          onClick={()=>

            setStatus("draft")

          }

        />



        <Card

          title="Signs"

          value="12"

          color="bg-orange-600"

        />




      </div>









      {/* ACTION */}



      <div

        className="

        flex

        justify-between

        mb-6

        "

      >


        <input


          placeholder="Search zodiac..."


          value={search}


          onChange={(e)=>

            setSearch(

              e.target.value

            )

          }


          className="

          bg-[#1e293b]

          border

          border-white/10

          px-4

          py-2

          rounded-lg

          w-72

          "

        />





        <Link

          href="/admin/astro/zodiac/create"

          className="

          bg-orange-600

          px-5

          py-2

          rounded-lg

          "

        >

          + Add Zodiac

        </Link>



      </div>









      {/* TABLE */}




      <div

        className="

        bg-[#1e293b]

        rounded-xl

        overflow-x-auto

        "

      >



      <table

        className="

        w-full

        text-sm

        "

      >



      <thead

        className="

        bg-[#0f172a]

        text-gray-300

        "

      >

      <tr>


        <th className="p-4 text-left">

          Zodiac

        </th>


        <th className="p-4">

          Element

        </th>


        <th className="p-4">

          Planet

        </th>


        <th className="p-4">

          Status

        </th>


        <th className="p-4">

          Actions

        </th>


      </tr>

      </thead>







      <tbody>


      {

      loading ?


      (

        <tr>

          <td

          colSpan={5}

          className="p-6 text-center"

          >

            Loading...

          </td>


        </tr>


      )

      :


      filteredData.length===0 ?


      (

        <tr>

          <td

          colSpan={5}

          className="p-6 text-center text-gray-400"

          >

            No zodiac found

          </td>

        </tr>


      )

      :


      filteredData.map((item)=>(



        <tr

          key={item._id}

          className="

          border-t

          border-gray-700

          hover:bg-[#243044]

          "

        >



        <td className="p-4">

          <div className="flex items-center gap-3">


            {

              item.media?.icon &&

              <img

                src={item.media.icon}

                className="

                w-10

                h-10

                object-contain

                "

              />

            }



            <div>


              <p className="font-semibold">

                {item.names?.english}

              </p>


              <p className="text-gray-400 text-xs">

                {item.zodiac}

              </p>


            </div>



          </div>


        </td>





        <td className="p-4 text-center">

          {item.element || "-"}

        </td>





        <td className="p-4 text-center">

          {item.rulingPlanet || "-"}

        </td>





        <td className="p-4 text-center">


          <span

          className={`

          px-3

          py-1

          rounded

          text-xs


          ${

          item.status==="published"

          ?

          "bg-green-600"

          :

          "bg-gray-600"

          }


          `}

          >

            {item.status}

          </span>


        </td>





        <td className="p-4 flex gap-2">


          <Link

          href={`/admin/astro/zodiac/${item._id}/edit`}

          className="

          bg-blue-600

          px-3

          py-1

          rounded

          text-xs

          "

          >

            Edit

          </Link>





          <button

          onClick={()=>deleteZodiac(item._id)}

          className="

          bg-red-600

          px-3

          py-1

          rounded

          text-xs

          "

          >

            Delete

          </button>



        </td>




        </tr>



      ))

      }



      </tbody>


      </table>



      </div>






    </div>


  );


}