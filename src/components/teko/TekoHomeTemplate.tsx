
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';
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
  const queryClient = useQueryClient();
  
  // Force un rechargement des données au montage du composant et toutes les 30 secondes
  useEffect(() => {
    // Rechargement initial
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    
    // Rechargement périodique toutes les 30 secondes
    const intervalId = setInterval(() => {
      console.log('Rechargement périodique des données...');
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [queryClient]);
  
  // Get sections configuration from the API with aggressive revalidation
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 0, // Considérer les données comme périmées immédiatement
    refetchOnMount: true, // Recharger à chaque montage
    refetchOnWindowFocus: true, // Recharger à chaque focus de fenêtre
    refetchInterval: 30000, // Recharger toutes les 30 secondes
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Afficher les informations de débogage en console
  console.log('TekoHomeTemplate - Configuration chargée:', config);
  
  // Get visible sections sorted by order
  const sections = config?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];
  
  console.log('TekoHomeTemplate - Sections visibles:', sections);

  return (
    <div className="teko-template flex flex-col min-h-screen w-full">
      {sections.map(section => {
        const SectionComponent = sectionComponents[section.type];
        
        if (!SectionComponent) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }
        
        console.log(`Rendering section: ${section.id} (${section.type})`);
        return <SectionComponent key={section.id} />;
      })}
    </div>
  );
};

export default TekoHomeTemplate;
