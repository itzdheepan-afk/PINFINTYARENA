import { NextResponse } from "next/server";
import { INITIAL_BOOKINGS, SEED_TABLES } from "@/data/seedData";
import { Booking } from "@/types";

// In-memory persistent database for the running Node server process
let dbBookings: Booking[] = [...INITIAL_BOOKINGS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const tableId = searchParams.get("tableId");

  let results = [...dbBookings];

  if (date) {
    results = results.filter((b) => b.date === date);
  }
  if (tableId) {
    results = results.filter((b) => b.tableId === tableId);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    bookings: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tableId,
      date,
      timeSlot,
      durationHours = 1,
      playersCount = 2,
      customerName,
      customerEmail,
      customerPhone,
      cuePreference = "standard",
      addonBalls = false,
      coachingSession = false,
      paymentMethod = "upi",
      notes = "",
    } = body;

    // Validation
    if (!tableId || !date || !timeSlot || !customerName || !customerPhone) {
      return NextResponse.json(
        { success: false, message: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const table = SEED_TABLES.find((t) => t.id === tableId);
    if (!table) {
      return NextResponse.json(
        { success: false, message: "Invalid table selected" },
        { status: 404 }
      );
    }

    // Check collision
    const isConflict = dbBookings.some((b) => {
      if (b.status === "cancelled") return false;
      return b.tableId === tableId && b.date === date && b.timeSlot === timeSlot;
    });

    if (isConflict) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected slot is already reserved. Please choose another time.",
        },
        { status: 409 }
      );
    }

    // Server-side price calculation
    const baseRate = table.hourlyRate;
    const tableTotal = baseRate * durationHours;
    const addonBallsCost = addonBalls ? 150 : 0;
    const carbonCueCost = cuePreference === "carbon_fiber" ? 200 : 0;
    const coachingCost = coachingSession ? 500 : 0;
    const subtotal = tableTotal + addonBallsCost + carbonCueCost + coachingCost;
    const tax = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingNumber: `PIA-${randomSuffix}`,
      tableId: table.id,
      tableName: table.name,
      tableType: table.type,
      date,
      timeSlot,
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
      discount: 0,
      tax,
      totalAmount,
      status: "confirmed",
      paymentStatus: paymentMethod === "venue" ? "venue_pay" : "paid",
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    dbBookings.unshift(newBooking);

    return NextResponse.json({
      success: true,
      message: "Table booked successfully",
      booking: newBooking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
