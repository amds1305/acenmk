
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface GeneralTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Apparence Générale</h3>
        
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Couleur d'arrière-plan</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="backgroundColor"
              type="text"
              value={headerStyle.backgroundColor}
              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
              className="flex-1"
            />
            <Popover>
              <PopoverTrigger asChild>
                <div 
                  className="w-10 h-10 rounded border cursor-pointer" 
                  style={{ 
                    backgroundColor: headerStyle.backgroundColor !== 'transparent' 
                      ? headerStyle.backgroundColor 
                      : 'rgba(255,255,255,0.3)',
                    backgroundImage: headerStyle.backgroundColor === 'transparent'
                      ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                      : 'none',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                  }}
                />
              </PopoverTrigger>
              <PopoverContent side="right" className="w-auto p-3">
                <div className="flex flex-col gap-3">
                  <HexColorPicker 
                    color={headerStyle.backgroundColor !== 'transparent' ? headerStyle.backgroundColor : '#ffffff'} 
                    onChange={(color) => updateStyle('backgroundColor', color)}
                  />
                  <div className="flex justify-between">
                    <button 
                      className="text-xs underline text-gray-600 dark:text-gray-400"
                      onClick={() => updateStyle('backgroundColor', 'transparent')}
                    >
                      Transparent
                    </button>
                    <button 
                      className="text-xs underline text-gray-600 dark:text-gray-400"
                      onClick={() => updateStyle('backgroundColor', '#ffffff')}
                    >
                      Blanc
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="padding">Espacement (padding)</Label>
          <Input 
            id="padding"
            type="text"
            value={headerStyle.padding}
            onChange={(e) => updateStyle('padding', e.target.value)}
          />
          <p className="text-xs text-gray-500">Format: '1rem' ou '16px'</p>
        </div>
      </div>

      <div className="grid gap-4 pt-2">
        <h3 className="font-medium">Comportement</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sticky-header" className="block">Header fixe</Label>
            <p className="text-xs text-gray-500">Le header reste visible lors du défilement</p>
          </div>
          <Switch 
            id="sticky-header"
            checked={headerStyle.sticky}
            onCheckedChange={(checked) => updateStyle('sticky', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="transparent-header" className="block">Fond transparent</Label>
            <p className="text-xs text-gray-500">Le fond devient transparent au haut de la page</p>
          </div>
          <Switch 
            id="transparent-header"
            checked={headerStyle.transparent}
            onCheckedChange={(checked) => updateStyle('transparent', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-selector" className="block">Sélecteur de thème</Label>
            <p className="text-xs text-gray-500">Affiche le bouton de changement de thème</p>
          </div>
          <Switch 
            id="theme-selector"
            checked={headerStyle.showThemeSelector}
            onCheckedChange={(checked) => updateStyle('showThemeSelector', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="glassmorphism" className="block">Effet verre</Label>
            <p className="text-xs text-gray-500">Ajoute un effet de flou transparent</p>
          </div>
          <Switch 
            id="glassmorphism"
            checked={headerStyle.glassmorphism}
            onCheckedChange={(checked) => updateStyle('glassmorphism', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="borderBottom" className="block">Bordure inférieure</Label>
            <p className="text-xs text-gray-500">Ajoute une fine bordure en bas du header</p>
          </div>
          <Switch 
            id="borderBottom"
            checked={headerStyle.borderBottom}
            onCheckedChange={(checked) => updateStyle('borderBottom', checked)}
          />
        </div>
        
        {headerStyle.borderBottom && (
          <div className="space-y-2 ml-6 border-l-2 pl-4 border-gray-200 dark:border-gray-700">
            <Label htmlFor="borderColor">Couleur de la bordure</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="borderColor"
                type="text"
                value={headerStyle.borderColor}
                onChange={(e) => updateStyle('borderColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.borderColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.borderColor} 
                    onChange={(color) => updateStyle('borderColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dropShadow" className="block">Ombre portée</Label>
            <p className="text-xs text-gray-500">Ajoute une ombre sous le header</p>
          </div>
          <Switch 
            id="dropShadow"
            checked={headerStyle.dropShadow}
            onCheckedChange={(checked) => updateStyle('dropShadow', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
