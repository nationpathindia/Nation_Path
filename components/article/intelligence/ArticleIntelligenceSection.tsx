import React from "react";

interface ArticleIntelligenceSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ArticleIntelligenceSection({
  title,
  children,
}: ArticleIntelligenceSectionProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        sm:p-8
      "
    >
      <h3
        className="
          mb-4
          text-xl
          font-semibold
          tracking-tight
          text-[#163C80]
        "
      >
        {title}
      </h3>

      <div
        className="
          text-base
          leading-8
          text-gray-700
        "
      >
        {children}
      </div>
    </section>
  );
}