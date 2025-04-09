
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VersionManager from './VersionManager';
import StyleEditor from './StyleEditor';
import BlockEditor from './BlockEditor';
import CarouselSettings from './CarouselSettings';
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

const HeroEditorTabs = ({
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
}: HeroEditorTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="versions">Versions</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="blocks">Blocs</TabsTrigger>
        <TabsTrigger value="carousel">Carousel</TabsTrigger>
      </TabsList>

      <TabsContent value="versions" className="py-4">
        <VersionManager 
          versions={versions}
          activeVersionId={activeVersionId}
          onAddVersion={onAddVersion}
          onDeleteVersion={onDeleteVersion}
          onSetActiveVersion={onSetActiveVersion}
          onUpdateVersion={onUpdateVersion}
        />
      </TabsContent>

      <TabsContent value="style" className="py-4">
        <StyleEditor 
          version={activeVersion}
          onUpdateVersion={onUpdateVersion}
        />
      </TabsContent>

      <TabsContent value="blocks" className="py-4">
        <BlockEditor 
          version={activeVersion}
          onUpdateVersion={onUpdateVersion}
        />
      </TabsContent>

      <TabsContent value="carousel" className="py-4">
        <CarouselSettings 
          settings={carousel}
          onUpdateSettings={onUpdateCarouselSettings}
          versionsCount={versions.length}
        />
      </TabsContent>
    </Tabs>
  );
};

export default HeroEditorTabs;
