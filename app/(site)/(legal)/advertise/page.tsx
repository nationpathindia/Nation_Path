import { Megaphone, LayoutDashboard, FileText, BarChart3 } from "lucide-react";

export default function AdvertisePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">

      {/* HEADER */}

      <section className="text-center mb-16">

        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Advertise With Nation Path
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto">
          Reach a highly engaged audience across politics, defence,
          technology and global affairs. Nation Path offers strategic
          advertising placements designed to maximize visibility and
          brand impact.
        </p>

      </section>


      {/* WHY ADVERTISE */}

      <section className="grid md:grid-cols-3 gap-8 mb-20">

        <div className="border rounded-xl p-8 text-center">

          <BarChart3 className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            Targeted Audience
          </h3>

          <p className="text-gray-600 text-sm">
            Reach readers interested in national affairs, policy,
            defence, technology and global developments.
          </p>

        </div>


        <div className="border rounded-xl p-8 text-center">

          <LayoutDashboard className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            Premium Placements
          </h3>

          <p className="text-gray-600 text-sm">
            Showcase your brand with premium ad placements
            across homepage, articles and category pages.
          </p>

        </div>


        <div className="border rounded-xl p-8 text-center">

          <Megaphone className="mx-auto text-[#0b2a6f] mb-4" size={32} />

          <h3 className="font-semibold text-lg mb-2">
            Brand Visibility
          </h3>

          <p className="text-gray-600 text-sm">
            Promote products, services or campaigns with
            high visibility across our growing readership.
          </p>

        </div>

      </section>


      {/* AD PLACEMENTS */}

      <section className="mb-20">

        <h2 className="text-3xl font-serif mb-10 text-center">
          Available Advertising Placements
        </h2>

        <div className="grid md:grid-cols-3 gap-8">


          {/* HOMEPAGE */}

          <div className="border rounded-xl p-8">

            <h3 className="font-semibold text-lg mb-2">
              Homepage Banner
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              High visibility banner displayed on the homepage.
            </p>

            <p className="text-sm font-semibold text-[#0b2a6f]">
              Size: 970 × 90
            </p>

          </div>


          {/* ARTICLE */}

          <div className="border rounded-xl p-8">

            <h3 className="font-semibold text-lg mb-2">
              Article Banner
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Ads displayed within article pages for
              strong reader engagement.
            </p>

            <p className="text-sm font-semibold text-[#0b2a6f]">
              Size: 728 × 90
            </p>

          </div>


          {/* SIDEBAR */}

          <div className="border rounded-xl p-8">

            <h3 className="font-semibold text-lg mb-2">
              Sidebar Advertisement
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Sidebar placements across article and category pages.
            </p>

            <p className="text-sm font-semibold text-[#0b2a6f]">
              Size: 300 × 250
            </p>

          </div>

        </div>

      </section>


      {/* CONTACT ADVERTISING */}

      <section className="bg-gray-50 rounded-xl p-12 text-center">

        <h2 className="text-3xl font-serif mb-4">
          Start Your Advertising Campaign
        </h2>

        <p className="text-gray-600 mb-6">
          To discuss advertising opportunities or request a media kit,
          contact our advertising team.
        </p>

        <a
          href="mailto:advertise@nationpathindia.com"
          className="inline-block bg-[#0b2a6f] text-white px-8 py-3 rounded-lg hover:bg-[#081f4f] transition"
        >
          Contact Advertising Team
        </a>

      </section>

    </main>
  );
}