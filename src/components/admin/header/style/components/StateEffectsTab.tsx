
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';

interface StateEffectsTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const StateEffectsTab: React.FC<StateEffectsTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Effets lors du défilement</h3>
        <p className="text-sm text-gray-500">
          Personnalisez l'apparence du header lorsque l'utilisateur fait défiler la page.
        </p>
      </div>
      
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="scrolledBgColor">Couleur d'arrière-plan (défilement)</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="scrolledBgColor"
                type="text"
                value={headerStyle.scrolledBgColor || 'rgba(255, 255, 255, 0.8)'}
                onChange={(e) => updateStyle('scrolledBgColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.scrolledBgColor || 'rgba(255, 255, 255, 0.8)' }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <div className="flex flex-col gap-3">
                    <HexColorPicker 
                      color={headerStyle.scrolledBgColor?.startsWith('#') 
                        ? headerStyle.scrolledBgColor 
                        : '#ffffff'} 
                      onChange={(color) => updateStyle('scrolledBgColor', color)}
                    />
                    <div className="flex justify-between">
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('scrolledBgColor', 'rgba(255, 255, 255, 0.8)')}
                      >
                        Semi-transparent
                      </button>
                      <button 
                        className="text-xs underline text-gray-600 dark:text-gray-400"
                        onClick={() => updateStyle('scrolledBgColor', '#ffffff')}
                      >
                        Opaque
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-xs text-gray-500">Format: couleur hex ou rgba pour transparence</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scrolledTextColor">Couleur du texte (défilement)</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="scrolledTextColor"
                type="text"
                value={headerStyle.scrolledTextColor || headerStyle.textColor}
                onChange={(e) => updateStyle('scrolledTextColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.scrolledTextColor || headerStyle.textColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.scrolledTextColor || headerStyle.textColor} 
                    onChange={(color) => updateStyle('scrolledTextColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scrolledBorderColor">Couleur de bordure (défilement)</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="scrolledBorderColor"
                type="text"
                value={headerStyle.scrolledBorderColor || headerStyle.borderColor}
                onChange={(e) => updateStyle('scrolledBorderColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.scrolledBorderColor || headerStyle.borderColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.scrolledBorderColor || headerStyle.borderColor} 
                    onChange={(color) => updateStyle('scrolledBorderColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scrolledShadow">Ombre (défilement)</Label>
            <Input 
              id="scrolledShadow"
              type="text"
              value={headerStyle.scrolledShadow || '0 2px 4px rgba(0, 0, 0, 0.05)'}
              onChange={(e) => updateStyle('scrolledShadow', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format CSS. Ex: '0 2px 4px rgba(0, 0, 0, 0.05)'</p>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Aperçu des états</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-2">
            <div className="text-sm font-medium mb-2 px-2">État normal</div>
            <div className="h-16 rounded flex items-center px-4"
              style={{ 
                backgroundColor: headerStyle.backgroundColor,
                color: headerStyle.textColor,
                borderBottom: headerStyle.borderBottom ? `1px solid ${headerStyle.borderColor}` : 'none',
                boxShadow: headerStyle.dropShadow ? '0 2px 4px rgba(0, 0, 0, 0.05)' : 'none',
              }}
            >
              <div className="text-sm font-medium" style={{ color: headerStyle.textColor }}>Logo</div>
              <div className="ml-6 flex gap-4">
                <span>Accueil</span>
                <span style={{ color: headerStyle.activeColor }}>Services</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-2">
            <div className="text-sm font-medium mb-2 px-2">État défilé</div>
            <div className="h-16 rounded flex items-center px-4"
              style={{ 
                backgroundColor: headerStyle.scrolledBgColor || 'rgba(255, 255, 255, 0.8)',
                color: headerStyle.scrolledTextColor || headerStyle.textColor,
                borderBottom: headerStyle.borderBottom ? `1px solid ${headerStyle.scrolledBorderColor || headerStyle.borderColor}` : 'none',
                boxShadow: headerStyle.dropShadow ? headerStyle.scrolledShadow || '0 2px 4px rgba(0, 0, 0, 0.05)' : 'none',
                backdropFilter: headerStyle.glassmorphism ? 'blur(10px)' : 'none',
              }}
            >
              <div className="text-sm font-medium" style={{ color: headerStyle.scrolledTextColor || headerStyle.textColor }}>Logo</div>
              <div className="ml-6 flex gap-4">
                <span>Accueil</span>
                <span style={{ color: headerStyle.activeColor }}>Services</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateEffectsTab;
