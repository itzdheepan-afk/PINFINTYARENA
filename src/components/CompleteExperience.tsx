"use client";

import React from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CompleteExperience() {
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const services = content.services;

  const handleCardClick = (id: string) => {
    if (id === "tournaments") {
      const el = document.getElementById("events");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "lounge-cafe") {
      openBookingModal("table-5");
    } else if (id === "ps5-gaming") {
      openBookingModal("table-4");
    } else {
      openBookingModal();
    }
  };

  return (
    <section id="services" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Row matching dark luxury reference */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
            {services.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {services.titlePart1} <span className="text-[#E03A2F]">{services.titleHighlight}</span>
            <br />
            {services.titlePart2}
          </h2>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
          {services.description}
        </p>
      </div>

      {/* 2 by 1 Grid on Mobile & 4-Column Grid on Tablet/Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 md:gap-6">
        {services.items.map((item) => (
          <div
            key={item.id}
            className={`group relative rounded-[18px] sm:rounded-[26px] overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 border ${
              item.highlight
                ? "border-2 border-[#E03A2F] shadow-[0_0_35px_rgba(224,58,47,0.8),0_0_75px_rgba(224,58,47,0.45),inset_0_0_20px_rgba(224,58,47,0.35)]"
                : "border-[#3E4A22]/50 hover:border-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.65),0_0_60px_rgba(34,197,94,0.3)]"
            } h-[320px] sm:h-[420px] md:h-[460px]`}
            onClick={() => handleCardClick(item.id)}
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
            />

            {/* Dark & Red Overlays */}
            {item.highlight ? (
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B1515] via-[#B71C1C]/85 to-black/60 mix-blend-multiply opacity-95 transition-opacity" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E09] via-[#0A0E09]/60 to-black/20 opacity-92 group-hover:opacity-95 transition-opacity" />
            )}

            {/* Inner Content */}
            <div className="absolute inset-0 p-3.5 sm:p-5 md:p-6 flex flex-col justify-end text-white">
              {item.highlight && (
                <div className="mb-auto self-start inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] sm:text-[11px] font-bold">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-300" />
                  <span>Pro Academy</span>
                </div>
              )}

              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-0.5 sm:mb-1 truncate">
                {item.tagline}
              </span>

              <h3 className="font-display text-base sm:text-xl md:text-2xl font-black tracking-tight uppercase text-white mb-1.5 sm:mb-2 leading-tight">
                {item.title}
              </h3>

              <p className="text-[10px] sm:text-xs text-gray-200 line-clamp-2 sm:line-clamp-3 mb-2.5 sm:mb-4 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Action Button */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id);
                  }}
                  className={`w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full text-[11px] sm:text-xs md:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1 sm:gap-1.5 ${
                    item.highlight
                      ? "bg-white text-[#E03A2F] hover:bg-gray-100"
                      : "bg-[#E03A2F] text-white hover:bg-[#c93026]"
                  }`}
                >
                  <span className="truncate">{item.ctaText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
