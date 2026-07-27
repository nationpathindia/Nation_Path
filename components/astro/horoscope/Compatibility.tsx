interface Props {
  compatibleSigns?: string[] | null;
  avoidSigns?: string[] | null;
}


export default function Compatibility({
  compatibleSigns,
  avoidSigns,
}: Props) {


  const positiveSigns =
    compatibleSigns && compatibleSigns.length > 0
      ? compatibleSigns
      : [
          "Taurus",
          "Cancer",
          "Virgo",
        ];


  const challengingSigns =
    avoidSigns && avoidSigns.length > 0
      ? avoidSigns
      : [
          "Scorpio",
          "Aquarius",
        ];



  return (

    <section
      aria-labelledby="compatibility-heading"
      className="my-14"
    >

      <div
        className="
          rounded-3xl
          border
          border-purple-200
          bg-gradient-to-br
          from-purple-50
          via-white
          to-indigo-50
          p-8
          md:p-10
        "
      >


        <div className="text-center mb-10">


          <span
            className="
              inline-flex
              rounded-full
              bg-purple-100
              px-4
              py-2
              text-sm
              font-semibold
              text-purple-700
            "
          >
            Zodiac Connection
          </span>


          <h2
            id="compatibility-heading"
            className="
              mt-4
              font-serif
              text-3xl
              text-[#0b2a6f]
              md:text-4xl
            "
          >
            Zodiac Compatibility
          </h2>


          <p
            className="
              mt-3
              text-gray-600
            "
          >
            Explore signs that naturally align with today's cosmic energy.
          </p>


        </div>




        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >


          <CompatibilityCard
            title="Most Compatible"
            description="Signs bringing harmony, understanding and positive energy."
            signs={positiveSigns}
            emoji="💞"
            positive
          />


          <CompatibilityCard
            title="Be Mindful With"
            description="Signs requiring patience and better communication."
            signs={challengingSigns}
            emoji="⚖️"
          />


        </div>



      </div>


    </section>

  );
}





function CompatibilityCard({
  title,
  description,
  signs,
  emoji,
  positive = false,
}:{
  title:string;
  description:string;
  signs:string[];
  emoji:string;
  positive?:boolean;
}) {


  return (

    <div
      className={`
        rounded-2xl
        border
        p-6
        ${
          positive
            ? "border-emerald-200 bg-emerald-50"
            : "border-orange-200 bg-orange-50"
        }
      `}
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <span className="text-3xl">
          {emoji}
        </span>


        <h3
          className="
            text-xl
            font-bold
            text-[#0b2a6f]
          "
        >
          {title}
        </h3>


      </div>



      <p
        className="
          mt-4
          text-sm
          leading-6
          text-gray-600
        "
      >
        {description}
      </p>



      <div
        className="
          mt-6
          flex
          flex-wrap
          gap-3
        "
      >

        {
          signs.map((sign)=>(

            <span
              key={sign}
              className="
                rounded-full
                border
                border-white
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-[#0b2a6f]
                shadow-sm
              "
            >
              {sign}
            </span>

          ))
        }

      </div>


    </div>

  );

}