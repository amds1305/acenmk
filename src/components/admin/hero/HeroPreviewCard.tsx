
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HeroVersion, HeroCarouselSettings } from './types';

interface HeroPreviewCardProps {
  activeVersion: HeroVersion;
  carousel: HeroCarouselSettings;
  versionsCount: number;
}

const HeroPreviewCard: React.FC<HeroPreviewCardProps> = ({
  activeVersion,
  carousel,
  versionsCount,
}) => {
  const { 
    title, 
    subtitle, 
    ctaText, 
    ctaSecondaryText,
    backgroundType,
    backgroundColor,
    backgroundGradient,
    backgroundImage,
    textColor
  } = activeVersion;

  // Styles basés sur les paramètres
  const backgroundStyle = {
    backgroundColor: backgroundType === 'color' ? backgroundColor : undefined,
    backgroundImage: 
      backgroundType === 'gradient' ? backgroundGradient :
      backgroundType === 'image' && backgroundImage ? `url(${backgroundImage})` :
      undefined,
    color: textColor,
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="bg-muted py-2 px-4 flex justify-between items-center">
        <h3 className="font-medium">Aperçu</h3>
        {versionsCount > 1 && (
          <span className="text-xs text-muted-foreground">
            {carousel.enabled ? 'Diaporama actif' : 'Version statique'}
          </span>
        )}
      </div>
      <CardContent className="p-0">
        <div
          style={backgroundStyle}
          className="p-8 min-h-[300px] flex flex-col justify-center items-center text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="mb-8 max-w-2xl">{subtitle}</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              {ctaText}
            </button>
            <button className="px-4 py-2 border border-current rounded-md">
              {ctaSecondaryText}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroPreviewCard;
