"use client";

import { useState } from "react";

const zodiacSigns = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

export default function CompatibilityBox() {
  const [sign1, setSign1] = useState("Aries");
  const [sign2, setSign2] = useState("Libra");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);

    const res = await fetch("/api/astrology/compatibility", {
      method: "POST",
      body: JSON.stringify({ sign1, sign2 }),
    });

    const json = await res.json();
    setData(json.data);

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">
        💞 Zodiac Compatibility
      </h2>

      <div className="flex gap-3">
        <select value={sign1} onChange={(e)=>setSign1(e.target.value)}>
          {zodiacSigns.map(z => <option key={z}>{z}</option>)}
        </select>

        <select value={sign2} onChange={(e)=>setSign2(e.target.value)}>
          {zodiacSigns.map(z => <option key={z}>{z}</option>)}
        </select>

        <button
          onClick={check}
          className="bg-orange-600 px-4 py-2 rounded"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {data && (
        <div className="mt-6 space-y-2">
          <p>💯 Score: {data.score}/100</p>
          <p>❤️ {data.love}</p>
          <p>🧠 {data.communication}</p>
          <p>🤝 {data.trust}</p>
          <p>💡 {data.advice}</p>
        </div>
      )}
    </div>
  );
}