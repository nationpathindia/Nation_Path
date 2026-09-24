import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="
        flex
        items-center
        gap-3
        md:gap-4
        group
      "
    >
      <div
        className="
          relative
          w-11
          h-11
          md:w-14
          md:h-14
          shrink-0
        "
      >
        <img
          src="/idlogo.png"
          alt="Nation Path India"
          width={56}
          height={56}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="
            h-full
            w-full
            object-contain
          "
        />
      </div>

      <div
        className="
          flex
          flex-col
          leading-none
        "
      >
        <span
          className="
            font-serif
            text-xl
            md:text-3xl
            font-bold
            tracking-tight
            text-[var(--news-navy)]
            group-hover:text-[var(--news-orange)]
            transition-colors
            duration-300
          "
        >
          Nation Path
        </span>

        <span
          className="
            mt-2
            text-[9px]
            md:text-[11px]
            uppercase
            tracking-[0.28em]
            text-[var(--news-muted)]
            whitespace-nowrap
          "
        >
          Insight • Truth • Global View
        </span>
      </div>
    </Link>
  );
}

