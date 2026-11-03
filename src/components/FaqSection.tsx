"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const { content } = useSiteContent();
  const faqs = content.faqs;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
          {faqs.subtitle}
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-gray-900">
          {faqs.titlePart1} <span className="text-[#E03A2F]">{faqs.titleHighlight}</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {faqs.description}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={faq.id || i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? "border-red-200 bg-red-50/15 shadow-sm" : "border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 text-sm sm:text-base"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#E03A2F]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-red-100/40 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
