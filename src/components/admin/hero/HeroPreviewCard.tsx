
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PreviewHero from './PreviewHero';
import { HeroVersion, HeroCarouselSettings } from './types';

interface HeroPreviewCardProps {
  activeVersion: HeroVersion;
  carousel?: HeroCarouselSettings;
  versionsCount: number;
}

const HeroPreviewCard = ({ activeVersion, carousel, versionsCount }: HeroPreviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <PreviewHero 
          version={activeVersion}
          carousel={versionsCount > 1 ? carousel : undefined}
        />
      </CardContent>
    </Card>
  );
};

export default HeroPreviewCard;
