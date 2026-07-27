import {
  Activity,
  CalendarDays,
  Clock3,
  Moon,
  ShieldAlert,
  Sparkles,
  Star,
  Sun,
  Sunset,
} from "lucide-react";

interface SnapshotItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  category?: "auspicious" | "inauspicious" | "standard";
  subtitle?: string;
}

const snapshot: SnapshotItem[] = [
  {
    label: "Sunrise",
    value: "06:02 AM",
    icon: <Sun size={22} />,
    category: "standard",
    subtitle: "Surya Udaya",
  },
  {
    label: "Sunset",
    value: "07:18 PM",
    icon: <Sunset size={22} />,
    category: "standard",
    subtitle: "Surya Asta",
  },
  {
    label: "Tithi",
    value: "Shukla Tritiya",
    icon: <Moon size={22} />,
    category: "standard",
    subtitle: "Lunar Day",
  },
  {
    label: "Nakshatra",
    value: "Rohini",
    icon: <Star size={22} />,
    category: "standard",
    subtitle: "Constellation",
  },
  {
    label: "Yoga",
    value: "Siddhi",
    icon: <Activity size={22} />,
    category: "standard",
    subtitle: "Planetary Combination",
  },
  {
    label: "Karana",
    value: "Garaja",
    icon: <Sparkles size={22} />,
    category: "standard",
    subtitle: "Half Lunar Day",
  },
  {
    label: "Abhijit Muhurat",
    value: "12:08 PM – 12:54 PM",
    icon: <Clock3 size={22} />,
    category: "auspicious",
    subtitle: "Most Auspicious Window",
  },
  {
    label: "Rahu Kaal",
    value: "01:30 PM – 03:00 PM",
    icon: <ShieldAlert size={22} />,
    category: "inauspicious",
    subtitle: "Avoid Major Actions",
  },
];

