
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { HeroVersion, HeroSettings } from './types';
import StyleEditor from './StyleEditor';
import { useAdminNotification } from '@/hooks/admin-notification/use-admin-notification';
import { v4 as uuid } from 'uuid';
import { useSections } from '@/contexts/sections/SectionsContext';

const DEFAULT_VERSION: HeroVersion = {
  id: uuid(),
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
  backgroundGradient: '',
  marginTop: '0',
  marginBottom: '0',
  padding: '2rem',
  blocks: [],
  buttonStyle: {
    primary: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderRadius: '0.375rem',
      borderColor: 'transparent',
      borderWidth: '1px',
      hoverBackgroundColor: '#2563eb',
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: '#3b82f6',
      borderRadius: '0.375rem',
      borderColor: '#3b82f6',
      borderWidth: '1px',
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.1)',
    }
  }
};

const DEFAULT_SETTINGS: HeroSettings = {
  versions: [DEFAULT_VERSION],
  activeVersion: DEFAULT_VERSION.id,
  carousel: {
    enabled: false,
    transitionTime: 0.5,
    transitionType: 'fade',
    autoplay: false,
    autoplaySpeed: 5,
  },
};

const AdminHeroEditor = () => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError, showProcessing } = useAdminNotification();
  const { config, updateExistingSectionData, saveChanges } = useSections();
  
  const [heroData, setHeroData] = useState(() => {
    return config.sectionData.hero || {
      title: 'Solutions numériques innovantes pour votre entreprise',
      subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
      ctaText: 'Découvrir nos services',
      ctaSecondaryText: 'Nous contacter',
      backgroundImage: '',
    };
  });
  
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    return config.sectionData.heroSettings || DEFAULT_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState('style');
  const [activeVersionId, setActiveVersionId] = useState<string>(() => heroSettings.activeVersion);

  // Trouver la version active
  const activeVersion = heroSettings.versions.find(v => v.id === activeVersionId) || heroSettings.versions[0];

  // Mise à jour de la version active
  const handleUpdateVersion = (updatedVersion: HeroVersion) => {
    const updatedVersions = heroSettings.versions.map(v => 
      v.id === updatedVersion.id ? updatedVersion : v
    );
    
    setHeroSettings({
      ...heroSettings,
      versions: updatedVersions,
    });
    
    // Mettre également à jour les données principales du hero pour la rétrocompatibilité
    setHeroData({
      ...heroData,
      title: updatedVersion.title,
      subtitle: updatedVersion.subtitle,
      ctaText: updatedVersion.ctaText,
      ctaSecondaryText: updatedVersion.ctaSecondaryText,
      backgroundImage: updatedVersion.backgroundImage,
    });
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    try {
      showProcessing();
      
      // Mettre à jour à la fois les données du hero et les paramètres avancés
      await updateExistingSectionData('hero', heroData);
      await updateExistingSectionData('heroSettings', heroSettings);
      await saveChanges();
      
      showSaveSuccess();
      toast({
        title: "Modifications enregistrées",
        description: "Les styles du Hero ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSaveError();
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des modifications.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur du Hero</CardTitle>
          <CardDescription>
            Personnalisez l'apparence et le contenu de la section Hero de votre page d'accueil.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="blocks">Blocs</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="carousel">Carousel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style">
              <StyleEditor 
                version={activeVersion} 
                onUpdateVersion={handleUpdateVersion} 
              />
            </TabsContent>
            
            <TabsContent value="blocks">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des blocs</CardTitle>
                  <CardDescription>
                    Ajoutez et configurez des éléments personnalisés dans votre Hero
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible prochainement...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="versions">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des versions</CardTitle>
                  <CardDescription>
                    Créez et gérez plusieurs versions de votre Hero
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible prochainement...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="carousel">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du carousel</CardTitle>
                  <CardDescription>
                    Configurez le défilement automatique entre différentes versions du Hero
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible prochainement...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminHeroEditor;
