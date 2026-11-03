import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import BookingModal from "@/components/booking/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E03A2F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "P INFINITY ARENA | Elite Snooker & Billiards Arena",
  description:
    "Experience championship-grade Strachan 6811 cloth tables, professional cue coaching, high-stakes tournaments, and luxury club amenities at P INFINITY ARENA.",
  keywords: [
    "P INFINITY ARENA",
    "Snooker booking",
    "Billiards club",
    "Snooker tables near me",
    "Table reservation",
    "Snooker coaching",
    "Tournament arena",
    "Pool tables",
  ],
  authors: [{ name: "P INFINITY ARENA" }],
  openGraph: {
    title: "P INFINITY ARENA | Elite Snooker & Billiards Arena",
    description:
      "Play Hard. Aim True. Master The Game. Premier championship snooker & pool tables with instant online booking.",
    url: "https://pinfinityarena.com",
    siteName: "P INFINITY ARENA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "P INFINITY ARENA Snooker Championship Table",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P INFINITY ARENA | Elite Snooker Club",
    description: "Championship snooker & billiards booking platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0A0E09] text-gray-100 antialiased flex flex-col font-sans arena-ambient-theme selection:bg-[#22C55E]/30 selection:text-white">
        <AuthProvider>
          <SiteContentProvider>
            <BookingProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BookingModal />
            </BookingProvider>
          </SiteContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
