export type TableType = "snooker" | "pool" | "vip";

export interface TableItem {
  id: string;
  name: string;
  type: TableType;
  tableNumber: number;
  hourlyRate: number;
  specs: string;
  cloth: string;
  size: string;
  image: string;
  description: string;
  features: string[];
  isAvailable: boolean;
  status: "available" | "maintenance" | "occupied";
}

export type TimePeriod = "morning" | "afternoon" | "evening" | "night";

export interface TimeSlot {
  id: string;
  time: string;
  period: TimePeriod;
  label: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  tableId: string;
  tableName: string;
  tableType: TableType;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  durationHours: number;
  playersCount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  cuePreference: "standard" | "ash_pro" | "carbon_fiber" | "bring_own";
  addonBalls: boolean;
  coachingSession: boolean;
  notes?: string;
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: "confirmed" | "rescheduled" | "cancelled" | "completed";
  paymentStatus: "paid" | "venue_pay";
  paymentMethod: "upi" | "card" | "netbanking" | "venue";
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  category: string;
  entryFee: string;
  prizePool?: string;
  description: string;
  schedule: string;
  spotsLeft: number;
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: "silver" | "gold" | "platinum";
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
  badge?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: "silver" | "gold" | "platinum" | "guest";
  memberSince: string;
  activeHoursRemaining: number;
  isAdmin: boolean;
}
