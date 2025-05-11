
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from "react-colorful";
import { FooterStyle } from '../types';

interface SocialTabProps {
  footerStyle: FooterStyle;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
}

const SocialTab = ({ footerStyle, handleStyleChange }: SocialTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Réseaux sociaux</h3>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={footerStyle.social.isVisible} 
            onCheckedChange={(checked) => handleStyleChange('social', 'isVisible', checked)}
          />
          <Label>Visibles</Label>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Couleur des icônes</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.social.iconColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconColor }}></span>
                  {footerStyle.social.iconColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.social.iconColor} 
                  onChange={(color) => handleStyleChange('social', 'iconColor', color)} 
                />
                <Input
                  value={footerStyle.social.iconColor}
                  onChange={(e) => handleStyleChange('social', 'iconColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur des icônes au survol</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.social.iconHoverColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconHoverColor }}></span>
                  {footerStyle.social.iconHoverColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.social.iconHoverColor} 
                  onChange={(color) => handleStyleChange('social', 'iconHoverColor', color)} 
                />
                <Input
                  value={footerStyle.social.iconHoverColor}
                  onChange={(e) => handleStyleChange('social', 'iconHoverColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur de fond des icônes</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.social.iconBgColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconBgColor }}></span>
                  {footerStyle.social.iconBgColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.social.iconBgColor} 
                  onChange={(color) => handleStyleChange('social', 'iconBgColor', color)} 
                />
                <Input
                  value={footerStyle.social.iconBgColor}
                  onChange={(e) => handleStyleChange('social', 'iconBgColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur de fond au survol</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.social.iconBgHoverColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconBgHoverColor }}></span>
                  {footerStyle.social.iconBgHoverColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.social.iconBgHoverColor} 
                  onChange={(color) => handleStyleChange('social', 'iconBgHoverColor', color)} 
                />
                <Input
                  value={footerStyle.social.iconBgHoverColor}
                  onChange={(e) => handleStyleChange('social', 'iconBgHoverColor', e.target.value)}
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

export default SocialTab;
