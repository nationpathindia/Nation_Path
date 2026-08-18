"use client";

import {
  Activity,
  BookOpen,
  Eye,
  FileText,
  Flame,
  Heart,
  Newspaper,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";


interface ContentPerformance {
  totalEvents?: number;
  views?: number;
  opens?: number;
  reads?: number;
  shares?: number;
  reactions?: number;
  likes?: number;
}


interface AnalyticsContentPerformanceProps {
  news?: ContentPerformance;
  editorial?: ContentPerformance;
  astrology?: ContentPerformance;
}


type ContentType =
  | "news"
  | "editorial"
  | "astro";



function number(value?: number) {
  return Number(value) || 0;
}



function formatNumber(value:number) {

  if(value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if(value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}



function percent(
  value:number,
  total:number
){

  if(!total) return 0;

  return Number(
    ((value / total) * 100).toFixed(1)
  );

}



const CONTENT_CONFIG = {

  news:{
    label:"News",
    description:"Breaking news and newsroom performance",
    icon:Newspaper,
    iconBox:"bg-emerald-500/10",
    iconText:"text-emerald-400",
    badge:"bg-emerald-500/10 text-emerald-400",
    bar:"bg-emerald-400"
  },


  editorial:{
    label:"Editorial",
    description:"Analysis and opinion intelligence",
    icon:BookOpen,
    iconBox:"bg-blue-500/10",
    iconText:"text-blue-300",
    badge:"bg-blue-500/10 text-blue-300",
    bar:"bg-blue-400"
  },


  astro:{
    label:"Astrology",
    description:"Astro intelligence content performance",
    icon:Sparkles,
    iconBox:"bg-orange-500/10",
    iconText:"text-orange-400",
    badge:"bg-orange-500/10 text-orange-400",
    bar:"bg-orange-400"
  }

};



function ScoreBadge({
 value
}:{
 value:number;
}){

 let label="Building";
 let color="text-gray-400";


 if(value >= 80){
  label="Excellent";
  color="text-emerald-400";
 }
 else if(value >= 60){
  label="Strong";
  color="text-blue-300";
 }
 else if(value >= 35){
  label="Growing";
  color="text-orange-400";
 }


 return(
  <div className="flex items-center gap-2">

    <TrendingUp
      size={14}
      className={color}
    />

    <span className={`text-xs font-semibold ${color}`}>
      {label}
    </span>

    <span className="text-xs text-gray-600">
      {value}/100
    </span>

  </div>
 );

}




function ContentIcon({
 type
}:{
 type:ContentType;
}){

 const config=CONTENT_CONFIG[type];

 const Icon=config.icon;


 return(
  <div
    className={`
      flex h-11 w-11
      items-center justify-center
      rounded-xl
      ${config.iconBox}
      ${config.iconText}
    `}
  >

    <Icon
      size={20}
      strokeWidth={1.8}
    />

  </div>
 );

}




function MetricRow({
 icon,
 label,
 value
}:{
 icon:React.ReactNode;
 label:string;
 value:number;
}){


 return(

 <div
  className="
    flex
    items-center
    justify-between
    rounded-lg
    border
    border-white/[0.04]
    bg-white/[0.025]
    px-3
    py-2
  "
 >

   <div
    className="
      flex
      items-center
      gap-2
      text-gray-500
    "
   >

    {icon}

    <span className="text-xs">
      {label}
    </span>

   </div>


   <span className="text-sm font-semibold text-white">
     {formatNumber(value)}
   </span>


 </div>

 );

}
function ContentCard({
  type,
  data,
}:{
  type:ContentType;
  data?:ContentPerformance;
}){

  const config=CONTENT_CONFIG[type];


  const views=number(data?.views);
  const reads=number(data?.reads);
  const opens=number(data?.opens);
  const shares=number(data?.shares);

  const reactions =
    number(data?.reactions) +
    number(data?.likes);

  const events =
    number(data?.totalEvents);



  const readRate =
    percent(reads,views);


  const shareRate =
    percent(shares,views);


  const engagement =
    percent(
      reads +
      shares +
      reactions,
      views
    );


  const score =
    Math.min(
      100,
      Math.round(
        (
          readRate * 0.45 +
          shareRate * 0.25 +
          engagement * 0.30
        )
      )
    );



  return(

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-black/30
        p-5
        backdrop-blur-xl
        transition
        hover:border-white/[0.18]
      "
    >

      {/* glow */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-32
          w-32
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />



      {/* HEADER */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-3
        "
      >

        <div className="flex items-center gap-3">

          <ContentIcon type={type}/>


          <div>

            <h3
              className="
                text-base
                font-semibold
                text-white
              "
            >
              {config.label}
            </h3>


            <p
              className="
                mt-1
                text-xs
                text-gray-500
              "
            >
              {config.description}
            </p>


          </div>


        </div>



        <div
          className={`
            flex
            items-center
            gap-1
            rounded-lg
            px-2
            py-1
            text-[11px]
            ${config.badge}
          `}
        >

          <Activity size={12}/>

          {formatNumber(events)}

        </div>


      </div>





      {/* SCORE */}

      <div
        className="
          mt-5
          rounded-xl
          border
          border-white/[0.06]
          bg-white/[0.025]
          p-4
        "
      >

        <div
          className="
            flex
            items-end
            justify-between
          "
        >

          <div>

            <p
              className="
                text-[10px]
                uppercase
                tracking-widest
                text-gray-600
              "
            >
              Total Reach
            </p>


            <p
              className="
                mt-1
                text-3xl
                font-bold
                text-white
              "
            >
              {formatNumber(views)}
            </p>

          </div>



          <ScoreBadge
            value={score}
          />


        </div>



        <div
          className="
            mt-4
            h-1.5
            overflow-hidden
            rounded-full
            bg-white/[0.05]
          "
        >

          <div
            className={`
              h-full
              rounded-full
              ${config.bar}
            `}
            style={{
              width:`${score}%`
            }}
          />

        </div>


      </div>





      {/* METRICS */}

      <div className="mt-5 space-y-2">


        <MetricRow
          icon={<Eye size={14}/>}
          label="Views"
          value={views}
        />


        <MetricRow
          icon={<BookOpen size={14}/>}
          label="Reads"
          value={reads}
        />


        <MetricRow
          icon={<FileText size={14}/>}
          label="Opens"
          value={opens}
        />


        <MetricRow
          icon={<Share2 size={14}/>}
          label="Shares"
          value={shares}
        />


        <MetricRow
          icon={<Heart size={14}/>}
          label="Interactions"
          value={reactions}
        />


      </div>





      {/* INTELLIGENCE */}

      <div
        className="
          mt-5
          grid
          grid-cols-3
          gap-2
          border-t
          border-white/[0.06]
          pt-4
        "
      >

        <div>

          <p
            className="
              text-[10px]
              text-gray-600
            "
          >
            READ RATE
          </p>


          <p className="mt-1 text-sm font-semibold text-white">
            {readRate}%
          </p>

        </div>



        <div>

          <p
            className="
              text-[10px]
              text-gray-600
            "
          >
            SHARE
          </p>


          <p className="mt-1 text-sm font-semibold text-white">
            {shareRate}%
          </p>

        </div>



        <div>

          <p
            className="
              text-[10px]
              text-gray-600
            "
          >
            ENGAGE
          </p>


          <p className="mt-1 text-sm font-semibold text-white">
            {engagement}%
          </p>

        </div>


      </div>


    </div>

  );

}






export default function AnalyticsContentPerformance({
 news,
 editorial,
 astrology,
}:AnalyticsContentPerformanceProps){


 return(

<section className="space-y-4">


<div>

<div
className="
flex
items-center
gap-2
"
>

<Flame
 size={17}
 className="text-orange-400"
/>


<h2
className="
text-lg
font-semibold
text-white
"
>
Content Intelligence
</h2>


</div>


<p
className="
mt-1
text-sm
text-gray-500
"
>
Performance comparison across NationPath content ecosystems.
</p>


</div>





<div
className="
grid
gap-5
lg:grid-cols-3
"
>


<ContentCard
 type="news"
 data={news}
/>


<ContentCard
 type="editorial"
 data={editorial}
/>


<ContentCard
 type="astro"
 data={astrology}
/>


</div>


</section>

 );


}