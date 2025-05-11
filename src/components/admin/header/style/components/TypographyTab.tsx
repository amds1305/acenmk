
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TypographyTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const TypographyTab: React.FC<TypographyTabProps> = ({ headerStyle, updateStyle }) => {
  const fontFamilies = [
    'Inter, sans-serif',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'system-ui, sans-serif',
  ];

  const fontWeights = ['300', '400', '500', '600', '700', '800', '900'];
  
  const textTransforms = [
    { value: 'none', label: 'Normal' },
    { value: 'uppercase', label: 'MAJUSCULES' },
    { value: 'lowercase', label: 'minuscules' },
    { value: 'capitalize', label: 'Première Lettre En Majuscule' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Couleurs du texte</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="textColor">Couleur du texte</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="textColor"
                type="text"
                value={headerStyle.textColor}
                onChange={(e) => updateStyle('textColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.textColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.textColor} 
                    onChange={(color) => updateStyle('textColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hoverColor">Couleur au survol</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="hoverColor"
                type="text"
                value={headerStyle.hoverColor}
                onChange={(e) => updateStyle('hoverColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.hoverColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.hoverColor} 
                    onChange={(color) => updateStyle('hoverColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activeColor">Couleur active</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="activeColor"
                type="text"
                value={headerStyle.activeColor}
                onChange={(e) => updateStyle('activeColor', e.target.value)}
                className="flex-1"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="w-10 h-10 rounded border cursor-pointer" 
                    style={{ backgroundColor: headerStyle.activeColor }}
                  />
                </PopoverTrigger>
                <PopoverContent side="right" className="w-auto p-3">
                  <HexColorPicker 
                    color={headerStyle.activeColor} 
                    onChange={(color) => updateStyle('activeColor', color)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 pt-4">
        <h3 className="font-medium">Police et formatage</h3>
        
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Famille de police</Label>
          <Select 
            value={headerStyle.fontFamily} 
            onValueChange={(value) => updateStyle('fontFamily', value)}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Choisir une police" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font }}>{font.split(',')[0]}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Taille de police</Label>
            <Input 
              id="fontSize"
              type="text"
              value={headerStyle.fontSize}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
            />
            <p className="text-xs text-gray-500">Format: '1rem' ou '16px'</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontWeight">Graisse de police</Label>
            <Select 
              value={headerStyle.fontWeight || '500'} 
              onValueChange={(value) => updateStyle('fontWeight', value)}
            >
              <SelectTrigger id="fontWeight">
                <SelectValue placeholder="Graisse" />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight} value={weight}>
                    <span style={{ fontWeight: weight }}>{weight} - Exemple</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="letterSpacing">Espacement des lettres</Label>
            <Input 
              id="letterSpacing"
              type="text"
              value={headerStyle.letterSpacing || 'normal'}
              onChange={(e) => updateStyle('letterSpacing', e.target.value)}
            />
            <p className="text-xs text-gray-500">Ex: 'normal', '0.05em', '1px'</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textTransform">Transformation du texte</Label>
            <Select 
              value={headerStyle.textTransform || 'none'} 
              onValueChange={(value) => updateStyle('textTransform', value)}
            >
              <SelectTrigger id="textTransform">
                <SelectValue placeholder="Transformation" />
              </SelectTrigger>
              <SelectContent>
                {textTransforms.map((transform) => (
                  <SelectItem key={transform.value} value={transform.value}>
                    {transform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Aperçu du texte</h4>
        <div 
          className="bg-white dark:bg-gray-900 p-4 rounded border"
          style={{ 
            fontFamily: headerStyle.fontFamily,
            fontSize: headerStyle.fontSize,
            fontWeight: headerStyle.fontWeight || '500',
            letterSpacing: headerStyle.letterSpacing || 'normal',
            textTransform: headerStyle.textTransform as any || 'none',
          }}
        >
          <span style={{ color: headerStyle.textColor }}>Texte normal</span>
          {' - '}
          <span style={{ color: headerStyle.hoverColor }}>Texte survolé</span>
          {' - '}
          <span style={{ color: headerStyle.activeColor }}>Texte actif</span>
        </div>
      </div>
    </div>
  );
};

export default TypographyTab;
