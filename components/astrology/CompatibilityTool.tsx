"use client";

import { useState } from "react";

const signs = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

export default function CompatibilityTool() {
  const [sign1, setSign1] = useState("aries");
  const [sign2, setSign2] = useState("leo");
  const [data, setData] = useState<any>(null);

  async function check() {
    const res = await fetch(
      `/api/astro/compatibility?sign1=${sign1}&sign2=${sign2}`
    );
    const json = await res.json();
    setData(json);
  }

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl space-y-4">

      <h2 className="text-xl font-bold">💘 Compatibility Checker</h2>

      <div className="flex gap-2">
        <select
          value={sign1}
          onChange={(e) => setSign1(e.target.value)}
          className="p-2 bg-slate-800 rounded"
        >
          {signs.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={sign2}
          onChange={(e) => setSign2(e.target.value)}
          className="p-2 bg-slate-800 rounded"
        >
          {signs.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={check}
          className="px-4 py-2 bg-orange-600 rounded"
        >
          Check
        </button>
      </div>

      {data && (
        <div className="mt-4 space-y-2">
          <p>🔥 Score: <b>{data.score}/100</b></p>
          <p>💖 {data.label}</p>
          <p className="text-sm text-gray-300">{data.note}</p>
        </div>
      )}

    </div>
  );
}