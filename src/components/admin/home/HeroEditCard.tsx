
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { HeroData } from '@/components/Hero';

interface HeroEditCardProps {
  heroData: HeroData;
  setHeroData: React.Dispatch<React.SetStateAction<HeroData>>;
  onSave?: () => void;
}

const HeroEditCard: React.FC<HeroEditCardProps> = ({ heroData, setHeroData, onSave }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveHero = () => {
    setIsSaving(true);
    
    try {
      // Sauvegarder dans localStorage
      localStorage.setItem('heroData', JSON.stringify(heroData));
      
      // Invalider le cache React Query pour que le composant Hero se mette à jour
      queryClient.invalidateQueries({ queryKey: ['heroData'] });
      
      toast({
        title: "Modifications sauvegardées",
        description: "Les changements sur la section Hero ont été enregistrés avec succès.",
      });
      
      // Appeler le callback onSave si fourni
      if (onSave) {
        onSave();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la sauvegarde des modifications.",
        variant: "destructive",
      });
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Prévisualisation de l'image
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    if (heroData.backgroundImage) {
      // Si c'est une URL valide, utilisez-la directement
      if (heroData.backgroundImage.startsWith('http')) {
        setPreviewSrc(heroData.backgroundImage);
      } else {
        // Sinon, essayez de charger depuis les assets locaux
        setPreviewSrc(heroData.backgroundImage);
      }
    } else {
      setPreviewSrc(null);
    }
  }, [heroData.backgroundImage]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Section Hero</CardTitle>
        <Button onClick={handleSaveHero} disabled={isSaving}>
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
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
            rows={3}
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
          <Label htmlFor="hero-background">Image de fond (URL)</Label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input 
                id="hero-background" 
                value={heroData.backgroundImage} 
                onChange={(e) => setHeroData({...heroData, backgroundImage: e.target.value})}
                placeholder="https://exemple.com/image.jpg"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setHeroData({...heroData, backgroundImage: ''})}
              disabled={!heroData.backgroundImage}
            >
              Effacer
            </Button>
          </div>
          {previewSrc && (
            <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-50">
              <img 
                src={previewSrc} 
                alt="Aperçu" 
                className="w-full h-full object-cover"
                onError={() => {
                  setPreviewSrc(null);
                  toast({
                    title: "Erreur d'image",
                    description: "Impossible de charger l'image. Veuillez vérifier l'URL.",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          )}
          {!previewSrc && heroData.backgroundImage && (
            <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-50 flex items-center justify-center text-gray-400">
              [Aperçu non disponible]
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroEditCard;
