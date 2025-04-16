
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/supabase/sectionsService';
import TekoHero from './TekoHero';
import TekoServices from './TekoServices';
import TekoAbout from './TekoAbout';
import TekoTeam from './TekoTeam';
import TekoTrustedClients from './TekoTrustedClients';
import TekoTestimonials from './TekoTestimonials';
import TekoFaq from './TekoFaq';
import TekoContact from './TekoContact';
import { SectionType } from '@/types/sections';

// Component mapping for Teko template
const sectionComponents: Record<SectionType, React.FC> = {
  'hero': TekoHero,
  'services': TekoServices,
  'about': TekoAbout,
  'team': TekoTeam,
  'trusted-clients': TekoTrustedClients,
  'testimonials': TekoTestimonials,
  'faq': TekoFaq,
  'contact': TekoContact,
  'custom': () => null // Default for custom components
};

// Component principal du template Teko
const TekoHomeTemplate: React.FC = () => {
  // Get sections configuration from the API
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get visible sections sorted by order
  const sections = config?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="teko-template flex flex-col min-h-screen w-full">
      {sections.map(section => {
        const SectionComponent = sectionComponents[section.type];
        
        if (!SectionComponent) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }
        
        return <SectionComponent key={section.id} />;
      })}
    </div>
  );
};

export default TekoHomeTemplate;
