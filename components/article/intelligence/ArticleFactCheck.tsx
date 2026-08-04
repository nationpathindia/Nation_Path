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

  if (
    !Array.isArray(factCheck) ||
    factCheck.length === 0
  ) {
    return null;
  }

  function getStatus(status: string) {

    const value = status.toLowerCase();

    if (
      value.includes("true") ||
      value.includes("verified") ||
      value.includes("confirmed")
    ) {
      return {
        icon: "✓",
        label: "Verified",
        badge:
          "bg-green-50 text-green-700 border-green-200",
        border:
          "border-l-green-500",
      };
    }

    if (
      value.includes("false") ||
      value.includes("wrong")
    ) {
      return {
        icon: "✕",
        label: "False",
        badge:
          "bg-red-50 text-red-700 border-red-200",
        border:
          "border-l-red-500",
      };
    }

    if (
      value.includes("partial")
    ) {
      return {
        icon: "!",
        label: "Partly True",
        badge:
          "bg-amber-50 text-amber-700 border-amber-200",
        border:
          "border-l-amber-500",
      };
    }

    return {
      icon: "•",
      label: status,
      badge:
        "bg-gray-50 text-[#163C80] border-gray-200",
      border:
        "border-l-[#163C80]",
    };

  }

  return (

    <div className="space-y-5">

      {factCheck.map((item, index) => {

        const status = getStatus(item.status);

        return (

          <article
            key={`${item.claim}-${index}`}
            className={`
              rounded-2xl
              border
              border-l-4
              ${status.border}
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
            `}
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex-1">

                <p
                  className="
                    mb-2
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-gray-400
                  "
                >
                  Fact Check
                </p>

                <h4
                  className="
                    text-base
                    font-semibold
                    leading-7
                    text-gray-900
                  "
                >
                  {item.claim}
                </h4>

              </div>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  ${status.badge}
                `}
              >
                <span>{status.icon}</span>
                {status.label}
              </span>

            </div>

            {item.explanation && (

              <div
                className="
                  mt-5
                  rounded-xl
                  bg-gray-50
                  p-4
                "
              >
                <p
                  className="
                    text-sm
                    leading-7
                    text-gray-700
                  "
                >
                  {item.explanation}
                </p>
              </div>

            )}

          </article>

        );

      })}

    </div>

  );

}