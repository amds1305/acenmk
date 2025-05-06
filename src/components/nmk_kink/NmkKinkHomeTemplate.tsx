
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';
import NmkKinkHero from './NmkKinkHero';
import NmkKinkServices from './NmkKinkServices';
import NmkKinkAbout from './NmkKinkAbout';
import NmkKinkTeam from './NmkKinkTeam';
import NmkKinkTrustedClients from './NmkKinkTrustedClients';
import NmkKinkTestimonials from './NmkKinkTestimonials';
import NmkKinkFaq from './NmkKinkFaq';
import NmkKinkContact from './NmkKinkContact';
import NmkKinkPricing from './NmkKinkPricing';
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
  const queryClient = useQueryClient();
  
  // Force un rechargement des données au montage du composant
  useEffect(() => {
    // Nettoyer le cache de localStorage pour forcer un rechargement depuis Supabase
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    // Rechargement initial
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    
    // Ajouter un écouteur d'événements pour les changements administratifs
    const handleAdminChanges = () => {
      console.log("Changements administratifs détectés dans Kink Template, rechargement...");
      queryClient.invalidateQueries();
    };

    window.addEventListener('admin-changes-saved', handleAdminChanges);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleAdminChanges);
    };
  }, [queryClient]);
  
  // Get sections configuration from the API with aggressive revalidation
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 0, // Considérer les données comme périmées immédiatement
    refetchOnMount: true, // Recharger à chaque montage
    refetchOnWindowFocus: true, // Recharger à chaque focus de fenêtre
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("KinkTemplate - Configuration chargée:", config);

  // Get visible sections sorted by order
  const sections = config?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];

  // Si aucune section n'est définie, afficher un message d'erreur
  if (sections.length === 0) {
    console.warn("Aucune section n'est configurée pour le template Kink");
  }
  
  console.log("KinkTemplate - Sections à afficher:", sections);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {sections.map(section => {
        const SectionComponent = sectionComponents[section.type];
        
        if (!SectionComponent) {
          console.warn(`No component found for section type: ${section.type}`);
          return null;
        }
        
        console.log(`Rendering Kink section: ${section.id} (${section.type})`);
        return <SectionComponent key={section.id} />;
      })}
      
      {/* La section pricing est toujours affichée */}
      <NmkKinkPricing />
    </div>
  );
};

export default NmkKinkHomeTemplate;
