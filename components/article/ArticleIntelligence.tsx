import ArticleIntelligenceSection from "./intelligence/ArticleIntelligenceSection";

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

<section

className="

my-14

"

>





{/* ================= HEADER ================= */}



<header

className="

mb-12

border-b

border-gray-200

pb-6

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

>

<p>

{background}

</p>

</ArticleIntelligenceSection>

}









{/* ================= TIMELINE ================= */}



{

hasTimeline &&

<ArticleIntelligenceSection

title="Timeline"

>



{

Array.isArray(timeline)

?

<ArticleTimeline

timeline={timeline}

/>

:

<p>

{timeline}

</p>

}



</ArticleIntelligenceSection>

}











{/* ================= EXPERT OPINION ================= */}



{

hasExpertOpinion &&

<ArticleIntelligenceSection

title="Expert Opinion"

>



{

Array.isArray(expertOpinion)

?

<ArticleExpertOpinion

expertOpinion={expertOpinion}

/>

:

<p>

{expertOpinion}

</p>

}



</ArticleIntelligenceSection>

}









{/* ================= FACT CHECK ================= */}



{

hasFactCheck &&

<ArticleIntelligenceSection

title="Fact Check"

>



{

Array.isArray(factCheck)

?

<ArticleFactCheck

factCheck={factCheck}

/>

:

<p>

{factCheck}

</p>

}



</ArticleIntelligenceSection>

}









{/* ================= KEY TAKEAWAYS ================= */}



{

hasTakeaways &&

<ArticleIntelligenceSection

title="Key Takeaways"

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

>



<ArticleSourceDesk

sourceDesk={sourceDesk}

/>



</ArticleIntelligenceSection>

}



</section>

);

}