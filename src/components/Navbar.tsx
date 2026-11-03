"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Shield, User, Calendar, LogOut } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBooking();
  const { user, isAdmin, toggleAdminMode, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Membership", href: "/#membership" },
    { name: "Events", href: "/#events" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0E09]/95 backdrop-blur-md shadow-2xl border-b border-[#3E4A22]/45 py-3"
          : "bg-[#0A0E09]/85 backdrop-blur-sm py-4 border-b border-[#3E4A22]/25"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B71C1C] via-[#E03A2F] to-[#22C55E] flex items-center justify-center p-0.5 shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A0E09] rounded-full flex items-center justify-center">
                <span className="text-[#E03A2F] text-lg font-black leading-none tracking-tighter">
                  ∞
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                P INFINITY <span className="text-[#E03A2F]">ARENA</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold leading-tight">
                P∞ Arena • Madurai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#E03A2F] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick Link to Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              title="Customer Dashboard"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E03A2F]" />
              <span>My Bookings</span>
            </Link>

            {/* Admin Toggle / Link */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                isAdmin
                  ? "bg-red-950/80 text-red-300 border-red-500/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border-white/10"
              }`}
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            {/* Join Now */}
            <Link
              href="/#membership"
              className="text-sm font-semibold text-gray-300 hover:text-[#E03A2F] transition-colors"
            >
              Join Now
            </Link>

            {/* Primary CTA - Book a Table Pill */}
            <button
              onClick={() => openBookingModal()}
              id="nav-book-btn"
              className="btn-red-pill px-6 py-2.5 text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-red-600/50"
            >
              <span>Book a Table</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-ping" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openBookingModal()}
              className="btn-red-pill px-3.5 py-1.5 text-xs font-bold"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D140C]/98 backdrop-blur-xl border-b border-[#3E4A22]/50 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#3E4A22]/30">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-200 hover:text-[#22C55E] py-2 px-2 rounded-md hover:bg-[#152014]/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-gray-200 py-2.5 px-3 rounded-lg bg-[#141C13]/80 border border-[#3E4A22]/40"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22C55E]" />
                Customer Dashboard
              </span>
              <span className="text-xs text-gray-400">View</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-gray-200 py-2.5 px-3 rounded-lg bg-[#141C13]/80 border border-[#3E4A22]/40"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#E03A2F]" />
                Admin Console
              </span>
              <span className="text-xs text-gray-400">Manage</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full btn-red-pill py-3 text-center text-sm font-semibold mt-2 shadow-lg"
            >
              Book a Table Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
