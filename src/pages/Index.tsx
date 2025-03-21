
import React, { useEffect } from 'react';
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
import { getHomepageConfig } from '@/services/sectionsService';

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

// Component map for rendering sections
const sectionComponents: Record<string, React.FC> = {
  hero: Hero,
  services: Services,
  about: About,
  team: Team,
  testimonials: Testimonials,
  faq: FaqSection,
  contact: Contact,
};

const Index = () => {
  // Use React Query to fetch and cache the homepage configuration
  const { data: homeConfig, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: () => getHomepageConfig(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Obtain sections to display
  const sectionsToDisplay = homeConfig?.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order) || [];
  
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
  }, [sectionsToDisplay]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {sectionsToDisplay.map((section) => {
          const SectionComponent = sectionComponents[section.type];
          
          if (!SectionComponent) {
            console.warn(`Section component not found for type: ${section.type}`);
            return null;
          }
          
          return <SectionComponent key={section.id} />;
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
