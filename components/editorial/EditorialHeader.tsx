"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";

interface EditorialHeaderProps {
  article: any;
  readingTime: number;
}

export default function EditorialHeader({
  article,
  readingTime,
}: EditorialHeaderProps) {
  /*
  |--------------------------------------------------------------------------
  | AUTHOR / SOURCE
  |--------------------------------------------------------------------------
  */

  const author =
  article.authorName ||
  article.sourceDesk ||
  "NationPath Editorial | G. Prasad & Team";

  /*
  |--------------------------------------------------------------------------
  | PUBLISHED DATE
  |--------------------------------------------------------------------------
  */

  const publishedDate = new Date(
    article.publishedAt ||
      article.createdAt
  ).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

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
      className="mb-10"
    >
      {/* ================= EDITORIAL BRAND ================= */}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#163C80]
            text-white
          "
        >
          <Sparkles size={18} />
        </div>

        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#EA661B]
            "
          >
            NationPath
          </p>

          <h2
            className="
              text-xl
              font-bold
              tracking-tight
              text-[#163C80]
            "
          >
            Insight
          </h2>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}

      <p
        className="
          mb-6
          max-w-3xl
          text-sm
          leading-6
          text-gray-600
        "
      >
        Deep analysis, context and perspectives behind the
        stories shaping India and the world.
      </p>

      {/* ================= TITLE ================= */}

      <h1
        className="
          max-w-4xl
          font-serif
          text-3xl
          font-bold
          leading-[1.16]
          tracking-[-0.025em]
          text-[#111]

          sm:text-4xl
          sm:leading-[1.12]

          lg:text-[2.8rem]
          lg:leading-[1.12]
        "
      >
        {article.title}
      </h1>

      {/* ================= META ================= */}

      <div
        className="
          mt-8
          flex
          flex-wrap
          items-center
          gap-x-3
          gap-y-3
          border-y
          border-black/10
          py-4
          text-xs
          tracking-wide
          text-gray-500
        "
      >
        {/* SOURCE / AUTHOR */}

        <span
          className="
            font-semibold
            text-[#111]
          "
        >
          {author}
        </span>

        <span className="text-gray-300">
          |
        </span>

        {/* DATE */}

        <time>
          {publishedDate}
        </time>

        <span className="text-gray-300">
          |
        </span>

        {/* READING TIME */}

        <span>
          {readingTime} min read
        </span>

        {/* VIEWS */}

        {article.views > 0 && (
          <>
            <span className="text-gray-300">
              |
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Eye size={13} />

              {article.views.toLocaleString("en-IN")} views
            </span>
          </>
        )}
      </div>
    </motion.header>
  );
}