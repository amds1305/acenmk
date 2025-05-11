
import React from 'react';
import { HeroVersion } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ButtonStyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const ButtonStyleEditor = ({ version, onUpdateVersion }: ButtonStyleEditorProps) => {
  // Si ces propriétés n'existent pas encore, on initialise avec des valeurs par défaut
  const buttonStyle = version.buttonStyle || {
    primary: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderRadius: '0.375rem',
      borderColor: 'transparent',
      borderWidth: '1px',
      hoverBackgroundColor: '#2563eb',
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: '#3b82f6',
      borderRadius: '0.375rem',
      borderColor: '#3b82f6',
      borderWidth: '1px',
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.1)',
    }
  };

  const updateButtonStyle = (type: 'primary' | 'secondary', property: string, value: string) => {
    const updatedButtonStyle = {
      ...version.buttonStyle || buttonStyle,
      [type]: {
        ...(version.buttonStyle?.[type] || buttonStyle[type]),
        [property]: value
      }
    };

    onUpdateVersion({
      ...version,
      buttonStyle: updatedButtonStyle
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="font-medium text-lg">Bouton Principal</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-bg-color">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.primary.backgroundColor }}
              />
              <Input 
                id="primary-bg-color"
                type="color" 
                value={buttonStyle.primary.backgroundColor} 
                onChange={(e) => updateButtonStyle('primary', 'backgroundColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.primary.backgroundColor} 
                onChange={(e) => updateButtonStyle('primary', 'backgroundColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-text-color">Couleur du texte</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.primary.textColor }}
              />
              <Input 
                id="primary-text-color"
                type="color" 
                value={buttonStyle.primary.textColor} 
                onChange={(e) => updateButtonStyle('primary', 'textColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.primary.textColor} 
                onChange={(e) => updateButtonStyle('primary', 'textColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-border-color">Couleur de la bordure</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.primary.borderColor }}
              />
              <Input 
                id="primary-border-color"
                type="color" 
                value={buttonStyle.primary.borderColor} 
                onChange={(e) => updateButtonStyle('primary', 'borderColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.primary.borderColor} 
                onChange={(e) => updateButtonStyle('primary', 'borderColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-border-width">Largeur de la bordure</Label>
            <Input 
              id="primary-border-width"
              value={buttonStyle.primary.borderWidth} 
              onChange={(e) => updateButtonStyle('primary', 'borderWidth', e.target.value)}
              placeholder="1px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-border-radius">Rayon des coins</Label>
            <Input 
              id="primary-border-radius"
              value={buttonStyle.primary.borderRadius} 
              onChange={(e) => updateButtonStyle('primary', 'borderRadius', e.target.value)}
              placeholder="0.375rem"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="font-medium text-lg">Bouton Secondaire</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="secondary-bg-color">Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.secondary.backgroundColor }}
              />
              <Input 
                id="secondary-bg-color"
                type="color" 
                value={buttonStyle.secondary.backgroundColor} 
                onChange={(e) => updateButtonStyle('secondary', 'backgroundColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.secondary.backgroundColor} 
                onChange={(e) => updateButtonStyle('secondary', 'backgroundColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-text-color">Couleur du texte</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.secondary.textColor }}
              />
              <Input 
                id="secondary-text-color"
                type="color" 
                value={buttonStyle.secondary.textColor} 
                onChange={(e) => updateButtonStyle('secondary', 'textColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.secondary.textColor} 
                onChange={(e) => updateButtonStyle('secondary', 'textColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="secondary-border-color">Couleur de la bordure</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: buttonStyle.secondary.borderColor }}
              />
              <Input 
                id="secondary-border-color"
                type="color" 
                value={buttonStyle.secondary.borderColor} 
                onChange={(e) => updateButtonStyle('secondary', 'borderColor', e.target.value)}
                className="w-12 p-0 h-8"
              />
              <Input 
                value={buttonStyle.secondary.borderColor} 
                onChange={(e) => updateButtonStyle('secondary', 'borderColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-border-width">Largeur de la bordure</Label>
            <Input 
              id="secondary-border-width"
              value={buttonStyle.secondary.borderWidth} 
              onChange={(e) => updateButtonStyle('secondary', 'borderWidth', e.target.value)}
              placeholder="1px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="secondary-border-radius">Rayon des coins</Label>
            <Input 
              id="secondary-border-radius"
              value={buttonStyle.secondary.borderRadius} 
              onChange={(e) => updateButtonStyle('secondary', 'borderRadius', e.target.value)}
              placeholder="0.375rem"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonStyleEditor;
