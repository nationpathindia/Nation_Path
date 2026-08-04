interface ArticleKeyTakeawaysProps {
  keyTakeaways: string[];
}

export default function ArticleKeyTakeaways({
  keyTakeaways,
}: ArticleKeyTakeawaysProps) {

  if (
    !Array.isArray(keyTakeaways) ||
    keyTakeaways.length === 0
  ) {
    return null;
  }

  return (

    <div
      className="
        grid
        gap-4
        md:grid-cols-2
      "
    >

      {keyTakeaways.map((item, index) => (

        <div
          key={`${item}-${index}`}
          className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-gray-100
            bg-gradient-to-br
            from-white
            to-[#FAFAFB]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >

          <div
            className="
              mt-1
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#163C80]
              text-sm
              font-bold
              text-white
            "
          >
            ✓
          </div>

          <div>

            <p
              className="
                text-[15px]
                leading-7
                text-gray-800
              "
            >
              {item}
            </p>

          </div>

        </div>

      ))}

    </div>

  );

}