
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { saveHomepageConfig } from '@/services/sections';
import { useToast } from '@/hooks/use-toast';
import { getHomepageConfig } from '@/services/sections';
import { queryClient } from '@/lib/queryClient';
import { SaveIndicator } from '@/components/ui/save-indicator';

interface SaveHeroChangesProps {
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  heroSettings: any;
  getActiveVersion: () => any;
}

const SaveHeroChanges = ({ 
  isSaving, 
  setIsSaving,
  heroSettings,
  getActiveVersion
}: SaveHeroChangesProps) => {
  const { toast } = useToast();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Sauvegarder les modifications
  const saveChanges = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
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
      const heroSettingsData = {
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
      const currentConfig = await getHomepageConfig();
      
      // Mettre à jour les données
      const updatedConfig = {
        ...currentConfig,
        sectionData: {
          ...currentConfig.sectionData,
          hero: heroData,
          heroSettings: heroSettingsData,
        },
      };

      // Sauvegarder la configuration mise à jour
      const success = await saveHomepageConfig(updatedConfig);
      
      if (success) {
        // Invalider explicitement toutes les requêtes pour forcer un rechargement
        queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
        
        setSaveStatus('success');
        
        toast({
          title: "Modifications sauvegardées",
          description: "Les changements sur la section Hero ont été enregistrés avec succès.",
        });
        
        // Déclencher l'événement de sauvegarde
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
        
        // Réinitialiser l'état après un délai
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setSaveStatus('error');
      
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
      
      // Réinitialiser l'état après un délai même en cas d'erreur
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-4 ml-auto">
      <SaveIndicator status={saveStatus} />
      <Button 
        onClick={saveChanges} 
        disabled={isSaving} 
      >
        {isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
      </Button>
    </div>
  );
};

export default SaveHeroChanges;
