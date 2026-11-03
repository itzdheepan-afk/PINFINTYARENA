"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { TIME_SLOTS } from "@/data/seedData";
import { TableType, Booking } from "@/types";
import confetti from "canvas-confetti";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle,
  CreditCard,
  QrCode,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  Phone,
  Mail,
  User,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";

interface BookingWizardProps {
  initialTableId?: string | null;
  onClose?: () => void;
  isFullPage?: boolean;
}

export default function BookingWizard({
  initialTableId,
  onClose,
  isFullPage = false,
}: BookingWizardProps) {
  const { tables, isSlotAvailable, createBooking } = useBooking();
  const { user } = useAuth();

  // Step state: 1: Table, 2: Date & Slot, 3: Duration & Add-ons, 4: Contact & Summary, 5: Payment, 6: Confirmed Pass
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedType, setSelectedType] = useState<TableType | "all">("all");
  const [selectedTableId, setSelectedTableId] = useState<string>(
    initialTableId || tables[0]?.id || "table-1"
  );

  // Date selection (defaults to today)
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Slot & Duration
  const [selectedSlot, setSelectedSlot] = useState<string>("07:00 PM");
  const [durationHours, setDurationHours] = useState<number>(2);
  const [playersCount, setPlayersCount] = useState<number>(2);

  // Add-ons & Cue
  const [cuePreference, setCuePreference] = useState<
    "standard" | "ash_pro" | "carbon_fiber" | "bring_own"
  >("ash_pro");
  const [addonBalls, setAddonBalls] = useState<boolean>(true);
  const [coachingSession, setCoachingSession] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  // Contact details (auto-filled if logged in)
  const [customerName, setCustomerName] = useState<string>(user?.name || "Dheepan Raj");
  const [customerEmail, setCustomerEmail] = useState<string>(
    user?.email || "dheepan.raj@example.com"
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    user?.phone || "+91 98450 12345"
  );

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "venue">("upi");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // When initialTableId changes
  useEffect(() => {
    if (initialTableId) {
      setSelectedTableId(initialTableId);
    }
  }, [initialTableId]);

  // Selected table object
  const currentTable = tables.find((t) => t.id === selectedTableId) || tables[0];

  // Generate next 7 dates for easy selection
  const dateOptions = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { dateStr, dayName, formattedDate };
  });

  const { content } = useSiteContent();
  const settings = content.settings;

  // Calculate pricing
  const baseRate = currentTable?.hourlyRate || 600;
  const tableTotal = baseRate * durationHours;
  const addonBallsCost = addonBalls ? settings.addon1GPrice : 0;
  const carbonCueCost = cuePreference === "carbon_fiber" ? settings.addonCarbonCuePrice : 0;
  const coachingCost = coachingSession ? settings.addonCoachPrice : 0;
  const subtotal = tableTotal + addonBallsCost + carbonCueCost + coachingCost;
  const memberDiscount = user?.membershipTier === "gold" ? Math.round(subtotal * (settings.goldMemberDiscountPct / 100)) : 0;
  const tax = Math.round((subtotal - memberDiscount) * (settings.taxRatePct / 100));
  const finalTotal = subtotal - memberDiscount + tax;

  // Filter tables by type
  const filteredTables = selectedType === "all"
    ? tables
    : tables.filter((t) => t.type === selectedType);

  // Handle final checkout
  const handleCompleteBooking = async () => {
    setIsProcessing(true);

    try {
      // Simulate gateway authorization delay
      await new Promise((res) => setTimeout(res, 900));

      const bookingResult = await createBooking({
        tableId: currentTable.id,
        tableName: currentTable.name,
        tableType: currentTable.type,
        date: selectedDate,
        timeSlot: selectedSlot,
        durationHours,
        playersCount,
        customerName,
        customerEmail,
        customerPhone,
        cuePreference,
        addonBalls,
        coachingSession,
        notes,
        subtotal,
        discount: memberDiscount,
        tax,
        totalAmount: finalTotal,
        status: "confirmed",
        paymentStatus: paymentMethod === "venue" ? "venue_pay" : "paid",
        paymentMethod,
      });

      setConfirmedBooking(bookingResult);
      setStep(6);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E03A2F", "#0B4D3A", "#F59E0B", "#111111"],
        });
      } catch {
        // Fallback
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`w-full ${isFullPage ? "max-w-5xl mx-auto" : ""}`}>
      {/* Step Progress Bar */}
      {step < 6 && (
        <div className="mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
            <span className={step >= 1 ? "text-[#E03A2F]" : ""}>1. Table</span>
            <span className={step >= 2 ? "text-[#E03A2F]" : ""}>2. Date & Time</span>
            <span className={step >= 3 ? "text-[#E03A2F]" : ""}>3. Extras</span>
            <span className={step >= 4 ? "text-[#E03A2F]" : ""}>4. Details</span>
            <span className={step >= 5 ? "text-[#E03A2F]" : ""}>5. Payment</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E03A2F] transition-all duration-500 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: CHOOSE TABLE */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
                Choose Your <span className="text-[#E03A2F]">Championship Table</span>
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Strachan 6811 match cloth, heated slate, and broadcast-grade lighting.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-full self-start">
              {(["all", "snooker", "pool", "vip"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-all ${
                    selectedType === t
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
            {filteredTables.map((table) => {
              const isSelected = selectedTableId === table.id;
              const isMaintenance = table.status === "maintenance";

              return (
                <div
                  key={table.id}
                  onClick={() => !isMaintenance && setSelectedTableId(table.id)}
                  className={`relative rounded-2xl p-4 border transition-all cursor-pointer flex gap-4 ${
                    isSelected
                      ? "border-2 border-[#E03A2F] bg-red-50/20 shadow-md ring-1 ring-[#E03A2F]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  } ${isMaintenance ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={table.image}
                      alt={table.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono uppercase">
                      #{table.tableNumber}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">
                          {table.name}
                        </h4>
                        <span className="font-display text-base font-black text-[#E03A2F] whitespace-nowrap">
                          ₹{table.hourlyRate}/h
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">
                        {table.specs}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-600 pt-2 border-t border-gray-100">
                      <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {table.cloth.split(" ")[0]} Cloth
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 font-bold text-[#E03A2F]">
                          <CheckCircle className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-gray-400 group-hover:text-gray-600">Select</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              onClick={() => setStep(2)}
              className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2"
            >
              <span>Next: Date & Time</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATE & TIME-SLOT GRID */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
              Select <span className="text-[#E03A2F]">Date & Time Slot</span>
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Booking for: <strong className="text-gray-900">{currentTable.name}</strong> (₹{currentTable.hourlyRate}/hr)
            </p>
          </div>

          {/* Date Selector Row */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 block">
              1. Choose Play Date
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {dateOptions.map((opt) => {
                const isSelected = selectedDate === opt.dateStr;
                return (
                  <button
                    key={opt.dateStr}
                    onClick={() => setSelectedDate(opt.dateStr)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? "bg-[#E03A2F] text-white border-[#E03A2F] shadow-md shadow-red-500/25"
                        : "bg-white hover:bg-gray-50 border-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="text-[11px] font-semibold uppercase opacity-85">
                      {opt.dayName}
                    </div>
                    <div className="text-sm font-bold mt-0.5">{opt.formattedDate}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Grid with Real-Time Collision Indicator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                2. Select Starting Time Slot
              </label>
              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-300 bg-white" />
                  Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E03A2F]" />
                  Selected
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  Booked
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {TIME_SLOTS.map((slot) => {
                const available = isSlotAvailable(
                  currentTable.id,
                  selectedDate,
                  slot.time,
                  durationHours
                );
                const isSelected = selectedSlot === slot.time;

                return (
                  <button
                    key={slot.id}
                    disabled={!available}
                    onClick={() => available && setSelectedSlot(slot.time)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all relative ${
                      isSelected
                        ? "bg-[#E03A2F] text-white border-[#E03A2F] shadow-md"
                        : available
                        ? "bg-white hover:border-[#E03A2F]/50 border-gray-200 text-gray-800"
                        : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through"
                    }`}
                  >
                    <span className="text-xs font-bold block">{slot.time}</span>
                    <span className="text-[10px] block opacity-75 capitalize">
                      {!available ? "Booked" : slot.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2"
            >
              <span>Next: Duration & Extras</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DURATION, PLAYERS & EXTRAS */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
              Session <span className="text-[#E03A2F]">Duration & Upgrades</span>
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Customize your cuesports session with tournament ball sets & coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Duration Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 block">
                Session Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => setDurationHours(hrs)}
                    className={`py-3 rounded-xl border text-center transition-all ${
                      durationHours === hrs
                        ? "bg-[#E03A2F] text-white border-[#E03A2F] font-bold shadow-md"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm block">{hrs} {hrs === 1 ? "Hour" : "Hours"}</span>
                    <span className="text-[10px] opacity-75">₹{baseRate * hrs}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Players Count */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 block">
                Number of Players
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlayersCount(p)}
                    className={`py-3 rounded-xl border text-center transition-all ${
                      playersCount === p
                        ? "bg-gray-900 text-white border-gray-900 font-bold shadow-md"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm block">{p} {p === 1 ? "Player" : "Players"}</span>
                    <span className="text-[10px] opacity-75">{p <= 2 ? "Singles" : "Doubles"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cue Stick Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 block">
              Cue Stick Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "ash_pro", label: "Pro Ash Cue", desc: "Hand-spliced English Ash (Free)", cost: 0 },
                { id: "carbon_fiber", label: "Predator Carbon", desc: "Low-deflection shaft (+₹200)", cost: 200 },
                { id: "standard", label: "Club Standard", desc: "Maple house cue (Free)", cost: 0 },
                { id: "bring_own", label: "Bring My Own", desc: "Using personal cue", cost: 0 },
              ].map((cue) => (
                <button
                  key={cue.id}
                  onClick={() => setCuePreference(cue.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    cuePreference === cue.id
                      ? "border-[#E03A2F] bg-red-50/30 text-gray-900 ring-1 ring-[#E03A2F]"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-xs font-bold">{cue.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{cue.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-on toggles */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
              Premium Arena Add-Ons
            </label>

            <div
              onClick={() => setAddonBalls(!addonBalls)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                addonBalls ? "border-[#E03A2F] bg-red-50/20" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-[#E03A2F] flex items-center justify-center font-bold text-xs">
                  1G
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">
                    Aramith 1G Tournament Ball Set Upgrade
                  </h5>
                  <p className="text-[11px] text-gray-500">
                    Calibrated weight tolerance within 1 gram, polished with Taom ball cleaner.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">+₹150</span>
                <input
                  type="checkbox"
                  checked={addonBalls}
                  onChange={() => {}}
                  className="rounded text-[#E03A2F] focus:ring-[#E03A2F]"
                />
              </div>
            </div>

            <div
              onClick={() => setCoachingSession(!coachingSession)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                coachingSession ? "border-[#E03A2F] bg-red-50/20" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  PRO
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">
                    30-Minute Master Coach Stance & Cue-Action Clinic
                  </h5>
                  <p className="text-[11px] text-gray-500">
                    1-on-1 warmup alignment with certified cuesports coach before your match.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">+₹500</span>
                <input
                  type="checkbox"
                  checked={coachingSession}
                  onChange={() => {}}
                  className="rounded text-[#E03A2F] focus:ring-[#E03A2F]"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2"
            >
              <span>Next: Contact Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONTACT DETAILS & BILLING SUMMARY */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
              Player Details & <span className="text-[#E03A2F]">Summary</span>
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              We send your instant booking pass and digital QR ticket via SMS and WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Contact Form */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#E03A2F] text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#E03A2F] text-sm shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      placeholder="player@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#E03A2F] text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Special Notes or Table Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Table ironed before arrival, 2 extra chalks, iced espresso..."
                  className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#E03A2F] text-sm shadow-sm"
                />
              </div>

              {/* Perks notification */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Free cancellation & rescheduling permitted up to 2 hours before play.
                </span>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="md:col-span-5 bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <h4 className="font-display text-lg font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Reservation Receipt
              </h4>

              <div className="space-y-2 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium">{currentTable.name}</span>
                  <span className="text-gray-900 font-bold">
                    {durationHours}h × ₹{baseRate} = ₹{tableTotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Date & Slot:</span>
                  <span className="text-gray-900 font-medium">
                    {selectedDate} • {selectedSlot}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Players:</span>
                  <span className="text-gray-900 font-medium">{playersCount} Players</span>
                </div>

                {addonBalls && (
                  <div className="flex justify-between">
                    <span>Aramith 1G Ball Set</span>
                    <span className="text-gray-900 font-medium">+₹150</span>
                  </div>
                )}
                {cuePreference === "carbon_fiber" && (
                  <div className="flex justify-between">
                    <span>Predator Carbon Shaft</span>
                    <span className="text-gray-900 font-medium">+₹200</span>
                  </div>
                )}
                {coachingSession && (
                  <div className="flex justify-between">
                    <span>30m Coach Clinic</span>
                    <span className="text-gray-900 font-medium">+₹500</span>
                  </div>
                )}

                {memberDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Gold Member Discount (15%)</span>
                    <span>-₹{memberDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-500">
                  <span>GST & Maintenance (18%)</span>
                  <span>+₹{tax}</span>
                </div>
              </div>

              {/* Final Amount */}
              <div className="flex items-baseline justify-between pt-1 mb-6">
                <span className="font-bold text-gray-900 text-sm">Total Payable</span>
                <div className="text-right">
                  <span className="font-display text-3xl font-black text-[#E03A2F]">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 block">All taxes included</span>
                </div>
              </div>

              <button
                onClick={() => setStep(5)}
                className="w-full btn-red-pill py-3 text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start pt-2">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PAYMENT GATEWAY (MOCK RAZORPAY / STRIPE) */}
      {step === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-gray-900">
              Select <span className="text-[#E03A2F]">Payment Method</span>
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Secure 256-bit SSL encrypted cuesports transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Payment Method Selector */}
            <div className="md:col-span-7 space-y-3">
              {[
                {
                  id: "upi",
                  title: "Instant UPI (Google Pay, PhonePe, Paytm, QR)",
                  badge: "Zero Fee",
                  icon: QrCode,
                },
                {
                  id: "card",
                  title: "Credit / Debit Card (Visa, Mastercard, RuPay)",
                  badge: "Instant Approval",
                  icon: CreditCard,
                },
                {
                  id: "netbanking",
                  title: "Net Banking (All Major Indian Banks)",
                  badge: "Secure",
                  icon: ShieldCheck,
                },
                {
                  id: "venue",
                  title: "Pay at Arena Counter (Cash / POS on Arrival)",
                  badge: "Flexible",
                  icon: Users,
                },
              ].map((m) => {
                const IconComponent = m.icon;
                const isSelected = paymentMethod === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#E03A2F] bg-red-50/25 ring-1 ring-[#E03A2F] shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? "bg-[#E03A2F] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                          {m.title}
                        </h5>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {m.badge}
                        </span>
                      </div>
                    </div>

                    <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center p-0.5">
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-[#E03A2F]" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* UPI QR Simulation if UPI selected */}
              {paymentMethod === "upi" && (
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-center animate-fadeIn">
                  <span className="text-xs font-semibold text-gray-700 block mb-2">
                    Scan using any UPI App to Pay ₹{finalTotal}
                  </span>
                  <div className="inline-block p-3 bg-white rounded-xl shadow-inner border border-gray-200 mb-2">
                    {/* Simulated SVG QR Code */}
                    <div className="w-32 h-32 bg-gray-900 rounded flex flex-col items-center justify-center p-2 text-white text-[9px] font-mono">
                      <QrCode className="w-20 h-20 text-white" />
                      <span>UPI: pia@arena</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Supports Google Pay, PhonePe, Paytm, BHIM, Cred & Banking UPI
                  </p>
                </div>
              )}
            </div>

            {/* Order Confirmation Sidebar */}
            <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h4 className="font-display text-lg font-bold uppercase tracking-wider text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Payment Summary
              </h4>

              <div className="text-xs text-gray-600 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Table:</span>
                  <strong className="text-gray-900">{currentTable.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Slot:</span>
                  <span className="text-gray-900">{selectedDate} @ {selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-gray-900">{durationHours} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="text-gray-900">{customerName}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-gray-900 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-[#E03A2F] font-display text-2xl font-black">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="w-full btn-red-pill py-3.5 text-sm font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authorizing Reservation...
                  </span>
                ) : (
                  <span>
                    {paymentMethod === "venue"
                      ? "Confirm Reservation (Pay at Venue)"
                      : `Pay ₹${finalTotal} & Confirm`}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start pt-2">
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: DIGITAL CONFIRMED BOOKING PASS TICKET */}
      {step === 6 && confirmedBooking && (
        <div className="space-y-6 animate-fadeIn text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Booking Confirmed & Guaranteed!</span>
          </div>

          <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-gray-900 tracking-tight leading-none">
            YOU ARE ALL SET TO <span className="text-[#E03A2F]">BREAK!</span>
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto">
            Your match session is reserved on Strachan tournament baize. An instant confirmation with directions was sent to <strong>{confirmedBooking.customerPhone}</strong>.
          </p>

          {/* Luxury Digital Ticket Pass */}
          <div className="max-w-md mx-auto bg-white rounded-[28px] overflow-hidden shadow-2xl border-2 border-[#E03A2F]/30 text-left relative">
            {/* Ticket Header */}
            <div className="bg-[#111111] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E03A2F]">
                  P Infinity Arena Access Pass
                </span>
                <h4 className="font-display text-xl font-bold uppercase">
                  {confirmedBooking.tableName}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase block">Booking ID</span>
                <span className="font-mono text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                  {confirmedBooking.bookingNumber}
                </span>
              </div>
            </div>

            {/* Perforated ticket edge illusion */}
            <div className="relative flex items-center justify-between bg-white px-4 py-1">
              <div className="w-5 h-5 rounded-full bg-gray-100 -ml-6 border-r border-gray-200" />
              <div className="flex-1 border-b-2 border-dashed border-gray-200 mx-2" />
              <div className="w-5 h-5 rounded-full bg-gray-100 -mr-6 border-l border-gray-200" />
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Date</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {confirmedBooking.date}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Time Slot</span>
                  <span className="font-bold text-[#E03A2F] text-sm">
                    {confirmedBooking.timeSlot} ({confirmedBooking.durationHours}h)
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Player Name</span>
                  <span className="font-bold text-gray-900">{confirmedBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Payment Status</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold capitalize">
                    {confirmedBooking.paymentStatus === "paid" ? "Paid Online" : "Pay at Venue"}
                  </span>
                </div>
              </div>

              {/* QR Code & Arena Address */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">Arena Address</span>
                  <p className="text-[11px] text-gray-700 font-medium">
                    100 Feet Road, Indiranagar, Bengaluru
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    Valet Parking Available
                  </p>
                </div>

                <div className="w-16 h-16 bg-gray-100 rounded-lg p-1 border border-gray-200 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-gray-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/dashboard"
              className="btn-red-pill px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <span>Manage in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                alert("Pass downloaded to your device as PDF!");
              }}
              className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Ticket</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
