
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HeroVersion } from '../types';

interface SpacingStyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const SpacingStyleEditor = ({ version, onUpdateVersion }: SpacingStyleEditorProps) => {
  // Update margin top
  const updateMarginTop = (value: string) => {
    onUpdateVersion({
      ...version,
      marginTop: value,
    });
  };

  // Update margin bottom
  const updateMarginBottom = (value: string) => {
    onUpdateVersion({
      ...version,
      marginBottom: value,
    });
  };

  // Update padding
  const updatePadding = (value: string) => {
    onUpdateVersion({
      ...version,
      padding: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="marginTop">Marge supérieure</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="marginTop"
            value={version.marginTop || '0'} 
            onChange={(e) => updateMarginTop(e.target.value)}
            placeholder="0px, 1rem, 10vh, etc."
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="marginBottom">Marge inférieure</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="marginBottom"
            value={version.marginBottom || '0'} 
            onChange={(e) => updateMarginBottom(e.target.value)}
            placeholder="0px, 1rem, 10vh, etc."
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="padding">Rembourrage intérieur</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="padding"
            value={version.padding || '2rem'} 
            onChange={(e) => updatePadding(e.target.value)}
            placeholder="2rem, 20px 10px, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default SpacingStyleEditor;
