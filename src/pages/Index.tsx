
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
import { getHomepageConfig } from '@/services/mysql';
import { useToast } from '@/hooks/use-toast';
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
  console.log('📊 [Index] Début du rendu du composant Index');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  
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
  });

  console.log('📊 [Index] Après useQuery - homeConfig:', homeConfig);

  useEffect(() => {
    if (error) {
      console.error('📊 [Index] Erreur détectée dans useQuery:', error);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Impossible de charger la configuration de la page d'accueil. Les paramètres par défaut seront utilisés.",
      });
      console.error("Erreur lors du chargement de la configuration:", error);
    }
  }, [error, toast]);

  console.log("📊 [Index] Template actif:", homeConfig?.templateConfig?.activeTemplate);
  console.log("📊 [Index] Sections disponibles:", homeConfig?.sections);
  const activeTemplate = homeConfig?.templateConfig?.activeTemplate || 'default';
  const TemplateComponent = templates[activeTemplate];

  const sectionsToDisplay = homeConfig?.sections
    ?.filter(section => section.visible)
    ?.sort((a, b) => a.order - b.order) || [];
    
  console.log('📊 [Index] Sections à afficher:', sectionsToDisplay);

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

  // Affichage d'un fallback pendant le chargement
  if (isLoading) {
    console.log('📊 [Index] Affichage du loader - en attente des données');
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement de votre site...</p>
      </div>
    );
  }

  // Nouveau fallback: si homeConfig est vide
  if (!homeConfig || !homeConfig.sections || homeConfig.sections.length === 0) {
    console.warn('⚠️ [Index] Aucune configuration chargée, affichage du fallback');
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Aucune configuration chargée</h1>
            <p className="mb-4">La configuration de la page d'accueil n'a pas pu être chargée correctement.</p>
            <h2 className="text-xl mb-2">Test de rendu</h2>
            <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded">
              <p>Si vous voyez ce message, le rendu React fonctionne correctement.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Recharger la page
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const displaySections = sectionsToDisplay.length > 0 ? sectionsToDisplay : [
    { id: 'hero-default', type: 'hero', order: 1 },
    { id: 'services-default', type: 'services', order: 2 },
    { id: 'about-default', type: 'about', order: 3 },
    { id: 'team-default', type: 'team', order: 4 },
    { id: 'testimonials-default', type: 'testimonials', order: 5 },
    { id: 'faq-default', type: 'faq', order: 6 },
    { id: 'contact-default', type: 'contact', order: 7 },
  ];

  console.log('📊 [Index] Sections à rendre finalement:', displaySections);
  
  // Ajouter un test de rendu au cas où quelque chose bloquerait ailleurs
  const TestRenderComponent = () => (
    <div className="p-4 my-8 bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 rounded text-center">
      <h1 className="text-xl font-bold">Test de rendu</h1>
      <p>Cette section est affichée pour vérifier que le rendu fonctionne.</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {/* Section de test de rendu */}
        <TestRenderComponent />
        
        {/* Sections dynamiques */}
        {displaySections.map((section) => {
          const SectionComponent = sectionComponents[section.type];
          
          if (!SectionComponent) {
            console.warn(`📊 [Index] Section component not found for type: ${section.type}`);
            return (
              <div key={section.id} className="p-4 my-2 bg-red-100 dark:bg-red-900 border border-red-500 rounded text-center">
                <p className="text-red-600 dark:text-red-300">⚠️ Composant non trouvé: {section.type}</p>
              </div>
            );
          }
          
          try {
            console.log(`📊 [Index] Rendu de la section ${section.id} (${section.type})`);
            return <SectionComponent key={section.id} />;
          } catch (err) {
            console.error(`📊 [Index] Erreur lors du rendu de la section ${section.type}:`, err);
            return (
              <div key={section.id} className="p-4 my-2 bg-red-100 dark:bg-red-900 border border-red-500 rounded text-center">
                <p className="text-red-600 dark:text-red-300">⚠️ Erreur de rendu: {section.type}</p>
                <pre className="text-sm overflow-auto">{err instanceof Error ? err.message : 'Erreur inconnue'}</pre>
              </div>
            );
          }
        })}
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
