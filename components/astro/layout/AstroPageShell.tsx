import React from "react";

interface AstroPageShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function AstroPageShell({
  children,
  className = "",
}: AstroPageShellProps) {
  return (
    <main
      className={`
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#FAFAF9]
        ${className}
      `}
    >
      {/* 1. The Deep Cosmic Veil (Ab fixed height nahi hai, yeh smooth background gradient hai) */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-[850px]
          bg-gradient-to-b
          from-[#030812]
          via-[#050D1A]
          to-transparent
          pointer-events-none
        "
      />

      {/* 2. Top Header Blended Light Shield */}
      {/* Yeh top nav bar ke white block ko cosmic body ke sath absorb kar lega */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-48
          bg-gradient-to-b
          from-white/15
          via-[#030812]/40
          to-transparent
          pointer-events-none
          backdrop-blur-[1px]
        "
      />

      {/* 3. Luxury Lookbook Ambient Glow Hubs */}
      <div 
        aria-hidden="true" 
        className="absolute left-[-5%] top-[5%] h-[600px] w-[600px] rounded-full bg-[#C9A227]/6 blur-[130px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute right-[-5%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#3B82F6]/3 blur-[150px] pointer-events-none" 
      />

      {/* 4. Fine Mathematical Alignment Grid (Microscopic & Sophisticated) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[750px]
          opacity-[0.02]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-[size:64px_64px]
          [mask-image:radial-gradient(ellipse_at_top,white_40%,transparent_85%)]
        "
      />

      {/* 5. Minimalist Fading Linear Axis Accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-[750px]
          left-1/2
          -translate-x-1/2
          w-4/5
          h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#C9A227]/20
          to-transparent
        "
      />

      {/* Main UI Presentation Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
}