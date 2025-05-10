
import React from 'react';
import { useHeroEditor } from './hooks/useHeroEditor';
import HeroEditorHeader from './HeroEditorHeader';
import HeroPreviewCard from './HeroPreviewCard';
import HeroEditorTabs from './HeroEditorTabs';
import LoadingHero from './LoadingHero';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

const AdminHeroEditor = () => {
  const { toast } = useToast();
  const {
    activeTab,
    setActiveTab,
    heroSettings,
    isSaving,
    setIsSaving,
    isLoading,
    getActiveVersion,
    updateVersion,
    addVersion,
    deleteVersion,
    updateCarouselSettings,
    setActiveVersion,
    saveHeroChanges
  } = useHeroEditor();

  // Effet pour déclencher la sauvegarde lorsque isSaving devient true
  React.useEffect(() => {
    async function save() {
      if (isSaving) {
        try {
          await saveHeroChanges();
          toast({
            title: "Modifications enregistrées",
            description: "Les changements ont été appliqués avec succès.",
          });
        } catch (error) {
          console.error('Erreur lors de la sauvegarde:', error);
          toast({
            variant: "destructive",
            title: "Erreur de sauvegarde",
            description: "Impossible d'enregistrer vos modifications.",
            action: <ToastAction altText="Réessayer" onClick={() => setIsSaving(true)}>Réessayer</ToastAction>,
          });
        } finally {
          setIsSaving(false);
        }
      }
    }
    save();
  }, [isSaving, saveHeroChanges, toast, setIsSaving]);

  if (isLoading) {
    return <LoadingHero />;
  }

  // Get active version
  const activeVersion = getActiveVersion();

  return (
    <div className="space-y-6">
      {/* Header with title and save button */}
      <HeroEditorHeader 
        isSaving={isSaving} 
        setIsSaving={setIsSaving}
        heroSettings={heroSettings}
        getActiveVersion={getActiveVersion}
      />

      {/* Preview card */}
      <HeroPreviewCard 
        activeVersion={activeVersion}
        carousel={heroSettings.carousel}
        versionsCount={heroSettings.versions.length}
      />

      {/* Editor tabs */}
      <HeroEditorTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        versions={heroSettings.versions}
        activeVersionId={heroSettings.activeVersion}
        activeVersion={activeVersion}
        carousel={heroSettings.carousel}
        onAddVersion={addVersion}
        onDeleteVersion={deleteVersion}
        onSetActiveVersion={setActiveVersion}
        onUpdateVersion={updateVersion}
        onUpdateCarouselSettings={updateCarouselSettings}
      />
    </div>
  );
};

export default AdminHeroEditor;
