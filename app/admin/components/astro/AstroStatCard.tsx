"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Reusable Astro Statistics Card Component
//////////////////////////////////////////////////////////////

import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface AstroStatCardProps {
  title: string;
  value: string | number;
  description?: string;

  icon: LucideIcon;

  trend?: {
    value: string;
    type: "up" | "down";
  };

  variant?:
    | "default"
    | "gold"
    | "blue"
    | "green"
    | "purple";
}


export default function AstroStatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
}: AstroStatCardProps) {


  const variants = {
    default:
      "from-slate-900 to-slate-800 border-slate-700",

    gold:
      "from-yellow-950/40 to-slate-900 border-yellow-500/30",

    blue:
      "from-blue-950/40 to-slate-900 border-blue-500/30",

    green:
      "from-green-950/40 to-slate-900 border-green-500/30",

    purple:
      "from-purple-950/40 to-slate-900 border-purple-500/30",
  };


  return (
    <div
      className={`
        rounded-2xl
        border
        bg-gradient-to-br
        ${variants[variant]}
        p-5
        shadow-lg
        transition
        hover:-translate-y-1
        duration-300
      `}
    >

      <div className="flex items-start justify-between">


        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>


          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>


          {description && (
            <p className="mt-2 text-xs text-slate-400">
              {description}
            </p>
          )}


          {trend && (

            <div
              className={`
                mt-3
                flex
                items-center
                gap-1
                text-xs
                ${
                  trend.type === "up"
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >

              {
                trend.type === "up"
                  ?
                  <TrendingUp size={14}/>
                  :
                  <TrendingDown size={14}/>
              }


              <span>
                {trend.value}
              </span>

            </div>

          )}

        </div>



        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-white/10
            text-yellow-400
          "
        >

          <Icon size={24}/>

        </div>


      </div>


    </div>
  );
}