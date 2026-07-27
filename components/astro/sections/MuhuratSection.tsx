import {
  Heart,
  Home,
  Car,
  BriefcaseBusiness,
} from "lucide-react";

import MuhuratCard from "@/components/astro/cards/MuhuratCard";

interface MuhuratItem {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

const muhurats: MuhuratItem[] = [
  {
    title: "Marriage Muhurat",
    description: "Find auspicious dates and optimal planetary alignments for sacred marriage ceremonies.",
    slug: "marriage-muhurat",
    icon: <Heart size={22} />,
  },
  {
    title: "Griha Pravesh",
    description: "Discover favorable celestial timings for entering and blessing your new home.",
    slug: "griha-pravesh",
    icon: <Home size={22} />,
  },
  {
    title: "Vehicle Purchase",
    description: "Choose suitable cosmic windows and shubh timings for acquiring your new vehicle.",
    slug: "vehicle-muhurat",
    icon: <Car size={22} />,
  },
  {
    title: "Business Muhurat",
    description: "Initiate major financial ventures and commercial projects under prosperous Vedic indicators.",
    slug: "business-muhurat",
    icon: <BriefcaseBusiness size={22} />,
  },
];

export default function MuhuratSection() {
  return (
    <section
      aria-labelledby="muhurat-heading"
      className="relative mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Ambient Under-Glow Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute left-10 top-1/3 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/4 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute right-10 bottom-0 -z-10 h-[350px] w-[350px] rounded-full bg-[#C9A227]/3 blur-3xl pointer-events-none" 
      />

      {/* Editorial Content Header Layout */}
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
          Vedic Timing Intelligence
        </span>

        <h2
          id="muhurat-heading"
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
          Auspicious Muhurat
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
          Explore precise, calculations-driven Hindu Muhurat metrics for weddings, 
          residential transitions, enterprise investments, and harmonious new beginnings.
        </p>
      </div>

      {/* Upgraded High-End Grid Matrix Display */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {muhurats.map((item) => (
          <MuhuratCard
            key={item.slug}
            title={item.title}
            description={item.description}
            slug={item.slug}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}