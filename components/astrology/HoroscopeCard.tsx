"use client";

import { useState } from "react";

export default function HoroscopeCard({ sign, content }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const res = await fetch("/api/astrology/card", {
      method: "POST",
      body: JSON.stringify({ sign, content }),
    });

    const json = await res.json();
    setData(json.data);

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl mt-6">

      <h2 className="text-lg font-bold">📸 Viral Horoscope Card</h2>

      <button
        onClick={generate}
        className="mt-3 bg-orange-600 px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Card"}
      </button>

      {data && (
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">

          <h3 className="text-2xl font-bold">{sign}</h3>
          <p className="mt-2">{data.caption}</p>

          <p className="mt-3 text-sm">
            💎 {data.lucky}
          </p>

          <button
            className="mt-4 bg-white text-black px-3 py-1 rounded"
            onClick={() =>
              navigator.share?.({
                title: "Horoscope",
                text: data.caption,
              })
            }
          >
            Share
          </button>

        </div>
      )}
    </div>
  );
}