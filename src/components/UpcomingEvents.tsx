"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { ChevronDown, Calendar, Clock, Trophy, Users, CheckCircle } from "lucide-react";

export default function UpcomingEvents() {
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const events = content.events;
  const [openEventId, setOpenEventId] = useState<string>(events.eventsList[0]?.id || "event-1");
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const toggleEvent = (id: string) => {
    setOpenEventId(openEventId === id ? "" : id);
  };

  const handleRegister = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegisteredEvent(eventId);
    setTimeout(() => {
      openBookingModal();
    }, 600);
  };

  return (
    <section id="events" className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Dark Atmospheric Rounded Container */}
      <div className="relative rounded-[22px] sm:rounded-[36px] bg-[#0C120C]/95 overflow-hidden p-4 sm:p-8 lg:p-12 shadow-2xl border border-[#3E4A22]/50">
        {/* Background Image of Authentic Arena Pool Table */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arena-pool-table-real.jpg"
            alt="P Infinity Arena Match Table and Lounge"
            fill
            className="object-cover object-center lg:object-right opacity-60 lg:opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C120C] via-[#0C120C]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C120C] via-transparent to-transparent" />
        </div>

        {/* Inner Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dark Glass Card on the Left */}
          <div className="lg:col-span-7 bg-[#101710]/95 backdrop-blur-md rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 md:p-9 shadow-2xl border border-[#3E4A22]/45">
            {/* Header */}
            <div className="mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] block mb-1">
                {events.subtitle}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {events.titlePart1} <span className="text-[#E03A2F]">{events.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {events.description}
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-2.5 sm:space-y-3">
              {events.eventsList.map((event, idx) => {
                const isOpen = openEventId === event.id;
                const formattedSubtitle = event.subtitle || `0${idx + 1}`;

                return (
                  <div
                    key={event.id}
                    className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-2 border-[#E03A2F] bg-red-950/30 shadow-[0_0_25px_rgba(224,58,47,0.55),0_0_50px_rgba(224,58,47,0.25)]"
                        : "border-[#3E4A22]/40 hover:border-[#22C55E]/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-[#141C13]/70"
                    }`}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="font-mono text-xs font-bold text-gray-400">
                          {formattedSubtitle}
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-white">
                          {event.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180 text-[#E03A2F]" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-white/10 text-xs sm:text-sm text-gray-300 animate-fadeIn">
                        {/* Bullet Details */}
                        <ul className="space-y-1.5 mb-3.5 text-xs sm:text-sm text-gray-300">
                          <li className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#E03A2F] shrink-0" />
                            <span><strong className="text-white">Schedule:</strong> {event.date}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#E03A2F] shrink-0" />
                            <span><strong className="text-white">Timing:</strong> {event.time}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Trophy className="w-3.5 h-3.5 text-[#E03A2F] shrink-0" />
                            <span><strong className="text-white">Prize Pool / Tier:</strong> {event.prizePool || event.entryFee}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-[#E03A2F] shrink-0" />
                            <span><strong className="text-white">Format:</strong> {event.description}</span>
                          </li>
                        </ul>

                        {/* CTA Row */}
                        <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-white/10">
                          <span className="text-xs font-semibold text-gray-400">
                            Entry: <strong className="text-white font-bold">{event.entryFee}</strong>
                          </span>

                          <button
                            onClick={(e) => handleRegister(event.id, e)}
                            className="btn-red-pill px-4 sm:px-5 py-2 text-xs font-bold shadow-md hover:shadow-red-500/30 flex items-center gap-1.5"
                          >
                            {registeredEvent === event.id ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Spot Reserved!</span>
                              </>
                            ) : (
                              <span>Book an Event</span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Floating Badge & Atmosphere */}
          <div className="lg:col-span-5 flex flex-col justify-end items-end h-full min-h-[160px] lg:min-h-[460px] pb-4">
            <div className="self-end inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E03A2F] animate-pulse" />
              <span>Events & Calendar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
