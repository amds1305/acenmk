
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import NmkRobotHero from './NmkRobotHero';
import NmkRobotServices from './NmkRobotServices';
import NmkRobotAbout from './NmkRobotAbout';
import NmkRobotTeam from './NmkRobotTeam';
import NmkRobotTrustedClients from './NmkRobotTrustedClients';
import NmkRobotTestimonials from './NmkRobotTestimonials';
import NmkRobotFaq from './NmkRobotFaq';
import NmkRobotContact from './NmkRobotContact';
import ExternalLinkSection from '@/components/ExternalLinkSection';
import { SectionType } from '@/types/sections';

// Component mapping for NmkRobot template
const sectionComponents: Record<SectionType, React.ComponentType<any>> = {
  'hero': NmkRobotHero,
  'services': NmkRobotServices,
  'about': NmkRobotAbout,
  'team': NmkRobotTeam,
  'trusted-clients': NmkRobotTrustedClients,
  'testimonials': NmkRobotTestimonials,
  'faq': NmkRobotFaq,
  'contact': NmkRobotContact,
  'custom': () => null, // Default for custom components
  'external-link': ExternalLinkSection
};

const NmkRobotHomeTemplate: React.FC = () => {
  // Get sections configuration from the API
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get visible sections sorted by order
  const sections = config?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#111827] text-white">
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

export default NmkRobotHomeTemplate;
