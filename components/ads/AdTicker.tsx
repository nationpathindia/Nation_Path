"use client";

export default function AdTicker() {
  return (
    <div className="relative overflow-hidden bg-black text-white">

      <div className="whitespace-nowrap animate-adscroll py-2 text-sm font-medium">
        ⭐ Premium Investment Plans Available Now • 
        📊 Trade MCX with Zero Brokerage • 
        🏦 Open Demat Account Today • 
        🚀 Grow Your Portfolio with NationPath Partners • 
      </div>

      <style jsx>{`
        .animate-adscroll {
          display: inline-block;
          animation: adscroll 20s linear infinite;
        }

        @keyframes adscroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

    </div>
  );
}