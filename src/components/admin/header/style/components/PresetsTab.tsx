
import React from 'react';
import { Button } from '@/components/ui/button';
import { HeaderStyle } from '@/components/admin/header/types';
import { Check } from 'lucide-react';

interface PresetsTabProps {
  availablePresets: { name: string; style: HeaderStyle }[];
  loadPreset: (preset: HeaderStyle) => void;
}

const PresetsTab: React.FC<PresetsTabProps> = ({ availablePresets, loadPreset }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Préréglages disponibles</h3>
      <p className="text-xs text-gray-500">
        Cliquez sur un préréglage pour l'appliquer. N'oubliez pas de sauvegarder les changements.
      </p>
      
      <div className="space-y-2">
        {availablePresets.map((preset, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm">{preset.name}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => loadPreset(preset.style)}
              className="flex items-center gap-1"
            >
              <Check className="h-3 w-3" />
              Appliquer
            </Button>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t text-xs text-gray-500">
        <p>
          Les préréglages remplacent toutes vos personnalisations actuelles.
          Sauvegardez vos changements après avoir appliqué un préréglage.
        </p>
      </div>
    </div>
  );
};

export default PresetsTab;
