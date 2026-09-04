import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardRecommended from "@/components/dashboard/DashboardRecommended";
import NewsDashboardSection from "@/components/dashboard/news/NewsDashboardSection";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3EFE7] text-[#111111]">
      {/* =====================================================
          AMBIENT BRAND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* NationPath Navy */}
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#163C80]/[0.055]
            blur-[120px]
          "
        />

        {/* NationPath Orange */}
        <div
          className="
            absolute
            -right-40
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#EA661B]/[0.055]
            blur-[125px]
          "
        />

        {/* Gold */}
        <div
          className="
            absolute
            left-[38%]
            top-[34%]
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#C6A15B]/[0.04]
            blur-[115px]
          "
        />

        {/* Soft purple / Kids ecosystem hint */}
        <div
          className="
            absolute
            -bottom-48
            right-[18%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#A855F7]/[0.02]
            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          EDITORIAL GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-[0.18]
          [background-image:
            linear-gradient(rgba(22,60,128,0.04)_1px,transparent_1px),
            linear-gradient(90deg,rgba(22,60,128,0.04)_1px,transparent_1px)
          ]
          [background-size:48px_48px]
        "
      />

      {/* =====================================================
          MICRO PAPER TEXTURE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-[0.018]
          [background-image:radial-gradient(#33120A_0.65px,transparent_0.65px)]
          [background-size:14px_14px]
        "
      />

      {/* =====================================================
          TOP LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-0
          h-44
          w-[72%]
          -translate-x-1/2
          bg-white/35
          blur-[110px]
        "
      />

      {/* =====================================================
          DASHBOARD CONTENT
      ===================================================== */}

      <div className="relative z-10">
        <DashboardHeader />

        <main
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-4
            pb-16
            pt-5
            sm:px-6
            lg:px-8
          "
        >
          <div className="space-y-7">
            {/* =================================================
                WELCOME
            ================================================= */}

            <DashboardWelcome />

            {/* =================================================
                PERSONAL OVERVIEW
            ================================================= */}

            <DashboardOverview />

            {/* =================================================
                NEWS INTELLIGENCE
            ================================================= */}

            <NewsDashboardSection />

            {/* =================================================
                RECOMMENDED STORIES
            ================================================= */}

            <DashboardRecommended />
          </div>
        </main>
      </div>
    </div>
  );
}