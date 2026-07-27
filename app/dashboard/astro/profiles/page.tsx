//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PROFILE PAGE
//
// User Astrology Profile Management
//
// Future:
// - Multiple profiles
// - Family profiles
// - Kundali generation
//////////////////////////////////////////////////////////////

import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Sparkles,
  Plus,
} from "lucide-react";


export default function AstroProfilesPage(){

  return (

    <div
      className="
      space-y-8
      "
    >


      {/* Header */}

      <section>

        <div
          className="
          flex
          items-center
          justify-between
          "
        >

          <div>

            <h1
              className="
              text-3xl
              font-bold
              "
            >
              Astro Profiles
            </h1>


            <p
              className="
              mt-2
              text-gray-400
              "
            >
              Manage your birth details and astrology profiles.
            </p>


          </div>



          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-yellow-400
            px-5
            py-3
            font-semibold
            text-black
            "
          >

            <Plus size={18}/>

            Add Profile

          </button>


        </div>


      </section>







      {/* Profile Card */}

      <section
        className="
        rounded-3xl
        border
        border-white/10
        bg-[#10152f]
        p-8
        "
      >


        <div
          className="
          flex
          items-center
          gap-5
          "
        >

          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-yellow-400
            text-3xl
            font-bold
            text-black
            "
          >

            R

          </div>


          <div>

            <h2
              className="
              text-xl
              font-bold
              "
            >
              Rahul Sharma
            </h2>


            <p
              className="
              text-sm
              text-gray-400
              "
            >
              Primary Astrology Profile
            </p>


          </div>


        </div>






        {/* Details */}


        <div
          className="
          mt-8
          grid
          gap-5
          md:grid-cols-3
          "
        >


          <InfoCard
            icon={<CalendarDays size={20}/>}
            title="Date of Birth"
            value="15 August 1990"
          />


          <InfoCard
            icon={<Clock size={20}/>}
            title="Birth Time"
            value="10:30 AM"
          />


          <InfoCard
            icon={<MapPin size={20}/>}
            title="Birth Place"
            value="Vadodara, India"
          />


        </div>



      </section>






      {/* Future Intelligence */}


      <section
        className="
        rounded-3xl
        border
        border-yellow-400/20
        bg-yellow-400/10
        p-6
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <Sparkles
            className="text-yellow-400"
          />


          <p>
            Complete your profile to unlock deeper
            astrology intelligence.
          </p>


        </div>


      </section>



    </div>

  );

}





function InfoCard({

  icon,
  title,
  value,

}:{

  icon: React.ReactNode;
  title:string;
  value:string;

}){


  return (

    <div
      className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      p-5
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        text-yellow-400
        "
      >

        {icon}

        <span>
          {title}
        </span>

      </div>


      <p
        className="
        mt-3
        font-semibold
        "
      >
        {value}
      </p>


    </div>

  );


}