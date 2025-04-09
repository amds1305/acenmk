
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { HeroVersion } from './types';
import { TextStyleEditor, BackgroundStyleEditor, SpacingStyleEditor } from './style-editor';

interface StyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const StyleEditor = ({ version, onUpdateVersion }: StyleEditorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Style du Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="text">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="text">Texte</TabsTrigger>
            <TabsTrigger value="background">Arrière-plan</TabsTrigger>
            <TabsTrigger value="spacing">Espacement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="pt-4">
            <TextStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
          </TabsContent>
          
          <TabsContent value="background" className="pt-4">
            <BackgroundStyleEditor version={version} onUpdateVersion={onUpdateVersion} />
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
