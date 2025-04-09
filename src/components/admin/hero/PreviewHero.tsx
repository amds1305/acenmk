
import React, { useState, useEffect } from 'react';
import { HeroVersion, HeroCarouselSettings, HeroBlock } from './types';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewHeroProps {
  version: HeroVersion;
  carousel?: HeroCarouselSettings;
}

const PreviewHero = ({ version, carousel }: PreviewHeroProps) => {
  const [isClient, setIsClient] = useState(false);
  
  // Effet pour indiquer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Éviter les erreurs d'hydratation
  }

  // Générer le style pour l'arrière-plan en fonction du type
  const getBackgroundStyle = () => {
    if (version.backgroundType === 'image' && version.backgroundImage) {
      return {
        backgroundImage: `url(${version.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (version.backgroundType === 'gradient' && version.backgroundGradient) {
      return {
        background: version.backgroundGradient,
      };
    } else {
      return {
        backgroundColor: version.backgroundColor,
      };
    }
  };

  // Générer le style pour un bloc
  const getBlockStyle = (block: HeroBlock) => {
    return {
      position: 'absolute' as const,
      left: `${block.position.x}px`,
      top: `${block.position.y}px`,
      width: block.size.width,
      height: block.size.height,
      color: block.style.color,
      fontSize: block.style.fontSize,
      fontWeight: block.style.fontWeight,
      textAlign: block.style.textAlign as 'left' | 'center' | 'right',
      backgroundColor: block.style.backgroundColor,
      borderRadius: block.style.borderRadius,
      padding: block.style.padding,
    };
  };

  // Rendu d'un bloc en fonction de son type
  const renderBlock = (block: HeroBlock) => {
    switch (block.type) {
      case 'text':
        return <div style={getBlockStyle(block)}>{block.content}</div>;
      case 'image':
        return (
          <img 
            src={block.content} 
            alt="Block content" 
            style={getBlockStyle(block)} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x200?text=Image+Error';
            }}
          />
        );
      case 'button':
        return <button style={getBlockStyle(block)}>{block.content}</button>;
      case 'stat':
        return (
          <div style={getBlockStyle(block)} className="flex flex-col items-center">
            <div className="text-3xl font-bold">{block.content}</div>
            <div className="text-sm opacity-80">Statistique</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 border-b flex items-center justify-between">
        <span className="text-sm font-medium">Aperçu du Hero</span>
        
        {carousel && carousel.enabled && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">Auto:</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                {carousel.autoplay ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div 
        className="relative overflow-hidden"
        style={{
          ...getBackgroundStyle(),
          color: version.textColor,
          marginTop: version.marginTop,
          marginBottom: version.marginBottom,
          padding: version.padding,
          minHeight: '400px',
        }}
      >
        {/* Contenu par défaut du Hero */}
        <div className="max-w-4xl mx-auto py-12">
          <h1 className={`text-${version.titleFontSize} font-bold mb-4 leading-tight`}>
            {version.title}
          </h1>
          <p className={`text-${version.subtitleFontSize} mb-8 max-w-2xl`}>
            {version.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>
              {version.ctaText}
            </Button>
            <Button variant="outline">
              {version.ctaSecondaryText}
            </Button>
          </div>
        </div>
        
        {/* Blocs personnalisés */}
        {version.blocks.map((block) => (
          <div key={block.id} className="absolute">
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewHero;
