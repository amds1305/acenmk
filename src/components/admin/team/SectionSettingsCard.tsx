
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionSettings } from './types';

interface SectionSettingsCardProps {
  settings: SectionSettings;
  onChange: (settings: SectionSettings) => void;
}

const SectionSettingsCard = ({ settings, onChange }: SectionSettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de la section</CardTitle>
        <CardDescription>Personnalisez le titre et le sous-titre de la section Équipe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="section-title">Titre</Label>
          <Input 
            id="section-title" 
            value={settings.title} 
            onChange={(e) => onChange({...settings, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="section-subtitle">Sous-titre</Label>
          <Textarea 
            id="section-subtitle" 
            value={settings.subtitle} 
            onChange={(e) => onChange({...settings, subtitle: e.target.value})}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionSettingsCard;
