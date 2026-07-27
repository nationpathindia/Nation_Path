"use client";

import { useEffect, useState } from "react";

export default function MoonTransit() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/astrology/moon")
      .then((r) => r.json())
      .then((j) => setData(j.data));
  }, []);

  if (!data) return null;

  return (
    <div className="bg-indigo-50 p-4 rounded-xl mt-6">
      <h2 className="font-bold">🌙 Moon Transit</h2>
      <p>{data.moonPhase}</p>
      <p className="text-sm mt-2">{data.guidance}</p>
    </div>
  );
}