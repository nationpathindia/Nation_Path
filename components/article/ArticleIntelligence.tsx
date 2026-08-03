import ArticleIntelligenceSection from "./intelligence/ArticleIntelligenceSection";
import ArticleTimeline from "./intelligence/ArticleTimeline";
import ArticleExpertOpinion from "./intelligence/ArticleExpertOpinion";
import ArticleFactCheck from "./intelligence/ArticleFactCheck";
import ArticleKeyTakeaways from "./intelligence/ArticleKeyTakeaways";


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

}: ArticleIntelligenceProps) {



const hasContent =

background ||

(Array.isArray(timeline) && timeline.length > 0) ||

(Array.isArray(expertOpinion) && expertOpinion.length > 0) ||

(Array.isArray(factCheck) && factCheck.length > 0) ||

(Array.isArray(keyTakeaways) && keyTakeaways.length > 0) ||

sourceDesk;



if(!hasContent){

return null;

}





return (

<section

className="

my-10

space-y-8

"

>


{/* ================= ARTICLE INTELLIGENCE HEADER ================= */}


<div>

<p

className="

text-xs

font-semibold

uppercase

tracking-[0.2em]

text-[#163C80]

"

>

NationPath Intelligence

</p>


<h2

className="

mt-2

text-2xl

font-bold

tracking-tight

text-gray-900

"

>

Article Intelligence

</h2>

</div>







{/* ================= BACKGROUND ================= */}



{

background &&

(

<ArticleIntelligenceSection

title="Background"

>

<p>

{background}

</p>

</ArticleIntelligenceSection>

)

}









{/* ================= TIMELINE ================= */}



{

Array.isArray(timeline)

&&

timeline.length > 0

&&

(

<ArticleIntelligenceSection

title="Timeline"

>

<ArticleTimeline

timeline={timeline}

/>

</ArticleIntelligenceSection>

)

}









{/* ================= EXPERT OPINION ================= */}



{

Array.isArray(expertOpinion)

&&

expertOpinion.length > 0

&&

(

<ArticleIntelligenceSection

title="Expert Opinion"

>

<ArticleExpertOpinion

expertOpinion={expertOpinion}

/>

</ArticleIntelligenceSection>

)

}









{/* ================= FACT CHECK ================= */}



{

Array.isArray(factCheck)

&&

factCheck.length > 0

&&

(

<ArticleIntelligenceSection

title="Fact Check"

>

<ArticleFactCheck

factCheck={factCheck}

/>

</ArticleIntelligenceSection>

)

}









{/* ================= KEY TAKEAWAYS ================= */}



{

Array.isArray(keyTakeaways)

&&

keyTakeaways.length > 0

&&

(

<ArticleIntelligenceSection

title="Key Takeaways"

>

<ArticleKeyTakeaways

keyTakeaways={keyTakeaways}

/>

</ArticleIntelligenceSection>

)

}









{/* ================= SOURCE DESK ================= */}



{

sourceDesk &&

(

<ArticleIntelligenceSection

title="Source Desk"

>

<p>

{sourceDesk}

</p>

</ArticleIntelligenceSection>

)

}



</section>

);

}