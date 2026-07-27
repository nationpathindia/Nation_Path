import { notFound, redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  canAccessFeature,
} from "@/lib/subscription";

import {
  getFeatureByKey,
} from "@/lib/subscription/feature.service";


import {
  generateCareerReport,
} from "@/lib/astro/reports/career";



export const dynamic = "force-dynamic";



export default async function AstroReportDetailPage({

  params,

}: {

  params: Promise<{
    slug: string;
  }>;

}) {


//////////////////////////////////////////////////////
// AUTH
//////////////////////////////////////////////////////

console.time("⏱ AUTH");

const session =
  await getServerSession(authOptions);

console.timeEnd("⏱ AUTH");


const userId =
  session?.user?.id;


console.log(
  "AUTH USER:",
  userId
);



if (!userId) {

  redirect("/login");

}

  //////////////////////////////////////////////////////
  // SLUG
  //////////////////////////////////////////////////////

  const { slug } =
    await params;




//////////////////////////////////////////////////////
// FEATURE CHECK
//////////////////////////////////////////////////////

console.time("⏱ FEATURE QUERY");

const feature =
  await getFeatureByKey(slug);

console.timeEnd("⏱ FEATURE QUERY");


console.log(
  "FEATURE RESULT:",
  feature?.name || "NOT FOUND"
);



if (!feature) {

  notFound();

}

//////////////////////////////////////////////////////
// SUBSCRIPTION ACCESS
//////////////////////////////////////////////////////

console.time("⏱ ACCESS CHECK");


const hasAccess =
  await canAccessFeature(
    userId,
    slug
  );


console.timeEnd("⏱ ACCESS CHECK");


console.log(
  "ACCESS:",
  hasAccess
);



if (!hasAccess) {

  redirect(
    "/dashboard/astro/subscription"
  );

}

//////////////////////////////////////////////////////
// REPORT GENERATION
//////////////////////////////////////////////////////

let report = null;



switch (slug) {


case "career":


console.time("⏱ CAREER GENERATOR");


report =
  await generateCareerReport({

    horoscopeDate:
      new Date(),

    language:
      "english",

  });


console.timeEnd("⏱ CAREER GENERATOR");



console.log(
  "CAREER REPORT GENERATED:",
  !!report
);


break;



default:

break;


}

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="space-y-6">



      <h1 className="text-3xl font-bold">

        {feature.name}

      </h1>





      <div

        className="
        rounded-3xl
        border
        border-white/10
        bg-[#10152f]
        p-8
        "

      >



        <h2 className="text-xl font-bold">

          {feature.name}

        </h2>




        <p className="mt-3 text-gray-400">

          {feature.description ||
            "Premium report generation active."}

        </p>






        {report && (

          <div className="mt-8 space-y-6">



            <div>


              <h3 className="text-2xl font-bold">

                Career Report

              </h3>



              <p className="mt-3 text-gray-300">

                {
                  report.intelligence
                    ?.interpretation ||
                  "Career analysis generated."
                }

              </p>


            </div>







            {
              report.intelligence?.professions?.length > 0 && (

                <div>


                  <h4 className="font-bold">

                    Suitable Professions

                  </h4>




                  <div className="mt-3 flex flex-wrap gap-2">


                    {
                      report.intelligence.professions.map(

                        (
                          item,
                          index
                        ) => (


                          <span

                            key={index}

                            className="
                            rounded-full
                            bg-white/10
                            px-4
                            py-2
                            text-sm
                            "

                          >

                            {item}

                          </span>


                        )

                      )
                    }


                  </div>


                </div>

              )
            }








            {
              report.intelligence?.remedies && (

                <div>


                  <h4 className="font-bold">

                    Remedies

                  </h4>



                  <p className="mt-3 text-gray-300">

                    {
                      report.intelligence.remedies
                    }

                  </p>



                </div>

              )
            }





          </div>

        )}



      </div>



    </div>

  );

}