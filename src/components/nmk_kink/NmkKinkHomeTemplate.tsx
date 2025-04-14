
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import NmkKinkHero from './NmkKinkHero';
import NmkKinkServices from './NmkKinkServices';
import NmkKinkAbout from './NmkKinkAbout';
import NmkKinkTeam from './NmkKinkTeam';
import NmkKinkTrustedClients from './NmkKinkTrustedClients';
import NmkKinkTestimonials from './NmkKinkTestimonials';
import NmkKinkFaq from './NmkKinkFaq';
import NmkKinkContact from './NmkKinkContact';
import { SectionType } from '@/types/sections';

// Component mapping for NmkKink template
const sectionComponents: Record<SectionType, React.FC> = {
  'hero': NmkKinkHero,
  'services': NmkKinkServices,
  'about': NmkKinkAbout,
  'team': NmkKinkTeam,
  'trusted-clients': NmkKinkTrustedClients,
  'testimonials': NmkKinkTestimonials,
  'faq': NmkKinkFaq,
  'contact': NmkKinkContact,
  'custom': () => null // Default for custom components
};

const NmkKinkHomeTemplate: React.FC = () => {
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
    <div className="flex flex-col min-h-screen w-full">
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

export default NmkKinkHomeTemplate;
