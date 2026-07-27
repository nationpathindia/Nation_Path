import TrendingTopics from "@/components/sidebar/TrendingTopics";
import TrendingNews from "@/components/sidebar/TrendingNews";
import MostRead from "@/components/sidebar/MostRead";
import SidebarAd from "@/components/sidebar/SidebarAd";
import Link from "next/link";


interface CategorySidebarProps {
  mostRead: any[];
  categoryName?: string;
}


export default function CategorySidebar({
  mostRead,
  categoryName,
}: CategorySidebarProps) {


  return (

    <aside
      className="
      space-y-10
      lg:sticky
      lg:top-24
      self-start
      "
    >


      {/* TRENDING TOPICS */}

      <TrendingTopics />



      {/* LIVE TRENDING */}

      <TrendingNews />



      {/* MOST READ */}

      <MostRead
        articles={mostRead}
      />




      {/* ============================
          ASTRO INTELLIGENCE CARD
      ============================== */}

      <section

        className="
        overflow-hidden
        rounded-2xl
        border
        border-[#D4AF37]/60
        bg-[#FAF7F1]
        shadow-sm
        "

      >


        {/* Header */}

        <div

          className="
          border-b
          border-[#D4AF37]/30
          bg-[#FFF9E8]
          px-5
          py-4
          "

        >

          <p

            className="
            text-[10px]
            uppercase
            tracking-[0.28em]
            font-bold
            text-[#8B5E00]
            "

          >

            NationPath Astro

          </p>



          <h3

            className="
            mt-2
            font-serif
            text-lg
            font-bold
            leading-tight
            text-[#4A3000]
            "

          >

            Astro Intelligence

          </h3>



          <p

            className="
            mt-2
            text-xs
            leading-relaxed
            text-[#725000]
            "

          >

            AI powered horoscope insights, Panchang & personalised guidance.

          </p>


        </div>





        {/* Feature Chips */}

        <div

          className="
          flex
          flex-wrap
          gap-2
          px-5
          py-4
          "

        >

          <span

            className="
            rounded-full
            border
            border-[#D4AF37]/40
            bg-white
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-[#6B4500]
            "

          >

            ✦ Kundli

          </span>



          <span

            className="
            rounded-full
            border
            border-[#D4AF37]/40
            bg-white
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-[#6B4500]
            "

          >

            ✦ AI Predictions

          </span>



          <span

            className="
            rounded-full
            border
            border-[#D4AF37]/40
            bg-white
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-[#6B4500]
            "

          >

            ✦ Reports

          </span>


        </div>





        {/* CTA */}

        <div

          className="
          px-5
          pb-5
          "

        >

          <Link

            href="/astro"

            className="
            flex
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#8B5E00]
            px-4
            py-2.5
            text-xs
            font-bold
            text-white
            transition
            hover:bg-[#6F4800]
            "

          >

            Explore Astro →

          </Link>


        </div>


      </section>





      {/* SIDEBAR AD */}

      <SidebarAd

        placement="category_sidebar"

      />


    </aside>

  );

}