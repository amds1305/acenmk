
import React, { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import HomeHeader from './home/HomeHeader';
import HomeVisibilityCard from './home/HomeVisibilityCard';
import HeroEditCard from './home/HeroEditCard';
import SectionRedirectCard from './home/SectionRedirectCard';
import { SectionVisibility } from '@/pages/Index';
import { HeroData } from '@/components/Hero';

const AdminHome = () => {
  const { toast } = useToast();
  
  const [heroData, setHeroData] = React.useState<HeroData>({
    title: 'Transformez Votre Vision en Réalité Numérique',
    subtitle: 'Solutions innovantes de développement web et mobile pour propulser votre entreprise vers l\'avenir',
    ctaText: 'Discuter de votre projet',
    ctaSecondaryText: 'Découvrir nos services',
    backgroundImage: '/images/hero-bg.jpg'
  });

  const [visibleSections, setVisibleSections] = React.useState<SectionVisibility>({
    hero: true,
    services: true,
    about: true,
    team: true,
    testimonials: true,
    faq: true,
    contact: true,
  });

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    // Charger les paramètres de visibilité
    const savedVisibility = localStorage.getItem('homeVisibility');
    if (savedVisibility) {
      try {
        setVisibleSections(JSON.parse(savedVisibility));
      } catch (error) {
        console.error('Error parsing saved visibility settings:', error);
      }
    }
    
    // Charger les données du Hero
    const savedHeroData = localStorage.getItem('heroData');
    if (savedHeroData) {
      try {
        setHeroData(JSON.parse(savedHeroData));
      } catch (error) {
        console.error('Error parsing saved hero data:', error);
      }
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage for demo purposes
    // In a real app, this would be an API call
    localStorage.setItem('homeVisibility', JSON.stringify(visibleSections));
    localStorage.setItem('heroData', JSON.stringify(heroData));
    
    toast({
      title: "Modifications enregistrées",
      description: "Les paramètres de la page d'accueil ont été mis à jour avec succès.",
    });
  };

  const toggleSection = (section: keyof SectionVisibility) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      <HomeHeader onSave={handleSave} />

      <HomeVisibilityCard 
        visibleSections={visibleSections} 
        toggleSection={toggleSection} 
      />

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
            setHeroData={setHeroData} 
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
