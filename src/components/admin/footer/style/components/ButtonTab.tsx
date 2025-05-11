
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from "react-colorful";
import { FooterStyle } from '../types';

interface ButtonTabProps {
  footerStyle: FooterStyle;
  handleStyleChange: <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => void;
}

const ButtonTab = ({ footerStyle, handleStyleChange }: ButtonTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Bouton "Retour en haut"</h3>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={footerStyle.backToTopButton.isVisible} 
            onCheckedChange={(checked) => handleStyleChange('backToTopButton', 'isVisible', checked)}
          />
          <Label>Visible</Label>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Couleur du texte</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.backToTopButton.textColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.textColor }}></span>
                  {footerStyle.backToTopButton.textColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.backToTopButton.textColor} 
                  onChange={(color) => handleStyleChange('backToTopButton', 'textColor', color)} 
                />
                <Input
                  value={footerStyle.backToTopButton.textColor}
                  onChange={(e) => handleStyleChange('backToTopButton', 'textColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur du texte au survol</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.backToTopButton.hoverTextColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.hoverTextColor }}></span>
                  {footerStyle.backToTopButton.hoverTextColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.backToTopButton.hoverTextColor} 
                  onChange={(color) => handleStyleChange('backToTopButton', 'hoverTextColor', color)} 
                />
                <Input
                  value={footerStyle.backToTopButton.hoverTextColor}
                  onChange={(e) => handleStyleChange('backToTopButton', 'hoverTextColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur de fond</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.backToTopButton.bgColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.bgColor }}></span>
                  {footerStyle.backToTopButton.bgColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.backToTopButton.bgColor} 
                  onChange={(color) => handleStyleChange('backToTopButton', 'bgColor', color)} 
                />
                <Input
                  value={footerStyle.backToTopButton.bgColor}
                  onChange={(e) => handleStyleChange('backToTopButton', 'bgColor', e.target.value)}
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
                  style={{ borderColor: footerStyle.backToTopButton.hoverBgColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.hoverBgColor }}></span>
                  {footerStyle.backToTopButton.hoverBgColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.backToTopButton.hoverBgColor} 
                  onChange={(color) => handleStyleChange('backToTopButton', 'hoverBgColor', color)} 
                />
                <Input
                  value={footerStyle.backToTopButton.hoverBgColor}
                  onChange={(e) => handleStyleChange('backToTopButton', 'hoverBgColor', e.target.value)}
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Couleur de bordure</Label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2"
                  style={{ borderColor: footerStyle.backToTopButton.borderColor }}
                >
                  <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.borderColor }}></span>
                  {footerStyle.backToTopButton.borderColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <HexColorPicker 
                  color={footerStyle.backToTopButton.borderColor} 
                  onChange={(color) => handleStyleChange('backToTopButton', 'borderColor', color)} 
                />
                <Input
                  value={footerStyle.backToTopButton.borderColor}
                  onChange={(e) => handleStyleChange('backToTopButton', 'borderColor', e.target.value)}
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

export default ButtonTab;
