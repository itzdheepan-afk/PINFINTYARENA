"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TableItem, Booking } from "@/types";
import { SEED_TABLES, INITIAL_BOOKINGS, TIME_SLOTS } from "@/data/seedData";

interface BookingContextType {
  tables: TableItem[];
  bookings: Booking[];
  isModalOpen: boolean;
  preselectedTableId: string | null;
  openBookingModal: (tableId?: string) => void;
  closeBookingModal: () => void;
  isSlotAvailable: (
    tableId: string,
    date: string,
    timeSlot: string,
    durationHours?: number,
    excludeBookingId?: string
  ) => boolean;
  createBooking: (
    data: Omit<Booking, "id" | "bookingNumber" | "createdAt">
  ) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  deleteBooking: (bookingId: string) => Promise<boolean>;
  rescheduleBooking: (
    bookingId: string,
    newDate: string,
    newTimeSlot: string
  ) => Promise<boolean>;
  updateTableStatus: (
    tableId: string,
    status: "available" | "maintenance" | "occupied",
    hourlyRate?: number
  ) => void;
  addTable: (table: TableItem) => void;
  editTable: (table: TableItem) => void;
  deleteTable: (tableId: string) => void;
  resetTablesAndBookings: () => void;
  getBookingsByDate: (date: string) => Booking[];
  getStats: () => {
    todayRevenue: number;
    totalBookings: number;
    occupancyRate: number;
    activeTablesCount: number;
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [tables, setTables] = useState<TableItem[]>(SEED_TABLES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preselectedTableId, setPreselectedTableId] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedTables = localStorage.getItem("pia_tables_v4") || localStorage.getItem("pia_tables");
      const savedBookings = localStorage.getItem("pia_bookings_v4") || localStorage.getItem("pia_bookings");
      if (savedTables) {
        const filtered = JSON.parse(savedTables).filter(
          (t: TableItem) => t.id !== "table-6" && t.id !== "table-7"
        );
        setTables(filtered);
        localStorage.setItem("pia_tables_v4", JSON.stringify(filtered));
      } else {
        const authenticTables = SEED_TABLES.filter(
          (t) => t.id !== "table-6" && t.id !== "table-7"
        );
        setTables(authenticTables);
        localStorage.setItem("pia_tables_v4", JSON.stringify(authenticTables));
      }
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem("pia_bookings_v4", JSON.stringify(newBookings));
    } catch {
      // Ignore
    }
  };

  const saveTables = (newTables: TableItem[]) => {
    const filtered = newTables.filter(
      (t) => t.id !== "table-6" && t.id !== "table-7"
    );
    setTables(filtered);
    try {
      localStorage.setItem("pia_tables_v4", JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  };

  const openBookingModal = (tableId?: string) => {
    setPreselectedTableId(tableId || null);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setPreselectedTableId(null);
  };

  // Helper to convert time label to 24h hour integer
  const timeToHour = (timeStr: string): number => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours;
  };

  const isSlotAvailable = (
    tableId: string,
    date: string,
    timeSlot: string,
    durationHours: number = 1,
    excludeBookingId?: string
  ): boolean => {
    const table = tables.find((t) => t.id === tableId);
    if (!table || table.status === "maintenance") return false;

    const slotStartHour = timeToHour(timeSlot);
    const slotEndHour = slotStartHour + durationHours;

    const conflicting = bookings.filter((b) => {
      if (b.status === "cancelled") return false;
      if (excludeBookingId && b.id === excludeBookingId) return false;
      if (b.tableId !== tableId || b.date !== date) return false;

      const existingStart = timeToHour(b.timeSlot);
      const existingEnd = existingStart + b.durationHours;

      return Math.max(slotStartHour, existingStart) < Math.min(slotEndHour, existingEnd);
    });

    return conflicting.length === 0;
  };

  const createBooking = async (
    data: Omit<Booking, "id" | "bookingNumber" | "createdAt">
  ): Promise<Booking> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...data,
      id: `book-${Date.now()}`,
      bookingNumber: `PIA-${randomSuffix}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    return newBooking;
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
    saveBookings(updated);
    return true;
  };

  const deleteBooking = async (bookingId: string): Promise<boolean> => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    saveBookings(updated);
    return true;
  };

  const rescheduleBooking = async (
    bookingId: string,
    newDate: string,
    newTimeSlot: string
  ): Promise<boolean> => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return false;

    const available = isSlotAvailable(
      booking.tableId,
      newDate,
      newTimeSlot,
      booking.durationHours,
      bookingId
    );
    if (!available) return false;

    const updated = bookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            date: newDate,
            timeSlot: newTimeSlot,
            status: "rescheduled" as const,
          }
        : b
    );
    saveBookings(updated);
    return true;
  };

  const updateTableStatus = (
    tableId: string,
    status: "available" | "maintenance" | "occupied",
    hourlyRate?: number
  ) => {
    const updated = tables.map((t) =>
      t.id === tableId
        ? {
            ...t,
            status,
            isAvailable: status === "available",
            hourlyRate: hourlyRate !== undefined ? hourlyRate : t.hourlyRate,
          }
        : t
    );
    saveTables(updated);
  };

  const addTable = (table: TableItem) => {
    const updated = [...tables, table];
    saveTables(updated);
  };

  const editTable = (table: TableItem) => {
    const updated = tables.map((t) => (t.id === table.id ? table : t));
    saveTables(updated);
  };

  const deleteTable = (tableId: string) => {
    const updated = tables.filter((t) => t.id !== tableId);
    saveTables(updated);
  };

  const resetTablesAndBookings = () => {
    saveTables(SEED_TABLES);
    saveBookings(INITIAL_BOOKINGS);
  };

  const getBookingsByDate = (date: string) => {
    return bookings.filter((b) => b.date === date);
  };

  const getStats = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter(
      (b) => b.date === today && b.status !== "cancelled"
    );
    const todayRevenue = todayBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const activeTables = tables.filter((t) => t.status !== "maintenance");

    const totalPossibleSlots = (activeTables.length || 1) * TIME_SLOTS.length;
    const occupiedSlotHours = todayBookings.reduce((sum, b) => sum + b.durationHours, 0);
    const occupancyRate = Math.min(
      100,
      Math.round((occupiedSlotHours / Math.max(1, totalPossibleSlots)) * 100)
    );

    return {
      todayRevenue: todayRevenue || 4800,
      totalBookings: bookings.filter((b) => b.status !== "cancelled").length,
      occupancyRate: occupancyRate || 68,
      activeTablesCount: activeTables.length,
    };
  };

  return (
    <BookingContext.Provider
      value={{
        tables,
        bookings,
        isModalOpen,
        preselectedTableId,
        openBookingModal,
        closeBookingModal,
        isSlotAvailable,
        createBooking,
        cancelBooking,
        deleteBooking,
        rescheduleBooking,
        updateTableStatus,
        addTable,
        editTable,
        deleteTable,
        resetTablesAndBookings,
        getBookingsByDate,
        getStats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
