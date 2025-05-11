
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { HeroVersion } from './types';
import { TextStyleEditor, BackgroundStyleEditor, SpacingStyleEditor, ButtonStyleEditor } from './style-editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const StyleEditor = ({ version, onUpdateVersion }: StyleEditorProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateVersion({
      ...version,
      title: e.target.value
    });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateVersion({
      ...version,
      subtitle: e.target.value
    });
  };

  const handleCtaTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateVersion({
      ...version,
      ctaText: e.target.value
    });
  };

  const handleCtaSecondaryTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateVersion({
      ...version,
      ctaSecondaryText: e.target.value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style du Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Champs pour éditer le titre et sous-titre */}
        <div className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Titre principal</Label>
            <Input 
              id="hero-title"
              value={version.title} 
              onChange={handleTitleChange}
              placeholder="Titre du Hero"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Sous-titre</Label>
            <Textarea 
              id="hero-subtitle"
              value={version.subtitle} 
              onChange={handleSubtitleChange}
              placeholder="Sous-titre du Hero"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta-text">Texte du bouton principal</Label>
              <Input 
                id="cta-text"
                value={version.ctaText} 
                onChange={handleCtaTextChange}
                placeholder="Texte du CTA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-secondary-text">Texte du bouton secondaire</Label>
              <Input 
                id="cta-secondary-text"
                value={version.ctaSecondaryText} 
                onChange={handleCtaSecondaryTextChange}
                placeholder="Texte du CTA secondaire"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="text">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="text">Texte</TabsTrigger>
            <TabsTrigger value="background">Arrière-plan</TabsTrigger>
            <TabsTrigger value="buttons">Boutons</TabsTrigger>
            <TabsTrigger value="spacing">Espacement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="pt-4">
            <TextStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
          </TabsContent>
          
          <TabsContent value="background" className="pt-4">
            <BackgroundStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
          </TabsContent>
          
          <TabsContent value="buttons" className="pt-4">
            <ButtonStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
          </TabsContent>
          
          <TabsContent value="spacing" className="pt-4">
            <SpacingStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StyleEditor;
