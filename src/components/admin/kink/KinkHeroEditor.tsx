
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSections } from '@/contexts/sections/SectionsContext';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const KinkHeroEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [heroData, setHeroData] = useState({
    title: 'Créer des expériences numériques exceptionnelles',
    subtitle: 'Nous concevons et développons des sites web et applications de haute qualité qui transforment votre vision en réalité numérique.',
    ctaText: 'Nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    ...(config.sectionData.hero || {})
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('hero', heroData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications de la section Hero ont été enregistrées.",
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des modifications.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de la section Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={heroData.title} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Sous-titre
          </label>
          <Textarea 
            id="subtitle" 
            name="subtitle" 
            value={heroData.subtitle} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700">
              Texte du bouton principal
            </label>
            <Input 
              id="ctaText" 
              name="ctaText" 
              value={heroData.ctaText} 
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="ctaSecondaryText" className="block text-sm font-medium text-gray-700">
              Texte du bouton secondaire
            </label>
            <Input 
              id="ctaSecondaryText" 
              name="ctaSecondaryText" 
              value={heroData.ctaSecondaryText} 
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KinkHeroEditor;
