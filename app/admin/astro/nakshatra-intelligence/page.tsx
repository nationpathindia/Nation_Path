"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA INTELLIGENCE CMS
//
// Admin List Page
//
// Responsibility:
// Nakshatra knowledge management only
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";



export default function NakshatraIntelligencePage(){


  const [nakshatras,setNakshatras] =

    useState<any[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [error,setError] =

    useState("");





//////////////////////////////////////////////////////////////
// FETCH NAKSHATRAS
//////////////////////////////////////////////////////////////

  const fetchNakshatras = async()=>{


    try{


      setLoading(true);



      const res = await fetch(

        "/api/admin/nakshatra-intelligence",

        {

          cache:"no-store",

        }

      );



      const data =

        await res.json();




      if(data.success){


        setNakshatras(data.data);


      }

      else{


        setError(

          data.message ||

          "Failed to load nakshatra intelligence"

        );


      }


    }


    catch(err:any){


      setError(

        err.message

      );


    }


    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    fetchNakshatras();


  },[]);








//////////////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////////////

  const deleteNakshatra = async(id:string)=>{


    const confirmDelete =

      confirm(

        "Delete this nakshatra intelligence?"

      );



    if(!confirmDelete)

      return;





    try{


      await fetch(

        `/api/admin/nakshatra-intelligence/${id}`,

        {


          method:"DELETE",


        }


      );



      fetchNakshatras();



    }


    catch(error){


      console.error(error);


    }


  };








  return (

    <div className="min-h-screen bg-[#0f172a] p-6 text-white">


      <div className="flex justify-between items-center mb-8">


        <div>


          <h1 className="text-3xl font-bold">


            Nakshatra Intelligence CMS


          </h1>


          <p className="text-gray-400 mt-2">


            Manage nakshatra knowledge content


          </p>


        </div>





        <Link


          href="/admin/astro/nakshatra-intelligence/create"


          className="bg-orange-600 px-5 py-3 rounded-lg hover:bg-orange-700"


        >

          + Add Nakshatra


        </Link>



      </div>








      {loading && (


        <div className="text-gray-400">


          Loading nakshatra intelligence...


        </div>


      )}








      {error && (


        <div className="bg-red-600 p-4 rounded-lg">


          {error}


        </div>


      )}








      {!loading && nakshatras.length === 0 && (


        <div className="bg-[#1e293b] p-6 rounded-xl">


          No nakshatra records found.


        </div>


      )}








      <div className="grid gap-5">


        {nakshatras.map((item)=>(



          <div


            key={item._id}


            className="bg-[#1e293b] rounded-xl p-6 shadow"


          >



            <div className="flex justify-between items-start">



              <div>


                <div className="flex items-center gap-3">


                  <h2 className="text-xl font-semibold">


                    {item.nakshatra}


                  </h2>



                  <span className="bg-indigo-700 px-3 py-1 rounded text-sm">


                    #{item.number}


                  </span>


                </div>



                <p className="text-gray-400 text-sm mt-1">


                  {item.slug}


                </p>



                <div className="mt-3 flex flex-wrap gap-3">


                  {item.ruler && (

                    <span className="bg-slate-700 px-3 py-1 rounded text-sm">

                      {item.ruler}

                    </span>

                  )}



                  <span className="bg-slate-700 px-3 py-1 rounded text-sm">


                    {item.status}


                  </span>


                </div>


              </div>






              <div className="flex gap-3">



                <Link


                  href={`/admin/astro/nakshatra-intelligence/${item._id}`}


                  className="bg-blue-600 px-4 py-2 rounded-lg"


                >

                  View


                </Link>





                <Link


                  href={`/admin/astro/nakshatra-intelligence/${item._id}/edit`}


                  className="bg-green-600 px-4 py-2 rounded-lg"


                >

                  Edit


                </Link>





                <button


                  onClick={()=>deleteNakshatra(item._id)}


                  className="bg-red-600 px-4 py-2 rounded-lg"


                >

                  Delete


                </button>



              </div>



            </div>






            {item.description && (


              <p className="text-gray-300 mt-5">


                {item.description.slice(0,250)}

                {item.description.length > 250 && "..."}


              </p>


            )}





          </div>



        ))}



      </div>




    </div>

  );

}