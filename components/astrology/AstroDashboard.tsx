"use client";

import { useEffect, useState } from "react";

export default function AstroDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/astro/today")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading astrology data...</p>;

  return (
    <div className="space-y-6">

      {/* MOON */}
      <div className="p-4 bg-slate-900 rounded">
        🌙 Moon Phase: <b>{data.moon}</b>
      </div>

      {/* SIGNS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.signs.map((s: any) => (
          <div key={s.sign} className="p-4 bg-slate-800 rounded">
            <h3 className="capitalize font-bold">{s.sign}</h3>
            <p>🔥 Energy: {s.energy}/100</p>
            <p>⏰ Lucky: {s.luckyTime.start} - {s.luckyTime.end}</p>
          </div>
        ))}
      </div>

    </div>
  );
}