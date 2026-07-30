import type { Metadata } from "next";

import {
  Globe,
  ShieldCheck,
  Lightbulb,
  Newspaper,
} from "lucide-react";


export const metadata: Metadata = {

  title:
    "About NationPath India | Independent Digital News Platform",


  description:
    "Learn about NationPath India, an independent digital news platform delivering credible journalism, analysis and verified information across national affairs, technology, business and global developments.",


  alternates: {
    canonical:
      "https://nationpathindia.com/about",
  },


  openGraph: {

    title:
      "About NationPath India",


    description:
      "Discover NationPath India's mission, editorial values and commitment to credible digital journalism.",


    url:
      "https://nationpathindia.com/about",


    siteName:
      "NationPath India",


    type:
      "website",

  },


  twitter: {

    card:
      "summary_large_image",


    title:
      "About NationPath India",


    description:
      "Learn about NationPath India's mission, editorial standards and commitment to responsible journalism.",

  },

};





export default function AboutPage() {

  return (

    <>



      {/* HERO */}


      <section className="mb-16 text-center">


        <h1 className="text-4xl md:text-5xl font-serif mb-6">

          About NationPath India

        </h1>



        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">

          <strong>NationPath India</strong> is an independent digital
          news platform committed to delivering credible journalism,
          meaningful analysis and responsible reporting on national,
          regional and global developments.

        </p>



        <p className="text-gray-500 mt-4">

          Operated by <strong>NationPath India</strong>

        </p>


      </section>







      {/* VISION + MISSION */}



      <section className="grid md:grid-cols-3 gap-8 mb-20">



        <div className="bg-gray-50 p-8 rounded-xl text-center">


          <Globe
            className="mx-auto mb-4 text-[#0b2a6f]"
            size={34}
          />


          <h3 className="font-semibold text-lg mb-2">

            Our Vision

          </h3>



          <p className="text-gray-600 text-sm">

            To build a trusted digital platform that informs,
            educates and empowers readers through reliable
            journalism and knowledge-driven content.

          </p>


        </div>







        <div className="bg-gray-50 p-8 rounded-xl text-center">


          <ShieldCheck
            className="mx-auto mb-4 text-[#0b2a6f]"
            size={34}
          />


          <h3 className="font-semibold text-lg mb-2">

            Editorial Integrity

          </h3>



          <p className="text-gray-600 text-sm">

            Our editorial approach focuses on accuracy,
            transparency, fairness and responsible reporting
            across every story we publish.

          </p>


        </div>







        <div className="bg-gray-50 p-8 rounded-xl text-center">


          <Lightbulb
            className="mx-auto mb-4 text-[#0b2a6f]"
            size={34}
          />


          <h3 className="font-semibold text-lg mb-2">

            Our Mission

          </h3>



          <p className="text-gray-600 text-sm">

            To provide fact-based reporting and insightful
            analysis that helps readers understand important
            issues shaping India and the world.

          </p>


        </div>



      </section>







      {/* COVERAGE */}



      <section className="mb-20">


        <h2 className="text-2xl font-serif mb-8 text-center">

          What We Cover

        </h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


          <CoverageCard title="Politics & Governance" />

          <CoverageCard title="Defence & Strategic Affairs" />

          <CoverageCard title="Technology & Innovation" />

          <CoverageCard title="Global Affairs" />


        </div>


      </section>







      {/* JOURNALISM VALUES */}



      <section className="mb-20">


        <h2 className="text-2xl font-serif mb-6">

          Responsible Journalism

        </h2>



        <p className="text-gray-600 leading-relaxed mb-6">

          NationPath India believes journalism plays an important
          role in creating informed public conversations. Our
          platform focuses on providing context, analysis and
          verified information beyond daily headlines.

        </p>



        <p className="text-gray-600 leading-relaxed">

          Content published on NationPath India follows editorial
          review processes with emphasis on accuracy, transparency
          and accountability. We remain committed to correcting
          factual errors whenever identified.

        </p>


      </section>








      {/* ORGANIZATION */}



      <section className="border-t pt-10">


        <h2 className="text-xl font-serif mb-4">

          Organization

        </h2>



        <p className="text-gray-600">

          NationPath India is an independent digital media initiative
          focused on building credible journalism platforms and
          delivering meaningful content experiences for readers.

        </p>


      </section>




    </>

  );

}






function CoverageCard({

  title,

}: {

  title:string;

}) {


  return (

    <div
      className="
        bg-white
        border
        p-6
        rounded-lg
        text-center
        hover:shadow-md
        transition
      "
    >


      <Newspaper
        className="mx-auto mb-3 text-[#0b2a6f]"
        size={28}
      />



      <p className="font-medium">

        {title}

      </p>


    </div>

  );

}