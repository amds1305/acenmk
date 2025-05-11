
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HomeHeader from './home/HomeHeader';
import HeroEditCard from './home/HeroEditCard';
import SectionRedirectCard from './home/SectionRedirectCard';
import SectionsManager from './home/SectionsManager';
import { useSections } from '@/contexts/sections/SectionsContext';
import { HeroData } from '@/components/Hero';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const AdminHome = () => {
  const { config, updateExistingSectionData, saveChanges, reloadConfig } = useSections();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Force a reload of the configuration when the component mounts
  useEffect(() => {
    console.log('AdminHome: reloading configuration');
    reloadConfig();
    
    // Invalidate the cache for various queries
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    queryClient.invalidateQueries({ queryKey: ['faqs'] });
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  }, [reloadConfig, queryClient]);
  
  // Create a properly typed heroData object with default values
  const heroData: HeroData = {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    ...(config.sectionData.hero || {}) // Merge with existing data if available
  };

  const handleHeroDataChange = (updatedHeroData: HeroData) => {
    updateExistingSectionData('hero', updatedHeroData);
  };

  const handleSave = () => {
    saveChanges().then(() => {
      toast({
        title: "Configuration sauvegardée",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    }).catch((error) => {
      console.error('Error saving config:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
      });
    });
  };

  // Log out the sections for debugging
  console.log('AdminHome: Sections loaded:', config.sections);
  console.log('AdminHome: Template Config:', config.templateConfig);

  return (
    <div className="space-y-6">
      <HomeHeader onSave={handleSave} />
      
      {/* Gestionnaire de sections avec drag and drop */}
      <div className="bg-white dark:bg-gray-950 shadow-sm rounded-lg border border-gray-200 dark:border-gray-800">
        <SectionsManager />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Aperçu des sections</h2>
        <p className="text-sm text-muted-foreground">
          Modifiez chaque section en détail via le menu latéral
        </p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 sm:grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4">
          <HeroEditCard 
            heroData={heroData} 
            setHeroData={handleHeroDataChange} 
            onSave={handleSave}
          />
        </TabsContent>
        
        <TabsContent value="services">
          <SectionRedirectCard
            title="Section Services"
            description="Vous pouvez gérer la section Services dans l'onglet dédié dans le menu latéral."
            redirectPath="/admin/services"
            buttonText="Gérer les services"
          />
        </TabsContent>
        
        <TabsContent value="about">
          <SectionRedirectCard
            title="Section À propos"
            description="Vous pouvez gérer la section À propos dans l'onglet dédié dans le menu latéral."
            redirectPath="/admin/about"
            buttonText="Gérer la section À propos"
          />
        </TabsContent>
        
        <TabsContent value="team">
          <SectionRedirectCard
            title="Section Équipe"
            description="Vous pouvez gérer les membres de l'équipe dans l'onglet dédié dans le menu latéral."
            redirectPath="/admin/team"
            buttonText="Gérer l'équipe"
          />
        </TabsContent>
        
        <TabsContent value="testimonials">
          <SectionRedirectCard
            title="Section Témoignages"
            description="Vous pouvez gérer les témoignages clients dans l'onglet dédié dans le menu latéral."
            redirectPath="/admin/testimonials"
            buttonText="Gérer les témoignages"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHome;
