"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingWizard from "@/components/booking/BookingWizard";
import { ShieldCheck, Clock, Award, Phone } from "lucide-react";

function BookContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table");

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
          Official Arena Reservation
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none mb-3">
          RESERVE YOUR <span className="text-[#E03A2F]">CHAMPIONSHIP TABLE</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Experience Strachan 6811 match cloth, laser-leveled slate, and match lighting. Real-time availability guaranteed.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Collision-Free Booking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#E03A2F]" />
            <span>Instant Digital Confirmation Pass</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Free Master Cues & Chalk Provided</span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white text-gray-900 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl border border-[#3E4A22]/50 max-w-5xl mx-auto">
        <BookingWizard initialTableId={tableParam} isFullPage={true} />
      </div>

      {/* Help box */}
      <div className="mt-8 text-center text-xs text-gray-400">
        Need assistance with corporate events or private lounge buyouts? Call our Arena Concierge at{" "}
        <strong className="text-white font-semibold">+91 9384036433</strong>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading booking engine...</div>}>
      <BookContent />
    </Suspense>
  );
}
