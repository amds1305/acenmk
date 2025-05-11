
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '../types';

interface LogoFormProps {
  logo: Logo;
  onLogoChange: <K extends keyof Logo>(property: K, value: Logo[K]) => void;
}

export const LogoForm: React.FC<LogoFormProps> = ({ logo, onLogoChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Label htmlFor="logo-src">URL de l'image</Label>
          <Input 
            id="logo-src" 
            value={logo.src} 
            onChange={(e) => onLogoChange('src', e.target.value)} 
            placeholder="https://example.com/logo.svg"
          />
        </div>
        <div>
          <Label htmlFor="logo-position">Position</Label>
          <Select 
            value={logo.position} 
            onValueChange={(value: 'left' | 'center') => onLogoChange('position', value)}
          >
            <SelectTrigger id="logo-position" className="w-[120px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Gauche</SelectItem>
              <SelectItem value="center">Centre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logo-alt">Texte alternatif</Label>
          <Input 
            id="logo-alt" 
            value={logo.alt} 
            onChange={(e) => onLogoChange('alt', e.target.value)} 
            placeholder="Description du logo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo-width">Largeur (px)</Label>
          <Input 
            id="logo-width" 
            type="number"
            value={logo.width ?? ''} 
            onChange={(e) => onLogoChange('width', Number(e.target.value))} 
            placeholder="120"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="logo-height">Hauteur (px)</Label>
        <Input 
          id="logo-height"
          type="number"
          value={logo.height ?? ''} 
          onChange={(e) => onLogoChange('height', Number(e.target.value))} 
          placeholder="40"
        />
      </div>
    </div>
  );
};
