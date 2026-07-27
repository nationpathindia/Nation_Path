import PanchangCard from "@/components/astro/cards/PanchangCard";

interface PanchangSectionProps {
  title?: string;
  description?: string;
}

export default function PanchangSection({
  title = "Today's Panchang",
  description = "Explore today's Vedic calendar including Tithi, Nakshatra, Yoga, Karana and important auspicious timings.",
}: PanchangSectionProps) {
  return (
    <section
      aria-labelledby="panchang-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Ambient Background Elements */}
      <div 
        aria-hidden="true" 
        className="absolute left-10 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/4 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute right-1/4 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
      />

      {/* Editorial Section Header Layout */}
      <div className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#C9A227]/30
            bg-[#C9A227]/5
            px-4
            py-1.5
            font-sans
            text-[10px]
            font-semibold
            uppercase
            tracking-widest
            text-[#8a6d12]
          "
        >
          Vedic Calendar
        </span>

        <h2
          id="panchang-heading"
          className="
            mt-5
            font-serif
            text-3xl
            font-normal
            tracking-wide
            text-[#071426]
            sm:text-4xl
            md:text-5xl
            leading-tight
          "
        >
          {title}
        </h2>

        {/* Premium Light-Leak Accent Line */}
        <div
          className="
            mt-6
            h-[1px]
            w-20
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]/40
            to-transparent
          "
        />

        <p
          className="
            mt-6
            max-w-2xl
            font-sans
            text-sm
            leading-relaxed
            text-[#071426]/70
          "
        >
          {description}
        </p>
      </div>

      {/* Upgraded High-End Panchang Shell Display */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-[#C9A227]/20
          bg-gradient-to-b from-white to-[#FAFAF9]/60
          p-1
          backdrop-blur-sm
          shadow-sm
        "
      >
        {/* Soft Gold Linear Top Accent Light Leak */}
        <div
          aria-hidden="true"
          className="
            absolute
            left-0
            top-0
            h-[2px]
            w-full
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]/40
            to-transparent
          "
        />

        <div
          className="
            rounded-[22px]
            bg-white/40
            p-5
            md:p-8
          "
        >
          <PanchangCard />
        </div>
      </div>
    </section>
  );
}