"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const { content } = useSiteContent();
  const contact = content.contact;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Table Booking",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        interest: "Table Booking",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E03A2F] mb-2 block">
          {contact.subtitle}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
          {contact.titlePart1} <span className="text-[#E03A2F]">{contact.titleHighlight}</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-base mt-2 sm:mt-3">
          {contact.description}
        </p>
      </div>

      {/* Official Poster Features Bar */}
      <div className="mb-8 p-3 rounded-2xl bg-[#121912]/90 border border-[#3E4A22]/45 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 text-center shadow-lg">
        <span className="text-[#E03A2F]">GATHER YOUR SQUAD</span>
        <span className="text-gray-600">•</span>
        <span className="text-emerald-400">COMPETE & WIN</span>
        <span className="text-gray-600">•</span>
        <span className="text-blue-400">NEXT LEVEL GAMING</span>
        <span className="text-gray-600">•</span>
        <span className="text-amber-400">TASTY BITES GREAT VIBES</span>
        <span className="text-gray-600">•</span>
        <span className="text-purple-400">MEMORIES THAT STAY</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Contact Info & Neon Boxes (Matching Venue Poster) */}
        <div className="lg:col-span-5 bg-[#101710]/95 backdrop-blur-md text-white rounded-[22px] sm:rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-[#3E4A22]/50">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E03A2F] mb-1 block">
                Official Venue Details
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                {contact.deskTitle}
              </h3>
            </div>

            {/* Neon Border Box 1: VISIT US */}
            <div className="p-4 rounded-2xl bg-black/60 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.65),0_0_60px_rgba(239,68,68,0.35),inset_0_0_15px_rgba(239,68,68,0.2)]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs sm:text-sm font-bold uppercase tracking-wide text-red-400 mb-1">
                    VISIT US
                  </strong>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    AA PARIMALA COMPLEX,
                    <br />
                    NEAR RAJAPATHI MAHAL,
                    <br />
                    THIRUMOHUR ROAD, RAJAKAMBEERAM,
                    <br />
                    Y.OTHAKKADAI, MADURAI - 625107
                  </p>
                  <span className="text-[11px] text-gray-400 block mt-1 font-mono">
                    Landmark: Yanaimalai, Madurai
                  </span>
                </div>
              </div>
            </div>

            {/* Neon Border Box 2: CALL / WHATSAPP & INSTAGRAM */}
            <div className="p-4 rounded-2xl bg-black/60 border-2 border-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.65),0_0_60px_rgba(34,197,94,0.35),inset_0_0_15px_rgba(34,197,94,0.2)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      CALL / WHATSAPP
                    </span>
                    <a
                      href="tel:+919384036433"
                      className="font-display text-xl sm:text-2xl font-black text-white hover:text-emerald-400 transition-colors tracking-wide"
                    >
                      9384036433
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/919384036433"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-pink-400" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-xs text-gray-300 font-semibold">Instagram:</span>
                  <a
                    href="https://instagram.com/pinfinityarena"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-pink-400 hover:underline"
                  >
                    @pinfinityarena
                  </a>
                </div>
              </div>
            </div>

            {/* Neon Border Box 3: OPEN DAILY */}
            <div className="p-4 rounded-2xl bg-black/60 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.65),0_0_60px_rgba(6,182,212,0.35),inset_0_0_15px_rgba(6,182,212,0.2)]">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <strong className="text-xs sm:text-sm font-bold uppercase tracking-wide text-cyan-400 block mb-0.5">
                    OPEN DAILY
                  </strong>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    11 AM TO 10 PM
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    All 7 Days a Week • Snooker, Gaming & Lounge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-[#3E4A22]/50 relative h-40 bg-[#0A0E09]">
            <iframe
              title="Arena Location Map Madurai"
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-[#101710]/95 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-6 sm:p-8 md:p-10 border border-[#3E4A22]/50 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
              SEND US A <span className="text-[#E03A2F]">MESSAGE</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Have questions about table bookings, coaching, PS5 gaming, or birthday / private room buyouts?
            </p>

            {formSubmitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-bold text-white text-lg mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-emerald-300 text-xs sm:text-sm">
                  Our Arena Manager will review your inquiry and connect with you on WhatsApp / Phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dheepan Raj"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D130C]/90 border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9384036433"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D130C]/90 border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D130C]/90 border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                      Interest / Inquiry Type
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D130C] border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-sm text-white"
                    >
                      <option value="Table Booking">Championship Snooker Table Booking</option>
                      <option value="PS5 Lounge">PS5 Next-Gen Gaming Room</option>
                      <option value="Tournament Foosball">Tournament Foosball Table</option>
                      <option value="Coaching Academy">Cuesports Coaching</option>
                      <option value="Membership">Arena Membership Plan</option>
                      <option value="Private Event">Birthday / Private Squad Buyout</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what dates or time you prefer, or ask any question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D130C]/90 border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-sm text-white placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-red-pill w-full sm:w-auto px-8 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Arena</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
