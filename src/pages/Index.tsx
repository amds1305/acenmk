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
import TrustedClients from '@/components/TrustedClients';
import Pricing from '@/components/Pricing';
import { TekoHomeTemplate } from '@/components/teko';
import { NmkFireHomeTemplate } from '@/components/nmk_fire';
import { NmkRobotHomeTemplate } from '@/components/nmk_robot';
import { NmkKinkHomeTemplate } from '@/components/nmk_kink';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { toast } from '@/hooks/use-toast';
import { HomeTemplateType } from '@/types/sections';

export interface SectionVisibility {
  hero: boolean;
  services: boolean;
  about: boolean;
  team: boolean;
  testimonials: boolean;
  faq: boolean;
  contact: boolean;
  'trusted-clients': boolean;
}

const sectionComponents: Record<string, React.FC> = {
  hero: Hero,
  services: Services,
  about: About,
  team: Team,
  testimonials: Testimonials,
  faq: FaqSection,
  contact: Contact,
  'trusted-clients': TrustedClients,
};

const templates: Record<HomeTemplateType, React.FC> = {
  default: () => null,
  teko: TekoHomeTemplate,
  nmk_fire: NmkFireHomeTemplate,
  nmk_robot: NmkRobotHomeTemplate,
  nmk_kink: NmkKinkHomeTemplate,
};

const Index = () => {
  const { data: homeConfig, isLoading, error } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Impossible de charger la configuration de la page d'accueil. Les paramètres par défaut seront utilisés.",
      });
      console.error("Erreur lors du chargement de la configuration:", error);
    }
  }, [error]);

  const activeTemplate = homeConfig?.templateConfig?.activeTemplate || 'default';
  const TemplateComponent = templates[activeTemplate];

  const sectionsToDisplay = homeConfig?.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order) || [];

  useEffect(() => {
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

    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-right, .animate-blur-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [sectionsToDisplay]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement de votre site...</p>
      </div>
    );
  }

  if (activeTemplate !== 'default' && TemplateComponent) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <TemplateComponent />
        </main>
        <Footer />
      </div>
    );
  }

  const displaySections = sectionsToDisplay.length > 0 ? sectionsToDisplay : [
    { id: 'hero-default', type: 'hero', order: 1 },
    { id: 'services-default', type: 'services', order: 2 },
    { id: 'about-default', type: 'about', order: 3 },
    { id: 'team-default', type: 'team', order: 4 },
    { id: 'testimonials-default', type: 'testimonials', order: 5 },
    { id: 'faq-default', type: 'faq', order: 6 },
    { id: 'contact-default', type: 'contact', order: 7 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {displaySections.map((section) => {
          const SectionComponent = sectionComponents[section.type];
          
          if (!SectionComponent) {
            console.warn(`Section component not found for type: ${section.type}`);
            return null;
          }
          
          return <SectionComponent key={section.id} />;
        })}
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
