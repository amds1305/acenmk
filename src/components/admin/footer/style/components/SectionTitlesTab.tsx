
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FooterStyle } from '../types';
import { Separator } from '@/components/ui/separator';

interface SectionTitlesTabProps {
  footerStyle: FooterStyle;
  footerData: any;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
  handleDataChange: (section: string, property: string, value: any) => void;
}

const SectionTitlesTab = ({ 
  footerStyle, 
  footerData, 
  handleStyleChange, 
  handleDataChange 
}: SectionTitlesTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Nom de l'entreprise</h3>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={footerStyle.companyName.isVisible} 
              onCheckedChange={(checked) => handleStyleChange('companyName', 'isVisible', checked)}
            />
            <Label>Visible</Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Nom de l'entreprise</Label>
            <Input
              value={footerData?.companyInfo?.name || ""}
              onChange={(e) => handleDataChange('companyInfo', 'name', e.target.value)}
              placeholder="Nom de l'entreprise"
            />
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Titres des sections</h3>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={footerStyle.sectionTitles.isVisible} 
              onCheckedChange={(checked) => handleStyleChange('sectionTitles', 'isVisible', checked)}
            />
            <Label>Visible</Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Titre Services</Label>
            <Input
              value={footerData?.sectionTitles?.services || "Services"}
              onChange={(e) => handleDataChange('sectionTitles', 'services', e.target.value)}
              placeholder="Services"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Titre Contact</Label>
            <Input
              value={footerData?.sectionTitles?.contact || "Contact"}
              onChange={(e) => handleDataChange('sectionTitles', 'contact', e.target.value)}
              placeholder="Contact"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Titre Légal</Label>
            <Input
              value={footerData?.sectionTitles?.legal || "Légal"}
              onChange={(e) => handleDataChange('sectionTitles', 'legal', e.target.value)}
              placeholder="Légal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTitlesTab;
