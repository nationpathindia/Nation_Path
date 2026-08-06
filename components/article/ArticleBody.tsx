import ArticleKeyHighlights from "@/components/article/ArticleKeyHighlights";
import ArticleWhyItMatters from "@/components/article/ArticleWhyItMatters";
import ArticleVideo from "@/components/article/ArticleVideo";




interface ArticleBodyProps {


  content:string;


  keyHighlights?:string[];


  whyItMatters?:string | null;



  video?:
  {

    url:string;

    title?:string | null;

    position?:
    "top"
    |
    "middle"
    |
    "bottom";


  }
  |
  null;


}









export default function ArticleBody({

content,

keyHighlights = [],

whyItMatters,

video

}:ArticleBodyProps){





if(!content){

return null;

}








function cleanHTML(html:string){


return html

.replace(/\\n/g," ")

.replace(/<p>\s*<\/p>/gi,"")

.replace(/\s+/g," ")

.trim();


}









const cleanContent =

cleanHTML(content);









const paragraphs =

cleanContent

.split(/(<p[\s\S]*?<\/p>)/gi)

.filter(

item =>

item.trim().length > 0

);









const firstPart =

paragraphs.slice(0,2);



const secondPart =

paragraphs.slice(2,5);



const remainingPart =

paragraphs.slice(5);











const proseClass = `

prose

prose-base

sm:prose-lg

max-w-none



prose-headings:font-serif

prose-headings:font-bold

prose-headings:text-[#111827]

prose-headings:tracking-tight



prose-h2:text-3xl

prose-h2:mt-14

prose-h2:mb-6



prose-h3:text-2xl

prose-h3:mt-10

prose-h3:mb-5



prose-p:text-[#374151]

prose-p:leading-[2]

prose-p:mb-8

prose-p:text-justify



prose-strong:text-[#111827]

prose-strong:font-bold



prose-a:text-[#163C80]

prose-a:font-semibold



prose-ul:my-8

prose-ul:list-disc

prose-ul:pl-8



prose-ol:my-8

prose-ol:list-decimal

prose-ol:pl-8



prose-li:text-[#374151]

prose-li:leading-[1.8]

prose-li:my-2



prose-blockquote:border-l-4

prose-blockquote:border-[#EA661B]

prose-blockquote:bg-[#FAF7F1]

prose-blockquote:px-6

prose-blockquote:py-5

prose-blockquote:rounded-r-2xl

prose-blockquote:not-italic



prose-img:rounded-3xl

prose-img:my-12

prose-img:shadow-lg



prose-table:text-sm

prose-table:border

prose-table:overflow-hidden

`;











function RenderContent({

items

}:{

items:string[];

}){


if(!items.length){

return null;

}



return (

<div

className={proseClass}

dangerouslySetInnerHTML={{

__html:

items.join("")

}}

/>

);


}









function RenderVideo(){


if(!video?.url){

return null;

}



return (

<ArticleVideo

url={video.url}

title={video.title || undefined}

/>

);


}









return (


<article

className="

mt-14

max-w-4xl

mx-auto

px-1

"

>









{/* ================= VIDEO TOP ================= */}


{

video?.position === "top"

&&

RenderVideo()

}









{/* ================= OPENING REPORT ================= */}


<RenderContent

items={firstPart}

/>









{/* ================= EDITORIAL HIGHLIGHTS ================= */}


<ArticleKeyHighlights

highlights={keyHighlights}

/>









{/* ================= MAIN STORY ================= */}


<RenderContent

items={secondPart}

/>









{/* ================= VIDEO MIDDLE ================= */}


{

video?.position === "middle"

&&

RenderVideo()

}









{/* ================= WHY IT MATTERS ================= */}


<ArticleWhyItMatters

whyItMatters={whyItMatters}

/>









{/* ================= REMAINING REPORT ================= */}


<RenderContent

items={remainingPart}

/>









{/* ================= VIDEO BOTTOM ================= */}


{

video?.position === "bottom"

&&

RenderVideo()

}







</article>



);


}