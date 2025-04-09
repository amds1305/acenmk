
import React from 'react';
import { useHeroEditor } from './hooks/useHeroEditor';
import HeroEditorHeader from './HeroEditorHeader';
import HeroPreviewCard from './HeroPreviewCard';
import HeroEditorTabs from './HeroEditorTabs';
import LoadingHero from './LoadingHero';

const AdminHeroEditor = () => {
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
  } = useHeroEditor();

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
