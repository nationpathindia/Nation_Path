"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: number;
  link?: string;
}

export default function DashboardCard({
  title,
  value,
  link,
}: Props) {
  const content = (
    <div
      className="
        admin-card
        group
        relative
        overflow-hidden
        min-h-[94px]
        px-4
        py-3.5
        transition-all
        duration-200
        cursor-pointer
        hover:-translate-y-0.5
        hover:border-[var(--admin-primary)]
        hover:shadow-[var(--admin-shadow-md)]
      "
    >
      {/* SUBTLE ACCENT GLOW */}
      <div
        className="
          absolute
          -right-6
          -top-6
          w-20
          h-20
          rounded-full
          bg-[var(--admin-primary)]
          opacity-[0.06]
          blur-2xl
          transition-opacity
          duration-200
          group-hover:opacity-[0.12]
        "
      />

      {/* TOP ACCENT */}
      <div
        className="
          absolute
          left-0
          top-0
          h-0.5
          w-0
          bg-[var(--admin-primary)]
          transition-all
          duration-200
          group-hover:w-full
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          h-full
          gap-3
        "
      >
        {/* METRIC */}
        <div className="min-w-0">
          <p className="admin-label truncate">
            {title}
          </p>

          <h3 className="admin-metric mt-2">
            {value?.toLocaleString()}
          </h3>
        </div>

        {/* ICON */}
        <div
          className="
            w-8
            h-8
            rounded-lg
            shrink-0
            bg-[var(--admin-primary-soft)]
            border
            border-[var(--admin-border)]
            flex
            items-center
            justify-center
            transition-all
            duration-200
            group-hover:bg-[var(--admin-primary)]
            group-hover:border-[var(--admin-primary)]
          "
        >
          <TrendingUp
            size={14}
            strokeWidth={2.2}
            className="
              text-[var(--admin-primary-dark)]
              transition-colors
              duration-200
              group-hover:text-white
            "
          />
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="
          block
          rounded-[var(--admin-radius-lg)]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--admin-primary)]
          focus-visible:ring-offset-2
        "
      >
        {content}
      </Link>
    );
  }

  return content;
}

