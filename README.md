# 🎱 P INFINITY ARENA — Luxury Snooker & Billiards Arena Platform

A high-end, responsive, state-of-the-art snooker and billiards table booking website called **P INFINITY ARENA**, built with **Next.js (App Router)**, **Tailwind CSS v4**, and **Framer Motion**, matching the visual style of the reference design.

---

## 🎨 Visual Design System

- **Color Palette**:
  - Backgrounds: Crisp White (`#FFFFFF`) and Soft Gallery Grey (`#F5F5F5` / `#FAFAFA`)
  - Typography: Jet Black (`#111111`) with clear contrast
  - Signature Accent: Crimson Red (`#E03A2F`) for buttons, highlighted heading words, active states, and glowing badges
  - Deep Snooker Green: (`#0B4D3A` / `#072A20`) in table baize imagery, cards, and VIP badges
- **Typography**:
  - Headings: Condensed uppercase display font (**Bebas Neue / Anton**) with keyword accents in red
  - Body: **Inter** for clean, legible readability across all devices
- **Layout & Geometry**:
  - Smooth rounded corners (`rounded-[24px]` to `rounded-[32px]`) on hero, cards, and modal dialogs
  - Pill-shaped CTA buttons (`rounded-full`) with subtle hover lift and red glow
  - Generous whitespace and luxury editorial feel

---

## 🚀 Key Features

### 1. Sticky Glassmorphism Navbar
- Sleek red infinity logo badge (`∞ P INFINITY ARENA`)
- Navigation links with smooth anchor scrolling: Home, About Us, Services, Membership, Events, Gallery, Contact
- "Join Now" link & red pill "Book a Table" button that launches the instant booking modal
- Quick switchers for Customer Dashboard (`/dashboard`) and Staff Admin Console (`/admin`)
- Fully animated mobile slide-out menu drawer

### 2. Cinematic Hero Section
- High-resolution snooker player lining up a shot on championship green baize
- Pill badge: `Ready to Experience Excellence? •` with live pulse
- Massive condensed headline: `PLAY HARD. AIM TRUE. MASTER THE GAME.` (with **AIM TRUE.** in signature red)
- Red pill CTA button triggering instant booking
- Continuous auto-scrolling partner & equipment marquee (Strachan 6811, Saluc Aramith, Riley England, Predator, etc.)

### 3. Complete Snooker Experience (Services)
- Horizontal slider with cards:
  1. **Table Rentals** (12ft Championship Snooker & 9ft American Pool)
  2. **Coaching Academy** (Signature red overlay, certified master coaches, "Book a Coach" CTA)
  3. **Tournaments** (Weekly leagues, ranking opens, broadcast lights)
  4. **VIP Lounge & Café** (Single-origin coffee, Chesterfield seating, 4K shot replay screens)
- Interactive arrow controls and active slide indicators

### 4. About: "Where Passion Meets Precision"
- Centered headline with red accent
- **Three overlapping tilted photo cards** (-6°, 0°, +6°) with smooth hover lift and straightening animation
- Founding story & live counter stats (14 Tables, 1,200+ Members, 98.8% Satisfaction, 24/7 Access)

### 5. Upcoming Events & Tournaments
- Dark luxury atmospheric container with tournament cueist imagery
- Floating white card on the left with interactive accordion:
  - `01 Weekly League Nights` (Expanded details, timings, "Book an Event" pill button)
  - `02 City Open Championship` (State-level major, ₹1.5L prize pool)
  - `03 Corporate Team Billiards Night` (Team networking & drinks)
  - `04 Charity Pro-Am Cue Challenge` (Exhibition trick shots & fundraiser)
- "Events & Calendar" glowing badge

### 6. Membership: "Choose Your Level of Excellence"
- 3 pricing tiers: **Silver Cue**, **Gold Master** (Highlighted Most Popular with glowing border), and **Platinum Sovereign**
- Monthly / Annual toggle with "Save 20%" discount badge
- Feature checklist with checkmark badges and "Join Now" buttons

