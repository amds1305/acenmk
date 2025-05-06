
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSections } from '@/contexts/sections/SectionsContext';
import KinkSectionEditor from './KinkSectionEditor';

type AboutData = {
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
};

const KinkAboutEditor = () => {
  const { config, updateExistingSectionData } = useSections();
  
  // Get existing data or use default values
  const defaultData: AboutData = {
    title: "À propos de nous",
    subtitle: "Notre histoire et notre vision",
    content: "Nous sommes une agence digitale spécialisée dans la création d'expériences numériques exceptionnelles. Notre équipe de professionnels passionnés est dédiée à transformer vos idées en solutions digitales innovantes qui répondent à vos besoins spécifiques.",
    imageUrl: "",
  };
  
  const initialData = config.sectionData?.about ? { ...defaultData, ...config.sectionData.about } : defaultData;
  const [aboutData, setAboutData] = useState<AboutData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  const saveAboutData = () => {
    updateExistingSectionData('about', aboutData);
  };

  return (
    <KinkSectionEditor 
      title="Section À propos" 
      description="Personnalisez le contenu de la section À propos"
      onSave={saveAboutData}
    >
      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Titre</Label>
          <Input 
            id="title"
            name="title"
            value={aboutData.title}
            onChange={handleChange}
            placeholder="Titre de la section"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="subtitle">Sous-titre</Label>
          <Input 
            id="subtitle"
            name="subtitle"
            value={aboutData.subtitle}
            onChange={handleChange}
            placeholder="Sous-titre de la section"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="content">Contenu</Label>
          <Textarea 
            id="content"
            name="content"
            value={aboutData.content}
            onChange={handleChange}
            placeholder="Contenu de la section À propos"
            rows={5}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
          <Input 
            id="imageUrl"
            name="imageUrl"
            value={aboutData.imageUrl || ""}
            onChange={handleChange}
            placeholder="URL de l'image"
          />
          <p className="text-sm text-muted-foreground">
            Laissez vide pour utiliser l'image par défaut
          </p>
        </div>
      </div>
    </KinkSectionEditor>
  );
};

export default KinkAboutEditor;
