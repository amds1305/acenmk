
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { HeroVersion, HeroCarouselSettings } from './types';

interface HeroEditorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  versions: HeroVersion[];
  activeVersionId: string;
  activeVersion: HeroVersion;
  carousel: HeroCarouselSettings;
  onAddVersion: () => void;
  onDeleteVersion: (id: string) => void;
  onSetActiveVersion: (id: string) => void;
  onUpdateVersion: (version: HeroVersion) => void;
  onUpdateCarouselSettings: (settings: HeroCarouselSettings) => void;
}

const HeroEditorTabs: React.FC<HeroEditorTabsProps> = ({
  activeTab,
  setActiveTab,
  versions,
  activeVersionId,
  activeVersion,
  carousel,
  onAddVersion,
  onDeleteVersion,
  onSetActiveVersion,
  onUpdateVersion,
  onUpdateCarouselSettings
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 grid grid-cols-3 md:w-auto">
        <TabsTrigger value="versions">Versions</TabsTrigger>
        <TabsTrigger value="carousel">Diaporama</TabsTrigger>
        <TabsTrigger value="blocks">Blocs</TabsTrigger>
      </TabsList>

      <TabsContent value="versions" className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Gestion des versions</h3>
          <Button onClick={onAddVersion} size="sm" variant="outline" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {versions.map((version) => (
            <Card 
              key={version.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                version.id === activeVersionId ? 'border-primary' : ''
              }`}
              onClick={() => onSetActiveVersion(version.id)}
            >
              <CardContent className="p-4">
                <div className="font-medium">{version.name}</div>
                <p className="text-sm text-muted-foreground truncate">{version.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="carousel">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Les paramètres du diaporama seront implémentés ultérieurement.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="blocks">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              L'éditeur de blocs sera implémenté ultérieurement.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default HeroEditorTabs;
