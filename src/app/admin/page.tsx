"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useAuth } from "@/context/AuthContext";
import { TableItem, Booking, TableType } from "@/types";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Percent,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Settings,
  Plus,
  RefreshCw,
  Clock,
  Shield,
  Layers,
  Edit2,
  Save,
  Trash2,
  Eye,
  ExternalLink,
  Sliders,
  Type,
  Image as ImageIcon,
  HelpCircle,
  Award,
  Phone,
  RotateCcw,
  Download,
  Upload,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type AdminTab =
  | "analytics"
  | "hero"
  | "services"
  | "about"
  | "events"
  | "membership"
  | "gallery"
  | "testimonials"
  | "faqs"
  | "contact"
  | "tables"
  | "bookings"
  | "settings";

export default function AdminPage() {
  const {
    tables,
    bookings,
    getStats,
    updateTableStatus,
    addTable,
    editTable,
    deleteTable,
    cancelBooking,
    deleteBooking,
    resetTablesAndBookings,
  } = useBooking();

  const {
    content,
    updateHero,
    updateServices,
    updateAbout,
    updateEvents,
    updateMembership,
    updateGallery,
    updateTestimonials,
    updateFaqs,
    updateContact,
    updateFooter,
    updateSettings,
    resetAllContent,
    exportJson,
    importJson,
  } = useSiteContent();

  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter for Bookings
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

  // Local Form States for CMS editing
  const [heroForm, setHeroForm] = useState(content.hero);
  const [servicesForm, setServicesForm] = useState(content.services);
  const [aboutForm, setAboutForm] = useState(content.about);
  const [eventsForm, setEventsForm] = useState(content.events);
  const [membershipForm, setMembershipForm] = useState(content.membership);
  const [galleryForm, setGalleryForm] = useState(content.gallery);
  const [testimonialsForm, setTestimonialsForm] = useState(content.testimonials);
  const [faqsForm, setFaqsForm] = useState(content.faqs);
  const [contactForm, setContactForm] = useState(content.contact);
  const [footerForm, setFooterForm] = useState(content.footer);
  const [settingsForm, setSettingsForm] = useState(content.settings);

  // Table form modal / state
  const [editingTable, setEditingTable] = useState<TableItem | null>(null);
  const [isNewTableModalOpen, setIsNewTableModalOpen] = useState(false);
  const [newTableData, setNewTableData] = useState<Partial<TableItem>>({
    name: "Match Snooker Table",
    type: "snooker",
    tableNumber: tables.length + 1,
    hourlyRate: 600,
    specs: "Full-size 12ft x 6ft • Italian Slate",
    cloth: "Strachan 6811 30oz",
    size: "12ft Tournament",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    description: "Broadcast-grade tournament match table.",
    features: ["Aramith Balls", "Match Lighting", "Heated Slate"],
    isAvailable: true,
    status: "available",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const stats = getStats();

  // Save Handlers for each CMS tab
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    showToast("Hero section updated successfully! View live changes on the homepage.");
  };

  const handleSaveServices = (e: React.FormEvent) => {
    e.preventDefault();
    updateServices(servicesForm);
    showToast("Services & Academy cards updated successfully!");
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutForm);
    showToast("About section, tilted cards & statistics saved!");
  };

  const handleSaveEvents = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvents(eventsForm);
    showToast("Upcoming tournaments and leagues updated!");
  };

  const handleSaveMembership = (e: React.FormEvent) => {
    e.preventDefault();
    updateMembership(membershipForm);
    showToast("Membership pricing tiers and benefits saved!");
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    updateGallery(galleryForm);
    showToast("Gallery photos and categories updated!");
  };

  const handleSaveTestimonials = (e: React.FormEvent) => {
    e.preventDefault();
    updateTestimonials(testimonialsForm);
    showToast("Player testimonials saved!");
  };

  const handleSaveFaqs = (e: React.FormEvent) => {
    e.preventDefault();
    updateFaqs(faqsForm);
    showToast("FAQ questions and answers saved!");
  };

  const handleSaveContactAndFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    updateFooter(footerForm);
    showToast("Venue contact details, hours, and footer links updated!");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast("Arena pricing formulas, tax rates, and add-on costs updated!");
  };

  const handleResetEverything = () => {
    if (confirm("Are you sure you want to reset ALL content, tables, and bookings to default factory state?")) {
      resetAllContent();
      resetTablesAndBookings();
      setHeroForm(content.hero);
      setServicesForm(content.services);
      setAboutForm(content.about);
      setEventsForm(content.events);
      setMembershipForm(content.membership);
      setGalleryForm(content.gallery);
      setTestimonialsForm(content.testimonials);
      setFaqsForm(content.faqs);
      setContactForm(content.contact);
      setFooterForm(content.footer);
      setSettingsForm(content.settings);
      showToast("Entire website reset to factory defaults!");
    }
  };

  const handleExportJson = () => {
    const jsonStr = exportJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `p-infinity-arena-cms-backup-${Date.now()}.json`;
    a.click();
    showToast("CMS configuration exported as JSON backup!");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const contentStr = event.target?.result as string;
      const success = importJson(contentStr);
      if (success) {
        showToast("CMS configuration imported successfully!");
      } else {
        alert("Invalid JSON configuration file.");
      }
    };
    reader.readAsText(file);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerPhone.includes(bookingSearch);

    const matchesStatus = bookingStatusFilter === "all" ? true : b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-emerald-500">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#111111] text-white rounded-[28px] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E03A2F] to-[#FF6B6B] text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                P Infinity <span className="text-[#E03A2F]">Master Control Panel</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                100% Editable CMS
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Full administrative authority over hero copy, tables, tournaments, memberships, pricing, and live bookings.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-[#E03A2F]" />
            <span>View Live Website</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 transition-colors"
          >
            Player Portal
          </Link>

          <Link
            href="/book"
            className="btn-red-pill px-5 py-2 text-xs font-bold shadow-md"
          >
            + Manual Walk-In
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Today&apos;s Revenue</span>
            <DollarSign className="w-4 h-4 text-[#E03A2F]" />
          </div>
          <div className="font-display text-3xl sm:text-4xl font-black text-gray-900">
            {settingsForm.currencySymbol}{stats.todayRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Tax included ({settingsForm.taxRatePct}% GST)
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Arena Occupancy</span>
            <Percent className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display text-3xl sm:text-4xl font-black text-gray-900">
            {stats.occupancyRate}%
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {stats.activeTablesCount} tables active
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Reservations</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-display text-3xl sm:text-4xl font-black text-gray-900">
            {stats.totalBookings}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Live database records
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Active Tables</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-display text-3xl sm:text-4xl font-black text-gray-900">
            {stats.activeTablesCount} / {tables.length}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            100% collision protected
          </p>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm mb-8 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {[
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "tables", label: `Tables (${tables.length})`, icon: Layers },
          { id: "bookings", label: `Bookings (${bookings.length})`, icon: Calendar },
          { id: "hero", label: "Hero & Marquee", icon: Type },
          { id: "services", label: "Services Slider", icon: Award },
          { id: "about", label: "About & Stats", icon: Shield },
          { id: "events", label: "Events & Tournaments", icon: Calendar },
          { id: "membership", label: "Memberships", icon: DollarSign },
          { id: "gallery", label: "Gallery", icon: ImageIcon },
          { id: "testimonials", label: "Testimonials", icon: Users },
          { id: "faqs", label: "FAQs", icon: HelpCircle },
          { id: "contact", label: "Contact & Footer", icon: Phone },
          { id: "settings", label: "Settings & Backups", icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#E03A2F] text-white shadow-md shadow-red-500/20"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: ANALYTICS & CHARTS                                      */}
      {/* ============================================================== */}
      {activeTab === "analytics" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Trend SVG Chart */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-gray-900">
                    Daily Revenue Performance ({settingsForm.currencySymbol})
                  </h3>
                  <p className="text-xs text-gray-500">Gross table booking receipts over the past 7 days</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  +24.8% WoW
                </span>
              </div>

              <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 border-b border-gray-200 pb-2">
                {[
                  { day: "Thu", rev: 3800, height: "45%" },
                  { day: "Fri", rev: 6400, height: "75%" },
                  { day: "Sat", rev: 8900, height: "98%" },
                  { day: "Sun", rev: 8200, height: "92%" },
                  { day: "Mon", rev: 4100, height: "48%" },
                  { day: "Tue", rev: 5200, height: "62%" },
                  { day: "Today", rev: stats.todayRevenue, height: "85%", active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {settingsForm.currencySymbol}{item.rev}
                    </span>
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        item.active
                          ? "bg-[#E03A2F] shadow-lg shadow-red-500/25"
                          : "bg-gray-200 group-hover:bg-gray-400"
                      }`}
                      style={{ height: item.height }}
                    />
                    <span className={`text-[11px] font-bold ${item.active ? "text-[#E03A2F]" : "text-gray-500"}`}>
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hourly Occupancy Heat Distribution */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-gray-900">
                    Peak Hour Occupancy Heatmap
                  </h3>
                  <p className="text-xs text-gray-500">Distribution across operational time slots</p>
                </div>
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  15 Slots / Day
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { time: "Morning (09:00 AM – 12:00 PM)", pct: 40, color: "bg-blue-500" },
                  { time: "Afternoon (12:00 PM – 05:00 PM)", pct: 65, color: "bg-amber-500" },
                  { time: "Prime Evening (05:00 PM – 10:00 PM)", pct: 96, color: "bg-[#E03A2F]" },
                  { time: "Late Night (10:00 PM – 02:00 AM)", pct: 82, color: "bg-purple-600" },
                ].map((slot, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>{slot.time}</span>
                      <span className="font-bold text-gray-900">{slot.pct}% Booked</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${slot.color}`}
                        style={{ width: `${slot.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: TABLES & INVENTORY                                       */}
      {/* ============================================================== */}
      {activeTab === "tables" && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
                Arena Tables & Hourly Tariffs
              </h3>
              <p className="text-xs text-gray-500">
                Manage championship snooker tables, pool tables, VIP suites, and pricing.
              </p>
            </div>
            <button
              onClick={() => setIsNewTableModalOpen(true)}
              className="btn-red-pill px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Table</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((table) => {
              const isMaintenance = table.status === "maintenance";

              return (
                <div
                  key={table.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                    isMaintenance
                      ? "border-amber-200 bg-amber-50/20"
                      : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  <div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <Image
                        src={table.image}
                        alt={table.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono uppercase">
                        #{table.tableNumber} • {table.type}
                      </div>
                      <span
                        className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          table.status === "available"
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {table.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-base">{table.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{table.specs}</p>
                    <p className="text-[11px] text-emerald-800 font-semibold mb-3">
                      Cloth: {table.cloth}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-500">Hourly Rate:</span>
                      <span className="font-display text-2xl font-black text-[#E03A2F]">
                        {settingsForm.currencySymbol}{table.hourlyRate}/h
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const next = table.status === "maintenance" ? "available" : "maintenance";
                          updateTableStatus(table.id, next);
                          showToast(`Table #${table.tableNumber} marked as ${next}`);
                        }}
                        className={`py-2 px-3 rounded-xl text-[11px] font-bold transition-colors ${
                          isMaintenance
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        }`}
                      >
                        {isMaintenance ? "Set to Active" : "Ironing / Maint."}
                      </button>

                      <button
                        onClick={() => {
                          const newRate = prompt(`Enter new hourly rate for ${table.name} in ₹:`, table.hourlyRate.toString());
                          if (newRate && !isNaN(Number(newRate))) {
                            updateTableStatus(table.id, table.status, Number(newRate));
                            showToast(`Updated rate for ${table.name} to ₹${newRate}/h`);
                          }
                        }}
                        className="py-2 px-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-[11px] font-bold"
                      >
                        Edit Price
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${table.name}?`)) {
                          deleteTable(table.id);
                          showToast(`Table ${table.name} removed from inventory.`);
                        }
                      }}
                      className="w-full text-center text-[10px] text-red-500 hover:underline mt-2.5 font-medium"
                    >
                      Delete Table
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* New Table Modal */}
          {isNewTableModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
                <h3 className="font-display text-2xl font-bold uppercase text-gray-900 mb-1">
                  Add New <span className="text-[#E03A2F]">Arena Table</span>
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Define the specifications, cloth type, and hourly tariff for this table.
                </p>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Table Name</label>
                    <input
                      type="text"
                      value={newTableData.name}
                      onChange={(e) => setNewTableData({ ...newTableData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Type</label>
                      <select
                        value={newTableData.type}
                        onChange={(e) => setNewTableData({ ...newTableData, type: e.target.value as TableType })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                      >
                        <option value="snooker">English Snooker 12ft</option>
                        <option value="pool">American Pool 9ft</option>
                        <option value="vip">VIP Private Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Hourly Rate (₹)</label>
                      <input
                        type="number"
                        value={newTableData.hourlyRate}
                        onChange={(e) => setNewTableData({ ...newTableData, hourlyRate: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Cloth Specification</label>
                    <input
                      type="text"
                      value={newTableData.cloth}
                      onChange={(e) => setNewTableData({ ...newTableData, cloth: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={newTableData.image}
                      onChange={(e) => setNewTableData({ ...newTableData, image: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Specifications</label>
                    <input
                      type="text"
                      value={newTableData.specs}
                      onChange={(e) => setNewTableData({ ...newTableData, specs: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setIsNewTableModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const tableToAdd: TableItem = {
                          id: `table-${Date.now()}`,
                          name: newTableData.name || "Match Table",
                          type: newTableData.type || "snooker",
                          tableNumber: tables.length + 1,
                          hourlyRate: newTableData.hourlyRate || 600,
                          specs: newTableData.specs || "Championship grade",
                          cloth: newTableData.cloth || "Strachan 6811",
                          size: newTableData.size || "12ft",
                          image: newTableData.image || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
                          description: newTableData.description || "Precision table",
                          features: newTableData.features || ["Tournament Balls"],
                          isAvailable: true,
                          status: "available",
                        };
                        addTable(tableToAdd);
                        setIsNewTableModalOpen(false);
                        showToast(`New table #${tableToAdd.tableNumber} added to arena!`);
                      }}
                      className="btn-red-pill px-6 py-2.5 text-xs font-bold"
                    >
                      Add Table to Inventory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: BOOKINGS MANAGER                                        */}
      {/* ============================================================== */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name, phone, or Booking ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E03A2F]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Filter:</span>
              <select
                value={bookingStatusFilter}
                onChange={(e) => setBookingStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
              >
                <option value="all">All Statuses ({bookings.length})</option>
                <option value="confirmed">Confirmed</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Table</th>
                  <th className="py-3 px-3">Date & Slot</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-gray-900">{b.customerName}</div>
                      <div className="text-gray-400 text-[10px]">{b.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-gray-800">
                      {b.tableName}
                    </td>
                    <td className="py-3.5 px-3">
                      <div>{b.date}</div>
                      <div className="text-[#E03A2F] font-semibold">{b.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">
                      {b.durationHours}h ({b.playersCount}P)
                    </td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">
                      {settingsForm.currencySymbol}{b.totalAmount}
                      <span className="block text-[10px] text-gray-400 uppercase">
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "rescheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      {b.status !== "cancelled" ? (
                        <button
                          onClick={() => {
                            if (confirm(`Cancel booking ${b.bookingNumber}?`)) {
                              cancelBooking(b.id);
                              showToast(`Booking ${b.bookingNumber} marked as cancelled.`);
                            }
                          }}
                          className="text-[#E03A2F] hover:underline font-semibold text-[11px]"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            deleteBooking(b.id);
                            showToast(`Booking record deleted.`);
                          }}
                          className="text-gray-400 hover:text-red-500 font-semibold text-[11px]"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: HERO & BRANDING CMS                                     */}
      {/* ============================================================== */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              Hero Section & Sponsor Marquee CMS
            </h3>
            <p className="text-xs text-gray-500">
              Customize the prominent hero banner, uppercase display typography, background photo, and sponsor strip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Badge Text (Top Pill)</label>
              <input
                type="text"
                value={heroForm.badgeText}
                onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">CTA Button Text</label>
              <input
                type="text"
                value={heroForm.ctaText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Headline Part 1 (White)</label>
              <input
                type="text"
                value={heroForm.headlineLine1}
                onChange={(e) => setHeroForm({ ...heroForm, headlineLine1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-red-600 block mb-1">Headline Highlight (Signature Red)</label>
              <input
                type="text"
                value={heroForm.headlineHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-red-300 text-sm bg-red-50/20"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Headline Part 2 (White)</label>
              <input
                type="text"
                value={heroForm.headlineLine2}
                onChange={(e) => setHeroForm({ ...heroForm, headlineLine2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-gray-700 block mb-1">Hero Description Paragraph</label>
            <textarea
              rows={3}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
            />
          </div>

          <div className="text-xs">
            <label className="font-bold text-gray-700 block mb-1">Background Image URL</label>
            <input
              type="text"
              value={heroForm.bgImageUrl}
              onChange={(e) => setHeroForm({ ...heroForm, bgImageUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-sm font-mono"
            />
          </div>

          {/* Cinematic Hero Slides Manager */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E03A2F]" />
                  <span>Cinematic Video Slider Frames ({(heroForm.slides || []).length})</span>
                </h4>
                <p className="text-xs text-gray-500">
                  Manage the 5 authentic arena photo slides, Ken Burns camera motion, and neon lighting atmosphere.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newSlide = {
                    id: `slide-${Date.now()}`,
                    badge: "NEW ARENA EXPERIENCE",
                    badgeColor: "green" as const,
                    headlineP1: "PERFECT BREAK.",
                    headlineHighlight: "PURE FOCUS.",
                    headlineP2: "CHAMPIONSHIP ARENA.",
                    description: "Experience world-class championship baize and vintage dome lighting.",
                    quote: "Calm Mind. Sharp Focus. Perfect Shot.",
                    image: "/images/arena-action.jpg",
                    ctaText: "Book a Table",
                    accentGlow: "green" as const,
                  };
                  setHeroForm({
                    ...heroForm,
                    slides: [...(heroForm.slides || []), newSlide],
                  });
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#E03A2F] text-white hover:bg-[#c93026] text-xs font-bold shadow-sm"
              >
                + Add Cinematic Slide
              </button>
            </div>

            <div className="space-y-4">
              {(heroForm.slides || []).map((slide, sIdx) => (
                <div
                  key={slide.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#E03A2F] text-white text-xs font-mono font-bold flex items-center justify-center">
                        {sIdx + 1}
                      </span>
                      <span className="font-bold text-sm text-gray-800">
                        {slide.badge || `Slide ${sIdx + 1}`}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          slide.accentGlow === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : slide.accentGlow === "amber"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {slide.accentGlow || "green"} Neon Theme
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = (heroForm.slides || []).filter((s) => s.id !== slide.id);
                        setHeroForm({ ...heroForm, slides: updated });
                      }}
                      className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, badge: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Neon Lighting Theme</label>
                      <select
                        value={slide.accentGlow || "green"}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          const val = e.target.value as "green" | "blue" | "amber" | "red";
                          updated[sIdx] = { ...slide, accentGlow: val, badgeColor: val };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      >
                        <option value="green">Emerald Green Neon (Snooker Zone)</option>
                        <option value="blue">Electric Blue Neon (PS5 Gaming)</option>
                        <option value="amber">Warm Amber (Foosball & Lounge)</option>
                        <option value="red">Signature Crimson Red</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Desktop 4K Image (Widescreen)</label>
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, image: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Mobile 4K Portrait Image (Phone View)</label>
                      <input
                        type="text"
                        value={slide.mobileImage || ""}
                        placeholder="Leave blank to use desktop image"
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, mobileImage: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs font-mono bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Headline Part 1</label>
                      <input
                        type="text"
                        value={slide.headlineP1}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, headlineP1: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-red-600 block mb-1">Highlight Word</label>
                      <input
                        type="text"
                        value={slide.headlineHighlight}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, headlineHighlight: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-red-300 text-xs bg-red-50/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Headline Part 2</label>
                      <input
                        type="text"
                        value={slide.headlineP2}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, headlineP2: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">Creed Quote (e.g. from Neon Sign)</label>
                      <input
                        type="text"
                        value={slide.quote || ""}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, quote: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600 block mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={slide.ctaText}
                        onChange={(e) => {
                          const updated = [...(heroForm.slides || [])];
                          updated[sIdx] = { ...slide, ctaText: e.target.value };
                          setHeroForm({ ...heroForm, slides: updated });
                        }}
                        className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-gray-600 block mb-1">Slide Description</label>
                    <textarea
                      rows={2}
                      value={slide.description}
                      onChange={(e) => {
                        const updated = [...(heroForm.slides || [])];
                        updated[sIdx] = { ...slide, description: e.target.value };
                        setHeroForm({ ...heroForm, slides: updated });
                      }}
                      className="w-full p-2 rounded-xl border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors editor */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-900 text-sm">Official Marquee Partners ({heroForm.sponsors.length})</h4>
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter partner/sponsor brand name:");
                  const badge = prompt("Enter badge (e.g. Official Cloth, Pro Cue):", "Official Partner");
                  if (name) {
                    setHeroForm({
                      ...heroForm,
                      sponsors: [...heroForm.sponsors, { id: `sp-${Date.now()}`, name, badge: badge || "Partner" }],
                    });
                  }
                }}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold"
              >
                + Add Partner
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {heroForm.sponsors.map((sp, idx) => (
                <div key={sp.id} className="p-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{sp.name}</span>
                    <span className="text-[10px] text-gray-500">{sp.badge}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroForm({
                        ...heroForm,
                        sponsors: heroForm.sponsors.filter((s) => s.id !== sp.id),
                      });
                    }}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Hero Section Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 5: SERVICES & ACADEMY CMS                                  */}
      {/* ============================================================== */}
      {activeTab === "services" && (
        <form onSubmit={handleSaveServices} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              Services & Academy Slider CMS
            </h3>
            <p className="text-xs text-gray-500">
              Edit the horizontal cards: Table Rentals, Coaching Academy, Tournaments, and Lounge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Subtitle</label>
              <input
                type="text"
                value={servicesForm.subtitle}
                onChange={(e) => setServicesForm({ ...servicesForm, subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Title Part 1</label>
              <input
                type="text"
                value={servicesForm.titlePart1}
                onChange={(e) => setServicesForm({ ...servicesForm, titlePart1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-red-600 block mb-1">Highlighted Word (Red)</label>
              <input
                type="text"
                value={servicesForm.titleHighlight}
                onChange={(e) => setServicesForm({ ...servicesForm, titleHighlight: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-red-300 text-sm bg-red-50/20"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Title Part 2</label>
              <input
                type="text"
                value={servicesForm.titlePart2}
                onChange={(e) => setServicesForm({ ...servicesForm, titlePart2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="font-bold text-gray-900 text-sm">Services Cards ({servicesForm.items.length})</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesForm.items.map((srv, idx) => (
                <div key={srv.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 uppercase">Card #{idx + 1}: {srv.title}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={srv.highlight}
                        onChange={(e) => {
                          const updated = servicesForm.items.map((item) =>
                            item.id === srv.id ? { ...item, highlight: e.target.checked } : item
                          );
                          setServicesForm({ ...servicesForm, items: updated });
                        }}
                        className="rounded text-[#E03A2F]"
                      />
                      <span className="text-[10px] text-red-600 font-semibold">Red Card Style</span>
                    </label>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Title</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = servicesForm.items.map((item) =>
                          item.id === srv.id ? { ...item, title: e.target.value } : item
                        );
                        setServicesForm({ ...servicesForm, items: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Tagline</label>
                    <input
                      type="text"
                      value={srv.tagline}
                      onChange={(e) => {
                        const updated = servicesForm.items.map((item) =>
                          item.id === srv.id ? { ...item, tagline: e.target.value } : item
                        );
                        setServicesForm({ ...servicesForm, items: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Description</label>
                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = servicesForm.items.map((item) =>
                          item.id === srv.id ? { ...item, description: e.target.value } : item
                        );
                        setServicesForm({ ...servicesForm, items: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Image URL</label>
                    <input
                      type="text"
                      value={srv.image}
                      onChange={(e) => {
                        const updated = servicesForm.items.map((item) =>
                          item.id === srv.id ? { ...item, image: e.target.value } : item
                        );
                        setServicesForm({ ...servicesForm, items: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Services Slider</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 6: ABOUT & HERITAGE CMS                                    */}
      {/* ============================================================== */}
      {activeTab === "about" && (
        <form onSubmit={handleSaveAbout} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              About Section & 3 Tilted Photo Cards CMS
            </h3>
            <p className="text-xs text-gray-500">
              Edit the centered heading, founding story, 3 overlapping tilted cards (-6deg, 0deg, 6deg), and live stat counters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Subtitle</label>
              <input
                type="text"
                value={aboutForm.subtitle}
                onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Title Part 1</label>
              <input
                type="text"
                value={aboutForm.titlePart1}
                onChange={(e) => setAboutForm({ ...aboutForm, titlePart1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-red-600 block mb-1">Highlighted Words</label>
              <input
                type="text"
                value={aboutForm.titleHighlight}
                onChange={(e) => setAboutForm({ ...aboutForm, titleHighlight: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-red-300 text-sm bg-red-50/20"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Title Part 2</label>
              <input
                type="text"
                value={aboutForm.titlePart2}
                onChange={(e) => setAboutForm({ ...aboutForm, titlePart2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-gray-700 block mb-1">Founding Story & Heritage Description</label>
            <textarea
              rows={4}
              value={aboutForm.story}
              onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#E03A2F]"
            />
          </div>

          {/* 3 Tilted Cards */}
          <div className="space-y-4 pt-2">
            <h4 className="font-bold text-gray-900 text-sm">3 Overlapping Tilted Cards</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                <span className="font-bold text-gray-900 block">Card 1 (Left Tilt -6°)</span>
                <div>
                  <label className="text-[10px] text-gray-500 block">Caption</label>
                  <input
                    type="text"
                    value={aboutForm.card1Title}
                    onChange={(e) => setAboutForm({ ...aboutForm, card1Title: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Image URL</label>
                  <input
                    type="text"
                    value={aboutForm.card1Image}
                    onChange={(e) => setAboutForm({ ...aboutForm, card1Image: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-red-200 bg-red-50/20 space-y-2">
                <span className="font-bold text-red-900 block">Card 2 (Center Flagship 0°)</span>
                <div>
                  <label className="text-[10px] text-gray-500 block">Badge Tag</label>
                  <input
                    type="text"
                    value={aboutForm.card2Tag}
                    onChange={(e) => setAboutForm({ ...aboutForm, card2Tag: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Title</label>
                  <input
                    type="text"
                    value={aboutForm.card2Title}
                    onChange={(e) => setAboutForm({ ...aboutForm, card2Title: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Image URL</label>
                  <input
                    type="text"
                    value={aboutForm.card2Image}
                    onChange={(e) => setAboutForm({ ...aboutForm, card2Image: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                <span className="font-bold text-gray-900 block">Card 3 (Right Tilt +6°)</span>
                <div>
                  <label className="text-[10px] text-gray-500 block">Caption</label>
                  <input
                    type="text"
                    value={aboutForm.card3Title}
                    onChange={(e) => setAboutForm({ ...aboutForm, card3Title: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Image URL</label>
                  <input
                    type="text"
                    value={aboutForm.card3Image}
                    onChange={(e) => setAboutForm({ ...aboutForm, card3Image: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Metrics */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-gray-900 text-sm">Stats Metrics Strip ({aboutForm.stats.length})</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {aboutForm.stats.map((st, i) => (
                <div key={st.id} className="p-3 rounded-xl border border-gray-200 bg-white space-y-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-semibold">Stat #{i + 1}</label>
                  <input
                    type="text"
                    value={st.number}
                    onChange={(e) => {
                      const updated = aboutForm.stats.map((s) => (s.id === st.id ? { ...s, number: e.target.value } : s));
                      setAboutForm({ ...aboutForm, stats: updated });
                    }}
                    placeholder="e.g. 14"
                    className="w-full p-1.5 rounded border border-gray-300 font-display text-lg font-bold"
                  />
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => {
                      const updated = aboutForm.stats.map((s) => (s.id === st.id ? { ...s, label: e.target.value } : s));
                      setAboutForm({ ...aboutForm, stats: updated });
                    }}
                    placeholder="e.g. Tournament Tables"
                    className="w-full p-1.5 rounded border border-gray-300 text-xs font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save About Section Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 7: EVENTS & TOURNAMENTS CMS                                */}
      {/* ============================================================== */}
      {activeTab === "events" && (
        <form onSubmit={handleSaveEvents} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
                Upcoming Events & Leagues CMS
              </h3>
              <p className="text-xs text-gray-500">
                Manage the interactive accordion list, dates, prize pools, and entry fees.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const title = prompt("Event title (e.g. Friday Knockout):");
                if (title) {
                  const newEvent = {
                    id: `event-${Date.now()}`,
                    title,
                    subtitle: `0${eventsForm.eventsList.length + 1}`,
                    date: "Every Weekend",
                    time: "07:00 PM - 11:00 PM",
                    category: "Championship Series",
                    entryFee: "₹1,000 / Entry",
                    prizePool: "₹50,000 Purse",
                    spotsLeft: 16,
                    description: "Round-robin frames with master officiating.",
                    schedule: "Registration closes 30 mins before kick off.",
                    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
                  };
                  setEventsForm({
                    ...eventsForm,
                    eventsList: [...eventsForm.eventsList, newEvent],
                  });
                }
              }}
              className="btn-red-pill px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="space-y-4">
            {eventsForm.eventsList.map((evt, idx) => (
              <div key={evt.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">
                    #{idx + 1}: {evt.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEventsForm({
                        ...eventsForm,
                        eventsList: eventsForm.eventsList.filter((e) => e.id !== evt.id),
                      });
                    }}
                    className="text-red-500 hover:underline font-semibold"
                  >
                    Delete Event
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Event Title</label>
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, title: e.target.value } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Date Schedule</label>
                    <input
                      type="text"
                      value={evt.date}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, date: e.target.value } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Timing</label>
                    <input
                      type="text"
                      value={evt.time}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, time: e.target.value } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Entry Fee</label>
                    <input
                      type="text"
                      value={evt.entryFee}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, entryFee: e.target.value } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Prize Pool</label>
                    <input
                      type="text"
                      value={evt.prizePool || ""}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, prizePool: e.target.value } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold uppercase">Spots Left</label>
                    <input
                      type="number"
                      value={evt.spotsLeft}
                      onChange={(e) => {
                        const updated = eventsForm.eventsList.map((item) =>
                          item.id === evt.id ? { ...item, spotsLeft: Number(e.target.value) } : item
                        );
                        setEventsForm({ ...eventsForm, eventsList: updated });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Events & Leagues</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 8: MEMBERSHIPS CMS                                         */}
      {/* ============================================================== */}
      {activeTab === "membership" && (
        <form onSubmit={handleSaveMembership} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              Membership Tiers & Pricing CMS
            </h3>
            <p className="text-xs text-gray-500">
              Configure Silver Cue, Gold Master, and Platinum Sovereign benefits and monthly/annual prices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {membershipForm.plans.map((plan) => (
              <div key={plan.id} className="p-5 rounded-2xl border border-gray-200 bg-white space-y-3 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-base">{plan.name}</h4>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={plan.popular}
                      onChange={(e) => {
                        const updated = membershipForm.plans.map((p) =>
                          p.id === plan.id ? { ...p, popular: e.target.checked } : { ...p, popular: false }
                        );
                        setMembershipForm({ ...membershipForm, plans: updated });
                      }}
                      className="rounded text-[#E03A2F]"
                    />
                    <span className="text-[10px] text-red-600 font-bold">Popular</span>
                  </label>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Monthly Price (₹)</label>
                  <input
                    type="number"
                    value={plan.monthlyPrice}
                    onChange={(e) => {
                      const updated = membershipForm.plans.map((p) =>
                        p.id === plan.id ? { ...p, monthlyPrice: Number(e.target.value) } : p
                      );
                      setMembershipForm({ ...membershipForm, plans: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Annual Price (₹)</label>
                  <input
                    type="number"
                    value={plan.annualPrice}
                    onChange={(e) => {
                      const updated = membershipForm.plans.map((p) =>
                        p.id === plan.id ? { ...p, annualPrice: Number(e.target.value) } : p
                      );
                      setMembershipForm({ ...membershipForm, plans: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Tagline</label>
                  <input
                    type="text"
                    value={plan.tagline}
                    onChange={(e) => {
                      const updated = membershipForm.plans.map((p) =>
                        p.id === plan.id ? { ...p, tagline: e.target.value } : p
                      );
                      setMembershipForm({ ...membershipForm, plans: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">
                    Benefits (1 per line)
                  </label>
                  <textarea
                    rows={6}
                    value={plan.features.join("\n")}
                    onChange={(e) => {
                      const feats = e.target.value.split("\n").filter(Boolean);
                      const updated = membershipForm.plans.map((p) =>
                        p.id === plan.id ? { ...p, features: feats } : p
                      );
                      setMembershipForm({ ...membershipForm, plans: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Membership Plans</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 9: GALLERY CMS                                             */}
      {/* ============================================================== */}
      {activeTab === "gallery" && (
        <form onSubmit={handleSaveGallery} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
                Arena Gallery Showcase CMS
              </h3>
              <p className="text-xs text-gray-500">
                Add, reorder, or edit image URLs, categories, and titles for the gallery grid.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const title = prompt("Photo Title:");
                const image = prompt("Photo Image URL:", "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80");
                if (title && image) {
                  setGalleryForm({
                    ...galleryForm,
                    photos: [
                      ...galleryForm.photos,
                      {
                        id: `g-${Date.now()}`,
                        title,
                        category: "tables",
                        image,
                        span: "col-span-1",
                      },
                    ],
                  });
                }
              }}
              className="btn-red-pill px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryForm.photos.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
                <div className="relative h-32 w-full rounded-lg overflow-hidden bg-black">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold block">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = galleryForm.photos.map((p) =>
                        p.id === item.id ? { ...p, title: e.target.value } : p
                      );
                      setGalleryForm({ ...galleryForm, photos: updated });
                    }}
                    className="w-full p-1.5 rounded border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = galleryForm.photos.map((p) =>
                        p.id === item.id ? { ...p, category: e.target.value as any } : p
                      );
                      setGalleryForm({ ...galleryForm, photos: updated });
                    }}
                    className="p-1.5 rounded border border-gray-300 text-xs bg-white"
                  >
                    <option value="tables">Tables</option>
                    <option value="tournaments">Tournaments</option>
                    <option value="lounge">Lounge</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setGalleryForm({
                        ...galleryForm,
                        photos: galleryForm.photos.filter((p) => p.id !== item.id),
                      });
                    }}
                    className="text-red-500 hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Gallery Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 10: TESTIMONIALS CMS                                       */}
      {/* ============================================================== */}
      {activeTab === "testimonials" && (
        <form onSubmit={handleSaveTestimonials} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
                Player Testimonials CMS
              </h3>
              <p className="text-xs text-gray-500">
                Manage reviews, quotes, avatars, ratings, and Century Break badges.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const name = prompt("Player Name:");
                if (name) {
                  setTestimonialsForm({
                    ...testimonialsForm,
                    reviews: [
                      ...testimonialsForm.reviews,
                      {
                        id: `t-${Date.now()}`,
                        name,
                        role: "Club Contender",
                        rating: 5,
                        quote: "World-class tables and exceptional lighting. The best cuesports arena in town.",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                        badge: "Member",
                      },
                    ],
                  });
                }
              }}
              className="btn-red-pill px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonialsForm.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{rev.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTestimonialsForm({
                        ...testimonialsForm,
                        reviews: testimonialsForm.reviews.filter((r) => r.id !== rev.id),
                      });
                    }}
                    className="text-red-500 text-[11px] hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 block">Role / Title</label>
                  <input
                    type="text"
                    value={rev.role}
                    onChange={(e) => {
                      const updated = testimonialsForm.reviews.map((r) =>
                        r.id === rev.id ? { ...r, role: e.target.value } : r
                      );
                      setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                    }}
                    className="w-full p-1.5 rounded border border-gray-300 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 block">Quote</label>
                  <textarea
                    rows={3}
                    value={rev.quote}
                    onChange={(e) => {
                      const updated = testimonialsForm.reviews.map((r) =>
                        r.id === rev.id ? { ...r, quote: e.target.value } : r
                      );
                      setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                    }}
                    className="w-full p-2 rounded border border-gray-300 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 block">Badge</label>
                  <input
                    type="text"
                    value={rev.badge || ""}
                    onChange={(e) => {
                      const updated = testimonialsForm.reviews.map((r) =>
                        r.id === rev.id ? { ...r, badge: e.target.value } : r
                      );
                      setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                    }}
                    className="w-full p-1.5 rounded border border-gray-300 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Testimonials</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 11: FAQS CMS                                               */}
      {/* ============================================================== */}
      {activeTab === "faqs" && (
        <form onSubmit={handleSaveFaqs} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
                Frequently Asked Questions CMS
              </h3>
              <p className="text-xs text-gray-500">
                Add, edit, or remove questions and answers for venue visitors.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const question = prompt("New Question:");
                if (question) {
                  setFaqsForm({
                    ...faqsForm,
                    faqs: [
                      ...faqsForm.faqs,
                      {
                        id: `faq-${Date.now()}`,
                        question,
                        answer: "Detailed answer goes here.",
                      },
                    ],
                  });
                }
              }}
              className="btn-red-pill px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqsForm.faqs.map((faq, idx) => (
              <div key={faq.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Q#{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFaqsForm({
                        ...faqsForm,
                        faqs: faqsForm.faqs.filter((f) => f.id !== faq.id),
                      });
                    }}
                    className="text-red-500 text-[11px] hover:underline"
                  >
                    Delete FAQ
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = faqsForm.faqs.map((item) =>
                        item.id === faq.id ? { ...item, question: e.target.value } : item
                      );
                      setFaqsForm({ ...faqsForm, faqs: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = faqsForm.faqs.map((item) =>
                        item.id === faq.id ? { ...item, answer: e.target.value } : item
                      );
                      setFaqsForm({ ...faqsForm, faqs: updated });
                    }}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save FAQs</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 12: CONTACT & FOOTER CMS                                   */}
      {/* ============================================================== */}
      {activeTab === "contact" && (
        <form onSubmit={handleSaveContactAndFooter} className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              Contact & Footer Details CMS
            </h3>
            <p className="text-xs text-gray-500">
              Update physical venue address, operating hours, phone numbers, map embed, and social links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Venue Location & Concierge</h4>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Address</label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Sub-address (Parking info)</label>
                <input
                  type="text"
                  value={contactForm.addressSub}
                  onChange={(e) => setContactForm({ ...contactForm, addressSub: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Operating Hours</label>
                <input
                  type="text"
                  value={contactForm.hours}
                  onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Footer Tagline & Social Handles</h4>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Footer Brand Tagline</label>
                <textarea
                  rows={3}
                  value={footerForm.brandTagline}
                  onChange={(e) => setFooterForm({ ...footerForm, brandTagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Instagram URL</label>
                <input
                  type="text"
                  value={footerForm.instagramUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, instagramUrl: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">YouTube URL</label>
                <input
                  type="text"
                  value={footerForm.youtubeUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, youtubeUrl: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Twitter / X URL</label>
                <input
                  type="text"
                  value={footerForm.twitterUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, twitterUrl: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 font-semibold block">Facebook URL</label>
                <input
                  type="text"
                  value={footerForm.facebookUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, facebookUrl: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="submit" className="btn-red-pill px-8 py-3 text-sm font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Contact & Footer</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 13: ARENA SETTINGS & BACKUPS                               */}
      {/* ============================================================== */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-gray-900">
              Arena Financial Settings & Full CMS Backup
            </h3>
            <p className="text-xs text-gray-500">
              Configure global tax rates, add-on pricing, export JSON backups, or reset the site.
            </p>
          </div>

          {/* Pricing settings form */}
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <h4 className="font-bold text-gray-900 text-sm">Tariff & Financial Formula</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={settingsForm.currencySymbol}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">GST Tax Rate (%)</label>
                <input
                  type="number"
                  value={settingsForm.taxRatePct}
                  onChange={(e) => setSettingsForm({ ...settingsForm, taxRatePct: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Gold Member Discount (%)</label>
                <input
                  type="number"
                  value={settingsForm.goldMemberDiscountPct}
                  onChange={(e) => setSettingsForm({ ...settingsForm, goldMemberDiscountPct: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Aramith 1G Ball Addon (₹)</label>
                <input
                  type="number"
                  value={settingsForm.addon1GPrice}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addon1GPrice: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Predator Carbon Cue (₹)</label>
                <input
                  type="number"
                  value={settingsForm.addonCarbonCuePrice}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addonCarbonCuePrice: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Coach 30m Clinic (₹)</label>
                <input
                  type="number"
                  value={settingsForm.addonCoachPrice}
                  onChange={(e) => setSettingsForm({ ...settingsForm, addonCoachPrice: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="btn-red-pill px-6 py-2.5 text-xs font-bold flex items-center gap-2">
                <Save className="w-3.5 h-3.5" />
                <span>Save Financial Settings</span>
              </button>
            </div>
          </form>

          {/* Backup & Restore Strip */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 text-sm mb-3">Backup & System Recovery</h4>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExportJson}
                className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Export Entire Site CMS as JSON</span>
              </button>

              <label className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 flex items-center gap-2 shadow-sm cursor-pointer">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Import CMS JSON Backup</span>
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>

              <button
                onClick={handleResetEverything}
                className="px-5 py-2.5 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Factory Reset Entire Website</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
