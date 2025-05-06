
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSections } from '@/contexts/sections/SectionsContext';
import KinkSectionEditor from './KinkSectionEditor';

type HeroData = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  backgroundImage?: string;
};

const KinkHeroEditor = () => {
  const { config, updateExistingSectionData } = useSections();
  
  // Get existing data or use default values
  const defaultData: HeroData = {
    title: "Conception Innovante & Solutions Numériques",
    subtitle: "Des solutions digitales sur mesure pour transformer votre vision en réalité.",
    ctaText: "Nos services",
    ctaUrl: "#services",
    secondaryCtaText: "Contactez-nous",
    secondaryCtaUrl: "#contact",
    backgroundImage: "",
  };
  
  const initialData = config.sectionData?.hero ? { ...defaultData, ...config.sectionData.hero } : defaultData;
  const [heroData, setHeroData] = useState<HeroData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const saveHeroData = () => {
    updateExistingSectionData('hero', heroData);
  };

  return (
    <KinkSectionEditor 
      title="Section Hero" 
      description="Personnalisez le contenu de la section d'accueil"
      onSave={saveHeroData}
    >
      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Titre principal</Label>
          <Input 
            id="title"
            name="title"
            value={heroData.title}
            onChange={handleChange}
            placeholder="Titre principal"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="subtitle">Sous-titre</Label>
          <Textarea 
            id="subtitle"
            name="subtitle"
            value={heroData.subtitle}
            onChange={handleChange}
            placeholder="Description de la section hero"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ctaText">Texte du bouton principal</Label>
            <Input 
              id="ctaText"
              name="ctaText"
              value={heroData.ctaText}
              onChange={handleChange}
              placeholder="Texte du bouton"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="ctaUrl">URL du bouton principal</Label>
            <Input 
              id="ctaUrl"
              name="ctaUrl"
              value={heroData.ctaUrl}
              onChange={handleChange}
              placeholder="URL du bouton (ex: #services)"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="secondaryCtaText">Texte du bouton secondaire (optionnel)</Label>
            <Input 
              id="secondaryCtaText"
              name="secondaryCtaText"
              value={heroData.secondaryCtaText || ""}
              onChange={handleChange}
              placeholder="Texte du bouton secondaire"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="secondaryCtaUrl">URL du bouton secondaire (optionnel)</Label>
            <Input 
              id="secondaryCtaUrl"
              name="secondaryCtaUrl"
              value={heroData.secondaryCtaUrl || ""}
              onChange={handleChange}
              placeholder="URL du bouton secondaire (ex: #contact)"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="backgroundImage">URL de l'image de fond (optionnel)</Label>
          <Input 
            id="backgroundImage"
            name="backgroundImage"
            value={heroData.backgroundImage || ""}
            onChange={handleChange}
            placeholder="URL de l'image de fond"
          />
          <p className="text-sm text-muted-foreground">
            Laissez vide pour utiliser l'image par défaut
          </p>
        </div>
      </div>
    </KinkSectionEditor>
  );
};

export default KinkHeroEditor;
