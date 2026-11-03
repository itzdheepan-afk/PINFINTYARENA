"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { HeroSlide } from "@/types/siteContent";
import {
  ArrowRight,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  X,
  ShieldCheck,
  Trophy,
  Clock,
  Sparkles,
  Film,
  Radio,
  Tv,
} from "lucide-react";

// Web Audio API Synthesizer for realistic Arena acoustic sounds (ball clack & cue hit)
function playArenaSound(type: "clack" | "break" | "whoosh") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "clack") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } else if (type === "break") {
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const baseFreq = 1200 + i * 220;
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime + i * 0.015);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12 + i * 0.02);

        gain.gain.setValueAtTime(0.25 - i * 0.05, ctx.currentTime + i * 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12 + i * 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.015);
        osc.stop(ctx.currentTime + 0.15 + i * 0.02);
      }
    } else if (type === "whoosh") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
  } catch {
    // AudioContext blocked before gesture
  }
}

// 4K Ultra HD Fallback slides
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "P∞ ARENA • SNOOKER ZONE",
    badgeColor: "green",
    headlineP1: "PLAY HARD.",
    headlineHighlight: "AIM TRUE.",
    headlineP2: "MASTER THE GAME.",
    description:
      "Step into our authentic tournament arena — 9BallsIndia championship tables, warm industrial pendant lighting, and competitive break-building.",
    quote: "Where Skill Meets Style • Precision Leveled Tables",
    image: "/images/arena-intro-table.jpg",
    mobileImage: "/images/arena-intro-table.jpg",
    ctaText: "Book a Table",
    accentGlow: "green",
  },
  {
    id: "slide-2",
    badge: "MASTER CUES • TOURNAMENT BAIZE",
    badgeColor: "green",
    headlineP1: "CALM MIND.",
    headlineHighlight: "SHARP FOCUS.",
    headlineP2: "PERFECT BREAK.",
    description:
      "Professional Master Cues, calibrated balls, zero-glare overhead dome lighting, and high-performance Strachan tournament felt.",
    quote: "Master Cues • Calibrated Match Balls",
    image: "/images/arena-intro-cues.jpg",
    mobileImage: "/images/arena-intro-cues.jpg",
    ctaText: "Explore Tables",
    accentGlow: "green",
  },
  {
    id: "slide-3",
    badge: "WHERE SKILL MEETS STYLE",
    badgeColor: "green",
    headlineP1: "IT'S NOT JUST A GAME.",
    headlineHighlight: "IT'S STRATEGY.",
    headlineP2: "IT'S PRECISION.",
    description:
      "Experience the iconic P∞ Arena atmosphere — powerful AC, dynamic LED ambience, certified cue coaching, and weekend ranking cups.",
    quote: "Focus • Patience • Precision • Victory",
    image: "/images/arena-neon-widescreen-4k.jpg",
    mobileImage: "/images/arena-neon-4k.jpg",
    ctaText: "Join Membership",
    accentGlow: "green",
  },
  {
    id: "slide-4",
    badge: "PS5 GAMING ZONE • PLAY WITHOUT LIMITS",
    badgeColor: "blue",
    headlineP1: "NEXT-GEN GAMING.",
    headlineHighlight: "4K RECLINER LOUNGE.",
    headlineP2: "ULTRA IMMERSION.",
    description:
      "Relax between frames with the latest PS5 titles, dual wireless controllers, low-latency 4K display, and plush leather sofa seating.",
    quote: "Play Without Limits • Every Level Makes You Stronger",
    image: "/images/arena-ps5-widescreen-4k.jpg",
    mobileImage: "/images/arena-ps5-4k.jpg",
    ctaText: "Reserve PS5 Lounge",
    accentGlow: "blue",
  },
  {
    id: "slide-5",
    badge: "TOURNAMENT FOOSBALL & CAFÉ",
    badgeColor: "amber",
    headlineP1: "DOUBLES BATTLES.",
    headlineHighlight: "CHILL CAFÉ VIBES.",
    headlineP2: "FRIENDS LOUNGE.",
    description:
      "High-octane tournament table soccer, artisan snacks, cold refreshments, and a community space built for unforgettable hangouts.",
    quote: "Friends Lounge • Ice Cold Beverages & Tournament Racks",
    image: "/images/arena-foosball-4k.jpg",
    mobileImage: "/images/arena-foosball-4k.jpg",
    ctaText: "Explore Friends Lounge",
    accentGlow: "amber",
  },
];

