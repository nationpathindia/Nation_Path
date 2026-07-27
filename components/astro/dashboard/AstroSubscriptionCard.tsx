"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO USER DASHBOARD
// Subscription Card
//////////////////////////////////////////////////////////////

type AstroSubscriptionCardProps = {
  userName?: string;
  plan?: string;
  expiry?: string;
  status?: "Active" | "Expired" | "Trial";
};


export default function AstroSubscriptionCard({
  userName = "Astro User",
  plan = "Premium Plan",
  expiry = "31 December 2026",
  status = "Active",
}: AstroSubscriptionCardProps) {


  return (

    <section
      className="
      rounded-3xl
      border
      border-yellow-400/20
      bg-gradient-to-br
      from-[#17120A]
      via-[#0B1026]
      to-[#070B1A]
      p-6
      shadow-xl
      "
    >


      {/* Header */}

      <div
        className="
        flex
        items-start
        justify-between
        gap-4
        "
      >

        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-wider
            text-gray-400
            "
          >
            Astro Membership
          </p>


          <h2
            className="
            mt-2
            text-2xl
            font-bold
            text-white
            "
          >
            {userName}
          </h2>


          <p
            className="
            mt-1
            text-sm
            text-yellow-400
            "
          >
            {plan}
          </p>


        </div>



        <span
          className="
          rounded-full
          border
          border-green-400/30
          bg-green-400/10
          px-4
          py-1
          text-xs
          font-medium
          text-green-400
          "
        >
          {status}
        </span>


      </div>



      {/* Details */}

      <div
        className="
        mt-6
        grid
        grid-cols-2
        gap-4
        "
      >


        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          "
        >

          <p
            className="
            text-xs
            text-gray-400
            "
          >
            Plan Valid Till
          </p>


          <p
            className="
            mt-2
            text-sm
            font-semibold
            text-white
            "
          >
            {expiry}
          </p>

        </div>



        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          "
        >

          <p
            className="
            text-xs
            text-gray-400
            "
          >
            Benefits
          </p>


          <p
            className="
            mt-2
            text-sm
            font-semibold
            text-white
            "
          >
            Reports + Guidance
          </p>

        </div>


      </div>



      {/* Action */}

      <button
        className="
        mt-6
        w-full
        rounded-xl
        bg-yellow-400
        py-3
        text-sm
        font-semibold
        text-black
        transition
        hover:bg-yellow-300
        "
      >
        Manage Subscription
      </button>



    </section>

  );

}