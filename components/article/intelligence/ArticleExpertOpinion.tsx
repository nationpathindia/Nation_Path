interface ExpertOpinionItem {
  name: string;
  designation?: string;
  opinion: string;
}

interface ArticleExpertOpinionProps {
  expertOpinion: ExpertOpinionItem[];
}

export default function ArticleExpertOpinion({
  expertOpinion,
}: ArticleExpertOpinionProps) {

  if (
    !Array.isArray(expertOpinion) ||
    expertOpinion.length === 0
  ) {
    return null;
  }

  return (

    <div className="space-y-6">

      {expertOpinion.map((expert, index) => (

        <article
          key={`${expert.name}-${index}`}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-gradient-to-br
            from-white
            to-[#FAFAFB]
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >

          {/* Decorative Quote */}

          <div
            className="
              absolute
              right-6
              top-2
              select-none
              text-7xl
              font-serif
              leading-none
              text-[#163C80]/6
            "
          >
            “
          </div>

          <div className="relative z-10">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#163C80]
                  text-lg
                  font-bold
                  text-white
                "
              >
                {expert.name.charAt(0).toUpperCase()}
              </div>

              <div>

                <h4
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  {expert.name}
                </h4>

                {expert.designation && (

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-[#EA661B]
                    "
                  >
                    {expert.designation}
                  </p>

                )}

              </div>

            </div>

            <blockquote
              className="
                mt-6
                border-l-4
                border-[#EA661B]
                pl-5
                text-[15px]
                leading-8
                italic
                text-gray-700
              "
            >
              {expert.opinion}
            </blockquote>

          </div>

        </article>

      ))}

    </div>

  );
}