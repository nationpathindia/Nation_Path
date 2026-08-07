import ArticleIntelligenceSection from "./intelligence/ArticleIntelligenceSection";

import ArticleBackground from "./intelligence/ArticleBackground";
import ArticleTimeline from "./intelligence/ArticleTimeline";
import ArticleExpertOpinion from "./intelligence/ArticleExpertOpinion";
import ArticleFactCheck from "./intelligence/ArticleFactCheck";
import ArticleKeyTakeaways from "./intelligence/ArticleKeyTakeaways";
import ArticleSourceDesk from "./intelligence/ArticleSourceDesk";



interface ArticleIntelligenceProps {

  background?: string | null;

  timeline?: any;

  expertOpinion?: any;

  factCheck?: any;

  keyTakeaways?: string[];

  sourceDesk?: string | null;

}





export default function ArticleIntelligence({

  background,

  timeline,

  expertOpinion,

  factCheck,

  keyTakeaways,

  sourceDesk,

}:ArticleIntelligenceProps){



const hasTimeline =

timeline &&

(

(Array.isArray(timeline) && timeline.length > 0)

||

(typeof timeline === "string" && timeline.trim().length > 0)

);



const hasExpertOpinion =

expertOpinion &&

(

(Array.isArray(expertOpinion) && expertOpinion.length > 0)

||

(typeof expertOpinion === "string" && expertOpinion.trim().length > 0)

);



const hasFactCheck =

factCheck &&

(

(Array.isArray(factCheck) && factCheck.length > 0)

||

(typeof factCheck === "string" && factCheck.trim().length > 0)

);



const hasTakeaways =

Array.isArray(keyTakeaways)

&&

keyTakeaways.length > 0;



const hasSourceDesk =

typeof sourceDesk === "string"

&&

sourceDesk.trim().length > 0;



const hasContent =

(background && background.trim().length > 0)

||

hasTimeline

||

hasExpertOpinion

||

hasFactCheck

||

hasTakeaways

||

hasSourceDesk;



if(!hasContent){

return null;

}





return (

<div

className="
my-10
"

>



{/* ================= HEADER ================= */}


<header

className="
mb-10
border-b
border-gray-200
pb-5
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[0.25em]
text-[#EA661B]
"

>

NationPath Intelligence

</p>



<h2

className="
mt-3
font-serif
text-3xl
font-bold
tracking-tight
text-gray-900
"

>

The Story Behind The News

</h2>



<p

className="
mt-3
max-w-2xl
text-sm
leading-7
text-gray-500
"

>

Context, analysis and verified insights that explain the story beyond the headline.

</p>



</header>





{/* ================= BACKGROUND ================= */}


{

background &&


<ArticleIntelligenceSection

title="Background"

description="Context and information behind the story"

theme="background"

>


<ArticleBackground

background={background}

/>


</ArticleIntelligenceSection>


}







{/* ================= TIMELINE ================= */}


{

hasTimeline &&


<ArticleIntelligenceSection

title="Timeline"

description="Key moments that shaped this story"

theme="timeline"

>


{

Array.isArray(timeline)

?

<ArticleTimeline

timeline={timeline}

/>

:

timeline

}


</ArticleIntelligenceSection>


}







{/* ================= EXPERT OPINION ================= */}


{

hasExpertOpinion &&


<ArticleIntelligenceSection

title="Expert Opinion"

description="Perspectives from voices that understand the issue"

theme="opinion"

>


{

Array.isArray(expertOpinion)

?

<ArticleExpertOpinion

expertOpinion={expertOpinion}

/>

:

expertOpinion

}


</ArticleIntelligenceSection>


}







{/* ================= FACT CHECK ================= */}


{

hasFactCheck &&


<ArticleIntelligenceSection

title="Fact Check"

description="Separating verified information from claims"

theme="fact"

>


{

Array.isArray(factCheck)

?

<ArticleFactCheck

factCheck={factCheck}

/>

:

factCheck

}


</ArticleIntelligenceSection>


}







{/* ================= KEY TAKEAWAYS ================= */}


{

hasTakeaways &&


<ArticleIntelligenceSection

title="Key Takeaways"

description="Important points readers should remember"

theme="takeaway"

>


<ArticleKeyTakeaways

keyTakeaways={keyTakeaways}

/>


</ArticleIntelligenceSection>


}







{/* ================= SOURCE DESK ================= */}


{

hasSourceDesk &&


<ArticleIntelligenceSection

title="Source Desk"

description="Editorial transparency and reporting source"

theme="source"

>


<ArticleSourceDesk

sourceDesk={sourceDesk}

/>


</ArticleIntelligenceSection>


}



</div>

);


}