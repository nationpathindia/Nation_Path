// components/ZodiacIcon.tsx

import Image from "next/image";

interface Props {
  sign?: string | null;
  className?: string;
}

export default function ZodiacIcon({ sign, className = "" }: Props) {
  const normalized =
    sign?.trim()
      ? sign.trim().toLowerCase()
      : "aries";

  return (
    <div
      className={`
        relative
        w-20 h-20 md:w-24 md:h-24
        mx-auto
        transition-all duration-500
        group-hover:scale-110
        group-hover:-translate-y-1
        ${className}
      `}
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0
          rounded-full
          bg-gradient-to-br
          from-blue-500/10
          via-indigo-500/10
          to-blue-700/10
          blur-xl
          scale-125
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
        "
      />

      {/* Icon Container */}
      <div
        className="
          relative
          w-full
          h-full
          rounded-full
          bg-white
          border
          border-gray-100
          shadow-md
          group-hover:shadow-2xl
          transition-all
          duration-500
          flex
          items-center
          justify-center
        "
      >
        <Image
          src={`/zodiac/${normalized}.png`}
          alt={normalized}
          fill
          sizes="96px"
          className="
            object-contain
            p-3
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>
    </div>
  );
}