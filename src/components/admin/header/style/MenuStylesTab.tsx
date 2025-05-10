
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { HeaderStyle } from '../types';

interface MenuStylesTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

export const MenuStylesTab: React.FC<MenuStylesTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      {/* Couleurs de texte */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="textColor">Couleur du texte</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="textColor"
              type="text"
              value={headerStyle.textColor}
              onChange={(e) => updateStyle('textColor', e.target.value)}
            />
            <Input 
              type="color"
              value={headerStyle.textColor}
              onChange={(e) => updateStyle('textColor', e.target.value)}
              className="w-12 h-10 p-1"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="hoverColor">Couleur du texte au survol</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="hoverColor"
              type="text"
              value={headerStyle.hoverColor}
              onChange={(e) => updateStyle('hoverColor', e.target.value)}
            />
            <Input 
              type="color"
              value={headerStyle.hoverColor}
              onChange={(e) => updateStyle('hoverColor', e.target.value)}
              className="w-12 h-10 p-1"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="activeColor">Couleur du texte actif</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="activeColor"
              type="text"
              value={headerStyle.activeColor}
              onChange={(e) => updateStyle('activeColor', e.target.value)}
            />
            <Input 
              type="color"
              value={headerStyle.activeColor}
              onChange={(e) => updateStyle('activeColor', e.target.value)}
              className="w-12 h-10 p-1"
            />
          </div>
        </div>
      </div>
      
      {/* Couleurs de fond */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-semibold mb-3">Couleurs d'arrière-plan du menu</h3>
        
        <div className="space-y-1.5">
          <Label htmlFor="menuHoverBgColor">Couleur d'arrière-plan au survol</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="menuHoverBgColor"
              type="text"
              value={headerStyle.menuHoverBgColor}
              onChange={(e) => updateStyle('menuHoverBgColor', e.target.value)}
            />
            <Input 
              type="color"
              value={headerStyle.menuHoverBgColor !== 'transparent' ? headerStyle.menuHoverBgColor : '#ffffff'}
              onChange={(e) => updateStyle('menuHoverBgColor', e.target.value)}
              className="w-12 h-10 p-1"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="menuActiveBgColor">Couleur d'arrière-plan actif</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="menuActiveBgColor"
              type="text"
              value={headerStyle.menuActiveBgColor}
              onChange={(e) => updateStyle('menuActiveBgColor', e.target.value)}
            />
            <Input 
              type="color"
              value={headerStyle.menuActiveBgColor !== 'transparent' ? headerStyle.menuActiveBgColor : '#ffffff'}
              onChange={(e) => updateStyle('menuActiveBgColor', e.target.value)}
              className="w-12 h-10 p-1"
            />
          </div>
        </div>
      </div>
      
      {/* Typographie */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-semibold mb-3">Typographie</h3>
        
        <div className="space-y-1.5">
          <Label htmlFor="fontFamily">Police de caractères</Label>
          <Input 
            id="fontFamily"
            type="text"
            value={headerStyle.fontFamily}
            onChange={(e) => updateStyle('fontFamily', e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="fontSize">Taille de la police</Label>
          <Input 
            id="fontSize"
            type="text"
            value={headerStyle.fontSize}
            onChange={(e) => updateStyle('fontSize', e.target.value)}
          />
        </div>
      </div>
      
      {/* Prévisualisation */}
      <div className="mt-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
        <div className="text-center mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Prévisualisation</div>
        <div className="flex justify-center gap-4">
          <div 
            className="px-3 py-2 rounded-md"
            style={{
              color: headerStyle.textColor,
              fontFamily: headerStyle.fontFamily,
              fontSize: headerStyle.fontSize
            }}
          >
            Menu normal
          </div>
          <div 
            className="px-3 py-2 rounded-md"
            style={{
              color: headerStyle.hoverColor,
              backgroundColor: headerStyle.menuHoverBgColor,
              fontFamily: headerStyle.fontFamily,
              fontSize: headerStyle.fontSize
            }}
          >
            Menu hover
          </div>
          <div 
            className="px-3 py-2 rounded-md"
            style={{
              color: headerStyle.activeColor,
              backgroundColor: headerStyle.menuActiveBgColor,
              fontFamily: headerStyle.fontFamily,
              fontSize: headerStyle.fontSize
            }}
          >
            Menu actif
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuStylesTab;