export default function Hero() {
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const hero = content.hero;

  const slides: HeroSlide[] =
    hero.slides && hero.slides.length > 0 ? hero.slides : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Touch Swipe State for Mobile View
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const SLIDE_DURATION = 6500;
  const TICK_INTERVAL = 50;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setProgress(0);
      if (audioEnabled) {
        playArenaSound("clack");
      }
    },
    [audioEnabled]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
    if (audioEnabled) {
      playArenaSound("whoosh");
    }
  }, [slides.length, audioEnabled]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    if (audioEnabled) {
      playArenaSound("whoosh");
    }
  }, [slides.length, audioEnabled]);

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45; // 45px swipe threshold

    if (diffX > minSwipeDistance) {
      // Swiped Left -> Next Slide
      nextSlide();
    } else if (diffX < -minSwipeDistance) {
      // Swiped Right -> Previous Slide
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((old) => {
        const next = old + (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (next >= 100) {
          nextSlide();
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, SLIDE_DURATION]);

  const currentSlide = slides[currentIndex] || slides[0];

  const isGreen = currentSlide.accentGlow === "green" || currentSlide.badgeColor === "green";
  const isBlue = currentSlide.accentGlow === "blue" || currentSlide.badgeColor === "blue";
  const isAmber = currentSlide.accentGlow === "amber" || currentSlide.badgeColor === "amber";

  const kenBurnsClass =
    currentIndex % 3 === 0
      ? "animate-kenburns-1"
      : currentIndex % 3 === 1
      ? "animate-kenburns-2"
      : "animate-kenburns-3";

  return (
    <section className="pt-1 pb-6 sm:pb-12 md:pb-16 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Main Hero Card Container with Touch Swipe support for Mobile & Minimized Tabs */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative rounded-[20px] sm:rounded-[30px] lg:rounded-[36px] overflow-hidden min-h-[380px] xs:min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[680px] flex flex-col justify-between p-3.5 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl transition-all duration-700 select-none ${
          isBlue
            ? "shadow-[0_0_50px_rgba(59,130,246,0.6),0_0_100px_rgba(59,130,246,0.3)] border-2 border-blue-400"
            : isAmber
            ? "shadow-[0_0_50px_rgba(245,158,11,0.6),0_0_100px_rgba(245,158,11,0.3)] border-2 border-amber-400"
            : "shadow-[0_0_50px_rgba(34,197,94,0.65),0_0_100px_rgba(34,197,94,0.3)] border-2 border-emerald-400"
        }`}
      >
        {/* Dynamic Ultra HD 4K Image Layers */}
        <div className="absolute inset-0 z-0 bg-black">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const mobileSrc = slide.mobileImage || slide.image;
            const desktopSrc = slide.image;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className={`relative w-full h-full ultra-hd-4k-clarity ${isActive ? kenBurnsClass : ""}`}>
                  {/* Mobile-optimized vertical 4K image (hidden on desktop) */}
                  <div className="sm:hidden relative w-full h-full">
                    <Image
                      src={mobileSrc}
                      alt={slide.headlineP1 + " " + slide.headlineP2}
                      fill
                      priority={idx === 0}
                      quality={98}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>

                  {/* Desktop widescreen 4K image (hidden on mobile) */}
                  <div className="hidden sm:block relative w-full h-full">
                    <Image
                      src={desktopSrc}
                      alt={slide.headlineP1 + " " + slide.headlineP2}
                      fill
                      priority={idx === 0}
                      quality={98}
                      className="object-cover object-center"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Authentic Overhead Industrial Dome Lamp Spotlight Cone */}
          <div className="absolute inset-0 z-20 arena-lamp-spotlight pointer-events-none" />

          {/* Cinematic Vignette & Atmospheric Contrast */}
          <div className="absolute inset-0 z-20 vignette-cinema pointer-events-none" />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/60 to-black/35 pointer-events-none" />

          {/* Ambient Neon Side Glow */}
          <div
            className={`absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[120px] pointer-events-none opacity-40 transition-colors duration-1000 z-20 ${
              isBlue ? "bg-blue-600" : isAmber ? "bg-amber-600" : "bg-emerald-500"
            }`}
          />
        </div>

        {/* Top Floating Control Bar: Scaled cleanly without truncation */}
        <div className="relative z-30 flex items-center justify-between gap-2">
          {/* Top Pill Badge with live glow */}
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full backdrop-blur-md text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-500 max-w-full truncate ${
              isBlue
                ? "bg-blue-950/80 border border-blue-400 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : isAmber
                ? "bg-amber-950/80 border border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "bg-emerald-950/80 border border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            }`}
          >
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 animate-pulse text-[#E03A2F]" />
            <span className="truncate">{currentSlide.badge}</span>
          </div>
        </div>

        {/* Center / Content Area: Scaled smoothly for minimized windows & full screens */}
        <div className="relative z-30 max-w-3xl pt-2 sm:pt-5 md:pt-8 pb-1 sm:pb-2">
          {/* Authentic Creed Quote */}
          {currentSlide.quote && (
            <div className="inline-flex items-center gap-1.5 mb-1 sm:mb-2.5 px-2 sm:px-3 py-0.5 rounded-md bg-black/70 backdrop-blur-md border-l-4 border-[#E03A2F] text-gray-200 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide max-w-full">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
              <span className="truncate">{currentSlide.quote}</span>
            </div>
          )}

          {/* Headline in condensed display font with smooth scale */}
          <h1 className="font-display text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-[0.98] mb-1.5 sm:mb-3 drop-shadow-xl">
            {currentSlide.headlineP1}{" "}
            <span
              className={`transition-colors duration-500 ${
                isBlue
                  ? "text-blue-400 neon-text-blue"
                  : isAmber
                  ? "text-amber-400"
                  : "text-[#E03A2F]"
              }`}
            >
              {currentSlide.headlineHighlight}
            </span>
            <br />
            {currentSlide.headlineP2}
          </h1>

          {/* Description Paragraph */}
          <p className="text-gray-300 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base font-normal max-w-lg leading-snug sm:leading-relaxed drop-shadow mb-2 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
            {currentSlide.description}
          </p>

          {/* Compact Pill CTA Button */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5 mb-2 sm:mb-4">
            <button
              onClick={() => openBookingModal()}
              id="hero-book-btn"
              className="btn-red-pill w-auto self-start px-4 sm:px-7 py-1.5 sm:py-3 text-[11px] sm:text-xs md:text-sm font-bold inline-flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-red-600/60 active:scale-98 group"
            >
              <span>{currentSlide.ctaText || "Book a Table"}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              id="hero-intro-btn"
              className="px-4 sm:px-6 py-1.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#22C55E] text-white text-[11px] sm:text-xs md:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-98 hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E] fill-[#22C55E]" />
              <span>Watch Arena Intro</span>
            </button>
          </div>

          {/* Quick Perks: 2x2 Grid on Mobile & Minimized Tabs, Flex on Large Desktops */}
          <div className="pt-2 sm:pt-3 border-t border-white/15 grid grid-cols-2 gap-x-2 gap-y-1.5 md:flex md:flex-wrap items-center md:gap-6 text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-sm text-gray-300">
            {hero.perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                {i === 0 && <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />}
                {i === 1 && <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />}
                {i >= 2 && <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E03A2F] shrink-0" />}
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Area: Story Progress & Touch Navigation */}
        <div className="relative z-30 pt-2 sm:pt-3 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-1.5 sm:gap-3 border-t border-white/15">
          {/* Segmented Story Progress Bars */}
          <div className="flex-1 max-w-xl">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-1 sm:mb-1.5">
              {slides.map((s, idx) => {
                const isPassed = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className="group relative h-1 sm:h-1.5 rounded-full overflow-hidden bg-white/25 hover:h-2 transition-all cursor-pointer"
                    aria-label={`Jump to slide ${idx + 1}`}
                  >
                    <div
                      className={`h-full transition-all duration-75 rounded-full ${
                        isCurrent
                          ? "bg-[#E03A2F]"
                          : isPassed
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                      style={{
                        width: isCurrent ? `${progress}%` : isPassed ? "100%" : "0%",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Slide Index & Title & Touch Prev/Next Arrows */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
              <span className="font-mono text-white font-bold">
                0{currentIndex + 1} / 0{slides.length}
              </span>
              <span className="truncate max-w-[140px] xs:max-w-[200px] sm:max-w-[320px] text-gray-300 font-medium text-[9px] xs:text-[10px] sm:text-xs">
                {currentSlide.headlineHighlight} — {currentSlide.headlineP2}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="p-1 sm:p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1 sm:p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Thumbnail Carousel */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1">
            {slides.map((s, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative w-18 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 group ${
                    active
                      ? "border-2 border-[#E03A2F] scale-105 shadow-[0_0_25px_rgba(224,58,47,0.9),0_0_50px_rgba(224,58,47,0.5)]"
                      : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/60"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.badge}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="72px"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-white drop-shadow">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Equipment & Championship Partners Marquee with dark luxury styling */}
      <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-4 pb-2 border-b border-[#3E4A22]/30 overflow-hidden">
        <div className="text-center mb-2.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Official Equipment & Authentic Venue Partners
          </span>
        </div>
        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div className="animate-marquee flex items-center gap-8 sm:gap-16 py-1.5">
            {[...hero.sponsors, ...hero.sponsors].map((sponsor, idx) => (
              <div
                key={`${sponsor.id}-${idx}`}
                className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap cursor-pointer group"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E03A2F]/60 group-hover:bg-[#E03A2F]" />
                <span className="text-xs sm:text-base font-bold text-gray-200 group-hover:text-white tracking-wider uppercase font-display">
                  {sponsor.name}
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium border border-white/10">
                  {sponsor.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Arena Cinematic Reel Video Modal (Mobile Responsive) */}
      {isVideoModalOpen && (
        <CinematicVideoModal
          slides={slides}
          onClose={() => setIsVideoModalOpen(false)}
          onBook={() => {
            setIsVideoModalOpen(false);
            openBookingModal();
          }}
        />
      )}
    </section>
  );
}

// Cinematic Video Modal Component (Fully Mobile Responsive)
function CinematicVideoModal({
  slides,
  onClose,
  onBook,
}: {
  slides: HeroSlide[];
  onClose: () => void;
  onBook: () => void;
}) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(true);
  const [reelProgress, setReelProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const CHAPTER_TIME = 5000;

  useEffect(() => {
    if (!isPlayingReel) return;
    const interval = setInterval(() => {
      setReelProgress((prev) => {
        const next = prev + (50 / CHAPTER_TIME) * 100;
        if (next >= 100) {
          setActiveChapter((c) => (c + 1) % slides.length);
          if (!isMuted) playArenaSound("clack");
          return 0;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlayingReel, slides.length, isMuted]);

  const curr = slides[activeChapter] || slides[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 lg:p-10 animate-in fade-in duration-300">
      {/* Container: Responsive aspect on mobile and 2.35:1 widescreen on desktop */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[720px] sm:h-auto sm:aspect-[2.35/1] bg-black rounded-[20px] sm:rounded-[32px] overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-4 sm:p-8 lg:p-10">
        {/* Background Ultra HD 4K Video Reel Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {slides.map((s, idx) => {
            const isCur = idx === activeChapter;
            return (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  isCur ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className={`relative w-full h-full ultra-hd-4k-clarity ${isCur ? "animate-kenburns-1" : ""}`}>
                  {/* Mobile portrait view */}
                  <div className="sm:hidden relative w-full h-full">
                    <Image
                      src={s.mobileImage || s.image}
                      alt={s.headlineHighlight}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                  {/* Desktop widescreen view */}
                  <div className="hidden sm:block relative w-full h-full">
                    <Image
                      src={s.image}
                      alt={s.headlineHighlight}
                      fill
                      className="object-cover object-center"
                      sizes="1200px"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
          <div className="absolute inset-0 z-20 pointer-events-none vignette-cinema" />
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/75" />
        </div>

        {/* Modal Top Bar */}
        <div className="relative z-30 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E03A2F] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              4K Ultra HD Reel
            </span>
            <span className="text-white/80 font-mono text-[11px] sm:text-xs hidden sm:inline">
              Chapter 0{activeChapter + 1}: {curr.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-red-600 text-white border border-white/20 hover:border-red-600 transition-colors"
              title="Close Cinematic Player"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Center Title overlay */}
        <div className="relative z-30 max-w-2xl my-auto">
          <div className="inline-block px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border-l-4 border-emerald-400 text-emerald-300 text-[10px] sm:text-xs font-bold mb-2 uppercase tracking-widest">
            {curr.quote || "P∞ Arena • Snooker, Gaming & Lounge"}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2 drop-shadow-2xl">
            {curr.headlineP1} <span className="text-[#E03A2F]">{curr.headlineHighlight}</span>
          </h2>
          <p className="text-gray-200 text-xs sm:text-sm font-normal max-w-lg leading-relaxed line-clamp-2 drop-shadow">
            {curr.description}
          </p>
        </div>

        {/* Modal Bottom Controls */}
        <div className="relative z-30 flex flex-col gap-2.5">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E03A2F] transition-all duration-75"
              style={{
                width: `${((activeChapter + reelProgress / 100) / slides.length) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingReel(!isPlayingReel)}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isPlayingReel ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
              </button>

              <div className="flex items-center gap-1">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveChapter(idx);
                      setReelProgress(0);
                    }}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-mono font-bold transition-all ${
                      idx === activeChapter
                        ? "bg-[#E03A2F] text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onBook}
              className="btn-red-pill px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
