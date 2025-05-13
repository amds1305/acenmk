
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
import TrustedClients from '@/components/TrustedClients';
import Pricing from '@/components/Pricing';
import { TekoHomeTemplate } from '@/components/teko';
import { NmkFireHomeTemplate } from '@/components/nmk_fire';
import { NmkRobotHomeTemplate } from '@/components/nmk_robot';
import { NmkKinkHomeTemplate } from '@/components/nmk_kink';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { useToast } from '@/hooks/use-toast';
import { HomeTemplateType } from '@/types/sections';
import PageLoader from '@/components/common/PageLoader';
import ConfigFallback from '@/components/common/ConfigFallback';
import TestRenderComponent from '@/components/common/TestRenderComponent';
import SectionRenderer from '@/components/sections/SectionRenderer';
import useIntersectionAnimation from '@/hooks/useIntersectionAnimation';

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
  console.log('📊 [Index] Début du rendu du composant Index');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  
  // Setup the intersection observer for animations
  useIntersectionAnimation();
  
  // Force un rechargement des données au montage du composant
  useEffect(() => {
    console.log('📊 [Index] useEffect initial - Nettoyage du cache et préparation du rechargement');
    // Nettoyer le cache de localStorage pour forcer un rechargement depuis Supabase
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    // Invalider le cache pour forcer un rafraîchissement complet
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    console.log("Index - Rechargement initial des données...");
    
    // Ajouter un écouteur d'événements pour les changements administratifs
    const handleAdminChanges = (e?: CustomEvent) => {
      console.log("Changements administratifs détectés, rechargement...", e?.detail);
      queryClient.invalidateQueries();
      setLastUpdate(Date.now()); // Forcer une mise à jour du composant
      toast({
        title: "Site mis à jour",
        description: "Les modifications administratives ont été appliquées",
      });
    };

    window.addEventListener('admin-changes-saved', handleAdminChanges as EventListener);
    
    // Réactualiser régulièrement (toutes les 30 secondes)
    const intervalId = setInterval(() => {
      console.log("Actualisation périodique des données...");
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    }, 30000);
    
    return () => {
      console.log('📊 [Index] Nettoyage du useEffect');
      window.removeEventListener('admin-changes-saved', handleAdminChanges as EventListener);
      clearInterval(intervalId);
    };
  }, [queryClient, toast]);
  
  console.log('📊 [Index] Avant l\'appel à getHomepageConfig via useQuery');
  const { data: homeConfig, isLoading, error } = useQuery({
    queryKey: ['homeConfig', lastUpdate], // Inclure lastUpdate pour forcer le rechargement
    queryFn: getHomepageConfig,
    staleTime: 0, // Toujours considérer comme périmé pour forcer le rechargement
    refetchOnMount: true, // Recharger à chaque montage
    refetchOnWindowFocus: true, // Recharger quand la fenêtre obtient le focus
    retry: 2,
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
    onError: (error) => {
      console.error('Error in getHomepageConfig:', error);
      setErrorOccurred(true);
    }
  });

  console.log('📊 [Index] Après useQuery - homeConfig:', homeConfig, 'error:', error);

  useEffect(() => {
    if (error) {
      console.error('📊 [Index] Erreur détectée dans useQuery:', error);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Impossible de charger la configuration de la page d'accueil. Les paramètres par défaut seront utilisés.",
      });
      console.error("Erreur lors du chargement de la configuration:", error);
      setErrorOccurred(true);
    }
  }, [error, toast]);

  // Affichage d'un fallback pendant le chargement
  if (isLoading) {
    console.log('📊 [Index] Affichage du loader - en attente des données');
    return <PageLoader />;
  }

  // Affichage du composant de repli en cas d'erreur
  if (errorOccurred || !homeConfig) {
    console.warn('⚠️ [Index] Configuration problématique, affichage du fallback');
    return <ConfigFallback />;
  }

  console.log("📊 [Index] Template actif:", homeConfig?.templateConfig?.activeTemplate);
  
  // Sections par défaut à utiliser si nécessaire
  const defaultSections = [
    { id: 'hero-default', type: 'hero', order: 1, visible: true, title: 'Hero' },
    { id: 'services-default', type: 'services', order: 2, visible: true, title: 'Services' },
    { id: 'about-default', type: 'about', order: 3, visible: true, title: 'À propos' },
    { id: 'team-default', type: 'team', order: 4, visible: true, title: 'Équipe' },
    { id: 'testimonials-default', type: 'testimonials', order: 5, visible: true, title: 'Témoignages' },
    { id: 'faq-default', type: 'faq', order: 6, visible: true, title: 'FAQ' },
    { id: 'contact-default', type: 'contact', order: 7, visible: true, title: 'Contact' },
  ];
  
  // Utiliser le template actif si configuré
  const activeTemplate = homeConfig?.templateConfig?.activeTemplate || 'default';
  const TemplateComponent = templates[activeTemplate];

  // Si aucune section n'est définie ou disponible, utiliser les sections par défaut
  const sectionsToDisplay = homeConfig.sections?.length > 0 
    ? homeConfig.sections.filter(section => section.visible)?.sort((a, b) => a.order - b.order) 
    : defaultSections;
    
  console.log('📊 [Index] Sections à afficher:', sectionsToDisplay);

  // Utilisation d'un template personnalisé si configuré
  if (activeTemplate !== 'default' && TemplateComponent) {
    console.log(`📊 [Index] Utilisation du template ${activeTemplate}`);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {/* Section de test de rendu */}
        <TestRenderComponent />
        
        {/* Sections dynamiques */}
        <SectionRenderer 
          sections={sectionsToDisplay}
          sectionComponents={sectionComponents}
        />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
