import type { ReactNode } from "react";

export default function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <article
        className="
          prose
          prose-lg
          max-w-none

          prose-headings:font-serif
          prose-headings:font-bold
          prose-headings:text-[#0b2a6f]

          prose-p:text-gray-700
          prose-p:leading-[1.8]

          prose-li:text-gray-700
          prose-li:leading-[1.8]

          prose-a:text-[#0b2a6f]
          prose-a:font-semibold

          prose-strong:text-gray-900
          prose-strong:font-bold
        "
      >
        {children}
      </article>
    </main>
  );
}