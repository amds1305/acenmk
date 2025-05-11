
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface StateEffectsTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const StateEffectsTab = ({ headerStyle, updateStyle }: StateEffectsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-2">État lors du défilement</div>
      
      <div className="grid gap-2">
        <Label htmlFor="scrolledBgColor">Couleur d'arrière-plan (scrolled)</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="scrolledBgColor"
            type="text"
            value={headerStyle.scrolledBgColor}
            onChange={(e) => updateStyle('scrolledBgColor', e.target.value)}
          />
          <Input 
            type="color"
            value={headerStyle.scrolledBgColor !== 'transparent' ? headerStyle.scrolledBgColor : '#ffffff'}
            onChange={(e) => updateStyle('scrolledBgColor', e.target.value)}
            className="w-12 h-10 p-1"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="scrolledTextColor">Couleur du texte (scrolled)</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="scrolledTextColor"
            type="text"
            value={headerStyle.scrolledTextColor}
            onChange={(e) => updateStyle('scrolledTextColor', e.target.value)}
          />
          <Input 
            type="color"
            value={headerStyle.scrolledTextColor}
            onChange={(e) => updateStyle('scrolledTextColor', e.target.value)}
            className="w-12 h-10 p-1"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="scrolledBorderColor">Couleur de bordure (scrolled)</Label>
        <div className="flex items-center gap-2">
          <Input 
            id="scrolledBorderColor"
            type="text"
            value={headerStyle.scrolledBorderColor}
            onChange={(e) => updateStyle('scrolledBorderColor', e.target.value)}
          />
          <Input 
            type="color"
            value={headerStyle.scrolledBorderColor}
            onChange={(e) => updateStyle('scrolledBorderColor', e.target.value)}
            className="w-12 h-10 p-1"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="scrolledShadow">Ombre (scrolled)</Label>
        <Input 
          id="scrolledShadow"
          type="text"
          value={headerStyle.scrolledShadow}
          onChange={(e) => updateStyle('scrolledShadow', e.target.value)}
          placeholder="ex: 0 2px 4px rgba(0, 0, 0, 0.05)"
        />
      </div>
    </div>
  );
};

export default StateEffectsTab;
