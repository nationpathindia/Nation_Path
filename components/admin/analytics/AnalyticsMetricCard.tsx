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
    icon: "bg-[#163C80]/15 text-[#7FA1E3]",
    border: "hover:border-[#163C80]/40",
    glow: "bg-[#163C80]/10",
  },

  orange: {
    icon: "bg-[#EA661B]/10 text-[#EA661B]",
    border: "hover:border-[#EA661B]/40",
    glow: "bg-[#EA661B]/10",
  },

  green: {
    icon: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/30",
    glow: "bg-emerald-500/10",
  },
} as const;

export default function AnalyticsMetricCard({
  label,
  value,
  icon: Icon,
  accent = "navy",
  description,
}: AnalyticsMetricCardProps) {
  const style = ACCENTS[accent];

  const safeValue = Number.isFinite(value) ? value : 0;

  return (
    <div
      className={[
        "group relative overflow-hidden",
        "rounded-2xl border border-white/[0.08]",
        "bg-white/[0.035]",
        "px-5 py-4",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-[1px]",
        "hover:bg-white/[0.05]",
        style.border,
      ].join(" ")}
    >
      {/* =====================================================
          SUBTLE ACCENT GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -right-8 -top-8",
          "h-20 w-20 rounded-full blur-2xl",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          style.glow,
        ].join(" ")}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p
            className={[
              "truncate",
              "text-[11px] font-medium uppercase",
              "tracking-[0.1em]",
              "text-gray-500",
              "transition-colors duration-200",
              "group-hover:text-gray-400",
            ].join(" ")}
          >
            {label}
          </p>

          <p
            className={[
              "mt-2",
              "text-2xl font-semibold tracking-tight",
              "text-white",
              "tabular-nums",
              "md:text-[28px]",
            ].join(" ")}
          >
            {safeValue.toLocaleString("en-IN")}
          </p>

          {description && (
            <p
              className={[
                "mt-1",
                "truncate",
                "text-xs",
                "leading-5",
                "text-gray-500",
              ].join(" ")}
            >
              {description}
            </p>
          )}
        </div>

        {/* ===================================================
            ICON
        =================================================== */}

        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl",
            "transition-transform duration-200",
            "group-hover:scale-[1.04]",
            style.icon,
          ].join(" ")}
        >
          <Icon
            size={18}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}