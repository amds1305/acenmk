
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HeroVersion } from '../types';

interface TextStyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const TextStyleEditor = ({ version, onUpdateVersion }: TextStyleEditorProps) => {
  // Update text color
  const updateTextColor = (color: string) => {
    onUpdateVersion({
      ...version,
      textColor: color,
    });
  };

  // Update title font size
  const updateTitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      titleFontSize: size,
    });
  };

  // Update subtitle font size
  const updateSubtitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      subtitleFontSize: size,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="textColor">Couleur du texte</Label>
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full border" 
            style={{ backgroundColor: version.textColor }}
          />
          <Input 
            id="textColor"
            type="color" 
            value={version.textColor} 
            onChange={(e) => updateTextColor(e.target.value)}
            className="w-12 p-0 h-8"
          />
          <Input 
            value={version.textColor} 
            onChange={(e) => updateTextColor(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="titleFontSize">Taille du titre</Label>
        <Select 
          value={version.titleFontSize} 
          onValueChange={updateTitleFontSize}
        >
          <SelectTrigger id="titleFontSize">
            <SelectValue placeholder="Sélectionner une taille" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lg">Petit</SelectItem>
              <SelectItem value="xl">Normal</SelectItem>
              <SelectItem value="2xl">Grand</SelectItem>
              <SelectItem value="3xl">Très grand</SelectItem>
              <SelectItem value="4xl">Énorme</SelectItem>
              <SelectItem value="5xl">Gigantesque</SelectItem>
              <SelectItem value="6xl">Maximal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitleFontSize">Taille du sous-titre</Label>
        <Select 
          value={version.subtitleFontSize} 
          onValueChange={updateSubtitleFontSize}
        >
          <SelectTrigger id="subtitleFontSize">
            <SelectValue placeholder="Sélectionner une taille" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="base">Petit</SelectItem>
              <SelectItem value="lg">Normal</SelectItem>
              <SelectItem value="xl">Grand</SelectItem>
              <SelectItem value="2xl">Très grand</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TextStyleEditor;
