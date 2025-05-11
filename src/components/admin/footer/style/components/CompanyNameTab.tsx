
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from "react-colorful";
import { Separator } from '@/components/ui/separator';
import { FooterStyle } from '../types';

interface CompanyNameTabProps {
  footerStyle: FooterStyle;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
}

const CompanyNameTab = ({ footerStyle, handleStyleChange }: CompanyNameTabProps) => {
  return (
    <div className="space-y-4">
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
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Couleur</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full border-2"
                    style={{ borderColor: footerStyle.companyName.color }}
                  >
                    <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.companyName.color }}></span>
                    {footerStyle.companyName.color}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <HexColorPicker 
                    color={footerStyle.companyName.color} 
                    onChange={(color) => handleStyleChange('companyName', 'color', color)} 
                  />
                  <Input
                    value={footerStyle.companyName.color}
                    onChange={(e) => handleStyleChange('companyName', 'color', e.target.value)}
                    className="mt-2"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Taille de police</Label>
            <Select 
              value={footerStyle.companyName.fontSize}
              onValueChange={(value) => handleStyleChange('companyName', 'fontSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1rem">Petit (1rem)</SelectItem>
                <SelectItem value="1.25rem">Moyen (1.25rem)</SelectItem>
                <SelectItem value="1.5rem">Grand (1.5rem)</SelectItem>
                <SelectItem value="1.75rem">Très grand (1.75rem)</SelectItem>
                <SelectItem value="2rem">Énorme (2rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Graisse de police</Label>
            <Select 
              value={footerStyle.companyName.fontWeight}
              onValueChange={(value) => handleStyleChange('companyName', 'fontWeight', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une graisse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi-gras (600)</SelectItem>
                <SelectItem value="700">Gras (700)</SelectItem>
                <SelectItem value="800">Extra-gras (800)</SelectItem>
              </SelectContent>
            </Select>
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
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Couleur</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full border-2"
                    style={{ borderColor: footerStyle.sectionTitles.color }}
                  >
                    <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.sectionTitles.color }}></span>
                    {footerStyle.sectionTitles.color}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <HexColorPicker 
                    color={footerStyle.sectionTitles.color} 
                    onChange={(color) => handleStyleChange('sectionTitles', 'color', color)} 
                  />
                  <Input
                    value={footerStyle.sectionTitles.color}
                    onChange={(e) => handleStyleChange('sectionTitles', 'color', e.target.value)}
                    className="mt-2"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Taille de police</Label>
            <Select 
              value={footerStyle.sectionTitles.fontSize}
              onValueChange={(value) => handleStyleChange('sectionTitles', 'fontSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1rem">Petit (1rem)</SelectItem>
                <SelectItem value="1.25rem">Moyen (1.25rem)</SelectItem>
                <SelectItem value="1.5rem">Grand (1.5rem)</SelectItem>
                <SelectItem value="1.75rem">Très grand (1.75rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Graisse de police</Label>
            <Select 
              value={footerStyle.sectionTitles.fontWeight}
              onValueChange={(value) => handleStyleChange('sectionTitles', 'fontWeight', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une graisse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi-gras (600)</SelectItem>
                <SelectItem value="700">Gras (700)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyNameTab;
