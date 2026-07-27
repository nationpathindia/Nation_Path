"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Quick Actions Component
//////////////////////////////////////////////////////////////

import {
  PlusCircle,
  FileText,
  Sparkles,
  UserRound,
  ArrowRight,
} from "lucide-react";


interface ActionItem {

  title: string;

  description: string;

  icon: React.ReactNode;

}


interface AstroQuickActionsProps {

  actions?: ActionItem[];

}



export default function AstroQuickActions({

  actions = [

    {
      title: "Add Astro Profile",
      description:
        "Create family member astrology profile",
      icon: <UserRound size={22}/>,
    },

    {
      title: "Generate Report",
      description:
        "Create personalized intelligence report",
      icon: <FileText size={22}/>,
    },

    {
      title: "View Kundali",
      description:
        "Explore your birth chart",
      icon: <Sparkles size={22}/>,
    },

    {
      title: "Upgrade Premium",
      description:
        "Unlock advanced astrology features",
      icon: <PlusCircle size={22}/>,
    },

  ],

}: AstroQuickActionsProps) {



  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-950
        p-6
        shadow-lg
      "
    >


      <div
        className="
          mb-6
        "
      >

        <h2
          className="
            text-lg
            font-semibold
            text-white
          "
        >

          Quick Actions

        </h2>


        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >

          Manage your Astro experience

        </p>


      </div>




      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >


        {
          actions.map(
            (action)=>(

              <button

                key={action.title}

                className="
                  group
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-5
                  text-left
                  transition
                  hover:border-yellow-500/40
                  hover:bg-slate-800
                "

              >


                <div
                  className="
                    mb-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-yellow-500/10
                    text-yellow-400
                    transition
                    group-hover:bg-yellow-500/20
                  "
                >

                  {action.icon}

                </div>




                <h3
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-white
                  "
                >

                  {action.title}

                  <ArrowRight
                    size={14}
                    className="
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  />

                </h3>




                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-400
                  "
                >

                  {action.description}

                </p>



              </button>


            )
          )
        }


      </div>


    </section>

  );

}