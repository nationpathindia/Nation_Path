"use client";

import React from "react";
import { Share2, MessageCircle } from "lucide-react";

type Props = {
  title: string;
  slug: string;
  zodiac: string;
  mood?: string;
  bestTime?: string;
  warning?: string;
};

export default function ShareButtons({
  title,
  slug,
  zodiac,
  mood,
  bestTime,
  warning,
}: Props) {
  const url = `https://nationpath.in/astrology/${slug}`;

  const message = `
🔮 Daily Horoscope: ${zodiac}

✨ ${title}

🌙 Mood: ${mood || "Balanced"}
⏰ Best Time: ${bestTime || "All day"}
⚠️ Advice: ${warning || "Stay focused"}

Read full prediction 👇
${url}
  `.trim();

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
      >
        <MessageCircle size={18} />
        Share on WhatsApp
      </a>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:opacity-90"
      >
        <Share2 size={18} />
        Copy Link
      </button>

    </div>
  );
}