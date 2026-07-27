//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAMILY CENTER
//
// Family Astrology Management
//
// Future:
// - Multiple Profiles
// - Child Astrology
// - Relationship Analysis
// - Kids Platform Integration
//////////////////////////////////////////////////////////////

import {
  Users,
  Plus,
  CalendarDays,
  MapPin,
  Sparkles,
  Heart,
} from "lucide-react";



const familyMembers = [
  {
    name: "Rahul Sharma",
    relation: "Self",
    dob: "15 August 1990",
    place: "Vadodara, India",
  },
  {
    name: "Priya Sharma",
    relation: "Spouse",
    dob: "22 March 1992",
    place: "Ahmedabad, India",
  },
  {
    name: "Aarav Sharma",
    relation: "Child",
    dob: "10 January 2020",
    place: "Vadodara, India",
  },
];



export default function AstroFamilyPage(){


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
              flex
              items-center
              gap-3
              text-3xl
              font-bold
              "
            >

              <Users
                className="text-yellow-400"
              />

              Family Astrology

            </h1>


            <p
              className="
              mt-2
              text-gray-400
              "
            >
              Manage astrology profiles for your family members.
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

            Add Member

          </button>



        </div>


      </section>







      {/* Family Cards */}

      <section>


        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          "
        >



          {
            familyMembers.map((member)=>(


              <div
                key={member.name}
                className="
                rounded-3xl
                border
                border-white/10
                bg-[#10152f]
                p-6
                "
              >


                <div
                  className="
                  flex
                  items-center
                  justify-between
                  "
                >


                  <div
                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400
                    text-xl
                    font-bold
                    text-black
                    "
                  >

                    {member.name.charAt(0)}

                  </div>



                  <span
                    className="
                    rounded-full
                    bg-yellow-400/10
                    px-3
                    py-1
                    text-xs
                    text-yellow-400
                    "
                  >

                    {member.relation}

                  </span>


                </div>






                <h2
                  className="
                  mt-5
                  text-lg
                  font-bold
                  "
                >
                  {member.name}
                </h2>





                <div
                  className="
                  mt-4
                  space-y-2
                  text-sm
                  text-gray-400
                  "
                >


                  <p
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >

                    <CalendarDays size={15}/>

                    {member.dob}

                  </p>




                  <p
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >

                    <MapPin size={15}/>

                    {member.place}

                  </p>


                </div>





                <button
                  className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  py-3
                  text-sm
                  hover:bg-white/10
                  "
                >

                  <Sparkles size={16}/>

                  View Kundali

                </button>




              </div>


            ))
          }



        </div>


      </section>








      {/* Compatibility Feature */}

      <section
        className="
        rounded-3xl
        border
        border-yellow-400/20
        bg-gradient-to-r
        from-yellow-400/10
        to-transparent
        p-8
        "
      >


        <div
          className="
          flex
          items-center
          gap-3
          "
        >


          <Heart
            className="text-yellow-400"
          />


          <div>

            <h2
              className="
              font-bold
              "
            >
              Family Compatibility Intelligence
            </h2>


            <p
              className="
              mt-2
              text-sm
              text-gray-400
              "
            >
              Understand family relationships through
              astrology insights.
            </p>


          </div>


        </div>


      </section>



    </div>

  );

}