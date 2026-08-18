import type { LucideIcon } from "lucide-react";

interface AnalyticsMetricCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "navy" | "orange" | "green";
  description?: string;
}


const ACCENTS = {
  navy: {
    icon: "bg-[#163C80]/20 text-[#8FAEFF]",
    glow: "bg-[#163C80]/10",
    hover: "hover:border-[#163C80]/40",
  },

  orange: {
    icon: "bg-orange-500/10 text-orange-400",
    glow: "bg-orange-500/10",
    hover: "hover:border-orange-500/40",
  },

  green: {
    icon: "bg-emerald-500/10 text-emerald-400",
    glow: "bg-emerald-500/10",
    hover: "hover:border-emerald-500/40",
  },
} as const;


export default function AnalyticsMetricCard({
  label,
  value,
  icon: Icon,
  accent = "orange",
  description,
}: AnalyticsMetricCardProps) {

  const style = ACCENTS[accent];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        h-[88px]
        rounded-xl
        border
        border-white/[0.08]
        bg-black/30
        backdrop-blur-xl
        px-4
        py-3
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.04]
        hover:shadow-lg
        ${style.hover}
      `}
    >

      {/* subtle glow */}

      <div
        className={`
          absolute
          right-0
          top-0
          h-14
          w-14
          rounded-full
          blur-2xl
          opacity-60
          ${style.glow}
        `}
      />


      <div
        className="
          relative
          z-10
          flex
          h-full
          items-center
          justify-between
        "
      >

        <div className="min-w-0">

          <p
            className="
              truncate
              text-[10px]
              uppercase
              tracking-widest
              text-gray-500
            "
          >
            {label}
          </p>


          <h3
            className="
              mt-1
              text-xl
              font-bold
              leading-none
              tracking-tight
              text-white
              tabular-nums
            "
          >
            {value?.toLocaleString("en-IN")}
          </h3>


          {description && (
            <p
              className="
                mt-1
                truncate
                text-[10px]
                text-gray-600
              "
            >
              {description}
            </p>
          )}

        </div>


        <div
          className={`
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            border
            border-white/5
            transition
            group-hover:scale-105
            ${style.icon}
          `}
        >

          <Icon
            size={14}
            strokeWidth={2}
          />

        </div>


      </div>

    </div>
  );
}