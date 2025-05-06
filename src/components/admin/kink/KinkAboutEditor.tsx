
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';

const defaultBenefits = [
  'Design moderne et responsive',
  'Optimisation SEO intégrée',
  'Performance et vitesse optimales',
  'Sécurité et confidentialité des données',
  'Compatibilité multiplateforme',
  'Support technique dédié'
];

const defaultStats = {
  yearsExperience: 12,
  projectsDelivered: 200,
  clientSatisfaction: 98
};

const KinkAboutEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [aboutData, setAboutData] = useState({
    title: 'Nous créons des expériences numériques impactantes',
    description: 'Depuis plus de 10 ans, notre agence aide les entreprises à transformer leurs idées en solutions numériques performantes. Notre approche centrée sur l\'utilisateur garantit des projets qui non seulement impressionnent visuellement, mais atteignent également vos objectifs commerciaux.',
    benefits: config.sectionData.about?.benefits || [...defaultBenefits],
    stats: config.sectionData.about?.stats || {...defaultStats},
    imageUrl: config.sectionData.about?.imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1470'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: parseInt(value) || 0
      }
    }));
  };
  
  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...aboutData.benefits];
    newBenefits[index] = value;
    setAboutData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };
  
  const addBenefit = () => {
    setAboutData(prev => ({
      ...prev,
      benefits: [...prev.benefits, 'Nouveau bénéfice']
    }));
  };
  
  const removeBenefit = (index: number) => {
    const newBenefits = [...aboutData.benefits];
    newBenefits.splice(index, 1);
    setAboutData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('about', aboutData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications de la section À propos ont été enregistrées.",
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
        <CardTitle>Configuration de la section À propos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={aboutData.title} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea 
            id="description" 
            name="description" 
            value={aboutData.description} 
            onChange={handleInputChange}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            URL de l'image
          </label>
          <Input 
            id="imageUrl" 
            name="imageUrl" 
            value={aboutData.imageUrl} 
            onChange={handleInputChange}
            className="mt-1"
          />
          {aboutData.imageUrl && (
            <div className="mt-2 border rounded-md overflow-hidden max-h-40 flex justify-center">
              <img src={aboutData.imageUrl} alt="Aperçu" className="object-cover" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bénéfices
          </label>
          <div className="space-y-3">
            {aboutData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={benefit} 
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeBenefit(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={addBenefit}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un bénéfice
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statistiques
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="yearsExperience" className="block text-sm text-gray-500">
                Années d'expérience
              </label>
              <Input 
                id="yearsExperience" 
                name="yearsExperience" 
                type="number" 
                value={aboutData.stats.yearsExperience} 
                onChange={handleStatChange}
              />
            </div>
            <div>
              <label htmlFor="projectsDelivered" className="block text-sm text-gray-500">
                Projets livrés
              </label>
              <Input 
                id="projectsDelivered" 
                name="projectsDelivered" 
                type="number" 
                value={aboutData.stats.projectsDelivered} 
                onChange={handleStatChange}
              />
            </div>
            <div>
              <label htmlFor="clientSatisfaction" className="block text-sm text-gray-500">
                Satisfaction client (%)
              </label>
              <Input 
                id="clientSatisfaction" 
                name="clientSatisfaction" 
                type="number" 
                value={aboutData.stats.clientSatisfaction} 
                onChange={handleStatChange}
                min="0"
                max="100"
              />
            </div>
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

export default KinkAboutEditor;
