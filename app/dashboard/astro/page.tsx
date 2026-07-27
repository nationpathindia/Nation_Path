import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserSubscription } from "@/lib/subscription";

import AstroSubscriptionCard from "@/components/astro/dashboard/AstroSubscriptionCard";
import AstroProfileCard from "@/components/astro/dashboard/AstroProfileCard";
import AstroScoreCard from "@/components/astro/dashboard/AstroScoreCard";
import AstroReportCard from "@/components/astro/dashboard/AstroReportCard";
import AstroTimelineCard from "@/components/astro/dashboard/AstroTimelineCard";
import AstroTransitCard from "@/components/astro/dashboard/AstroTransitCard";
import AstroQuickActions from "@/components/astro/dashboard/AstroQuickActions";

export default async function AstroDashboardPage() {

  const session = await getServerSession(authOptions);
console.log("DASH SESSION", session);

  const subscription:any =
    session?.user?.id
    ?
    await getUserSubscription(session.user.id)
    :
    null;



  const planName =
    subscription?.planId?.name ?? "Free";

  return (

    <div className="space-y-8">


      <section
        className="
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-[#111936]
        to-[#070B1A]
        p-8
        "
      >

        <div
          className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
          "
        >

          <div>

            <h1 className="text-3xl font-bold">
              Your Cosmic Journey ✨
            </h1>


            <p className="mt-2 max-w-xl text-gray-400">
              Explore your kundali intelligence,
              planetary insights and personalized
              astrology guidance.
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

            <p className="text-xs text-gray-400">
              Current Plan
            </p>


            <h3
              className="
              mt-1
              text-xl
              font-bold
              text-yellow-400
              "
            >
              {planName}
            </h3>

          </div>


        </div>

      </section>




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

  expiry={
    subscription?.expiryDate
    ? new Date(subscription.expiryDate).toDateString()
    : "Free Plan"
  }

  status={
    subscription?.status === "active"
    ? "Active"
    : "Trial"
  }

/>


      </section>





      <section>

        <AstroQuickActions />

      </section>





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





      <section>

        <AstroTimelineCard />

      </section>



    </div>

  );

}