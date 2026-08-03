interface FactCheckItem {
  claim: string;
  status: string;
  explanation?: string;
}

interface ArticleFactCheckProps {
  factCheck: FactCheckItem[];
}

export default function ArticleFactCheck({
  factCheck,
}: ArticleFactCheckProps) {
  if (!Array.isArray(factCheck) || factCheck.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      {factCheck.map((item, index) => (
        <article
          key={`${item.claim}-${index}`}
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
          "
        >
          <div
            className="
              mb-3
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <h4
              className="
                text-base
                font-semibold
                text-gray-900
              "
            >
              {item.claim}
            </h4>

            <span
              className="
                shrink-0
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-xs
                font-medium
                text-[#163C80]
              "
            >
              {item.status}
            </span>
          </div>

          {item.explanation && (
            <p
              className="
                text-sm
                leading-7
                text-gray-600
              "
            >
              {item.explanation}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}