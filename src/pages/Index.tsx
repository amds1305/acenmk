
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';

// Interface for section visibility
export interface SectionVisibility {
  hero: boolean;
  services: boolean;
  about: boolean;
  team: boolean;
  testimonials: boolean;
  faq: boolean;
  contact: boolean;
}

// Default visibility configuration
const DEFAULT_VISIBLE_SECTIONS: SectionVisibility = {
  hero: true,
  services: true,
  about: true,
  team: true,
  testimonials: true,
  faq: true,
  contact: true
};

// Simulated API call to fetch homepage configuration
const fetchHomeConfig = async (): Promise<{ visibleSections: SectionVisibility }> => {
  // In a real app, this would be an API call
  // For demo, we'll use localStorage if available
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('homeVisibility');
    if (stored) {
      return { visibleSections: JSON.parse(stored) };
    }
  }
  return { visibleSections: DEFAULT_VISIBLE_SECTIONS };
};

const Index = () => {
  // Use React Query to fetch and cache the homepage configuration
  const { data: homeConfig, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: fetchHomeConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const visibleSections = homeConfig?.visibleSections || DEFAULT_VISIBLE_SECTIONS;
  
  useEffect(() => {
    // Initialize intersection observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-right, .animate-blur-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {visibleSections.hero && <Hero />}
        {visibleSections.services && <Services />}
        {visibleSections.about && <About />}
        {visibleSections.team && <Team />}
        {visibleSections.testimonials && <Testimonials />}
        {visibleSections.faq && <FaqSection />}
        {visibleSections.contact && <Contact />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
