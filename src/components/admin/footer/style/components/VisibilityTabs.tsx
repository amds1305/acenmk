
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FooterStyle } from '../types';

interface VisibilityTabsProps {
  footerStyle: FooterStyle;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
  type: 'services' | 'legalLinks';
}

const VisibilityTabs = ({ footerStyle, handleStyleChange, type }: VisibilityTabsProps) => {
  const title = type === 'services' ? 'Services' : 'Liens légaux';
  const description = type === 'services' 
    ? "Activez ou désactivez l'affichage de la section des services dans le pied de page."
    : "Activez ou désactivez l'affichage des liens légaux dans le pied de page.";

  // Make sure footerStyle and footerStyle[type] exists
  if (!footerStyle || !footerStyle[type]) {
    console.error(`footerStyle[${type}] is undefined, rendering with default values`);
    // Return a component with safe default values instead of null
    return (
      <div className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={false}
              onCheckedChange={(checked) => handleStyleChange(type, 'isVisible', checked)}
            />
            <Label>Visibles</Label>
          </div>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
  }

  // Now we can safely access the properties since we've verified they exist
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={!!footerStyle[type].isVisible} 
            onCheckedChange={(checked) => handleStyleChange(type, 'isVisible', checked)}
          />
          <Label>Visibles</Label>
        </div>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default VisibilityTabs;
