"use client";

import { useEffect, useState } from "react";

export default function PanchangCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/astrology/panchang")
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white border p-4 rounded-xl mt-6">
      <h2 className="font-bold text-lg mb-2">📅 Today's Panchang</h2>

      <p>🌅 Sunrise: {data.sunrise}</p>
      <p>🌇 Sunset: {data.sunset}</p>
      <p>🌙 Moon Sign: {data.moonSign}</p>
      <p>⭐ Nakshatra: {data.nakshatra}</p>
      <p>🔥 Yoga: {data.yoga}</p>
    </div>
  );
}