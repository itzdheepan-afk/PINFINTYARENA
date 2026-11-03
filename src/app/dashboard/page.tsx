"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Booking } from "@/types";
import { TIME_SLOTS } from "@/data/seedData";
import {
  Calendar,
  Clock,
  QrCode,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Shield,
  User,
  PlusCircle,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";

export default function DashboardPage() {
  const { bookings, openBookingModal, cancelBooking, rescheduleBooking, isSlotAvailable } =
    useBooking();
  const { user, isAdmin, toggleAdminMode } = useAuth();

  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);

  // Reschedule modal state
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [newSlot, setNewSlot] = useState<string>("07:00 PM");
  const [rescheduleMessage, setRescheduleMessage] = useState<string | null>(null);

  // Filter bookings for user
  const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "rescheduled");
  const pastBookings = bookings.filter((b) => b.status === "cancelled" || b.status === "completed");

  const displayedBookings = activeTab === "upcoming" ? activeBookings : pastBookings;

  const handleCancel = async (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this reservation? Full refund or arena credit will be issued.")) {
      await cancelBooking(bookingId);
    }
  };

  const handleRescheduleSubmit = async () => {
    if (!reschedulingBooking) return;

    const available = isSlotAvailable(
      reschedulingBooking.tableId,
      newDate,
      newSlot,
      reschedulingBooking.durationHours,
      reschedulingBooking.id
    );

    if (!available) {
      setRescheduleMessage("Sorry! That slot is already booked on this table. Please choose another time.");
      return;
    }

    await rescheduleBooking(reschedulingBooking.id, newDate, newSlot);
    setReschedulingBooking(null);
    setRescheduleMessage(null);
    alert("Your booking was successfully rescheduled!");
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner with User Card & Admin Toggle */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E03A2F] to-[#FF6B6B] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-red-500/20">
            {user?.name?.charAt(0) || "D"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
                {user?.name || "Player Member"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold capitalize">
                {user?.membershipTier || "Gold"} Tier
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {user?.email || "dheepan.raj@example.com"} • Member since {user?.memberSince || "2025"}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
              <span>
                Available Practice Hours: <strong className="text-gray-900">{user?.activeHoursRemaining || 18} Hours</strong>
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Priority 7-Day Booking Active</span>
            </div>
          </div>
        </div>

        {/* Dashboard quick actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openBookingModal()}
            className="btn-red-pill px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Table</span>
          </button>

          <Link
            href="/admin"
            className="px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-4 h-4 text-[#E03A2F]" />
            <span>Staff / Admin Mode</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "upcoming"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Active & Upcoming ({activeBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "history"
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Past & Cancelled ({pastBookings.length})
          </button>
        </div>

        <span className="text-xs text-gray-400 hidden sm:inline">
          Showing real-time live database records
        </span>
      </div>

      {/* Bookings List */}
      {displayedBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700 text-base mb-1">
            No {activeTab} bookings found
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Ready to pot some balls? Select your preferred championship table.
          </p>
          <button
            onClick={() => openBookingModal()}
            className="btn-red-pill px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2"
          >
            <span>Book a Table Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedBookings.map((b) => {
            const isConfirmed = b.status === "confirmed";
            const isRescheduled = b.status === "rescheduled";
            const isCancelled = b.status === "cancelled";

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-gray-300 transition-all shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {b.bookingNumber}
                    </span>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                      {b.tableName}
                    </h4>

                    {/* Status Badge */}
                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Confirmed
                      </span>
                    )}
                    {isRescheduled && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        <RefreshCw className="w-3 h-3" /> Rescheduled
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" /> Cancelled
                      </span>
                    )}
                  </div>

                  {/* Date, Time & Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5 font-medium text-gray-900">
                      <Calendar className="w-3.5 h-3.5 text-[#E03A2F]" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-gray-900">
                      <Clock className="w-3.5 h-3.5 text-[#E03A2F]" />
                      <span>{b.timeSlot} ({b.durationHours} Hours)</span>
                    </div>
                    <span>•</span>
                    <span>{b.playersCount} Players</span>
                    <span>•</span>
                    <span className="font-semibold text-gray-900">₹{b.totalAmount}</span>
                    <span className="text-gray-400 capitalize">({b.paymentStatus === "paid" ? "Paid Online" : "Pay at Venue"})</span>
                  </div>

                  {b.notes && (
                    <p className="text-[11px] text-gray-500 italic">
                      Note: &ldquo;{b.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-end md:self-auto shrink-0">
                  {/* View digital pass */}
                  <button
                    onClick={() => setSelectedTicket(b)}
                    className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-gray-700" />
                    <span>View Pass</span>
                  </button>

                  {/* Reschedule Button */}
                  {!isCancelled && (
                    <button
                      onClick={() => {
                        setReschedulingBooking(b);
                        setNewDate(b.date);
                        setNewSlot(b.timeSlot);
                        setRescheduleMessage(null);
                      }}
                      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reschedule</span>
                    </button>
                  )}

                  {/* Cancel Button */}
                  {!isCancelled && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-4 py-2 rounded-full border border-red-200 text-[#E03A2F] hover:bg-red-50 text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TICKET PASS MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="bg-[#111111] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E03A2F]">
                  P Infinity Digital Pass
                </span>
                <h4 className="font-display text-xl font-bold uppercase">
                  {selectedTicket.tableName}
                </h4>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Perforated lines */}
            <div className="relative flex items-center justify-between bg-white px-4 py-1">
              <div className="w-5 h-5 rounded-full bg-gray-100 -ml-6 border-r border-gray-200" />
              <div className="flex-1 border-b-2 border-dashed border-gray-200 mx-2" />
              <div className="w-5 h-5 rounded-full bg-gray-100 -mr-6 border-l border-gray-200" />
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Booking ID</span>
                  <span className="font-mono font-bold text-gray-900 text-sm">
                    {selectedTicket.bookingNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Date</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {selectedTicket.date}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Time Slot</span>
                  <span className="font-bold text-[#E03A2F] text-sm">
                    {selectedTicket.timeSlot} ({selectedTicket.durationHours}h)
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Payment</span>
                  <span className="font-bold text-gray-900">
                    ₹{selectedTicket.totalAmount} ({selectedTicket.paymentStatus})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">Venue</span>
                  <p className="text-[11px] text-gray-700 font-semibold">
                    100 Feet Road, Indiranagar, Bengaluru
                  </p>
                </div>
                <div className="w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                  <QrCode className="w-10 h-10" />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert("Ticket downloaded as PDF!")}
                  className="btn-red-pill px-5 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Pass</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-gray-200">
            <button
              onClick={() => setReschedulingBooking(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display text-2xl font-bold uppercase text-gray-900 mb-1">
              Reschedule <span className="text-[#E03A2F]">Reservation</span>
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Booking: <strong className="text-gray-900">{reschedulingBooking.bookingNumber}</strong> ({reschedulingBooking.tableName})
            </p>

            {rescheduleMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-[#E03A2F] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{rescheduleMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Choose New Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E03A2F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Choose New Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((s) => {
                    const isSelected = newSlot === s.time;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setNewSlot(s.time)}
                        className={`p-2 rounded-xl border text-xs font-bold text-center transition-all ${
                          isSelected
                            ? "bg-[#E03A2F] text-white border-[#E03A2F]"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        {s.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setReschedulingBooking(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRescheduleSubmit}
                  className="btn-red-pill px-6 py-2.5 text-xs font-bold shadow-md"
                >
                  Confirm New Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
