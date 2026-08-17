//////////////////////////////////////////////////////////////
// NATIONPATH UNIFIED DASHBOARD
//
// Current:
// - Premium demo dashboard
// - News + Astro
// - News dashboard components connected
// - Existing Astro dashboard components preserved
//
// NEXT LOCKED FLOW:
// Dashboard → Email OTP
//////////////////////////////////////////////////////////////

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserSubscription } from "@/lib/subscription";

import NewsDashboardSection from "@/components/dashboard/news/NewsDashboardSection";

import AstroSubscriptionCard from "@/components/astro/dashboard/AstroSubscriptionCard";
import AstroProfileCard from "@/components/astro/dashboard/AstroProfileCard";
import AstroScoreCard from "@/components/astro/dashboard/AstroScoreCard";
import AstroReportCard from "@/components/astro/dashboard/AstroReportCard";
import AstroTimelineCard from "@/components/astro/dashboard/AstroTimelineCard";
import AstroTransitCard from "@/components/astro/dashboard/AstroTransitCard";
import AstroQuickActions from "@/components/astro/dashboard/AstroQuickActions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  ////////////////////////////////////////////////////////////
  // SESSION
  ////////////////////////////////////////////////////////////

  const session = await getServerSession(authOptions);

  console.log("DASH SESSION", session);

  ////////////////////////////////////////////////////////////
  // SUBSCRIPTION
  ////////////////////////////////////////////////////////////

  const subscription: any = session?.user?.id
    ? await getUserSubscription(session.user.id)
    : null;

  const planName =
    subscription?.planId?.name ?? "Free";

  /*
   * AstroSubscriptionCard currently accepts:
   * "Expired" | "Active" | "Trial"
   *
   * Keep the dashboard build-safe without changing
   * the existing subscription-card contract.
   *
   * Active subscription → Active
   * Non-active / Free → Trial
   *
   * NOTE:
   * This is only a compatibility mapping for the
   * existing AstroSubscriptionCard contract.
   */
  const subscriptionStatus =
    subscription?.status === "active"
      ? "Active"
      : "Trial";

  const subscriptionExpiry =
    subscription?.expiryDate
      ? new Date(
          subscription.expiryDate
        ).toDateString()
      : "Free Plan";

  ////////////////////////////////////////////////////////////
  // USER
  ////////////////////////////////////////////////////////////

  const userName =
    session?.user?.name ||
    "Welcome back";

  ////////////////////////////////////////////////////////////
  // DASHBOARD
  ////////////////////////////////////////////////////////////

  return (
    <main className="min-h-screen bg-[#070B1A] text-white">

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          space-y-10
          px-4
          py-6
          sm:px-6
          lg:px-8
          lg:py-10
        "
      >

        //////////////////////////////////////////////////////
        // HEADER
        //////////////////////////////////////////////////////

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-gradient-to-br
            from-[#111936]
            via-[#0D142B]
            to-[#070B1A]
            p-6
            sm:p-8
            lg:p-10
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#163C80]/20
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              h-72
              w-72
              rounded-full
              bg-[#EA661B]/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#EA661B]
                "
              >
                NationPath India
              </p>

              <h1
                className="
                  mt-3
                  text-3xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                "
              >
                Welcome back, {userName} 👋
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-gray-400
                  sm:text-base
                "
              >
                Your personal NationPath space for
                news intelligence, astrology insights
                and everything that matters to you.
              </p>

            </div>

            <div
              className="
                w-full
                rounded-2xl
                border
                border-yellow-400/20
                bg-yellow-400/[0.06]
                p-5
                sm:w-auto
                sm:min-w-[190px]
              "
            >

              <p className="text-xs text-gray-500">
                Current Plan
              </p>

              <p className="mt-1 text-xl font-bold text-yellow-400">
                {planName}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {subscriptionStatus}
              </p>

            </div>

          </div>

        </section>


        //////////////////////////////////////////////////////
        // NEWS DASHBOARD
        //////////////////////////////////////////////////////

        <section>

          <div className="mb-6 flex flex-col gap-2">

            <div className="flex items-center gap-3">

              <div
                className="
                  h-8
                  w-1
                  rounded-full
                  bg-[#EA661B]
                "
              />

              <h2 className="text-2xl font-bold">
                NationPath News
              </h2>

            </div>

            <p className="pl-4 text-sm text-gray-500">
              Your daily view of the stories shaping
              India and the world.
            </p>

          </div>


          {/*
            NEWS COMPONENTS

            NewsDashboardSection internally renders:

            - NewsOverviewCard
            - NewsQuickActions
            - NewsBreakingCard
            - NewsCategoryCard
            - NewsReadingCard
          */}

          <NewsDashboardSection />

        </section>


        //////////////////////////////////////////////////////
        // DIVIDER
        //////////////////////////////////////////////////////

        <div className="h-px bg-white/10" />


        //////////////////////////////////////////////////////
        // ASTRO DASHBOARD
        //////////////////////////////////////////////////////

        <section className="space-y-8">

          <div className="flex flex-col gap-2">

            <div className="flex items-center gap-3">

              <div
                className="
                  h-8
                  w-1
                  rounded-full
                  bg-yellow-400
                "
              />

              <h2 className="text-2xl font-bold">
                NationPath Astro
              </h2>

            </div>

            <p className="pl-4 text-sm text-gray-500">
              Explore your kundali intelligence,
              planetary insights and personalized
              astrology guidance.
            </p>

          </div>


          ////////////////////////////////////////////////////
          // ASTRO HERO
          ////////////////////////////////////////////////////

          <section
            className="
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-br
              from-[#111936]
              to-[#070B1A]
              p-6
              sm:p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-yellow-400
                  "
                >
                  Astro Intelligence
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Your Cosmic Journey ✨
                </h3>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-gray-400
                  "
                >
                  Discover your kundali, planetary
                  movements, reports and personalized
                  astrology intelligence.
                </p>

              </div>


              <div
                className="
                  rounded-2xl
                  border
                  border-yellow-400/20
                  bg-yellow-400/10
                  px-6
                  py-4
                "
              >

                <p className="text-xs text-gray-500">
                  Current Plan
                </p>

                <p className="mt-1 text-xl font-bold text-yellow-400">
                  {planName}
                </p>

              </div>

            </div>

          </section>


          ////////////////////////////////////////////////////
          // ASTRO PROFILE / SCORE / SUBSCRIPTION
          ////////////////////////////////////////////////////

          <section
            className="
              grid
              gap-6
              lg:grid-cols-3
            "
          >

            <AstroProfileCard />

            <AstroScoreCard />

            <AstroSubscriptionCard
              plan={planName}
              expiry={subscriptionExpiry}
              status={subscriptionStatus}
            />

          </section>


          ////////////////////////////////////////////////////
          // ASTRO QUICK ACTIONS
          ////////////////////////////////////////////////////

          <section>

            <AstroQuickActions />

          </section>


          ////////////////////////////////////////////////////
          // ASTRO REPORT / TRANSIT
          ////////////////////////////////////////////////////

          <section
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >

            <AstroReportCard />

            <AstroTransitCard />

          </section>


          ////////////////////////////////////////////////////
          // ASTRO TIMELINE
          ////////////////////////////////////////////////////

          <section>

            <AstroTimelineCard />

          </section>

        </section>


        //////////////////////////////////////////////////////
        // FOOTER
        //////////////////////////////////////////////////////

        <section
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            px-5
            py-4
            text-center
          "
        >

          <p className="text-xs text-gray-500">
            NationPath — One India. Many Stories.
            One Journey Forward.
          </p>

        </section>

      </div>

    </main>
  );
}

