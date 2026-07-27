import {
  Sunrise,
  Sunset,
  Moon,
  Sparkles,
  CircleDot,
} from "lucide-react";

interface PanchangCardProps {
  sunrise?: string;
  sunset?: string;
  tithi?: string;
  nakshatra?: string;
  yoga?: string;
  karana?: string;
}

export default function PanchangCard({
  sunrise = "Updating",
  sunset = "Updating",
  tithi = "Updating",
  nakshatra = "Updating",
  yoga = "Updating",
  karana = "Updating",
}: PanchangCardProps) {
  const items = [
    {
      label: "Tithi",
      value: tithi,
      icon: <Moon size={18} />,
    },
    {
      label: "Nakshatra",
      value: nakshatra,
      icon: <Sparkles size={18} />,
    },
    {
      label: "Yoga",
      value: yoga,
      icon: <CircleDot size={18} />,
    },
    {
      label: "Karana",
      value: karana,
      icon: <CircleDot size={18} />,
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Background Cosmic Energy Overlay Layer */}
      <div 
        aria-hidden="true" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none" 
      />

      {/* Sun Timings Solar Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <TimeCard
          icon={<Sunrise size={22} />}
          title="Sunrise"
          value={sunrise}
        />
        <TimeCard
          icon={<Sunset size={22} />}
          title="Sunset"
          value={sunset}
        />
      </div>

      {/* Panchang Details Metric Matrix */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[#C9A227]/15
              bg-gradient-to-b from-white to-[#FAFAF9]/60
              p-6
              backdrop-blur-sm
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#C9A227]/40
              hover:shadow-lg
              hover:shadow-[#071426]/5
            "
          >
            <div className="flex items-center gap-3">
              {/* Premium Wrapped Custom Icon Container */}
              <div
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C9A227]/20
                  bg-[#071426]/5
                  text-[#C9A227]
                  transition-all
                  duration-500
                  group-hover:rotate-[6deg]
                  group-hover:scale-105
                  group-hover:bg-[#071426]/10
                  group-hover:border-[#C9A227]/40
                "
              >
                {item.icon}
              </div>

              {/* Muted Luxury Meta Text */}
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-[#8a6d12]">
                {item.label}
              </span>
            </div>

            {/* Typography Value Asset */}
            <p className="mt-5 font-serif text-lg font-normal tracking-wide text-[#071426]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TimeCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function TimeCard({ icon, title, value }: TimeCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#C9A227]/25
        bg-[#071426]
        p-6
        shadow-md
        transition-all
        duration-500
        hover:border-[#C9A227]/50
        hover:shadow-xl
        hover:shadow-[#071426]/20
      "
    >
      {/* Dynamic Deep Dark Ambient Aura */}
      <div 
        aria-hidden="true" 
        className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-[#C9A227]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" 
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* High-Contrast Luxury Primary Gold Icon Carrier */}
          <div className="text-[#C9A227] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-3deg]">
            {icon}
          </div>

          <span className="font-sans text-xs uppercase tracking-widest font-medium text-[#FAFAF7]/70">
            {title}
          </span>
        </div>

        {/* Dynamic Operational Pulse Tag */}
        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 border border-white/5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A227]"></span>
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest font-medium text-[#C9A227]">
            Calculated
          </span>
        </div>
      </div>

      {/* Stellar Display Typography */}
      <p className="mt-5 font-serif text-2xl font-normal tracking-wide text-[#FAFAF7]">
        {value}
      </p>
    </div>
  );
}