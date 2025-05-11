
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { HeroVersion, HeroSettings, HeroCarouselSettings } from '../types';

// Default values
const defaultHeroVersion: HeroVersion = {
  id: uuidv4(),
  name: 'Version principale',
  title: 'Solutions numériques innovantes pour votre entreprise',
  subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
  ctaText: 'Découvrir nos services',
  ctaSecondaryText: 'Nous contacter',
  backgroundImage: '',
  textColor: '#ffffff',
  titleFontSize: '4xl',
  subtitleFontSize: 'xl',
  backgroundColor: '#1a1f2c',
  backgroundType: 'color',
  marginTop: '0px',
  marginBottom: '0px',
  padding: '2rem',
  blocks: [],
};

const defaultCarouselSettings: HeroCarouselSettings = {
  enabled: false,
  transitionTime: 5,
  transitionType: 'fade',
  autoplay: true,
  autoplaySpeed: 7,
};

export const useHeroEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('versions');
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    versions: [defaultHeroVersion],
    activeVersion: defaultHeroVersion.id,
    carousel: defaultCarouselSettings,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Récupérer la configuration existante du Hero
  const { data: homeConfig, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Initialiser les paramètres du Hero à partir des données existantes
  useEffect(() => {
    if (homeConfig?.sectionData?.hero) {
      const existingHero = homeConfig.sectionData.hero;
      const heroData = homeConfig.sectionData.heroSettings || {};
      
      // Créer une version à partir des données existantes
      const initialVersion: HeroVersion = {
        id: uuidv4(),
        name: 'Version principale',
        title: existingHero.title || 'Solutions numériques innovantes pour votre entreprise',
        subtitle: existingHero.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
        ctaText: existingHero.ctaText || 'Découvrir nos services',
        ctaSecondaryText: existingHero.ctaSecondaryText || 'Nous contacter',
        backgroundImage: existingHero.backgroundImage || '',
        textColor: heroData.textColor || '#ffffff',
        titleFontSize: heroData.titleFontSize || '4xl',
        subtitleFontSize: heroData.subtitleFontSize || 'xl',
        backgroundColor: heroData.backgroundColor || '#1a1f2c',
        backgroundType: heroData.backgroundType || 'color',
        backgroundGradient: heroData.backgroundGradient || '',
        marginTop: heroData.marginTop || '0px',
        marginBottom: heroData.marginBottom || '0px',
        padding: heroData.padding || '2rem',
        blocks: heroData.blocks || [],
      };

      setHeroSettings({
        versions: heroData.versions ? [...heroData.versions] : [initialVersion],
        activeVersion: heroData.activeVersion || initialVersion.id,
        carousel: heroData.carousel || defaultCarouselSettings,
      });
    }
  }, [homeConfig]);

  // Obtenir la version active
  const getActiveVersion = () => {
    return heroSettings.versions.find(v => v.id === heroSettings.activeVersion) || heroSettings.versions[0];
  };

  // Mettre à jour une version
  const updateVersion = (updatedVersion: HeroVersion) => {
    setHeroSettings(prev => ({
      ...prev,
      versions: prev.versions.map(v => 
        v.id === updatedVersion.id ? updatedVersion : v
      ),
    }));
  };

  // Ajouter une nouvelle version
  const addVersion = () => {
    const newVersion: HeroVersion = {
      ...defaultHeroVersion,
      id: uuidv4(),
      name: `Version ${heroSettings.versions.length + 1}`,
    };
    
    setHeroSettings(prev => ({
      ...prev,
      versions: [...prev.versions, newVersion],
    }));

    toast({
      title: "Nouvelle version créée",
      description: `La version "${newVersion.name}" a été créée avec succès.`,
    });
  };

  // Supprimer une version
  const deleteVersion = (id: string) => {
    if (heroSettings.versions.length <= 1) {
      toast({
        title: "Opération impossible",
        description: "Vous devez conserver au moins une version du Hero.",
        variant: "destructive",
      });
      return;
    }

    setHeroSettings(prev => {
      const newVersions = prev.versions.filter(v => v.id !== id);
      const newActiveVersion = prev.activeVersion === id 
        ? newVersions[0]?.id 
        : prev.activeVersion;
      
      return {
        ...prev,
        versions: newVersions,
        activeVersion: newActiveVersion,
      };
    });

    toast({
      title: "Version supprimée",
      description: "La version a été supprimée avec succès.",
    });
  };

  // Mettre à jour les paramètres du carousel
  const updateCarouselSettings = (settings: HeroCarouselSettings) => {
    setHeroSettings(prev => ({
      ...prev,
      carousel: settings,
    }));
  };

  // Définir la version active
  const setActiveVersion = (id: string) => {
    setHeroSettings(prev => ({
      ...prev,
      activeVersion: id,
    }));
  };

  return {
    activeTab,
    setActiveTab,
    heroSettings,
    setHeroSettings,
    isSaving,
    setIsSaving,
    isLoading,
    homeConfig,
    getActiveVersion,
    updateVersion,
    addVersion,
    deleteVersion,
    updateCarouselSettings,
    setActiveVersion,
  };
};
