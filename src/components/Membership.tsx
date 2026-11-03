"use client";

import React, { useState } from "react";
import { Check, Sparkles, Shield, Crown } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Membership() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const membership = content.membership;

  const handleJoinPlan = (planName: string) => {
    setSelectedPlan(planName);
    setTimeout(() => {
      openBookingModal();
    }, 400);
  };

  return (
    <section id="membership" className="py-12 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
          {membership.subtitle}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          {membership.titlePart1} <span className="text-[#E03A2F]">{membership.titleHighlight}</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-base mt-2 sm:mt-3">
          {membership.description}
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 p-1.5 rounded-full bg-[#131A12]/90 border border-[#3E4A22]/50 shadow-md">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              !isAnnual
                ? "bg-[#E03A2F] text-white shadow-sm"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isAnnual
                ? "bg-[#E03A2F] text-white shadow-sm"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span>Annual Pass</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/25 font-bold text-white">
              Save {membership.annualDiscountPct}%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {membership.plans.map((plan) => {
          const price = isAnnual
            ? Math.round(plan.annualPrice / 12)
            : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-[22px] sm:rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 card-lift ${
                plan.popular
                  ? "bg-[#141D13]/95 border-2 border-[#22C55E] shadow-[0_0_35px_rgba(34,197,94,0.7),0_0_75px_rgba(34,197,94,0.35),inset_0_0_15px_rgba(34,197,94,0.2)] scale-100 md:-translate-y-2"
                  : "bg-[#101710]/90 backdrop-blur-md border border-[#3E4A22]/45 shadow-xl hover:border-[#22C55E] hover:shadow-[0_0_30px_rgba(34,197,94,0.5),0_0_60px_rgba(34,197,94,0.25)]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 sm:py-1 rounded-full bg-[#22C55E] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-900" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    {plan.tier === "platinum" ? (
                      <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#22C55E]" />
                    ) : (
                      <Shield className="w-5 h-5 text-gray-400" />
                    )}
                    <h3 className="font-display text-xl sm:text-3xl font-bold uppercase text-white">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#3E4A22]/40">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-400">₹</span>
                    <span className="font-display text-3xl sm:text-5xl font-black text-white">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 font-medium">/ month</span>
                  </div>
                  {isAnnual && (
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold mt-1 block">
                      Billed annually at ₹{plan.annualPrice.toLocaleString()} (Includes 2 free months)
                    </span>
                  )}
                </div>

                {/* Benefits List */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleJoinPlan(plan.name)}
                className={`w-full py-2.5 sm:py-3 px-5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 ${
                  plan.popular
                    ? "btn-red-pill shadow-red-500/30"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                {selectedPlan === plan.name ? "Plan Selected!" : `Select ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
