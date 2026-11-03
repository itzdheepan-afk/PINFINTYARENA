"use client";

import React from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function AboutPrecision() {
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Centered Heading */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 sm:mb-3 block">
          {about.subtitle}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
          {about.titlePart1} <span className="text-[#E03A2F]">{about.titleHighlight}</span>
          <br />
          {about.titlePart2}
        </h2>
      </div>

      {/* 3 Overlapping Tilted Photo Cards matching reference */}
      <div className="relative max-w-4xl mx-auto h-[320px] sm:h-[440px] md:h-[500px] flex items-center justify-center mb-8 sm:mb-12 select-none">
        {/* Card 1 - Left Tilted (-6 deg) */}
        <div className="absolute left-2 sm:left-12 md:left-20 z-10 w-[180px] sm:w-[280px] md:w-[320px] h-[260px] sm:h-[380px] md:h-[420px] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border-2 sm:border-4 border-[#485628]/70 hover:border-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.7),0_0_60px_rgba(34,197,94,0.35)] bg-[#0C120C] transform -rotate-6 hover:-rotate-2 hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer group">
          <Image
            src={about.card1Image}
            alt={about.card1Title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 180px, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E09]/95 via-transparent to-transparent flex items-end p-3 sm:p-4">
            <span className="text-white text-[11px] sm:text-sm font-semibold tracking-wide">
              {about.card1Title}
            </span>
          </div>
        </div>

        {/* Card 2 - Center (Front Focus, 0 deg) */}
        <div className="absolute z-20 w-[200px] sm:w-[300px] md:w-[340px] h-[300px] sm:h-[420px] md:h-[480px] rounded-[22px] sm:rounded-[26px] overflow-hidden border-2 sm:border-4 border-[#E03A2F] bg-[#0C120C] transform rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer group shadow-[0_0_35px_rgba(224,58,47,0.85),0_0_75px_rgba(224,58,47,0.5),inset_0_0_20px_rgba(224,58,47,0.35)]">
          <Image
            src={about.card2Image}
            alt={about.card2Title}
            fill
            className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 200px, 340px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E09]/95 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E03A2F] text-white text-[10px] sm:text-[11px] font-bold self-start mb-1 shadow-md">
              {about.card2Tag}
            </div>
            <h4 className="text-white text-sm sm:text-lg font-bold font-display uppercase tracking-wide">
              {about.card2Title}
            </h4>
            <p className="text-gray-300 text-xs hidden sm:block">
              {about.card2Desc}
            </p>
          </div>
        </div>

        {/* Card 3 - Right Tilted (+6 deg) */}
        <div className="absolute right-2 sm:right-12 md:right-20 z-10 w-[180px] sm:w-[280px] md:w-[320px] h-[260px] sm:h-[380px] md:h-[420px] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border-2 sm:border-4 border-[#485628]/70 hover:border-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.7),0_0_60px_rgba(34,197,94,0.35)] bg-[#0C120C] transform rotate-6 hover:rotate-2 hover:scale-105 hover:z-30 transition-all duration-500 ease-out cursor-pointer group">
          <Image
            src={about.card3Image}
            alt={about.card3Title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 180px, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E09]/95 via-transparent to-transparent flex items-end p-3 sm:p-4">
            <span className="text-white text-[11px] sm:text-sm font-semibold tracking-wide">
              {about.card3Title}
            </span>
          </div>
        </div>
      </div>

      {/* Story Text & CTA */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-gray-300 text-xs sm:text-base leading-relaxed mb-6 font-normal">
          {about.story}
        </p>

        <div className="inline-block">
          <button
            onClick={() => openBookingModal()}
            className="btn-red-pill px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg hover:shadow-red-500/40"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#3E4A22]/40">
        {about.stats.map((stat) => (
          <div key={stat.id} className="text-center p-3 sm:p-4 rounded-xl bg-[#121912]/85 border border-[#3E4A22]/40 shadow-lg">
            <span className="font-display text-3xl sm:text-5xl font-black text-white block">
              {stat.number}
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-200 mt-1 block">
              {stat.label}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5 block">
              {stat.subtext}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