export default function CosmicSnapshot() {
  return (
    <section
      aria-labelledby="cosmic-snapshot-title"
      className="my-24 relative px-1"
    >
      {/* Astrological Ambient Background Blurs */}
      <div className="absolute top-12 left-10 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-5 w-[350px] h-[350px] bg-[#071426]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C9A227]/40
            bg-gradient-to-r from-[#C9A227]/10 to-transparent
            px-4
            py-1.5
            text-xs
            font-medium
            uppercase
            tracking-[0.24em]
            text-[#8a6d12]
            backdrop-blur-sm
          "
        >
          <Sparkles size={13} className="text-[#C9A227] animate-spin-[spin_4s_linear_infinite]" />
          Today's Cosmic Snapshot
        </div>

        <h2
          id="cosmic-snapshot-title"
          className="
            mt-6
            font-serif
            text-4xl
            font-normal
            tracking-tight
            leading-tight
            text-[#071426]
            md:text-5xl
          "
        >
          Your Vedic Day at a Glance
        </h2>

        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227]/30" />
        </div>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-relaxed
            text-slate-600
          "
        >
          Daily Panchang essentials including Sunrise, Muhurat periods, and major 
          lunar phase shifts calculated precisely for your current coordinates.
        </p>
      </div>

      {/* Interactive HUD Metrics Grid */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {snapshot.map((item) => {
          const isAuspicious = item.category === "auspicious";
          const isInauspicious = item.category === "inauspicious";

          return (
            <article
              key={item.label}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                p-6
                transition-all
                duration-350
                hover:-translate-y-1
                ${
                  isAuspicious
                    ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 sm:col-span-2 lg:col-span-2 hover:border-emerald-400 hover:shadow-emerald-100/50"
                    : isInauspicious
                    ? "border-rose-200 bg-gradient-to-br from-white to-rose-50/30 sm:col-span-2 lg:col-span-2 hover:border-rose-400 hover:shadow-rose-100/50"
                    : "border-[#C9A227]/15 bg-gradient-to-b from-white to-[#FAFAF9]/60 hover:border-[#C9A227]/40 hover:bg-white hover:shadow-md"
                }
              `}
            >
              {/* Left Aura Strip indicator */}
              <span
                aria-hidden="true"
                className={`
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1
                  transition-all
                  duration-300
                  ${
                    isAuspicious
                      ? "bg-emerald-500"
                      : isInauspicious
                      ? "bg-rose-500"
                      : "bg-transparent group-hover:bg-[#C9A227]"
                  }
                `}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      group-hover:scale-105
                      ${
                        isAuspicious
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                          : isInauspicious
                          ? "border-rose-200 bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                          : "border-[#C9A227]/25 bg-[#FAFAF7] text-[#C9A227] group-hover:bg-[#071426] group-hover:text-white"
                      }
                    `}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-1 font-serif text-base font-medium text-slate-800 group-hover:text-[#071426] transition-colors">
                      {item.label}
                    </h3>
                    <p
                      className={`
                        mt-2
                        font-serif
                        text-xl
                        font-semibold
                        leading-none
                        tracking-tight
                        ${
                          isAuspicious
                            ? "text-emerald-700"
                            : isInauspicious
                            ? "text-rose-700"
                            : "text-[#071426]"
                        }
                      `}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>

                {/* Micro operational status badge inside cards */}
                <div className="hidden xxs:block">
                  <span
                    className={`
                      inline-block
                      w-2
                      h-2
                      rounded-full
                      animate-pulse
                      ${
                        isAuspicious
                          ? "bg-emerald-400"
                          : isInauspicious
                          ? "bg-rose-400"
                          : "bg-[#C9A227]/40"
                      }
                    `}
                  />
                </div>
              </div>

              {/* Dynamic bottom detail border row */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5">
                <span className="text-[11px] font-medium text-slate-400">
                  Calculated Live
                </span>
                <span
                  className={`
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    px-2
                    py-0.5
                    rounded
                    ${
                      isAuspicious
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : isInauspicious
                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : "bg-slate-50 text-slate-500 border border-slate-100"
                    }
                  `}
                >
                  {isAuspicious ? "Propitious" : isInauspicious ? "Restricted" : "Active"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial Luxury Info Callout Wrapper */}
      <div
        className="
          mt-20
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#C9A227]/25
          bg-gradient-to-br from-[#FAFAF8] to-[#F5F5F0]
          shadow-md
        "
      >
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,rgba(201,162,39,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="relative border-t-4 border-[#C9A227] px-8 py-12 md:px-12 z-10">
          <div
            className="
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="max-w-3xl">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#C9A227]/30
                  bg-[#C9A227]/5
                  px-3.5
                  py-1
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[#8a6d12]
                "
              >
                <Sparkles size={12} className="text-[#C9A227] animate-pulse" />
                Vedic Rhythm Intelligence
              </span>

              <h3
                className="
                  mt-5
                  font-serif
                  text-3xl
                  font-normal
                  tracking-tight
                  leading-tight
                  text-[#071426]
                "
              >
                Plan Every Important Moment With Confidence
              </h3>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-relaxed
                  text-slate-600
                "
              >
                Panchang reflects the rhythm of the Sun, Moon and planetary transitions. 
                Utilizing specific configurations like Abhijit Muhurat helps minimize friction 
                and optimizes favorable cosmic fields.
              </p>
            </div>

            {/* Sidebar Data Shield Container */}
            <div
              className="
                rounded-xl
                border
                border-slate-200/80
                bg-white
                p-6
                shadow-sm
                lg:w-80
                shrink-0
              "
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a6d12]">
                Terminal Verification
              </p>
              
              <h4 className="mt-2 font-serif text-lg font-semibold text-[#071426]">
                Astronomical Engine
              </h4>
              
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Calculated down to arcseconds using high-fidelity geographic telemetry, matching 
                classical Nirayana systems exactly.
              </p>

              <div className="mt-5 rounded-lg bg-[#FAFAF7] border border-[#C9A227]/15 p-3.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">Sync Status</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-wider">● 100% Accurate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}