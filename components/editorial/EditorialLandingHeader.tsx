"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EditorialLandingHeaderProps {
  description?: string;
}

export default function EditorialLandingHeader({
  description = "Deep analysis, context and perspectives behind the stories shaping India and the world.",
}: EditorialLandingHeaderProps) {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mb-8 border-b border-gray-200 pb-7"
    >
      <div className="flex items-center gap-3">
        {/* BRAND ICON */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#163C80]
            text-white
          "
        >
          <Sparkles size={18} />
        </div>

        {/* BRAND */}
        <div>
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#EA661B]
            "
          >
            NationPath
          </p>

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-[#163C80]
              sm:text-3xl
            "
          >
            Insight
          </h1>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          max-w-3xl
          text-sm
          leading-6
          text-gray-600
          sm:text-base
        "
      >
        {description}
      </p>
    </motion.header>
  );
}