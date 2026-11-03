"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { openBookingModal } = useBooking();
  const { content } = useSiteContent();
  const footer = content.footer;
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0A0E09] to-[#060805] text-gray-300 pt-16 pb-10 border-t border-[#3E4A22]/50 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E4A22]/35">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B71C1C] via-[#E03A2F] to-[#22C55E] flex items-center justify-center p-0.5 shadow-md shadow-red-500/20">
                <div className="w-full h-full bg-[#0A0E09] rounded-full flex items-center justify-center">
                  <span className="text-[#E03A2F] text-lg font-black leading-none tracking-tighter">
                    ∞
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-white leading-none">
                  P INFINITY <span className="text-[#E03A2F]">ARENA</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold leading-tight">
                  Luxury Snooker & Pool
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {footer.brandTagline}
            </p>

            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="btn-red-pill px-6 py-2.5 text-xs font-bold"
              >
                Book a Table Now
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#E03A2F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#E03A2F] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#E03A2F] transition-colors">
                  Services & Academy
                </Link>
              </li>
              <li>
                <Link href="/#membership" className="hover:text-[#E03A2F] transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-[#E03A2F] transition-colors">
                  Upcoming Tournaments
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#E03A2F] transition-colors">
                  Arena Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
              Arena Hours & Venue
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400">
              <p>
                <strong className="text-gray-200 block">{footer.hoursTitle}</strong>
                {footer.hoursRegular}
              </p>
              <p className="text-[#E03A2F] font-medium">
                {footer.hoursVip}
              </p>
              <div className="pt-2 text-xs text-gray-400 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E03A2F]" />
                  <span>{footer.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E03A2F]" />
                  <span>{footer.phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
              Stay in the Break
            </h4>
            <p className="text-xs text-gray-400">
              Subscribe for upcoming tournament announcements, coaching masterclasses, and exclusive member discounts.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#121912]/90 border border-[#3E4A22]/50 focus:outline-none focus:border-[#22C55E] text-xs text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter"
                  className="w-10 h-10 rounded-full bg-[#E03A2F] hover:bg-[#c93026] text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Icons - Instagram & WhatsApp Alone */}
            <div className="pt-3 flex items-center gap-3">
              {/* Instagram */}
              <a
                href={footer.instagramUrl || "https://instagram.com/pinfinityarena"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-gray-200 hover:text-white transition-all shadow-md hover:scale-105 text-xs font-semibold"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current text-pink-400 group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={footer.whatsappUrl || "https://wa.me/919384036433"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#22C55E] text-gray-200 hover:text-white transition-all shadow-md hover:scale-105 text-xs font-semibold"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current text-emerald-400 group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip with Centered Powered by CREAREMIND */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-[#3E4A22]/30 mt-8">
          <p className="order-1 md:order-1 text-center md:text-left">{footer.copyrightText}</p>

          {/* Centered Powered by CREAREMIND */}
          <div className="order-3 md:order-2 flex items-center justify-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Powered by
            </span>
            <a
              href="https://www.crearemind.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#22C55E] transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
              aria-label="Visit CREAREMIND website"
            >
              <div className="relative w-7 h-5 shrink-0">
                <Image
                  src="/images/crearemind-logo-white.png"
                  alt="CREAREMIND logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-display text-sm tracking-wider font-bold text-white group-hover:text-[#22C55E] transition-colors">
                CREAREMIND
              </span>
            </a>
          </div>

          <div className="order-2 md:order-3 flex items-center gap-6">
            <Link href="/#about" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/#about" className="hover:text-gray-400">
              Terms of Play
            </Link>
            <Link href="/dashboard" className="hover:text-gray-400">
              Customer Portal
            </Link>
            <Link href="/admin" className="hover:text-gray-400">
              Staff & Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
