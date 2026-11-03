"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function IntroSplash() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeStep, setActiveStep] = useState<0 | 1>(0);

  useEffect(() => {
    // Check if user already saw the intro in this browser session
    try {
      const seen = sessionStorage.getItem("pia_intro_seen");
      if (seen === "true") {
        setIsOpen(false);
        return;
      }
    } catch {
      // ignore storage access error
    }

    // Step 1: Show authentic room table & lamps for 1.6s
    // Step 2: Crossfade to Master cues & balls for 1.6s
    const stepTimer = setTimeout(() => {
      setActiveStep(1);
    }, 1600);

    // Step 3: Automatically transition into the site
    const autoEnterTimer = setTimeout(() => {
      handleEnter();
    }, 3200);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(autoEnterTimer);
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    try {
      sessionStorage.setItem("pia_intro_seen", "true");
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer transition-opacity duration-800 ${
        hasEntered ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      title="Click anywhere to skip into site"
    >
      {/* Background Reference Images Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Photo 1: Authentic Room & Table with Lamps */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            activeStep === 0 ? "opacity-100 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-3000 ease-out`}
        >
          <Image
            src="/images/arena-intro-table.jpg"
            alt="P Infinity Arena Table & Ambiance"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Photo 2: Official Master Cues & Balls on Baize */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            activeStep === 1 ? "opacity-100 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-3000 ease-out`}
        >
          <Image
            src="/images/arena-intro-cues.jpg"
            alt="P Infinity Arena Master Cues & Match Balls"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        {/* Overhead Hanging Lamp Spotlights */}
        <div className="absolute inset-0 arena-lamp-spotlight opacity-75 pointer-events-none" />
      </div>

      {/* Center Intro Branding */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center select-none pointer-events-none">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#22C55E]/60 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_25px_rgba(34,197,94,0.5)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Where Skill Meets Style</span>
        </div>

        {/* Brand Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-3 drop-shadow-2xl">
          P INFINITY <span className="text-[#E03A2F]">ARENA</span>
        </h1>

        {/* Creed Subtitle */}
        <p className="font-display text-lg sm:text-2xl text-emerald-400 tracking-wider uppercase font-bold mb-4 drop-shadow">
          Calm Mind • Sharp Focus • Perfect Shot
        </p>

        {/* Subtle Automatic Loading Progress Bar */}
        <div className="w-40 h-1 rounded-full bg-white/20 overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-[#E03A2F] via-[#22C55E] to-[#E03A2F] w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
