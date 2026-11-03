"use client";

import React from "react";
import { useBooking } from "@/context/BookingContext";
import BookingWizard from "./BookingWizard";
import { X } from "lucide-react";

export default function BookingModal() {
  const { isModalOpen, closeBookingModal, preselectedTableId } = useBooking();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white text-gray-900 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-100 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeBookingModal}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard content */}
        <BookingWizard
          initialTableId={preselectedTableId}
          onClose={closeBookingModal}
        />
      </div>
    </div>
  );
}