### 7. Core Real-Time Booking Engine (`/book` & Global Modal)
- Available both as a dedicated full-page experience (`/book`) and as an instant popup modal from any CTA
- **Step 1**: Choose table type (Snooker 12ft, Pool 9ft, VIP Suite)
- **Step 2**: Interactive date selector (Today, Tomorrow, next 7 days) & time-slot grid with live states: Available, Booked, and Selected
- **Collision Prevention**: Real-time slot collision detection prevents double-booking
- **Step 3**: Session duration (1h to 4h) & player count (1 to 4) + premium add-ons (Aramith 1G Ball set, Predator Carbon Cue, 30m coach warmup)
- **Step 4**: Player contact details & special table instructions
- **Step 5**: Real-time receipt breakdown with GST and member discounts
- **Step 6**: Payment Gateway (Razorpay/Stripe simulation with Instant UPI QR, Credit/Debit card, NetBanking, or Pay at Venue)
- **Step 7**: Digital Confirmed Pass Ticket with QR code, booking ID (e.g. `PIA-8824`), confetti celebration, and "Download Ticket" / "Add to Calendar"

### 8. Customer Dashboard (`/dashboard`)
- Active & Upcoming reservations tab vs Past & Cancelled matches
- Instant "View / Print Pass" modal with digital QR ticket
- Interactive "Reschedule Slot" modal with live availability checks
- "Cancel Reservation" feature with instant refund/credit confirmation

### 9. Master Admin Console & 100% Dynamic CMS (`/admin`)
The entire website is now dynamic and can be edited in real-time by the administrator:
- **Hero & Branding CMS**: Edit top badge, 3-part headline, hero description, CTA button, background image, perks, and partner sponsors.
- **Services & Academy CMS**: Edit subtitle, title parts, description, and every service card (titles, taglines, images, descriptions, and red card highlights).
- **About & Heritage CMS**: Edit centered title, founding story, 3 overlapping tilted cards (-6°, 0°, +6° captions and photos), and 4 live counter metrics.
- **Upcoming Events CMS**: Add/edit/delete tournaments, schedule dates, timings, entry fees, prize purses, and spots left.
- **Memberships CMS**: Edit Silver, Gold, and Platinum monthly/annual rates, popular badges, and benefits checklists.
- **Gallery CMS**: Add/edit/delete photos, captions, and category filters.
- **Testimonials CMS**: Add/edit/delete verified player reviews, star ratings, quotes, and badges.
- **FAQ Manager CMS**: Add, edit, and reorder questions and answers.
- **Contact & Footer CMS**: Edit venue address, valet notes, operating hours, phone, WhatsApp, email, map embed URL, social URLs, and footer copyright.
- **Tables & Inventory**: Add new tables, edit specifications, cloth, size, rates, toggle maintenance/ironing, or delete tables.
- **Bookings Database**: Live search, filter by status, check-in, cancel, delete, and add manual walk-in reservations.
- **Financial Settings & Formulas**: Currency symbol (`₹`), GST tax rate % (`18%`), Gold Member discount % (`15%`), Aramith 1G Ball price, Predator cue price, and coaching clinic fees.
- **CMS Backup & Recovery**: Export complete site configuration as JSON, import JSON backups, and 1-click factory reset.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **State & CMS**: React Context with LocalStorage persistence and REST APIs (`/api/content` & `/api/bookings`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframe animations
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Key Routes

- `/` — Dynamic homepage with real-time CMS reflection
- `/book` — Dedicated table reservation page with live collision checks
- `/dashboard` — Customer reservation pass and rescheduling dashboard
- `/admin` — Master Admin Panel & 100% Dynamic CMS
- `/login` — Member and Admin authentication with one-click demo login
- `/api/content` — REST API endpoint for site CMS content
- `/api/bookings` — REST API endpoint for reservations

