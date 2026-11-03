"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteContent } from "@/context/SiteContentContext";

export default function GallerySection() {
  const { content } = useSiteContent();
  const gallery = content.gallery;
  const [activeFilter, setActiveFilter] = useState<"all" | "tables" | "tournaments" | "lounge">("all");

  const filteredPhotos = activeFilter === "all"
    ? gallery.photos
    : gallery.photos.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
            {gallery.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {gallery.titlePart1} <span className="text-[#E03A2F]">{gallery.titleHighlight}</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#131A12]/90 border border-[#3E4A22]/50 rounded-full self-start overflow-x-auto shadow-md">
          {(["all", "tables", "tournaments", "lounge"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-[#E03A2F] text-white shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 auto-rows-[220px] sm:auto-rows-[260px]">
        {filteredPhotos.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-[18px] sm:rounded-[24px] overflow-hidden group shadow-xl border border-[#3E4A22]/45 hover:border-[#22C55E]/50 transition-all ${item.span || "col-span-1"}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E09]/95 via-[#0A0E09]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#E03A2F] mb-1">
                {item.category}
              </span>
              <h4 className="font-display text-base sm:text-xl font-bold uppercase text-white drop-shadow">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
