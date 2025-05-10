
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { HeroSettings } from './types';

interface HeroEditorHeaderProps {
  isSaving: boolean;
  setIsSaving: (saving: boolean) => void;
  heroSettings: HeroSettings;
  getActiveVersion: () => any;
}

const HeroEditorHeader: React.FC<HeroEditorHeaderProps> = ({
  isSaving,
  setIsSaving,
  heroSettings,
  getActiveVersion,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Éditeur de section Hero</h1>
        <p className="text-muted-foreground">
          Personnalisez l'apparence et le contenu de la section Hero
        </p>
      </div>
      <Button 
        onClick={() => setIsSaving(true)}
        className="flex items-center gap-2"
        disabled={isSaving}
      >
        {isSaving ? (
          "Sauvegarde..."
        ) : (
          <>
            <Save className="h-4 w-4" />
            Enregistrer
          </>
        )}
      </Button>
    </div>
  );
};

export default HeroEditorHeader;
