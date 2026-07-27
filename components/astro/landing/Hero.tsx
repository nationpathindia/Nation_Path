"use client";

import React, { useEffect, useRef } from "react";
import {
  Moon,
  Sparkles,
  Sun,
  Stars,
} from "lucide-react";

interface HeroProps {
  date?: string;
  title?: string;
  description?: string;
}

export default function Hero({
  date,
  title = "Vedic Cosmic Alignments & Planetary Insights",
  description = "Decode the ancient wisdom of time. Explore precise astronomical calculations, natal charts, and lunar cycles mapped meticulously to navigate your karmic path.",
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const numStars = 45;
    const starsArray: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < numStars; i++) {
      starsArray.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.2 + 0.5,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < numStars; i++) {
        const p = starsArray[i];

        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += dx * 0.006;
            p.y += dy * 0.006;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201, 162, 39, 0.4)";
        ctx.fill();

        for (let j = i + 1; j < numStars; j++) {
          const p2 = starsArray[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));

          if (distance < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 162, 39, ${0.07 * (1 - distance / 95)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      aria-labelledby="astro-hero-title"
      className="
        relative
        w-full
        px-4
        pt-12
        pb-16
        sm:px-6
        md:px-8
        lg:px-12
        xl:max-w-7xl
        xl:mx-auto
        overflow-hidden
      "
    >
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          pointer-events-none
          z-0
          w-full
          h-full
        "
      />

      <div
        className="
          relative
          z-10
          max-w-5xl
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            border-b
            border-[#C9A227]/30
            pb-1.5
            text-xs
            font-medium
            uppercase
            tracking-[0.25em]
            text-[#C9A227]
            group
          "
        >
          <Sparkles 
            size={13} 
            className="transition-transform duration-700 ease-in-out group-hover:rotate-180 text-[#C9A227] opacity-90" 
          />
          Nation Path Astrology
        </div>

        <h1
          id="astro-hero-title"
          className="
            mt-6
            max-w-4xl
            font-serif
            text-4xl
            font-normal
            tracking-tight
            leading-[1.15]
            text-[#FAFAF7]
            sm:text-5xl
            md:text-6xl
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-relaxed
            text-[#FAFAF7]/80
            md:text-lg
          "
        >
          {description}
        </p>

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-5
          "
        >
          <a
            href="/horoscope"
            className="
              inline-flex
              items-center
              justify-center
              bg-[#C9A227]
              px-7
              py-3.5
              text-sm
              font-semibold
              tracking-wider
              text-[#071426]
              transition-all
              duration-300
              hover:bg-[#E8C75A]
              hover:tracking-widest
              active:scale-98
            "
          >
            Explore Horoscope
          </a>

          <a
            href="/panchang"
            className="
              inline-flex
              items-center
              justify-center
              border
              border-[#FAFAF7]/20
              px-7
              py-3.5
              text-sm
              font-semibold
              tracking-wider
              text-[#FAFAF7]
              transition-all
              duration-300
              hover:bg-[#FAFAF7]/5
              hover:border-[#FAFAF7]/50
              active:scale-98
            "
          >
            Today's Panchang
          </a>
        </div>

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-px
            bg-[#FAFAF7]/10
            sm:grid-cols-3
          "
        >
          <HeroIndicator
            icon={<Sun size={18} strokeWidth={1.5} />}
            title="Sun"
            value="Solar Influence"
          />

          <HeroIndicator
            icon={<Moon size={18} strokeWidth={1.5} />}
            title="Moon"
            value="Lunar Energy"
          />

          <HeroIndicator
            icon={<Stars size={18} strokeWidth={1.5} />}
            title="Nakshatra"
            value={date ?? "Daily Movement"}
          />
        </div>
      </div>
    </section>
  );
}

interface HeroIndicatorProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function HeroIndicator({ icon, title, value }: HeroIndicatorProps) {
  return (
    <div
      className="
        bg-[#071426]
        py-5
        pr-4
        sm:px-6
        group
        transition-colors
        duration-300
        hover:bg-[#0B2A6F]/20
      "
    >
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            border
            border-[#C9A227]/30
            text-[#C9A227]
            transition-all
            duration-500
            group-hover:border-[#C9A227]
            group-hover:text-[#FAFAF7]
            relative
          "
        >
          <div className="absolute inset-0 bg-[#C9A227]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
            {icon}
          </span>
        </div>

        <div className="space-y-0.5">
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[#FAFAF7]/50
              transition-colors
              duration-300
              group-hover:text-[#C9A227]
            "
          >
            {title}
          </p>

          <p
            className="
              font-serif
              text-base
              font-normal
              text-[#FAFAF7]
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}