
import React from 'react';
import { Button } from '@/components/ui/button';
import { saveHomepageConfig } from '@/services/sections';
import { getHomepageConfig } from '@/services/sections';
import { queryClient } from '@/lib/queryClient';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { Save } from 'lucide-react';

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
  const { saveStatus, setSaveStatus, showSaveSuccess, showSaveError } = useAdminNotification();

  // Sauvegarder les modifications
  const saveChanges = async () => {
    if (isSaving) return;
    
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
        
        showSaveSuccess();
        
        // Déclencher l'événement de sauvegarde
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      } else {
        throw new Error("La sauvegarde a échoué");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      showSaveError(error);
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
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        {isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
      </Button>
    </div>
  );
};

export default SaveHeroChanges;
