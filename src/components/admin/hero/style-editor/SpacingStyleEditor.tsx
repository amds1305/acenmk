
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HeroVersion } from '../types';

interface SpacingStyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const SpacingStyleEditor = ({ version, onUpdateVersion }: SpacingStyleEditorProps) => {
  // Update spacing
  const updateSpacing = (property: 'marginTop' | 'marginBottom' | 'padding', value: string) => {
    onUpdateVersion({
      ...version,
      [property]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="marginTop">Marge supérieure</Label>
        <Input 
          id="marginTop"
          value={version.marginTop} 
          onChange={(e) => updateSpacing('marginTop', e.target.value)}
          placeholder="0px"
        />
        <p className="text-xs text-muted-foreground">
          Exemple: 0px, 1rem, 20px, etc.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="marginBottom">Marge inférieure</Label>
        <Input 
          id="marginBottom"
          value={version.marginBottom} 
          onChange={(e) => updateSpacing('marginBottom', e.target.value)}
          placeholder="0px"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="padding">Padding (interne)</Label>
        <Input 
          id="padding"
          value={version.padding} 
          onChange={(e) => updateSpacing('padding', e.target.value)}
          placeholder="2rem"
        />
        <p className="text-xs text-muted-foreground">
          Exemple: 1rem, 2rem, 20px 40px (haut/bas gauche/droite), etc.
        </p>
      </div>
    </div>
  );
};

export default SpacingStyleEditor;
