"use client";

import {
  Activity,
  Bell,
  Bookmark,
  ChevronRight,
  Clock3,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const overviewItems = [
  {
    title: "Saved",
    value: "12",
    meta: "stories",
    icon: Bookmark,
    href: "/saved",
    accent: "#EA661B",
  },
  {
    title: "History",
    value: "8",
    meta: "recent",
    icon: Clock3,
    href: "/history",
    accent: "#163C80",
  },
  {
    title: "Alerts",
    value: "3",
    meta: "waiting",
    icon: Bell,
    href: "/notifications",
    accent: "#C6A15B",
  },
  {
    title: "Activity",
    value: "24",
    meta: "interactions",
    icon: Activity,
    href: "/activity",
    accent: "#2563EB",
  },
];

export default function DashboardOverview() {
  return (
    <section className="relative">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EA661B]" />

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B6A25]">
            Your Space
          </p>

          <span className="hidden h-px w-8 bg-[#C6A15B]/30 sm:block" />
        </div>

        <Link
          href="/profile"
          className="
            hidden items-center gap-1.5
            text-[10px] font-semibold
            text-[#8B8F97]
            transition
            hover:text-[#33120A]
            sm:flex
          "
        >
          <UserRound className="h-3 w-3" />
          Profile
        </Link>
      </div>

      <div className="mt-1 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-bold tracking-[-0.025em] text-[#33120A]">
            Your Overview
          </h2>

          <p className="mt-0.5 text-[10px] text-[#8B8F97]">
            A quick snapshot of your activity.
          </p>
        </div>
      </div>

      {/* =====================================================
          COMPACT METRIC STRIP
      ===================================================== */}

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="
                group relative overflow-hidden
                rounded-[14px]
                border border-white/[0.30]
                bg-white/[0.13]
                px-3 py-2.5
                backdrop-blur-xl
                shadow-[0_6px_20px_rgba(51,18,10,0.025)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-white/[0.22]
                hover:shadow-[0_10px_25px_rgba(51,18,10,0.045)]
              "
            >
              {/* Accent glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -right-5
                  -top-5
                  h-16
                  w-16
                  rounded-full
                  opacity-20
                  blur-2xl
                  transition
                  group-hover:opacity-45
                "
                style={{
                  backgroundColor: item.accent,
                }}
              />

              {/* Top reflection */}
              <span
                className="
                  pointer-events-none
                  absolute
                  left-3
                  right-6
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent
                "
              />

              <div className="relative flex items-center gap-2.5">
                {/* Icon */}
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    bg-white/[0.20]
                  "
                  style={{
                    borderColor: `${item.accent}22`,
                  }}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{
                      color: item.accent,
                    }}
                  />
                </div>

                {/* Metric */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[17px] font-bold leading-none tracking-[-0.04em] text-[#33120A]">
                      {item.value}
                    </span>

                    <span className="text-[8px] text-[#9A948B]">
                      {item.meta}
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] font-semibold text-[#5F6368]">
                    {item.title}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className="
                    h-3 w-3
                    shrink-0
                    text-[#C9C0B2]
                    transition-all duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </div>

              {/* Bottom accent */}
              <span
                className="
                  absolute
                  bottom-0
                  left-3
                  right-3
                  h-px
                  opacity-20
                  transition
                  group-hover:opacity-60
                "
                style={{
                  backgroundColor: item.accent,
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}