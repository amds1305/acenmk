
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HeaderStyle } from '../types';

interface IconStylesTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

export const IconStylesTab: React.FC<IconStylesTabProps> = ({ headerStyle, updateStyle }) => {
  return (
    <div className="space-y-6">
      {/* Styles des icônes de réseaux sociaux */}
      <div>
        <h3 className="text-md font-semibold mb-3">Icônes de réseaux sociaux</h3>
        <div className="space-y-3 pl-1">
          <div className="space-y-1.5">
            <Label htmlFor="socialIconColor">Couleur</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconColor"
                type="text"
                value={headerStyle.socialIconColor}
                onChange={(e) => updateStyle('socialIconColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.socialIconColor} 
                onChange={(e) => updateStyle('socialIconColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="socialIconHoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconHoverColor"
                type="text"
                value={headerStyle.socialIconHoverColor}
                onChange={(e) => updateStyle('socialIconHoverColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.socialIconHoverColor} 
                onChange={(e) => updateStyle('socialIconHoverColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="socialIconBgColor">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconBgColor"
                type="text"
                value={headerStyle.socialIconBgColor}
                onChange={(e) => updateStyle('socialIconBgColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.socialIconBgColor !== 'transparent' ? headerStyle.socialIconBgColor : '#ffffff'} 
                onChange={(e) => updateStyle('socialIconBgColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="socialIconBorderColor">Couleur de bordure</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="socialIconBorderColor"
                type="text"
                value={headerStyle.socialIconBorderColor}
                onChange={(e) => updateStyle('socialIconBorderColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.socialIconBorderColor} 
                onChange={(e) => updateStyle('socialIconBorderColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Styles des icônes utilitaires (recherche, thème) */}
      <div>
        <h3 className="text-md font-semibold mb-3">Icônes utilitaires (recherche, sélecteur de thème)</h3>
        <div className="space-y-3 pl-1">
          <div className="space-y-1.5">
            <Label htmlFor="utilityIconColor">Couleur</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconColor"
                type="text"
                value={headerStyle.utilityIconColor}
                onChange={(e) => updateStyle('utilityIconColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.utilityIconColor} 
                onChange={(e) => updateStyle('utilityIconColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="utilityIconHoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconHoverColor"
                type="text"
                value={headerStyle.utilityIconHoverColor}
                onChange={(e) => updateStyle('utilityIconHoverColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.utilityIconHoverColor} 
                onChange={(e) => updateStyle('utilityIconHoverColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="utilityIconBgColor">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconBgColor"
                type="text"
                value={headerStyle.utilityIconBgColor}
                onChange={(e) => updateStyle('utilityIconBgColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.utilityIconBgColor !== 'transparent' ? headerStyle.utilityIconBgColor : '#ffffff'} 
                onChange={(e) => updateStyle('utilityIconBgColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="utilityIconBorderColor">Couleur de bordure</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="utilityIconBorderColor"
                type="text"
                value={headerStyle.utilityIconBorderColor}
                onChange={(e) => updateStyle('utilityIconBorderColor', e.target.value)}
              />
              <Input 
                type="color"
                value={headerStyle.utilityIconBorderColor} 
                onChange={(e) => updateStyle('utilityIconBorderColor', e.target.value)}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconStylesTab;
