"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Editor from "@/components/Editor";

interface FAQItem {
  question: string;
  answer: string;
}

interface ArticleForm {
  title: string;
  slug: string;
  category: string;

  content: string;

  images: string[];

  videoUrl: string;
  videoPosition: string;

  breaking: boolean;
  featured: boolean;

  breakingPriority: number;
  homepagePriority: number;

  breakingDuration: string;
  featuredDuration: string;

  keyHighlights: string;

  whyItMatters: string;

  faqItems: FAQItem[];

  publishedAt: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  status: string;
}


const initialForm: ArticleForm = {
  title: "",
  slug: "",
  category: "",

  content: "",

  images: [],

  videoUrl: "",
  videoPosition: "top",

  breaking: false,
  featured: false,

  breakingPriority: 0,
  homepagePriority: 0,

  breakingDuration: "30",
  featuredDuration: "24",

  keyHighlights: "",

  whyItMatters: "",

  faqItems: [],

  publishedAt: "",

  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  status: "pending",
};


export default function EditPost() {

  const { id } = useParams();
  const router = useRouter();


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
const [aiLoading,setAiLoading] = useState(false);

const [aiSummary,setAiSummary] = useState<any>(null);

  const [categories, setCategories] = useState<any[]>([]);


  const [slugLocked, setSlugLocked] = useState(true);


  const [form, setForm] = useState<ArticleForm>(
    initialForm
  );



  useEffect(() => {

    if (!id) return;


    async function loadArticle() {

      try {

        setLoading(true);


        const response = await fetch(
          `/api/articles/${id}`
        );


        const data = await response.json();


        if (!data.success) {

          throw new Error(
            data.error || "Article not found"
          );

        }


        const article = data.article;


        setForm({

          title: article.title || "",


          slug: article.slug || "",


          category:
            article.category?._id ||
            article.category ||
            "",


          content:
            article.content || "",


          images:
            Array.isArray(article.images)
              ? article.images
              : [],


          videoUrl:
            article.videoUrl || "",


          videoPosition:
            article.videoPosition || "top",


          breaking:
            Boolean(article.breaking),


          featured:
            Boolean(article.featured),


          breakingPriority:
            Number(article.breakingPriority || 0),


          homepagePriority:
            Number(article.homepagePriority || 0),


          breakingDuration:
            String(article.breakingDuration || 30),


          featuredDuration:
            String(article.featuredDuration || 24),


          keyHighlights:
            Array.isArray(article.keyHighlights)
              ? article.keyHighlights.join("\n")
              : "",


          whyItMatters:
            article.whyItMatters || "",


          faqItems:
            Array.isArray(article.faqItems)
              ? article.faqItems
              : [],


          publishedAt:
            article.publishedAt
              ? new Date(article.publishedAt)
                  .toISOString()
                  .slice(0, 16)
              : "",


          metaTitle:
            article.metaTitle || "",


          metaDescription:
            article.metaDescription || "",


          metaKeywords:
            article.metaKeywords || "",


          status:
            article.status || "pending"

        });
        
      setAiSummary(
          article.aiSummary || null
        );

      } catch (err: any) {

        setError(
          err.message ||
          "Failed loading article"
        );

      } finally {

        setLoading(false);

      }

    }


    loadArticle();


  }, [id]);



  useEffect(() => {

    async function loadCategories() {

      try {

        const res = await fetch(
          "/api/categories"
        );


        const data = await res.json();


        if (data.success) {

          setCategories(
            data.categories || []
          );

        }


      } catch {

        console.log(
          "Category loading failed"
        );

      }

    }


    loadCategories();


  }, []);




  function updateField(
    key: keyof ArticleForm,
    value: any
  ) {

    setForm(prev => ({
      ...prev,
      [key]: value
    }));

  }



  function createSlug(
    value: string
  ) {

    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /(^-|-$)/g,
        ""
      );

  }



  function handleTitleChange(
    value: string
  ) {

    setForm(prev => ({

      ...prev,

      title: value,

      slug: slugLocked
        ? createSlug(value)
        : prev.slug

    }));

  }



  function toggleSlugLock() {

    setSlugLocked(prev => !prev);

  }



  async function uploadImage(
    file: File
  ) {

    const uploadData =
      new FormData();

    uploadData.append(
      "file",
      file
    );


    const response = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: uploadData
      }
    );


    const data =
      await response.json();


    if (data.url) {

      setForm(prev => ({

        ...prev,

        images: [
          ...prev.images,
          data.url
        ]

      }));

    }

  }
    function removeImage(
    index: number
  ) {

    setForm(prev => ({

      ...prev,

      images:
        prev.images.filter(
          (_, i) => i !== index
        )

    }));

  }



  function addFAQ() {

    setForm(prev => ({

      ...prev,

      faqItems: [

        ...prev.faqItems,

        {
          question: "",
          answer: ""
        }

      ]

    }));

  }



  function updateFAQ(
    index: number,
    key: "question" | "answer",
    value: string
  ) {

    setForm(prev => ({

      ...prev,

      faqItems:

        prev.faqItems.map(
          (item, i) =>

            i === index

              ? {
                  ...item,
                  [key]: value
                }

              : item

        )

    }));

  }




  function removeFAQ(
    index: number
  ) {

    setForm(prev => ({

      ...prev,

      faqItems:

        prev.faqItems.filter(
          (_, i) => i !== index
        )

    }));

  }




  function generateSEO() {

    const cleanContent =
      form.content
        .replace(
          /<[^>]*>?/gm,
          ""
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();



    setForm(prev => ({

      ...prev,

      metaTitle:
        prev.title,


      metaDescription:
        cleanContent.substring(
          0,
          160
        ),


      metaKeywords:
        prev.title
          .toLowerCase()
          .split(" ")
          .filter(Boolean)
          .join(", ")

    }));

  }


async function generateAISummary(){

  if(!id) return;


  try{

    setAiLoading(true);


    const response =
      await fetch(
        `/api/articles/${id}/ai-summary`,
        {
          method:"POST"
        }
      );


    const data =
      await response.json();



    if(!data.success){

      throw new Error(
        data.error ||
        "AI Summary failed"
      );

    }



    setAiSummary(
      data.summary
    );


    setMessage(
      "AI Summary generated successfully ✅"
    );


  }
  catch(error:any){

    setError(
      error.message ||
      "AI Summary failed"
    );

  }
  finally{

    setAiLoading(false);

  }

}


  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (!id) return;


    setSaving(true);

    setError("");

    setMessage("");



    try {


      const payload = {


        ...form,


        keyHighlights:

          form.keyHighlights

            .split("\n")

            .map(
              item =>
                item.trim()
            )

            .filter(Boolean),



        publishedAt:

          form.publishedAt

            ? new Date(
                form.publishedAt
              ).toISOString()

            : null


      };





      const response = await fetch(

        `/api/articles/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },


          body:

            JSON.stringify(
              payload
            )

        }

      );




      const data =
        await response.json();





      if (!data.success) {

        throw new Error(
          data.error ||
          "Article update failed"
        );

      }




      setMessage(
        "Article updated successfully ✅"
      );



      setTimeout(() => {

        router.push(
          "/admin/posts"
        );

      }, 1000);




    } catch (err: any) {


      setError(
        err.message ||
        "Update failed"
      );



    } finally {


      setSaving(false);


    }


  }





  if (loading) {

    return (

      <div

        className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        text-white
        "

      >

        Loading Article...

      </div>

    );

  }





  return (

    <div

      className="
      min-h-screen
      bg-[#050816]
      text-white
      p-4
      md:p-8
      "

    >


      <div className="
      max-w-7xl
      mx-auto
      ">


        <div className="
        mb-8
        ">


          <h1 className="
          text-3xl
          font-bold
          ">

            Edit Article

          </h1>



          <p className="
          text-orange-400
          mt-2
          ">

            NationPath Editorial CMS

          </p>


        </div>





        {
          message &&

          <div

            className="
            mb-6
            p-4
            rounded-xl
            bg-green-600/20
            border
            border-green-500
            text-green-300
            "

          >

            {message}

          </div>

        }





        {
          error &&

          <div

            className="
            mb-6
            p-4
            rounded-xl
            bg-red-600/20
            border
            border-red-500
            text-red-300
            "

          >

            {error}

          </div>

        }




        <form

          onSubmit={
            handleSubmit
          }

          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
          "

        >



          <div className="
          xl:col-span-2
          space-y-6
          ">



            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <h2 className="
              text-lg
              font-semibold
              mb-5
              ">

                Article Information

              </h2>




              <input

                value={
                  form.title
                }


                onChange={
                  e =>
                    handleTitleChange(
                      e.target.value
                    )
                }


                placeholder="
                Article Headline
                "


                className="
                w-full
                p-4
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />





              <div className="
              grid
              md:grid-cols-2
              gap-4
              mt-5
              ">


                <div>


                  <div className="
                  flex
                  justify-between
                  items-center
                  ">


                    <label className="
                    text-sm
                    text-gray-400
                    ">

                      Slug

                    </label>



                    <button

                      type="button"

                      onClick={
                        toggleSlugLock
                      }

                      className="
                      text-xs
                      text-orange-400
                      "

                    >

                      {
                        slugLocked
                          ? "Unlock"
                          : "Auto"
                      }


                    </button>


                  </div>





                  <input

                    value={
                      form.slug
                    }


                    onChange={
                      e =>
                        updateField(
                          "slug",
                          e.target.value
                        )
                    }


                    disabled={
                      slugLocked
                    }


                    className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-black/40
                    border
                    border-white/10
                    disabled:text-gray-500
                    "

                  />


                </div>
                                <div>

                  <label className="
                  text-sm
                  text-gray-400
                  ">

                    Category

                  </label>



                  <select

                    value={
                      form.category
                    }


                    onChange={
                      e =>
                        updateField(
                          "category",
                          e.target.value
                        )
                    }


                    className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-black/40
                    border
                    border-white/10
                    "
                    
                  >

                    <option value="">
                      Select Category
                    </option>



                    {
                      categories.map(
                        category => (

                          <option

                            key={
                              category._id
                            }

                            value={
                              category._id
                            }

                          >

                            {
                              category.name
                            }

                          </option>

                        )

                      )

                    }


                  </select>


                </div>


              </div>


            </div>





            <div

              className="
              bg-white
              rounded-2xl
              overflow-hidden
              "

            >

              <Editor

                value={
                  form.content
                }


                onChange={
                  value =>
                    updateField(
                      "content",
                      value
                    )
                }

              />


            </div>






            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <h2 className="
              font-semibold
              mb-4
              ">

                Key Highlights ⭐

              </h2>



              <textarea

                value={
                  form.keyHighlights
                }


                onChange={
                  e =>
                    updateField(
                      "keyHighlights",
                      e.target.value
                    )
                }


                placeholder="
                One highlight per line
                "


                className="
                w-full
                h-40
                p-4
                rounded-xl
                bg-black/30
                border
                border-white/10
                resize-none
                "

              />


            </div>






            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <h2 className="
              font-semibold
              mb-4
              ">

                Why It Matters ⭐⭐⭐

              </h2>




              <textarea

                value={
                  form.whyItMatters
                }


                onChange={
                  e =>
                    updateField(
                      "whyItMatters",
                      e.target.value
                    )
                }


                placeholder="
                Explain importance of this article
                "


                className="
                w-full
                h-40
                p-4
                rounded-xl
                bg-black/30
                border
                border-white/10
                resize-none
                "

              />


            </div>


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>

<h2 className="
font-semibold
mb-4
">

AI Summary Intelligence 🤖

</h2>



<button

type="button"

onClick={generateAISummary}

disabled={aiLoading}

className="
bg-blue-600
px-5
py-3
rounded-xl
"

>

{
aiLoading
?
"Generating..."
:
"Generate AI Summary"
}


</button>



{
aiSummary &&

<div
className="
mt-5
bg-black/30
p-4
rounded-xl
"
>

<h3>
Overview
</h3>

<p>
{aiSummary.overview}
</p>


<h3 className="mt-3">
Key Points
</h3>

<ul>

{
aiSummary.points?.map(
(point:string,index:number)=>(
<li key={index}>
{point}
</li>
)
)

}

</ul>



<h3 className="mt-3">
Impact
</h3>

<p>
{aiSummary.impact}
</p>



<h3 className="mt-3">
Takeaway
</h3>

<p>
{aiSummary.takeaway}
</p>


</div>

}


</div>



            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <div className="
              flex
              justify-between
              items-center
              mb-5
              ">


                <h2 className="
                text-lg
                font-semibold
                ">

                  FAQ Section ⭐

                </h2>



                <button

                  type="button"

                  onClick={
                    addFAQ
                  }


                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-blue-600
                  "

                >

                  + Add FAQ

                </button>


              </div>






              {
                form.faqItems.length === 0 &&

                <p className="
                text-gray-400
                text-sm
                ">

                  No FAQ added yet.

                </p>

              }





              {
                form.faqItems.map(
                  (item,index)=>(


                    <div

                      key={
                        index
                      }

                      className="
                      mb-5
                      p-4
                      rounded-xl
                      bg-black/20
                      border
                      border-white/10
                      "

                    >


                      <div className="
                      flex
                      justify-between
                      mb-3
                      ">


                        <span className="
                        text-orange-400
                        ">

                          FAQ {index + 1}

                        </span>



                        <button

                          type="button"

                          onClick={
                            () =>
                              removeFAQ(index)
                          }


                          className="
                          text-red-400
                          "

                        >

                          Remove

                        </button>


                      </div>





                      <input

                        value={
                          item.question
                        }


                        onChange={
                          e =>
                            updateFAQ(
                              index,
                              "question",
                              e.target.value
                            )
                        }


                        placeholder="
                        Question
                        "


                        className="
                        w-full
                        mb-3
                        p-3
                        rounded-xl
                        bg-black/30
                        border
                        border-white/10
                        "

                      />





                      <textarea

                        value={
                          item.answer
                        }


                        onChange={
                          e =>
                            updateFAQ(
                              index,
                              "answer",
                              e.target.value
                            )
                        }


                        placeholder="
                        Answer
                        "


                        rows={4}


                        className="
                        w-full
                        p-3
                        rounded-xl
                        bg-black/30
                        border
                        border-white/10
                        resize-none
                        "

                      />


                    </div>


                  )

                )

              }


            </div>


          </div>






          <div className="
          space-y-6
          ">





            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <h2 className="
              font-semibold
              mb-4
              ">

                Media Gallery

              </h2>





              <label className="
              block
              mb-5
              cursor-pointer
              "

              >


                <div className="
                p-4
                rounded-xl
                bg-blue-600/20
                border
                border-blue-500
                text-center
                ">

                  Upload / Change Images

                </div>




                <input

                  type="file"

                  accept="image/*"

                  multiple

                  hidden


                  onChange={
                    async e => {

                      const files =
                        Array.from(
                          e.target.files || []
                        );


                      for(
                        const file of files
                      ){

                        await uploadImage(
                          file
                        );

                      }

                    }
                  }


                />


              </label>
                            <div className="
              flex
              flex-wrap
              gap-4
              ">


                {
                  form.images.map(
                    (image,index)=>(


                      <div

                        key={index}

                        className="
                        relative
                        "

                      >


                        <img

                          src={image}

                          alt={`Image ${index + 1}`}

                          className="
                          w-32
                          h-24
                          rounded-xl
                          object-cover
                          border
                          border-white/10
                          "

                        />



                        <button

                          type="button"

                          onClick={
                            () =>
                              removeImage(index)
                          }


                          className="
                          absolute
                          -top-2
                          -right-2
                          w-7
                          h-7
                          rounded-full
                          bg-red-600
                          "

                        >

                          ×

                        </button>


                      </div>


                    )

                  )

                }


              </div>


            </div>





            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >


              <h2 className="
              font-semibold
              mb-4
              ">

                Video

              </h2>



              <input

                value={
                  form.videoUrl
                }


                onChange={
                  e =>
                    updateField(
                      "videoUrl",
                      e.target.value
                    )
                }


                placeholder="YouTube URL"


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />



              <select

                value={
                  form.videoPosition
                }


                onChange={
                  e =>
                    updateField(
                      "videoPosition",
                      e.target.value
                    )
                }


                className="
                w-full
                mt-4
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              >

                <option value="top">
                  Top
                </option>

                <option value="middle">
                  Middle
                </option>

                <option value="bottom">
                  Bottom
                </option>


              </select>


            </div>





            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              "

            >

              <h2 className="
              font-semibold
              mb-4
              ">

                Publishing

              </h2>




              <select

                value={
                  form.status
                }


                onChange={
                  e =>
                    updateField(
                      "status",
                      e.target.value
                    )
                }


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              >

                <option value="pending">
                  Pending
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="draft">
                  Draft
                </option>

                <option value="rejected">
                  Rejected
                </option>


              </select>





              <input

                type="datetime-local"

                value={
                  form.publishedAt
                }


                onChange={
                  e =>
                    updateField(
                      "publishedAt",
                      e.target.value
                    )
                }


                className="
                w-full
                mt-4
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />


            </div>






            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              space-y-5
              "

            >

              <h2 className="
              font-semibold
              ">

                News Controls

              </h2>




              <label className="
              flex
              justify-between
              items-center
              ">

                Breaking


                <input

                  type="checkbox"

                  checked={
                    form.breaking
                  }


                  onChange={
                    e =>
                      updateField(
                        "breaking",
                        e.target.checked
                      )
                  }

                />

              </label>





              {
                form.breaking &&

                <select

                  value={
                    form.breakingDuration
                  }


                  onChange={
                    e =>
                      updateField(
                        "breakingDuration",
                        e.target.value
                      )
                  }


                  className="
                  w-full
                  p-3
                  rounded-xl
                  bg-black/30
                  border
                  border-white/10
                  "

                >

                  <option value="30">
                    30 Minutes
                  </option>

                  <option value="60">
                    1 Hour
                  </option>

                  <option value="180">
                    3 Hours
                  </option>

                  <option value="1440">
                    24 Hours
                  </option>


                </select>

              }






              <label className="
              flex
              justify-between
              items-center
              ">

                Featured


                <input

                  type="checkbox"

                  checked={
                    form.featured
                  }


                  onChange={
                    e =>
                      updateField(
                        "featured",
                        e.target.checked
                      )
                  }


                />


              </label>





              {
                form.featured &&

                <select

                  value={
                    form.featuredDuration
                  }


                  onChange={
                    e =>
                      updateField(
                        "featuredDuration",
                        e.target.value
                      )
                  }


                  className="
                  w-full
                  p-3
                  rounded-xl
                  bg-black/30
                  border
                  border-white/10
                  "

                >

                  <option value="24">
                    24 Hours
                  </option>

                  <option value="48">
                    48 Hours
                  </option>

                  <option value="72">
                    72 Hours
                  </option>


                </select>

              }


            </div>






            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              space-y-4
              "

            >

              <h2 className="
              font-semibold
              ">

                Priority

              </h2>



              <input

                type="number"

                value={
                  form.breakingPriority
                }


                onChange={
                  e =>
                    updateField(
                      "breakingPriority",
                      Number(
                        e.target.value
                      )
                    )
                }


                placeholder="Breaking Priority"


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />




              <input

                type="number"

                value={
                  form.homepagePriority
                }


                onChange={
                  e =>
                    updateField(
                      "homepagePriority",
                      Number(
                        e.target.value
                      )
                    )
                }


                placeholder="Homepage Priority"


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />


            </div>






            <div

              className="
              bg-[#0e1726]
              border
              border-white/10
              rounded-2xl
              p-6
              space-y-4
              "

            >

              <div className="
              flex
              justify-between
              items-center
              ">


                <h2 className="
                font-semibold
                ">

                  SEO

                </h2>



                <button

                  type="button"

                  onClick={
                    generateSEO
                  }


                  className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  "

                >

                  Generate SEO

                </button>


              </div>





              <input

                value={
                  form.metaTitle
                }


                onChange={
                  e =>
                    updateField(
                      "metaTitle",
                      e.target.value
                    )
                }


                placeholder="Meta Title"


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />





              <textarea

                value={
                  form.metaDescription
                }


                onChange={
                  e =>
                    updateField(
                      "metaDescription",
                      e.target.value
                    )
                }


                placeholder="Meta Description"


                className="
                w-full
                h-28
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />





              <input

                value={
                  form.metaKeywords
                }


                onChange={
                  e =>
                    updateField(
                      "metaKeywords",
                      e.target.value
                    )
                }


                placeholder="Meta Keywords"


                className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
                "

              />


            </div>






            <button

              disabled={
                saving
              }


              className="
              w-full
              py-4
              rounded-xl
              bg-orange-600
              font-semibold
              text-lg
              disabled:opacity-50
              "

            >

              {
                saving

                  ? "Updating Article..."

                  : "Update Article"
              }


            </button>




          </div>



        </form>



      </div>


    </div>


  );


}