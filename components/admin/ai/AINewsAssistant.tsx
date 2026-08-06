"use client";

import {
  useState
} from "react";

import {
  Sparkles,
  Newspaper,
  Loader2,
  Wand2,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";


interface GeneratedArticleData {

  title?: string;

  slug?: string;

  content?: string;

  shortBrief?: string;

  background?: string;

  timeline?: any[];

  expertOpinion?: any[];

  factCheck?: any[];

  whatsNext?: string;

  keyTakeaways?: string[];

  sourceDesk?: string;

  metaTitle?: string;

  metaDescription?: string;

  metaKeywords?: string;

}


interface AINewsAssistantProps {

  onGenerate: (
    data: GeneratedArticleData
  ) => void;

}



export default function AINewsAssistant({

  onGenerate

}: AINewsAssistantProps) {


  const [rawNews,setRawNews] = useState("");

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");

  const [success,setSuccess] = useState(false);



  async function generateArticle(){


    if(!rawNews.trim()){

      setError(
        "Please paste raw news material first."
      );

      return;

    }



    try {


      setLoading(true);

      setError("");

      setSuccess(false);



      const response =
        await fetch(
          "/api/admin/ai/news-generate",
          {
            method:"POST",

            headers:{
              "Content-Type":"application/json"
            },

            body:JSON.stringify({

              rawNews

            })

          }
        );



      const result =
        await response.json();



      if(!response.ok){

        throw new Error(
          result?.message ||
          "AI generation failed."
        );

      }



      onGenerate(
        result.data || result
      );



      setSuccess(true);



    }
    catch(err:any){

      console.error(
        "AI News Generate Error:",
        err
      );


      setError(
        err.message ||
        "Something went wrong."
      );


    }
    finally{

      setLoading(false);

    }


  }




  return (

    <section
      className="
        mb-8
        rounded-2xl
        border
        border-blue-200
        bg-gradient-to-br
        from-blue-50
        via-white
        to-orange-50
        p-6
        shadow-sm
      "
    >


      {/* Header */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          mb-5
        "
      >

        <div
          className="
            flex
            gap-3
            items-center
          "
        >

          <div
            className="
              h-11
              w-11
              rounded-xl
              bg-blue-900
              text-white
              flex
              items-center
              justify-center
            "
          >

            <Sparkles
              size={22}
            />

          </div>



          <div>

            <h2
              className="
                text-lg
                font-bold
                text-gray-900
                flex
                items-center
                gap-2
              "
            >

              NationPath AI Newsroom Assistant

              <Wand2
                size={16}
                className="text-orange-600"
              />

            </h2>


            <p
              className="
                text-sm
                text-gray-600
              "
            >

              Convert raw news material into editorial-ready article format.

            </p>


          </div>


        </div>



        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            text-xs
            text-gray-500
            bg-white
            border
            rounded-full
            px-4
            py-2
          "
        >

          <CheckCircle2
            size={14}
            className="text-green-600"
          />

          Human Review Required

        </div>


      </div>




      {/* Input */}

      <div
        className="
          rounded-xl
          bg-white
          border
          p-4
        "
      >

        <label
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-800
            mb-3
          "
        >

          <Newspaper
            size={16}
          />

          Raw News Material

        </label>



        <textarea

          value={rawNews}

          onChange={(e)=>
            setRawNews(
              e.target.value
            )
          }

          placeholder="
Paste breaking news, press release, notes, reports or raw information here...

AI will transform it into:
• Headline
• Article body
• Background
• Timeline
• Fact Check
• Expert Opinion
• SEO data
          "

          rows={10}

          className="
            w-full
            rounded-xl
            border
            border-gray-200
            p-4
            text-sm
            outline-none
            focus:ring-2
            focus:ring-blue-500
            resize-none
          "

        />


      </div>




      {/* Action */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-4
        "
      >

        <button

          type="button"

          onClick={generateArticle}

          disabled={loading}

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-900
            px-6
            py-3
            text-white
            font-semibold
            hover:bg-blue-800
            disabled:opacity-60
            transition
          "

        >

          {
            loading
            ?
            <>

              <Loader2
                size={18}
                className="animate-spin"
              />

              Generating...

            </>
            :
            <>

              <Sparkles
                size={18}
              />

              Generate NationPath Article

            </>
          }


        </button>



        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-gray-500
          "
        >

          <FileText
            size={14}
          />

          Draft only • No Auto Publish

        </div>


      </div>




      {/* Status */}

      {
        error &&

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-lg
            bg-red-50
            border
            border-red-200
            px-4
            py-3
            text-sm
            text-red-700
          "
        >

          <AlertCircle
            size={16}
          />

          {error}

        </div>

      }



      {
        success &&

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-lg
            bg-green-50
            border
            border-green-200
            px-4
            py-3
            text-sm
            text-green-700
          "
        >

          <CheckCircle2
            size={16}
          />

          Article generated successfully. Review and edit before publishing.

        </div>

      }



    </section>

  );


}