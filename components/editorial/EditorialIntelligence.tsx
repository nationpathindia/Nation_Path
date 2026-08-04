import EditorialBrief from "@/components/editorial/EditorialBrief";
import EditorialWhyItMatters from "@/components/editorial/EditorialWhyItMatters";
import EditorialTimeline from "@/components/editorial/EditorialTimeline";
import EditorialExpertOpinion from "@/components/editorial/EditorialExpertOpinion";
import EditorialFactCheck from "@/components/editorial/EditorialFactCheck";
import EditorialTakeaways from "@/components/editorial/EditorialTakeaways";
import EditorialSourceDesk from "@/components/editorial/EditorialSourceDesk";
import EditorialWhatsNext from "@/components/editorial/EditorialWhatsNext";
import EditorialHighlights from "@/components/editorial/EditorialHighlights";


type Props = {

  article:any;

};





export default function EditorialIntelligence({

article

}:Props){



if(!article){

return null;

}



return (

<section

className="
space-y-10
mt-10
"

>





{/* ================= EXECUTIVE BRIEF ================= */}


{

article.shortBrief &&

(

<EditorialBrief

shortBrief={article.shortBrief}

/>

)

}








{/* ================= KEY HIGHLIGHTS ================= */}


{

article.keyHighlights &&

(

<EditorialHighlights

highlights={article.keyHighlights}

/>

)

}

{/* ================= WHY IT MATTERS ================= */}


{

article.whyItMatters &&

(

<EditorialWhyItMatters

whyItMatters={article.whyItMatters}

/>

)

}









{/* ================= TIMELINE ================= */}


{

article.timeline &&

(

<EditorialTimeline

timeline={article.timeline}

/>

)

}









{/* ================= EXPERT PERSPECTIVE ================= */}


{

article.expertOpinion &&

(

<EditorialExpertOpinion

expertOpinion={article.expertOpinion}

/>

)

}









{/* ================= FACT CHECK ================= */}


{

article.factCheck &&

(

<EditorialFactCheck

factCheck={article.factCheck}

/>

)

}









{/* ================= KEY TAKEAWAYS ================= */}


{

article.keyTakeaways &&

(

<EditorialTakeaways

takeaways={article.keyTakeaways}

/>

)

}









{/* ================= WHAT'S NEXT ================= */}


{

article.whatsNext &&

(

<EditorialWhatsNext

whatsNext={article.whatsNext}

/>

)

}









{/* ================= SOURCE DESK ================= */}


{

article.sourceDesk &&

(

<EditorialSourceDesk

sourceDesk={article.sourceDesk}

/>

)

}






</section>

);

}