
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
}

interface HeroEditCardProps {
  heroData: HeroData;
  setHeroData: React.Dispatch<React.SetStateAction<HeroData>>;
}

const HeroEditCard: React.FC<HeroEditCardProps> = ({ heroData, setHeroData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hero-title">Titre</Label>
          <Input 
            id="hero-title" 
            value={heroData.title} 
            onChange={(e) => setHeroData({...heroData, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hero-subtitle">Sous-titre</Label>
          <Textarea 
            id="hero-subtitle" 
            value={heroData.subtitle} 
            onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hero-cta">Texte du bouton principal</Label>
            <Input 
              id="hero-cta" 
              value={heroData.ctaText} 
              onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hero-cta-secondary">Texte du bouton secondaire</Label>
            <Input 
              id="hero-cta-secondary" 
              value={heroData.ctaSecondaryText} 
              onChange={(e) => setHeroData({...heroData, ctaSecondaryText: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hero-background">Image de fond</Label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input 
                id="hero-background" 
                value={heroData.backgroundImage} 
                onChange={(e) => setHeroData({...heroData, backgroundImage: e.target.value})}
              />
            </div>
            <Button variant="outline">Parcourir</Button>
          </div>
          {heroData.backgroundImage && (
            <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-50">
              <div className="aspect-video h-full flex items-center justify-center text-gray-400">
                [Aperçu de l'image]
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroEditCard;
