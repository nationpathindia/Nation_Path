import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";

interface CategoryAISummaryProps {
  categoryName: string;
  summary?: string;
}

export default function CategoryAISummary({
  categoryName,
  summary,
}: CategoryAISummaryProps) {
  return (
    <section
      className="
      border-b
      border-black/10
      pb-12
      mb-12
      "
    >
      <SectionHeader title="AI News Brief" />

      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#d4af37]/30
        bg-gradient-to-br
        from-[#0b1220]
        via-[#13213d]
        to-[#0b1220]
        p-7
        sm:p-10
        "
      >
        {/* Gold Accent */}
        <div
          className="
          absolute
          top-0
          left-0
          h-1
          w-full
          bg-[#d4af37]
          "
        />

        {/* Background Glow */}
        <div
          className="
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-[#d4af37]/10
          blur-3xl
          "
        />

        <div className="relative z-10 max-w-4xl">
          <div
            className="
            flex
            flex-wrap
            items-center
            gap-3
            "
          >
            <span
              className="
              inline-flex
              items-center
              rounded-full
              bg-[#d4af37]/20
              border
              border-[#d4af37]/30
              px-3
              py-1
              text-[11px]
              uppercase
              tracking-[0.22em]
              font-semibold
              text-[#f6d778]
              "
            >
              ✦ NationPath AI
            </span>

            <span
              className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-white/60
              "
            >
              2 Min Intelligence
            </span>
          </div>

          <h2
            className="
            mt-5
            font-serif
            text-3xl
            sm:text-4xl
            font-bold
            leading-tight
            text-white
            "
          >
            {categoryName} AI Summary
          </h2>

          <p
            className="
            mt-5
            text-base
            leading-8
            text-white/80
            max-w-3xl
            "
          >
            {summary ??
              `Our AI newsroom analyzed today's ${categoryName.toLowerCase()} coverage and identified the most important developments, emerging trends and stories that matter most. Read the complete coverage below or unlock deeper intelligence with NationPath Premium.`}
          </p>

          <div
            className="
            mt-8
            grid
            sm:grid-cols-2
            gap-4
            "
          >
            {[
              "Most important developments",
              "Emerging trend detection",
              "Fast 2-minute briefing",
              "Premium AI insights coming soon",
            ].map((item) => (
              <div
                key={item}
                className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                "
              >
                <span className="text-[#d4af37] text-lg">
                  ✦
                </span>

                <span className="text-sm text-white/85">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
            mt-8
            flex
            flex-wrap
            gap-4
            "
          >
            <Link
              href="#latest-stories"
              className="
              inline-flex
              items-center
              rounded-full
              bg-[#d4af37]
              px-6
              py-3
              text-sm
              font-semibold
              text-[#111]
              hover:bg-[#e8c85d]
              transition
              "
            >
              Read Today's Coverage
            </Link>

            <Link
              href="/astro"
              className="
              inline-flex
              items-center
              rounded-full
              border
              border-white/20
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              hover:bg-white/10
              transition
              "
            >
              Explore NationPath Intelligence
            </Link>
          </div>

          <p
            className="
            mt-6
            text-xs
            tracking-wide
            text-white/45
            "
          >
            AI-generated editorial briefing • Human editorial oversight • Premium intelligence platform coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}