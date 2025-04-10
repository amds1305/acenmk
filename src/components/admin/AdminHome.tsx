
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HomeHeader from './home/HomeHeader';
import HomeVisibilityCard from './home/HomeVisibilityCard';
import HeroEditCard from './home/HeroEditCard';
import SectionRedirectCard from './home/SectionRedirectCard';
import SectionsManager from './home/SectionsManager';
import TemplateSelector from './home/TemplateSelector';
import { useSections } from '@/contexts/SectionsContext';
import { HeroData } from '@/components/Hero';

const AdminHome = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  
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
    saveChanges();
  };

  return (
    <div className="space-y-6">
      <HomeHeader onSave={handleSave} />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Sélection du Template</h2>
        <TemplateSelector />
      </div>
      
      <SectionsManager />

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
