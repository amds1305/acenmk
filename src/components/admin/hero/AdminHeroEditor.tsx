
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getHomepageConfig, saveHomepageConfig } from '@/services/sections';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { HeroVersion, HeroSettings, HeroCarouselSettings } from './types';
import VersionManager from './VersionManager';
import StyleEditor from './StyleEditor';
import BlockEditor from './BlockEditor';
import CarouselSettings from './CarouselSettings';
import PreviewHero from './PreviewHero';

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

const AdminHeroEditor = () => {
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
        ...existingHero,
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

  // Sauvegarder les modifications
  const saveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Récupérer la version active pour les données de base du Hero
      const activeVersion = getActiveVersion();
      
      // Préparer les données de base du Hero (compatibilité avec l'interface HeroData)
      const heroData = {
        title: activeVersion.title,
        subtitle: activeVersion.subtitle,
        ctaText: activeVersion.ctaText,
        ctaSecondaryText: activeVersion.ctaSecondaryText,
        backgroundImage: activeVersion.backgroundImage,
        // Autres propriétés de HeroData si nécessaire
      };

      // Préparer les paramètres complets du Hero
      const heroSettings = {
        versions: heroSettings.versions,
        activeVersion: heroSettings.activeVersion,
        carousel: heroSettings.carousel,
        // Ajouter aussi les propriétés de style de la version active pour la rétrocompatibilité
        textColor: activeVersion.textColor,
        titleFontSize: activeVersion.titleFontSize,
        subtitleFontSize: activeVersion.subtitleFontSize,
        backgroundColor: activeVersion.backgroundColor,
        backgroundType: activeVersion.backgroundType,
        backgroundGradient: activeVersion.backgroundGradient,
        marginTop: activeVersion.marginTop,
        marginBottom: activeVersion.marginBottom,
        padding: activeVersion.padding,
        blocks: activeVersion.blocks,
      };

      // Récupérer la configuration actuelle
      const currentConfig = getHomepageConfig();
      
      // Mettre à jour les données
      const updatedConfig = {
        ...currentConfig,
        sectionData: {
          ...currentConfig.sectionData,
          hero: heroData,
          heroSettings: heroSettings,
        },
      };

      // Sauvegarder la configuration mise à jour
      saveHomepageConfig(updatedConfig);

      toast({
        title: "Modifications sauvegardées",
        description: "Les changements sur la section Hero ont été enregistrés avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with title and save button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Éditeur de Hero avancé</h1>
          <p className="text-muted-foreground">
            Personnalisez en détail l'apparence et le comportement de la section Hero
          </p>
        </div>
        <Button 
          onClick={saveChanges} 
          disabled={isSaving} 
          className="ml-auto"
        >
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
        </Button>
      </div>

      {/* Preview card */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <PreviewHero 
            version={getActiveVersion()}
            carousel={heroSettings.versions.length > 1 ? heroSettings.carousel : undefined}
          />
        </CardContent>
      </Card>

      {/* Editor tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="blocks">Blocs</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
        </TabsList>

        <TabsContent value="versions" className="py-4">
          <VersionManager 
            versions={heroSettings.versions}
            activeVersionId={heroSettings.activeVersion}
            onAddVersion={addVersion}
            onDeleteVersion={deleteVersion}
            onSetActiveVersion={setActiveVersion}
            onUpdateVersion={updateVersion}
          />
        </TabsContent>

        <TabsContent value="style" className="py-4">
          <StyleEditor 
            version={getActiveVersion()}
            onUpdateVersion={updateVersion}
          />
        </TabsContent>

        <TabsContent value="blocks" className="py-4">
          <BlockEditor 
            version={getActiveVersion()}
            onUpdateVersion={updateVersion}
          />
        </TabsContent>

        <TabsContent value="carousel" className="py-4">
          <CarouselSettings 
            settings={heroSettings.carousel}
            onUpdateSettings={updateCarouselSettings}
            versionsCount={heroSettings.versions.length}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHeroEditor;
