"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";


export default function AdminPostsPage() {


  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [editorial, setEditorial] = useState("");
  const [schedule, setSchedule] = useState("");
  const [breaking, setBreaking] = useState("");
  const [featured, setFeatured] = useState("");
  const [flash, setFlash] = useState("");


  const [stats, setStats] = useState({

    totalArticles:0,
    approvedArticles:0,
    pendingArticles:0,
    draftArticles:0,
    featuredArticles:0,
    breakingArticles:0,
    editorialArticles:0,
    scheduledArticles:0,

  });


  const categories = [

    "politics",
    "defence",
    "international",
    "economy",
    "business",
    "technology",
    "sports",
    "education",
    "health",
    "science",
    "environment",
    "automobile",
    "entertainment",
    "lifestyle",
    "travel",
    "culture"

  ];



  const fetchPosts = useCallback(async()=>{


    try{


      setLoading(true);


      const params = new URLSearchParams();


      params.set(
        "page",
        String(page)
      );


      params.set(
        "limit",
        "20"
      );


      if(search)
      params.set("search",search);


      if(status)
      params.set("status",status);


      if(category)
      params.set("category",category);


      if(editorial)
      params.set("editorial",editorial);


      if(schedule)
      params.set("schedule",schedule);


      if(breaking)
      params.set("breaking",breaking);


      if(featured)
      params.set("featured",featured);


      if(flash)
      params.set("flash",flash);



      const res = await fetch(
        `/api/articles?${params.toString()}`
      );


      const data = await res.json();



      if(data.success){


        setPosts(
          data.articles || []
        );


        setTotalPages(
          data.pagination?.totalPages || 1
        );


      }


    }
    catch(error){

      console.error(
        "FETCH POSTS ERROR",
        error
      );

    }
    finally{

      setLoading(false);

    }


  },[
    page,
    search,
    status,
    category,
    editorial,
    schedule,
    breaking,
    featured,
    flash
  ]);



  const fetchStats = useCallback(async()=>{


    try{


      const res = await fetch(
        "/api/articles/stats"
      );


      const data = await res.json();


      if(data.success){

        setStats(data.stats);

      }


    }
    catch(error){

      console.error(
        "STATS ERROR",
        error
      );

    }


  },[]);



  useEffect(()=>{

    fetchPosts();
    fetchStats();

  },[
    fetchPosts,
    fetchStats
  ]);



  async function updateStatus(
    id:string,
    value:string
  ){


    await fetch(
      `/api/articles/${id}`,
      {

        method:"PATCH",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          id,
          status:value

        })

      }
    );


    fetchPosts();
    fetchStats();

  }



  async function deletePost(
    id:string
  ){


    if(
      !confirm(
        "Delete this article?"
      )
    )
    return;



    await fetch(
      "/api/articles",
      {

        method:"DELETE",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          id

        })

      }
    );


    fetchPosts();
    fetchStats();


  }



  function clearFilters(){


    setSearch("");
    setStatus("");
    setCategory("");
    setEditorial("");
    setSchedule("");
    setBreaking("");
    setFeatured("");
    setFlash("");
    setPage(1);


  }



  function badge(
    value:string
  ){

    if(value==="approved")
    return "bg-green-600";

    if(value==="pending")
    return "bg-yellow-600";

    if(value==="draft")
    return "bg-slate-600";

    if(value==="rejected")
    return "bg-red-600";


    return "bg-gray-600";

  }
  return (

    <div
      className="
      min-h-screen
      bg-[#020617]
      text-white
      p-5
      md:p-10
      "
    >


      {/* HEADER */}

      <header className="mb-8">


        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          "
        >

          News CMS Control Center

        </h1>


        <p
          className="
          text-gray-400
          mt-2
          "
        >

          Manage News, Editorial, Publishing and Content Intelligence

        </p>


      </header>





      {/* STATS */}


      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-4
        lg:grid-cols-8
        gap-4
        mb-8
        "
      >


        {[
          [
            "Total",
            stats.totalArticles
          ],

          [
            "Published",
            stats.approvedArticles
          ],

          [
            "Pending",
            stats.pendingArticles
          ],

          [
            "Draft",
            stats.draftArticles
          ],

          [
            "Scheduled",
            stats.scheduledArticles
          ],

          [
            "Editorial",
            stats.editorialArticles
          ],

          [
            "Featured",
            stats.featuredArticles
          ],

          [
            "Breaking",
            stats.breakingArticles
          ]

        ].map(
          (item:any)=>(


            <div

              key={item[0]}

              className="
              bg-[#0f172a]
              border
              border-white/10
              rounded-xl
              p-4
              "
            >


              <p
                className="
                text-gray-400
                text-sm
                "
              >

                {item[0]}

              </p>


              <h2
                className="
                text-3xl
                font-bold
                mt-2
                "
              >

                {item[1]}

              </h2>


            </div>


          )
        )}


      </div>







      {/* FILTER PANEL */}


      <div
        className="
        bg-[#0f172a]
        border
        border-white/10
        rounded-2xl
        p-5
        mb-8
        "
      >


        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-4
          lg:grid-cols-8
          gap-3
          "
        >



          <input

            value={search}

            onChange={(e)=>{

              setSearch(
                e.target.value
              );

              setPage(1);

            }}

            placeholder="Search..."

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            px-3
            py-2
            "

          />





          <select

            value={category}

            onChange={(e)=>{

              setCategory(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >

            <option value="">
              Category
            </option>


            {
              categories.map(
                (c)=>(

                  <option
                    key={c}
                    value={c}
                  >

                    {c}

                  </option>

                )
              )
            }


          </select>





          <select

            value={status}

            onChange={(e)=>{

              setStatus(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >

            <option value="">
              Status
            </option>


            <option value="approved">
              Published
            </option>


            <option value="pending">
              Pending
            </option>


            <option value="draft">
              Draft
            </option>


            <option value="rejected">
              Rejected
            </option>


          </select>






          <select

            value={editorial}

            onChange={(e)=>{

              setEditorial(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >


            <option value="">
              Content Type
            </option>


            <option value="true">
              Editorial
            </option>


            <option value="false">
              News
            </option>


          </select>





          <select

            value={schedule}

            onChange={(e)=>{

              setSchedule(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >


            <option value="">
              Publishing
            </option>


            <option value="scheduled">
              Scheduled
            </option>


            <option value="published">
              Published
            </option>


          </select>

          <select

            value={breaking}

            onChange={(e)=>{

              setBreaking(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >

            <option value="">
              Breaking
            </option>

            <option value="true">
              Yes
            </option>

            <option value="false">
              No
            </option>


          </select>





          <select

            value={featured}

            onChange={(e)=>{

              setFeatured(
                e.target.value
              );

              setPage(1);

            }}

            className="
            bg-[#020617]
            border
            border-white/10
            rounded-lg
            "

          >


            <option value="">
              Featured
            </option>


            <option value="true">
              Yes
            </option>


            <option value="false">
              No
            </option>


          </select>





          <button

            onClick={clearFilters}

            className="
            bg-[#EA661B]
            rounded-lg
            font-semibold
            "

          >

            Clear

          </button>



        </div>


      </div>







      {/* CREATE BUTTONS */}


      <div
        className="
        flex
        justify-end
        gap-3
        mb-6
        "
      >


        <Link

          href="/admin/posts/create"

          className="
          bg-[#163C80]
          px-5
          py-3
          rounded-xl
          font-semibold
          "

        >

          + Create News

        </Link>




        <Link

          href="/admin/posts/editorial/create"

          className="
          bg-purple-600
          px-5
          py-3
          rounded-xl
          font-semibold
          "

        >

          + Create Editorial

        </Link>



      </div>







      {/* DESKTOP TABLE */}


      <div

        className="
        hidden
        md:block
        bg-[#0f172a]
        border
        border-white/10
        rounded-2xl
        overflow-hidden
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
            bg-[#0b1220]
            text-gray-400
            "

          >

            <tr>


              <th className="p-4 text-left">
                Title
              </th>


              <th>
                Type
              </th>


              <th>
                Category
              </th>


              <th>
                Status
              </th>


              <th>
                Publishing
              </th>


              <th>
                Flags
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>






          <tbody>


          {


          loading ?


          <tr>

            <td

              colSpan={7}

              className="
              p-10
              text-center
              "

            >

              Loading...

            </td>


          </tr>



          :


          posts.length===0 ?



          <tr>

            <td

              colSpan={7}

              className="
              p-10
              text-center
              text-gray-400
              "

            >

              No content found

            </td>


          </tr>



          :



          posts.map(

            (post)=>(


              <tr

                key={post.id}

                className="
                border-t
                border-white/10
                hover:bg-white/5
                "

              >




                <td

                  className="
                  p-4
                  max-w-md
                  "

                >


                  <p
                    className="
                    font-semibold
                    line-clamp-2
                    "
                  >

                    {post.title}

                  </p>



                  <div

                    className="
                    text-xs
                    text-gray-500
                    mt-2
                    "

                  >

                    {
                      new Date(
                        post.createdAt
                      )
                      .toLocaleDateString()
                    }


                  </div>


                </td>






                <td>


                {

                post.isEditorial ?


                <span

                  className="
                  bg-purple-600
                  px-2
                  py-1
                  rounded
                  text-xs
                  "

                >

                  Editorial

                </span>


                :


                <span

                  className="
                  bg-blue-600
                  px-2
                  py-1
                  rounded
                  text-xs
                  "

                >

                  News

                </span>


                }



                </td>





                <td>


                  {
                    post.category?.name
                    ||
                    "-"
                  }


                </td>





                <td>


                  <select


                    value={post.status}


                    onChange={(e)=>

                      updateStatus(
                        post.id,
                        e.target.value
                      )

                    }


                    className={`

                    rounded-lg

                    px-3

                    py-2

                    ${badge(post.status)}

                    `}


                  >


                    <option value="pending">
                      Pending
                    </option>


                    <option value="approved">
                      Published
                    </option>


                    <option value="draft">
                      Draft
                    </option>


                    <option value="rejected">
                      Rejected
                    </option>


                    <option value="archived">
                      Archived
                    </option>


                  </select>



                </td>
                <td>


                  {
                    post.publishedAt
                    &&
                    new Date(post.publishedAt) > new Date()

                    ?

                    <span

                      className="
                      bg-orange-600
                      px-2
                      py-1
                      rounded
                      text-xs
                      "

                    >

                      Scheduled

                    </span>


                    :


                    <span

                      className="
                      bg-green-600
                      px-2
                      py-1
                      rounded
                      text-xs
                      "

                    >

                      Published

                    </span>


                  }


                </td>





                <td>


                  {
                    post.breaking &&

                    <div className="text-orange-400">
                      Breaking
                    </div>
                  }



                  {
                    post.featured &&

                    <div className="text-yellow-400">
                      Featured
                    </div>
                  }



                  {
                    post.flash &&

                    <div className="text-blue-400">
                      Flash
                    </div>
                  }



                </td>






                <td>


                  <div
                    className="
                    flex
                    gap-2
                    "
                  >


                    <Link

                      href={`/admin/posts/edit/${post.id}`}

                      className="
                      bg-[#163C80]
                      px-3
                      py-2
                      rounded-lg
                      "

                    >

                      Edit

                    </Link>




                    <Link

                      href={`/article/${post.slug}`}

                      target="_blank"

                      className="
                      bg-green-700
                      px-3
                      py-2
                      rounded-lg
                      "

                    >

                      View

                    </Link>




                    <button

                      onClick={()=>
                        deletePost(post.id)
                      }

                      className="
                      bg-red-600
                      px-3
                      py-2
                      rounded-lg
                      "

                    >

                      Delete

                    </button>



                  </div>


                </td>




              </tr>


            )


          )


          }


          </tbody>


        </table>


      </div>







      {/* MOBILE */}


      <div
        className="
        md:hidden
        space-y-4
        "
      >


        {
          posts.map(
            (post)=>(


              <div

                key={post.id}

                className="
                bg-[#0f172a]
                border
                border-white/10
                rounded-xl
                p-4
                "

              >


                <h3 className="font-semibold">

                  {post.title}

                </h3>




                <div
                  className="
                  flex
                  gap-2
                  mt-3
                  "
                >


                  {
                    post.isEditorial &&

                    <span
                      className="
                      bg-purple-600
                      px-2
                      py-1
                      rounded
                      text-xs
                      "
                    >

                      Editorial

                    </span>
                  }


                  {
                    post.breaking &&

                    <span
                      className="
                      bg-orange-600
                      px-2
                      py-1
                      rounded
                      text-xs
                      "
                    >

                      Breaking

                    </span>
                  }


                </div>





                <p className="
                text-gray-400
                text-sm
                mt-3
                ">

                  {
                    post.category?.name
                    ||
                    "Editorial"
                  }

                </p>




                <div
                  className="
                  flex
                  gap-2
                  mt-5
                  "
                >


                  <Link

                    href={`/admin/posts/edit/${post.id}`}

                    className="
                    bg-[#163C80]
                    px-3
                    py-2
                    rounded-lg
                    "

                  >

                    Edit

                  </Link>




                  <button

                    onClick={()=>
                      deletePost(post.id)
                    }

                    className="
                    bg-red-600
                    px-3
                    py-2
                    rounded-lg
                    "

                  >

                    Delete

                  </button>


                </div>


              </div>


            )
          )
        }


      </div>







      {/* PAGINATION */}


      <div

        className="
        flex
        justify-center
        items-center
        gap-5
        mt-8
        "

      >


        <button

          disabled={page<=1}

          onClick={()=>{

            setPage(
              p=>p-1
            );

          }}

          className="
          bg-[#163C80]
          px-4
          py-2
          rounded-lg
          disabled:opacity-40
          "

        >

          Previous

        </button>




        <span className="text-gray-300">

          Page {page} / {totalPages}

        </span>





        <button

          disabled={page>=totalPages}

          onClick={()=>{

            setPage(
              p=>p+1
            );

          }}

          className="
          bg-[#163C80]
          px-4
          py-2
          rounded-lg
          disabled:opacity-40
          "

        >

          Next

        </button>



      </div>





    </div>

  );


}