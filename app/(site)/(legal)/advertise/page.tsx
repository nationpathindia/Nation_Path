import type { Metadata } from "next";

import {
  Megaphone,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";


export const metadata: Metadata = {

  title:
    "Advertise With NationPath India | Digital Advertising & Brand Partnerships",


  description:
    "Partner with NationPath India for digital advertising opportunities, premium placements, brand campaigns and audience reach across news, technology, business and knowledge platforms.",


  alternates: {
    canonical:
      "https://nationpathindia.com/advertise",
  },


  openGraph: {

    title:
      "Advertise With NationPath India",


    description:
      "Explore advertising opportunities with NationPath India including premium placements, brand partnerships and digital visibility solutions.",


    url:
      "https://nationpathindia.com/advertise",


    siteName:
      "NationPath India",


    type:
      "website",

  },


  twitter: {

    card:
      "summary_large_image",


    title:
      "Advertise With NationPath India",


    description:
      "Connect with NationPath India for digital advertising campaigns, partnerships and premium audience reach.",

  },

};





export default function AdvertisePage() {


  return (

    <>


      {/* HEADER */}


      <section className="text-center mb-16">


        <h1 className="text-4xl md:text-5xl font-serif mb-6">

          Advertise With NationPath India

        </h1>



        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">

          Reach an engaged audience through NationPath India's
          digital platforms covering news, national affairs,
          technology, business, analysis and knowledge-based content.
          We provide strategic advertising opportunities designed
          for meaningful brand visibility.

        </p>


      </section>







      {/* WHY ADVERTISE */}


      <section className="grid md:grid-cols-3 gap-8 mb-20">



        <div className="border rounded-xl p-8 text-center">


          <BarChart3
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3 className="font-semibold text-lg mb-2">

            Targeted Audience

          </h3>



          <p className="text-gray-600 text-sm leading-relaxed">

            Connect with readers interested in current affairs,
            technology, business, defence, policy and emerging
            digital trends.

          </p>


        </div>







        <div className="border rounded-xl p-8 text-center">


          <LayoutDashboard
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3 className="font-semibold text-lg mb-2">

            Premium Placements

          </h3>



          <p className="text-gray-600 text-sm leading-relaxed">

            Showcase your brand through premium placements
            across homepage, articles, categories and digital
            content experiences.

          </p>


        </div>







        <div className="border rounded-xl p-8 text-center">


          <Megaphone
            className="mx-auto text-[#0b2a6f] mb-4"
            size={32}
          />


          <h3 className="font-semibold text-lg mb-2">

            Brand Visibility

          </h3>



          <p className="text-gray-600 text-sm leading-relaxed">

            Promote products, services and campaigns with
            focused digital visibility among NationPath India
            readers.

          </p>


        </div>



      </section>








      {/* AD PLACEMENTS */}



      <section className="mb-20">



        <h2 className="text-3xl font-serif mb-10 text-center">

          Available Advertising Placements

        </h2>




        <div className="grid md:grid-cols-3 gap-8">





          <div className="border rounded-xl p-8">


            <h3 className="font-semibold text-lg mb-2">

              Homepage Banner

            </h3>


            <p className="text-sm text-gray-600 mb-3">

              High visibility placement designed for maximum
              homepage exposure.

            </p>


            <p className="text-sm font-semibold text-[#0b2a6f]">

              Size: 970 × 90

            </p>


          </div>







          <div className="border rounded-xl p-8">


            <h3 className="font-semibold text-lg mb-2">

              Article Banner

            </h3>


            <p className="text-sm text-gray-600 mb-3">

              Strategic placement inside article pages for
              stronger reader engagement.

            </p>


            <p className="text-sm font-semibold text-[#0b2a6f]">

              Size: 728 × 90

            </p>


          </div>







          <div className="border rounded-xl p-8">


            <h3 className="font-semibold text-lg mb-2">

              Sidebar Advertisement

            </h3>


            <p className="text-sm text-gray-600 mb-3">

              Display your brand across articles and category
              pages with consistent visibility.

            </p>


            <p className="text-sm font-semibold text-[#0b2a6f]">

              Size: 300 × 250

            </p>


          </div>




        </div>



      </section>









      {/* CONTACT */}



      <section className="bg-gray-50 rounded-xl p-12 text-center">



        <h2 className="text-3xl font-serif mb-4">

          Start Your Advertising Campaign

        </h2>



        <p className="text-gray-600 mb-6 leading-relaxed">

          To discuss advertising opportunities, partnerships
          or request a media kit, contact the NationPath India
          advertising team.

        </p>




        <a

          href="mailto:advertise@nationpathindia.com"

          className="
            inline-block
            bg-[#0b2a6f]
            text-white
            px-8
            py-3
            rounded-lg
            hover:bg-[#081f4f]
            transition
          "

        >

          Contact Advertising Team

        </a>



      </section>



    </>

  );

}