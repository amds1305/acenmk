
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import NmkFireHero from './NmkFireHero';
import NmkFireServices from './NmkFireServices';
import NmkFireAbout from './NmkFireAbout';
import NmkFireTeam from './NmkFireTeam';
import NmkFireTrustedClients from './NmkFireTrustedClients';
import NmkFireTestimonials from './NmkFireTestimonials';
import NmkFireFaq from './NmkFireFaq';
import NmkFireContact from './NmkFireContact';
import ExternalLinkSection from '@/components/ExternalLinkSection';
import { SectionType } from '@/types/sections';

// Component mapping for NmkFire template
const sectionComponents: Record<SectionType, React.ComponentType<any>> = {
  'hero': NmkFireHero,
  'services': NmkFireServices,
  'about': NmkFireAbout,
  'team': NmkFireTeam,
  'trusted-clients': NmkFireTrustedClients,
  'testimonials': NmkFireTestimonials,
  'faq': NmkFireFaq,
  'contact': NmkFireContact,
  'custom': () => null, // Default for custom components
  'external-link': ExternalLinkSection
};

const NmkFireHomeTemplate: React.FC = () => {
  // Get sections configuration from the API
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get visible sections sorted by order
  const sections = config?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#0d0d0d]">
      {sections.map(section => {
        const SectionComponent = sectionComponents[section.type];
        
        if (!SectionComponent) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }
        
        return <SectionComponent key={section.id} sectionData={section.data} />;
      })}
    </div>
  );
};

export default NmkFireHomeTemplate;
