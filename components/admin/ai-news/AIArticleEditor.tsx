"use client";

import {
  useState
} from "react";


interface Props {

  article:any;

  onUpdate:
  (article:any)=>void;

}



export default function AIArticleEditor({

  article,

  onUpdate

}:Props){


  const [open,setOpen] =
  useState<Record<string,boolean>>({});



  function toggle(
    section:string
  ){

    setOpen(prev=>({

      ...prev,

      [section]:
      !prev[section]

    }));

  }



  function update(
    key:string,
    value:any
  ){

    onUpdate({

      ...article,

      [key]:value

    });

  }



  function updateObject(
    parent:string,
    key:string,
    value:any
  ){

    update(

      parent,

      {

        ...(article[parent] || {}),

        [key]:value

      }

    );

  }



  function updateArray(
    key:string,
    index:number,
    field:string,
    value:any
  ){

    const items =

    Array.isArray(article[key])

    ?

    [...article[key]]

    :

    [];


    items[index] = {

      ...(items[index] || {}),

      [field]:value

    };


    update(

      key,

      items

    );

  }



  function addItem(
    key:string,
    item:any
  ){

    update(

      key,

      [

        ...(Array.isArray(article[key])
          ? article[key]
          : []
        ),

        item

      ]

    );

  }



  function removeItem(
    key:string,
    index:number
  ){

    const items =

    Array.isArray(article[key])

    ?

    article[key].filter(
      (_:any,i:number)=>
      i !== index
    )

    :

    [];


    update(

      key,

      items

    );

  }



  function Section({

    id,

    title,

    children

  }:any){

    return (

      <div

      className="
      border
      border-white/10
      rounded-xl
      overflow-hidden
      "

      >

        <button

        type="button"

        onClick={()=>toggle(id)}

        className="
        w-full
        px-4
        py-3
        text-left
        bg-white/5
        font-semibold
        "

        >

          {title}

        </button>


        {

          open[id] &&

          <div

          className="
          p-4
          space-y-4
          "

          >

            {children}

          </div>

        }

      </div>

    );

  }



  function Input({

    label,

    value,

    onChange

  }:any){

    return (

      <div>

        <label className="text-sm text-gray-400">

          {label}

        </label>


        <input

        className="
        w-full
        mt-2
        p-3
        rounded-xl
        bg-black/30
        border
        border-white/10
        "

        value={value || ""}

        onChange={

          e=>

          onChange(
            e.target.value
          )

        }

        />

      </div>

    );

  }



  function TextArea({

    label,

    value,

    onChange

  }:any){

    return (

      <div>

        <label className="text-sm text-gray-400">

          {label}

        </label>


        <textarea

        className="
        w-full
        mt-2
        min-h-[120px]
        p-3
        rounded-xl
        bg-black/30
        border
        border-white/10
        "

        value={value || ""}

        onChange={

          e=>

          onChange(
            e.target.value
          )

        }

        />

      </div>

    );

  }




  return (

    <div className="space-y-6">


      <h2 className="text-xl font-bold">

        🤖 NationPath AI Article Intelligence Editor

      </h2>



      <Section

      id="quality"

      title="AI Quality Panel"

      >


        <Input

        label="AI Confidence"

        value={
          article.quality?.confidence
        }

        onChange={
          (v:string)=>

          updateObject(
            "quality",
            "confidence",
            v
          )
        }

        />


        <Input

        label="Fact Check Status"

        value={
          article.quality?.factCheckStatus
        }

        onChange={
          (v:string)=>

          updateObject(
            "quality",
            "factCheckStatus",
            v
          )
        }

        />


        <Input

        label="Article Tone"

        value={
          article.quality?.articleTone
        }

        onChange={
          (v:string)=>

          updateObject(
            "quality",
            "articleTone",
            v
          )
        }

        />


        <Input

        label="Article Type"

        value={
          article.quality?.articleType
        }

        onChange={
          (v:string)=>

          updateObject(
            "quality",
            "articleType",
            v
          )
        }

        />


        <Input

        label="Editorial Review Status"

        value={
          article.quality?.editorialReviewStatus
        }

        onChange={
          (v:string)=>

          updateObject(
            "quality",
            "editorialReviewStatus",
            v
          )
        }

        />


      </Section>


      <Section

      id="core"

      title="Core Article"

      >


        <Input

        label="Headline"

        value={
          article.title
        }

        onChange={
          (v:string)=>

          update(
            "title",
            v
          )
        }

        />


        <TextArea

        label="Short Brief"

        value={
          article.shortBrief
        }

        onChange={
          (v:string)=>

          update(
            "shortBrief",
            v
          )
        }

        />


        <TextArea

        label="Article Content"

        value={
          article.content
        }

        onChange={
          (v:string)=>

          update(
            "content",
            v
          )
        }

        />


      </Section>
            <Section

      id="headline"

      title="Headline Intelligence"

      >

        <TextArea

        label="Headline Reasoning"

        value={
          article.headlineIntelligence?.reasoning
        }

        onChange={
          (v:string)=>

          updateObject(
            "headlineIntelligence",
            "reasoning",
            v
          )
        }

        />


        <TextArea

        label="Alternative Headlines"

        value={

          Array.isArray(
            article.headlineIntelligence?.alternatives
          )

          ?

          article.headlineIntelligence.alternatives.join("\n")

          :

          ""

        }

        onChange={

          (v:string)=>

          updateObject(

            "headlineIntelligence",

            "alternatives",

            v
              .split("\n")
              .filter(Boolean)

          )

        }

        />


      </Section>





      <Section

      id="editorial"

      title="Editorial Intelligence"

      >


        <TextArea

        label="Background"

        value={
          article.background
        }

        onChange={
          (v:string)=>

          update(
            "background",
            v
          )
        }

        />


        <TextArea

        label="Why It Matters"

        value={
          article.whyItMatters
        }

        onChange={
          (v:string)=>

          update(
            "whyItMatters",
            v
          )
        }

        />


        <TextArea

        label="What's Next"

        value={
          article.whatsNext
        }

        onChange={
          (v:string)=>

          update(
            "whatsNext",
            v
          )
        }

        />


      </Section>





      <Section

      id="timeline"

      title="Timeline"

      >


      {
        Array.isArray(article.timeline)

        &&

        article.timeline.map(

          (item:any,index:number)=>(


            <div

            key={index}

            className="
            bg-black/20
            rounded-xl
            p-4
            space-y-3
            "

            >


              <Input

              label="Date"

              value={
                item.date
              }

              onChange={
                (v:string)=>

                updateArray(
                  "timeline",
                  index,
                  "date",
                  v
                )
              }

              />


              <Input

              label="Title"

              value={
                item.title
              }

              onChange={
                (v:string)=>

                updateArray(
                  "timeline",
                  index,
                  "title",
                  v
                )
              }

              />


              <TextArea

              label="Description"

              value={
                item.description
              }

              onChange={
                (v:string)=>

                updateArray(
                  "timeline",
                  index,
                  "description",
                  v
                )
              }

              />


              <button

              type="button"

              onClick={()=>removeItem(
                "timeline",
                index
              )}

              className="text-red-400"

              >

              Remove Timeline

              </button>


            </div>


          )

        )

      }



      <button

      type="button"

      onClick={()=>addItem(

        "timeline",

        {

          date:"",

          title:"",

          description:""

        }

      )}

      className="
      bg-white/10
      px-4
      py-2
      rounded-lg
      "

      >

      + Add Timeline

      </button>


      </Section>






      <Section

      id="expert"

      title="Expert Opinion"

      >


      {

        Array.isArray(article.expertOpinion)

        &&

        article.expertOpinion.map(

          (item:any,index:number)=>(


            <div

            key={index}

            className="
            space-y-3
            "

            >


              <Input

              label="Expert Name"

              value={
                item.name
              }

              onChange={
                (v:string)=>

                updateArray(
                  "expertOpinion",
                  index,
                  "name",
                  v
                )
              }

              />


              <TextArea

              label="Opinion"

              value={
                item.opinion
              }

              onChange={
                (v:string)=>

                updateArray(
                  "expertOpinion",
                  index,
                  "opinion",
                  v
                )
              }

              />


            </div>


          )

        )

      }



      <button

      type="button"

      onClick={()=>addItem(

        "expertOpinion",

        {

          name:"",

          opinion:""

        }

      )}

      className="
      bg-white/10
      px-4
      py-2
      rounded-lg
      "

      >

      + Add Expert Opinion

      </button>


      </Section>






      <Section

      id="factcheck"

      title="Fact Check"

      >


      {

        Array.isArray(article.factCheck)

        &&

        article.factCheck.map(

          (item:any,index:number)=>(


            <div

            key={index}

            className="space-y-3"

            >


              <TextArea

              label="Claim"

              value={
                item.claim
              }

              onChange={
                (v:string)=>

                updateArray(
                  "factCheck",
                  index,
                  "claim",
                  v
                )
              }

              />


              <Input

              label="Status"

              value={
                item.status
              }

              onChange={
                (v:string)=>

                updateArray(
                  "factCheck",
                  index,
                  "status",
                  v
                )
              }

              />


            </div>


          )

        )

      }


      </Section>






      <Section

      id="takeaways"

      title="Key Takeaways"

      >


        <TextArea

        label="Key Takeaways"

        value={

          Array.isArray(article.keyTakeaways)

          ?

          article.keyTakeaways.join("\n")

          :

          ""

        }

        onChange={

          (v:string)=>

          update(

            "keyTakeaways",

            v
            .split("\n")
            .filter(Boolean)

          )

        }

        />


      </Section>






      <Section

      id="faq"

      title="FAQ"

      >


      {

        Array.isArray(article.faq)

        &&

        article.faq.map(

          (item:any,index:number)=>(


            <div

            key={index}

            className="space-y-3"

            >


              <Input

              label="Question"

              value={
                item.question
              }

              onChange={
                (v:string)=>

                updateArray(
                  "faq",
                  index,
                  "question",
                  v
                )
              }

              />


              <TextArea

              label="Answer"

              value={
                item.answer
              }

              onChange={
                (v:string)=>

                updateArray(
                  "faq",
                  index,
                  "answer",
                  v
                )
              }

              />


            </div>


          )

        )

      }



      <button

      type="button"

      onClick={()=>addItem(

        "faq",

        {

          question:"",

          answer:""

        }

      )}

      className="
      bg-white/10
      px-4
      py-2
      rounded-lg
      "

      >

      + Add FAQ

      </button>


      </Section>






      <Section

      id="source"

      title="Source Desk"

      >


        <TextArea

        label="Source Information"

        value={
          article.sourceDesk
        }

        onChange={
          (v:string)=>

          update(
            "sourceDesk",
            v
          )
        }

        />


      </Section>






      <Section

      id="images"

      title="Image Intelligence"

      >


      {

        Array.isArray(article.imageGallery)

        &&

        article.imageGallery.map(

          (item:any,index:number)=>(


            <div

            key={index}

            className="space-y-3"

            >


              <Input

              label="Image URL"

              value={
                item.url
              }

              onChange={
                (v:string)=>

                updateArray(
                  "imageGallery",
                  index,
                  "url",
                  v
                )
              }

              />


              <Input

              label="SEO Alt"

              value={
                item.alt
              }

              onChange={
                (v:string)=>

                updateArray(
                  "imageGallery",
                  index,
                  "alt",
                  v
                )
              }

              />


              <Input

              label="Caption"

              value={
                item.caption
              }

              onChange={
                (v:string)=>

                updateArray(
                  "imageGallery",
                  index,
                  "caption",
                  v
                )
              }

              />


            </div>


          )

        )

      }




      <button

      type="button"

      onClick={()=>addItem(

        "imageGallery",

        {

          url:"",

          alt:"",

          caption:"",

          isPrimary:false

        }

      )}

      className="
      bg-white/10
      px-4
      py-2
      rounded-lg
      "

      >

      + Add Image

      </button>


      </Section>






      <Section

      id="seo"

      title="SEO Intelligence"

      >


        <Input

        label="Meta Title"

        value={
          article.metaTitle
        }

        onChange={
          (v:string)=>

          update(
            "metaTitle",
            v
          )
        }

        />


        <TextArea

        label="Meta Description"

        value={
          article.metaDescription
        }

        onChange={
          (v:string)=>

          update(
            "metaDescription",
            v
          )
        }

        />


        <TextArea

        label="SEO Keywords"

        value={

          Array.isArray(article.metaKeywords)

          ?

          article.metaKeywords.join("\n")

          :

          ""

        }

        onChange={

          (v:string)=>

          update(

            "metaKeywords",

            v
            .split("\n")
            .filter(Boolean)

          )

        }

        />


      </Section>





      <div

      className="
      bg-green-500/10
      border
      border-green-500/20
      rounded-xl
      p-4
      text-green-300
      "

      >

      AI Draft Ready.
      Human editorial review required before CMS publishing.

      </div>



    </div>

  );

}