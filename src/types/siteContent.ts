import { EventItem, MembershipPlan, Testimonial, TableItem, Booking } from "./index";

export interface HeroSponsor {
  id: string;
  name: string;
  badge: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  badgeColor?: "green" | "red" | "blue" | "amber";
  headlineP1: string;
  headlineHighlight: string;
  headlineP2: string;
  description: string;
  quote?: string;
  image: string;
  mobileImage?: string;
  videoUrl?: string;
  ctaText: string;
  accentGlow?: "green" | "red" | "blue" | "amber";
}

export interface HeroContent {
  badgeText: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  bgImageUrl: string;
  perks: string[];
  sponsors: HeroSponsor[];
  slides?: HeroSlide[];
}

export interface ServiceCardItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  ctaText: string;
  highlight: boolean;
}

export interface ServicesContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  description: string;
  items: ServiceCardItem[];
}

export interface StatMetric {
  id: string;
  number: string;
  label: string;
  subtext: string;
}

export interface AboutContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  story: string;
  card1Image: string;
  card1Title: string;
  card2Image: string;
  card2Title: string;
  card2Tag: string;
  card2Desc: string;
  card3Image: string;
  card3Title: string;
  stats: StatMetric[];
}

export interface EventsContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  eventsList: EventItem[];
}

export interface MembershipContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  annualDiscountPct: number;
  plans: MembershipPlan[];
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: "tables" | "tournaments" | "lounge";
  image: string;
  span: string;
}

export interface GalleryContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  photos: GalleryPhotoItem[];
}

export interface TestimonialsContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  reviews: Testimonial[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  faqs: FaqItem[];
}

export interface ContactContent {
  subtitle: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  deskTitle: string;
  address: string;
  addressSub: string;
  hours: string;
  hoursNote: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
}

export interface FooterContent {
  brandTagline: string;
  hoursTitle: string;
  hoursRegular: string;
  hoursVip: string;
  address: string;
  phone: string;
  copyrightText: string;
  instagramUrl: string;
  whatsappUrl?: string;
  youtubeUrl: string;
  twitterUrl: string;
  facebookUrl: string;
}

export interface ArenaSettings {
  currencySymbol: string;
  taxRatePct: number;
  goldMemberDiscountPct: number;
  addon1GPrice: number;
  addonCarbonCuePrice: number;
  addonCoachPrice: number;
}

export interface SiteContent {
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  events: EventsContent;
  membership: MembershipContent;
  gallery: GalleryContent;
  testimonials: TestimonialsContent;
  faqs: FaqContent;
  contact: ContactContent;
  footer: FooterContent;
  settings: ArenaSettings;
}
