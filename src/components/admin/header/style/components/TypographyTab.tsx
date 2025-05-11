
import React from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TypographyTabProps {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
}

const TypographyTab = ({ headerStyle, updateStyle }: TypographyTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="fontFamily">Police de caractères</Label>
        <Select 
          value={headerStyle.fontFamily} 
          onValueChange={(value) => updateStyle('fontFamily', value)}
        >
          <SelectTrigger id="fontFamily">
            <SelectValue placeholder="Choisir une police" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter, sans-serif">Inter</SelectItem>
            <SelectItem value="Arial, sans-serif">Arial</SelectItem>
            <SelectItem value="'Helvetica Neue', sans-serif">Helvetica Neue</SelectItem>
            <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
            <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
            <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
            <SelectItem value="'system-ui', sans-serif">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="fontSize">Taille de police</Label>
        <Input 
          id="fontSize"
          type="text"
          value={headerStyle.fontSize}
          onChange={(e) => updateStyle('fontSize', e.target.value)}
          placeholder="ex: 1rem, 16px"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="fontWeight">Épaisseur de police</Label>
        <Select 
          value={headerStyle.fontWeight} 
          onValueChange={(value) => updateStyle('fontWeight', value)}
        >
          <SelectTrigger id="fontWeight">
            <SelectValue placeholder="Choisir une épaisseur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300">Light (300)</SelectItem>
            <SelectItem value="400">Regular (400)</SelectItem>
            <SelectItem value="500">Medium (500)</SelectItem>
            <SelectItem value="600">Semi-Bold (600)</SelectItem>
            <SelectItem value="700">Bold (700)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="letterSpacing">Espacement des lettres</Label>
        <Input 
          id="letterSpacing"
          type="text"
          value={headerStyle.letterSpacing}
          onChange={(e) => updateStyle('letterSpacing', e.target.value)}
          placeholder="ex: normal, 0.05em"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="textTransform">Transformation du texte</Label>
        <Select 
          value={headerStyle.textTransform} 
          onValueChange={(value) => updateStyle('textTransform', value)}
        >
          <SelectTrigger id="textTransform">
            <SelectValue placeholder="Choisir une transformation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Aucune</SelectItem>
            <SelectItem value="uppercase">MAJUSCULES</SelectItem>
            <SelectItem value="lowercase">minuscules</SelectItem>
            <SelectItem value="capitalize">Première Lettre En Majuscule</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypographyTab;
