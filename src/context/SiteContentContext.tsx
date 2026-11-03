"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SiteContent,
  HeroContent,
  ServicesContent,
  AboutContent,
  EventsContent,
  MembershipContent,
  GalleryContent,
  TestimonialsContent,
  FaqContent,
  ContactContent,
  FooterContent,
  ArenaSettings,
} from "@/types/siteContent";
import { DEFAULT_SITE_CONTENT } from "@/data/defaultSiteContent";

interface SiteContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateServices: (data: Partial<ServicesContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateEvents: (data: Partial<EventsContent>) => void;
  updateMembership: (data: Partial<MembershipContent>) => void;
  updateGallery: (data: Partial<GalleryContent>) => void;
  updateTestimonials: (data: Partial<TestimonialsContent>) => void;
  updateFaqs: (data: Partial<FaqContent>) => void;
  updateContact: (data: Partial<ContactContent>) => void;
  updateFooter: (data: Partial<FooterContent>) => void;
  updateSettings: (data: Partial<ArenaSettings>) => void;
  resetAllContent: () => void;
  exportJson: () => string;
  importJson: (jsonStr: string) => boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  // Load saved content from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pia_site_content_v6");
      if (saved) {
        const parsed = JSON.parse(saved);
        const reviews = parsed.testimonials?.reviews?.some(
          (r: { name: string; role?: string }) =>
            r.name === "Vikramaditya Sen" ||
            r.name === "Ananya Deshmukh" ||
            r.name === "Marcus Thorne" ||
            r.role !== "Club Member"
        )
          ? DEFAULT_SITE_CONTENT.testimonials.reviews
          : parsed.testimonials?.reviews || DEFAULT_SITE_CONTENT.testimonials.reviews;

        // Always ensure hero slides use the authentic intro reference images
        const slides = DEFAULT_SITE_CONTENT.hero.slides;

        // Deep merge with defaults to preserve any new keys
        setContent((prev) => ({
          ...prev,
          ...parsed,
          hero: { ...prev.hero, ...parsed.hero, slides },
          services: { ...prev.services, ...parsed.services },
          about: { ...prev.about, ...parsed.about },
          events: { ...prev.events, ...parsed.events },
          membership: { ...prev.membership, ...parsed.membership },
          gallery: { ...prev.gallery, ...parsed.gallery },
          testimonials: {
            ...prev.testimonials,
            ...parsed.testimonials,
            reviews,
          },
          faqs: { ...prev.faqs, ...parsed.faqs },
          contact: { ...prev.contact, ...parsed.contact },
          footer: { ...prev.footer, ...parsed.footer },
          settings: { ...prev.settings, ...parsed.settings },
        }));
      }
    } catch (e) {
      console.error("Failed to load site content from localStorage", e);
    }
  }, []);

  const persist = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem("pia_site_content_v6", JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save site content to localStorage", e);
    }
  };

  const updateHero = (data: Partial<HeroContent>) => {
    const updated = { ...content, hero: { ...content.hero, ...data } };
    persist(updated);
  };

  const updateServices = (data: Partial<ServicesContent>) => {
    const updated = { ...content, services: { ...content.services, ...data } };
    persist(updated);
  };

  const updateAbout = (data: Partial<AboutContent>) => {
    const updated = { ...content, about: { ...content.about, ...data } };
    persist(updated);
  };

  const updateEvents = (data: Partial<EventsContent>) => {
    const updated = { ...content, events: { ...content.events, ...data } };
    persist(updated);
  };

  const updateMembership = (data: Partial<MembershipContent>) => {
    const updated = { ...content, membership: { ...content.membership, ...data } };
    persist(updated);
  };

  const updateGallery = (data: Partial<GalleryContent>) => {
    const updated = { ...content, gallery: { ...content.gallery, ...data } };
    persist(updated);
  };

  const updateTestimonials = (data: Partial<TestimonialsContent>) => {
    const updated = { ...content, testimonials: { ...content.testimonials, ...data } };
    persist(updated);
  };

  const updateFaqs = (data: Partial<FaqContent>) => {
    const updated = { ...content, faqs: { ...content.faqs, ...data } };
    persist(updated);
  };

  const updateContact = (data: Partial<ContactContent>) => {
    const updated = { ...content, contact: { ...content.contact, ...data } };
    persist(updated);
  };

  const updateFooter = (data: Partial<FooterContent>) => {
    const updated = { ...content, footer: { ...content.footer, ...data } };
    persist(updated);
  };

  const updateSettings = (data: Partial<ArenaSettings>) => {
    const updated = { ...content, settings: { ...content.settings, ...data } };
    persist(updated);
  };

  const resetAllContent = () => {
    persist(DEFAULT_SITE_CONTENT);
  };

  const exportJson = () => {
    return JSON.stringify(content, null, 2);
  };

  const importJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      persist(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
