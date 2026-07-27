"use client";
import { useEffect, useState } from "react";

const ads = [
  "Trade MCX with Zero Brokerage",
  "Open Demat Account in 5 Minutes",
  "Premium Investment Plans Available",
  "Grow Your Portfolio with Experts"
];

export default function AdRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] text-white rounded-xl p-6 shadow-lg transition-all duration-500 hover:scale-[1.02]">
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
        Sponsored
      </h3>
      <p className="text-lg font-semibold transition-opacity duration-500">
        {ads[index]}
      </p>
    </div>
  );
}