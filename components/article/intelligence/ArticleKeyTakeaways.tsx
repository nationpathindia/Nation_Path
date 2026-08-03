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
    <ul
      className="
        space-y-3
      "
    >
      {keyTakeaways.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="
            flex
            gap-3
            text-base
            leading-7
            text-gray-700
          "
        >
          <span
            className="
              mt-2
              h-2
              w-2
              shrink-0
              rounded-full
              bg-[#163C80]
            "
          />

          <span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}