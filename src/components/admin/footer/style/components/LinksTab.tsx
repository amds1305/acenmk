
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from "react-colorful";
import { FooterStyle } from '../types';

interface LinksTabProps {
  footerStyle: FooterStyle;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
}

const LinksTab = ({ footerStyle, handleStyleChange }: LinksTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Liens</h3>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={footerStyle.links.isVisible} 
            onCheckedChange={(checked) => handleStyleChange('links', 'isVisible', checked)}
          />
          <Label>Visibles</Label>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Couleur des liens</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.links.color }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.links.color }}></span>
                  {footerStyle.links.color}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.links.color} 
                  onChange={(color) => handleStyleChange('links', 'color', color)} 
                />
                <Input
                  value={footerStyle.links.color}
                  onChange={(e) => handleStyleChange('links', 'color', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur au survol</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.links.hoverColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.links.hoverColor }}></span>
                  {footerStyle.links.hoverColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.links.hoverColor} 
                  onChange={(color) => handleStyleChange('links', 'hoverColor', color)} 
                />
                <Input
                  value={footerStyle.links.hoverColor}
                  onChange={(e) => handleStyleChange('links', 'hoverColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksTab;
