
import React from 'react';
import SaveHeroChanges from './SaveHeroChanges';

interface HeroEditorHeaderProps {
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  heroSettings: any;
  getActiveVersion: () => any;
}

const HeroEditorHeader = ({
  isSaving,
  setIsSaving,
  heroSettings,
  getActiveVersion
}: HeroEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Éditeur de Hero avancé</h1>
        <p className="text-muted-foreground">
          Personnalisez en détail l'apparence et le comportement de la section Hero
        </p>
      </div>
      <SaveHeroChanges
        isSaving={isSaving}
        setIsSaving={setIsSaving}
        heroSettings={heroSettings}
        getActiveVersion={getActiveVersion}
      />
    </div>
  );
};

export default HeroEditorHeader;
