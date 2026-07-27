export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">

      <article
        className="
        prose
        prose-lg
        max-w-none
        prose-headings:font-serif
        prose-headings:text-[#0b2a6f]
        prose-p:text-gray-700
        prose-li:text-gray-700
        "
      >
        {children}
      </article>

    </main>
  );
}