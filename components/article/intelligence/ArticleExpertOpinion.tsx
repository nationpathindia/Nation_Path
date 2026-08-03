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
  if (!Array.isArray(expertOpinion) || expertOpinion.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      {expertOpinion.map((expert, index) => (
        <article
          key={`${expert.name}-${index}`}
          className="
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
          "
        >
          <div className="mb-3">
            <h4
              className="
                text-base
                font-semibold
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
                  text-gray-500
                "
              >
                {expert.designation}
              </p>
            )}
          </div>

          <p
            className="
              text-sm
              leading-7
              text-gray-700
            "
          >
            {expert.opinion}
          </p>
        </article>
      ))}
    </div>
  );
}