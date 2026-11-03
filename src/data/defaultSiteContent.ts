import { SiteContent } from "@/types/siteContent";
import { SEED_EVENTS, MEMBERSHIP_PLANS, SEED_TESTIMONIALS } from "./seedData";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    badgeText: "Ready to Experience Excellence?",
    headlineLine1: "PLAY HARD.",
    headlineHighlight: "AIM TRUE.",
    headlineLine2: "MASTER THE GAME.",
    description:
      "The ultimate billiards destination — professional Strachan 6811 tables, thrilling tournaments, world-class coaching, and a community that lives for the game.",
    ctaText: "Book a Table",
    bgImageUrl: "/images/arena-action.jpg",
    perks: [
      "9BallsIndia Match Slate",
      "Pendant Match Lighting",
      "Neon LED Ambience",
      "PS5 Gaming & Foosball",
    ],
    sponsors: [
      { id: "sp-1", name: "P∞ Arena Snooker", badge: "Championship Zone" },
      { id: "sp-2", name: "9BallsIndia", badge: "Tournament Slate" },
      { id: "sp-3", name: "Strachan 6811", badge: "Match Baize" },
      { id: "sp-4", name: "Saluc Aramith", badge: "1G Balls" },
      { id: "sp-5", name: "PlayStation 5", badge: "4K Gaming" },
      { id: "sp-6", name: "Riley England", badge: "Heritage Tables" },
      { id: "sp-7", name: "Taom Chalk", badge: "Zero Miscue" },
      { id: "sp-8", name: "Predator Cues", badge: "Precision Tech" },
    ],
    slides: [
      {
        id: "slide-1",
        badge: "P∞ ARENA • SNOOKER ZONE",
        badgeColor: "green",
        headlineP1: "PLAY HARD.",
        headlineHighlight: "AIM TRUE.",
        headlineP2: "MASTER THE GAME.",
        description:
          "Step into our authentic tournament arena — 9BallsIndia championship tables, warm industrial pendant lighting, and competitive league break-building.",
        quote: "Where Skill Meets Style • Precision Leveled Tables",
        image: "/images/arena-intro-table.jpg",
        mobileImage: "/images/arena-intro-table.jpg",
        ctaText: "Book a Table",
        accentGlow: "green",
      },
      {
        id: "slide-2",
        badge: "MASTER CUES • TOURNAMENT BAIZE",
        badgeColor: "green",
        headlineP1: "CALM MIND.",
        headlineHighlight: "SHARP FOCUS.",
        headlineP2: "PERFECT BREAK.",
        description:
          "Professional Master Cues, calibrated balls, zero-glare overhead dome lighting, and high-performance Strachan tournament felt.",
        quote: "Master Cues • Calibrated Match Balls",
        image: "/images/arena-intro-cues.jpg",
        mobileImage: "/images/arena-intro-cues.jpg",
        ctaText: "Explore Tables",
        accentGlow: "green",
      },
      {
        id: "slide-3",
        badge: "WHERE SKILL MEETS STYLE",
        badgeColor: "green",
        headlineP1: "IT'S NOT JUST A GAME.",
        headlineHighlight: "IT'S STRATEGY.",
        headlineP2: "IT'S PRECISION.",
        description:
          "Experience the iconic P∞ Arena atmosphere — powerful AC, dynamic LED ambience, certified cue coaching, and weekend ranking cups.",
        quote: "Focus • Patience • Precision • Victory",
        image: "/images/arena-neon-widescreen-4k.jpg",
        mobileImage: "/images/arena-neon-4k.jpg",
        ctaText: "Join Membership",
        accentGlow: "green",
      },
      {
        id: "slide-4",
        badge: "PS5 GAMING ZONE • PLAY WITHOUT LIMITS",
        badgeColor: "blue",
        headlineP1: "NEXT-GEN GAMING.",
        headlineHighlight: "4K RECLINER LOUNGE.",
        headlineP2: "ULTRA IMMERSION.",
        description:
          "Relax between frames with the latest PS5 titles, dual wireless controllers, low-latency 4K display, and plush leather sofa seating.",
        quote: "Play Without Limits • Every Level Makes You Stronger",
        image: "/images/arena-ps5-widescreen-4k.jpg",
        mobileImage: "/images/arena-ps5-4k.jpg",
        ctaText: "Reserve PS5 Lounge",
        accentGlow: "blue",
      },
      {
        id: "slide-5",
        badge: "TOURNAMENT FOOSBALL & CAFÉ",
        badgeColor: "amber",
        headlineP1: "DOUBLES BATTLES.",
        headlineHighlight: "CHILL CAFÉ VIBES.",
        headlineP2: "FRIENDS LOUNGE.",
        description:
          "High-octane tournament table soccer, artisan snacks, cold refreshments, and a community space built for unforgettable hangouts.",
        quote: "Friends Lounge • Ice Cold Beverages & Tournament Racks",
        image: "/images/arena-foosball-4k.jpg",
        mobileImage: "/images/arena-foosball-4k.jpg",
        ctaText: "Explore Friends Lounge",
        accentGlow: "amber",
      },
    ],
  },
  services: {
    subtitle: "World-Class Cuesports Facilities",
    titlePart1: "COMPLETE",
    titleHighlight: "SNOOKER",
    titlePart2: "EXPERIENCE",
    description:
      "From casual games with friends to professional tournament training, we offer everything you need to enjoy and master the game of snooker & billiards.",
    items: [
      {
        id: "table-rentals",
        title: "POOL & SNOOKER ZONE",
        tagline: "9BallsIndia Match Tables & Strachan Cloth",
        description:
          "Play on tournament-grade tables, precision Italian slate, and calibrated balls under vintage dome pendant lamps with zero roll deviation.",
        image: "/images/arena-action.jpg",
        ctaText: "Book Table",
        highlight: false,
      },
      {
        id: "coaching-academy",
        title: "COACHING ACADEMY",
        tagline: "Strategy. Patience. Precision.",
        description:
          "Learn from certified cuesports champions. From stance alignment and grip fundamentals to safety play, break-building, and century runs.",
        image: "/images/arena-neon.jpg",
        ctaText: "Book a Coach",
        highlight: true,
      },
      {
        id: "ps5-gaming",
        title: "PS5 GAMING ZONE",
        tagline: "Ultra 4K Immersion & Leather Recliners",
        description:
          "Play without limits. Enjoy top competitive multiplayer and sports titles on high-refresh 4K displays with dual DualSense controllers.",
        image: "/images/arena-ps5.jpg",
        ctaText: "Reserve PS5 Lounge",
        highlight: false,
      },
      {
        id: "foosball-cafe",
        title: "FOOSBALL & FRIENDS LOUNGE",
        tagline: "Doubles Competitions & Café Refreshments",
        description:
          "Unwind between frames with tournament table soccer, artisan snacks, chilled energy beverages, and comfortable leather lounge seating.",
        image: "/images/arena-foosball.jpg",
        ctaText: "Explore Lounge",
        highlight: false,
      },
    ],
  },
  about: {
    subtitle: "Our Heritage & Philosophy",
    titlePart1: "WHERE SKILL",
    titleHighlight: "MEETS STYLE",
    titlePart2: "IN THE WORLD OF CUESPORTS",
    story:
      "Founded with a singular passion, P∞ ARENA began as an uncompromising sanctuary where cuesports, console gaming, and community unite. Featuring 9BallsIndia championship tables, powerful AC, atmospheric LED backlighting, and a welcoming lounge where enthusiasts gather to compete, socialize, and master the art of the perfect break.",
    card1Image: "/images/arena-table.jpg",
    card1Title: "9BallsIndia Championship Table",
    card2Image: "/images/arena-action.jpg",
    card2Title: "P∞ Arena Flagship Snooker Zone",
    card2Tag: "Arena Flagship",
    card2Desc: "Authentic hanging dome lighting with precision leveled slate.",
    card3Image: "/images/arena-ps5.jpg",
    card3Title: "PS5 Gaming & Friends Lounge",
    stats: [
      {
        id: "st-1",
        number: "14",
        label: "Tournament Tables",
        subtext: "Strachan & Simonis Cloth",
      },
      {
        id: "st-2",
        number: "1,200+",
        label: "Active Cueists",
        subtext: "Competitive League Players",
      },
      {
        id: "st-3",
        number: "98.8%",
        label: "Player Satisfaction",
        subtext: "Based on 2,400+ Sessions",
      },
      {
        id: "st-4",
        number: "24/7",
        label: "VIP Lounge Access",
        subtext: "Private Suites & Replay Cams",
      },
    ],
  },
  events: {
    subtitle: "Tournaments & Leagues",
    titlePart1: "UPCOMING",
    titleHighlight: "EVENTS",
    description:
      "Join our exciting tournaments, leagues, and special events throughout the year.",
    eventsList: SEED_EVENTS,
  },
  membership: {
    subtitle: "Tiered Cue Privileges",
    titlePart1: "CHOOSE YOUR LEVEL OF",
    titleHighlight: "EXCELLENCE",
    description:
      "Elevate your game with priority table reservations, complimentary practice hours, dedicated cue lockers, and master coaching clinics.",
    annualDiscountPct: 20,
    plans: MEMBERSHIP_PLANS,
  },
  gallery: {
    subtitle: "Visual Tour",
    titlePart1: "INSIDE",
    titleHighlight: "P INFINITY ARENA",
    photos: [
      {
        id: "g-1",
        title: "P∞ Arena Championship Snooker Zone in Action",
        category: "tables",
        image: "/images/arena-action.jpg",
        span: "col-span-1 md:col-span-2 row-span-2",
      },
      {
        id: "g-2",
        title: "9BallsIndia Match Baize & Calibrated Balls",
        category: "tables",
        image: "/images/arena-table.jpg",
        span: "col-span-1",
      },
      {
        id: "g-3",
        title: "The Iconic Creed: Calm Mind. Sharp Focus. Perfect Shot.",
        category: "tournaments",
        image: "/images/arena-neon.jpg",
        span: "col-span-1",
      },
      {
        id: "g-4",
        title: "Next-Gen PS5 4K Immersion Gaming Zone",
        category: "lounge",
        image: "/images/arena-ps5.jpg",
        span: "col-span-1 md:col-span-2",
      },
      {
        id: "g-5",
        title: "Tournament Foosball Arena & Social Hub",
        category: "lounge",
        image: "/images/arena-foosball.jpg",
        span: "col-span-1",
      },
      {
        id: "g-6",
        title: "Where Skill Meets Style • Precision Cuesports",
        category: "tables",
        image: "/images/arena-action.jpg",
        span: "col-span-1",
      },
    ],
  },
  testimonials: {
    subtitle: "Player Endorsements",
    titlePart1: "WHAT THE",
    titleHighlight: "CHAMPIONS",
    description:
      "Hear from national contenders, certified coaches, and passionate weekend break-builders.",
    reviews: SEED_TESTIMONIALS,
  },
  faqs: {
    subtitle: "Frequently Asked Questions",
    titlePart1: "ALL YOU NEED TO",
    titleHighlight: "KNOW",
    description:
      "Everything about table reservations, equipment, coaching, and venue rules.",
    faqs: [
      {
        id: "faq-1",
        question: "How do I book a table at P Infinity Arena?",
        answer:
          "You can book directly through our website by clicking any 'Book a Table' button. Select your preferred table (Championship Snooker, American Pool, or VIP Suite), pick the date, select your time-slot, choose duration and add-ons, and complete secure payment or choose pay-at-venue. You will receive an instant digital booking pass with a QR code.",
      },
      {
        id: "faq-2",
        question: "What is your cancellation and rescheduling policy?",
        answer:
          "We offer 100% free rescheduling or cancellation up to 2 hours before your scheduled session. You can manage your booking directly from your Customer Dashboard or by entering your Booking ID. Cancelled bookings receive an immediate refund or arena credit.",
      },
      {
        id: "faq-3",
        question: "Do I need to bring my own cue stick and chalk?",
        answer:
          "Not at all! We provide complimentary professional ash cues, tournament chalk (Taom V10 & Triangle), rests, and spider extensions with every table rental. Members can also store their personal cues in our climate-controlled heated lockers, or rent premium carbon-fiber Predator cues.",
      },
      {
        id: "faq-4",
        question: "Is coaching available for beginners and intermediate players?",
        answer:
          "Yes! Our P Infinity Coaching Academy is staffed by certified national cuesports champions. We offer 1-on-1 technique assessment, stance alignment, cue-action diagnostics, break-building strategy, and group clinics. You can add a coach session directly when booking your table.",
      },
      {
        id: "faq-5",
        question: "Is there a dress code or age restriction?",
        answer:
          "We welcome all enthusiasts of all ages. We maintain a smart casual dress code (collared shirts, polo t-shirts, jeans/chinos, clean sneakers or formal shoes). Slippers and sleeveless undershirts are not permitted on championship match tables.",
      },
    ],
  },
  contact: {
    subtitle: "Get in Touch & Visit Us",
    titlePart1: "VISIT THE",
    titleHighlight: "ARENA",
    description:
      "Located in Rajakambeeram, Y.Othakkadai, Madurai. Gather your squad for championship snooker, next-level PS5 gaming, and great lounge vibes.",
    deskTitle: "P INFINITY ARENA",
    address:
      "AA PARIMALA COMPLEX, NEAR RAJAPATHI MAHAL, THIRUMOHUR ROAD, RAJAKAMBEERAM, Y.OTHAKKADAI, MADURAI - 625107",
    addressSub: "Near Rajapathi Mahal • Yanaimalai Landmark, Madurai",
    hours: "Open Daily: 11:00 AM – 10:00 PM",
    hoursNote: "Snooker, Pool, PS5 Gaming & Friends Lounge",
    phone: "+91 9384036433",
    email: "contact@pinfinityarena.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Othakkadai,+Madurai,+Tamil+Nadu+625107&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  footer: {
    brandTagline:
      "P∞ Arena — Where Skill Meets Style. Authentic 9BallsIndia championship snooker, tournament-grade foosball, next-gen PS5 4K gaming lounge, and community hangout space.",
    hoursTitle: "Open Daily:",
    hoursRegular: "11:00 AM – 10:00 PM",
    hoursVip: "Open All 7 Days a Week",
    address: "AA Parimala Complex, Thirumohur Road, Rajakambeeram, Y.Othakkadai, Madurai - 625107",
    phone: "+91 9384036433",
    copyrightText: "© 2026 P INFINITY ARENA (P∞ Arena). All rights reserved.",
    instagramUrl: "https://instagram.com/pinfinityarena",
    whatsappUrl: "https://wa.me/919384036433",
    youtubeUrl: "https://youtube.com/@pinfinityarena",
    twitterUrl: "https://twitter.com/pinfinityarena",
    facebookUrl: "https://facebook.com/pinfinityarena",
  },
  settings: {
    currencySymbol: "₹",
    taxRatePct: 18,
    goldMemberDiscountPct: 15,
    addon1GPrice: 150,
    addonCarbonCuePrice: 200,
    addonCoachPrice: 500,
  },
};
