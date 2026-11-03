"use client";

import React from "react";
import Image from "next/image";
import { useSiteContent } from "@/context/SiteContentContext";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { content } = useSiteContent();
  const testimonials = content.testimonials;

  return (
    <section id="testimonials" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0C120C]/95 backdrop-blur-md rounded-[24px] sm:rounded-[36px] my-6 sm:my-8 border border-[#3E4A22]/50 shadow-2xl">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
          {testimonials.subtitle}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
          {testimonials.titlePart1} <span className="text-[#E03A2F]">{testimonials.titleHighlight}</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-base mt-2 sm:mt-3">
          {testimonials.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.reviews.map((t) => (
          <div
            key={t.id}
            className="bg-[#111711]/90 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-xl transition-all duration-300 border border-[#3E4A22]/45 hover:border-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.4),0_0_60px_rgba(34,197,94,0.2)] flex flex-col justify-between card-lift"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#3E4A22]/40">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-white/20">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">{t.name}</h5>
                <p className="text-xs font-semibold text-emerald-400/90">{t.role}</p>
                {t.badge && (
                  <span className="inline-block px-2 py-0.5 mt-1 rounded-full bg-red-950/80 text-red-300 border border-red-500/30 text-[10px] font-bold">
                    {t.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
