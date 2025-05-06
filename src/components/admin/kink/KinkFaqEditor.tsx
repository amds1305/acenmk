
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import { v4 as uuidv4 } from 'uuid';

const defaultFaqs = [
  {
    id: '1',
    question: "Quels services proposez-vous exactement ?",
    answer: "Nous offrons une gamme complète de services numériques, incluant le développement web, le design UI/UX, le e-commerce, le marketing digital, la maintenance et le développement d'applications mobiles. Chaque service est personnalisé pour répondre aux besoins spécifiques de votre entreprise."
  },
  {
    id: '2',
    question: "Combien coûte un projet de site web ?",
    answer: "Le coût d'un projet web varie en fonction de sa complexité, des fonctionnalités requises et de l'échéancier. Nous travaillons avec vous pour établir un devis transparent qui correspond à votre budget. Contactez-nous pour une estimation personnalisée."
  },
  {
    id: '3',
    question: "Combien de temps faut-il pour créer un site web ?",
    answer: "La durée d'un projet dépend de sa complexité. Un site vitrine peut être réalisé en 2-4 semaines, tandis qu'une plateforme e-commerce ou une application web complexe peut nécessiter 2-6 mois. Nous établissons un calendrier précis dès le début du projet."
  },
  {
    id: '4',
    question: "Proposez-vous des services de maintenance après le lancement ?",
    answer: "Absolument. Nous offrons des contrats de maintenance pour assurer la sécurité, les mises à jour et le bon fonctionnement de votre site. Ces services incluent la surveillance des performances, les mises à jour techniques et le support en cas de problème."
  },
  {
    id: '5',
    question: "Comment se déroule un projet avec votre agence ?",
    answer: "Notre processus comprend la découverte (analyse des besoins), la conception (wireframes et maquettes), le développement, les tests, le lancement et le support post-lancement. Nous maintenons une communication transparente tout au long du projet."
  }
];

const KinkFaqEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [faqData, setFaqData] = useState({
    title: "Questions fréquentes",
    subtitle: "Nous avons rassemblé les réponses aux questions que nous recevons le plus souvent.",
    contactText: "Contactez-nous pour toute autre question",
    items: config.sectionData.faq?.items || defaultFaqs.map(faq => ({
      ...faq,
      id: faq.id || uuidv4()
    }))
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFaqData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFaqItemChange = (id: string, field: string, value: string) => {
    setFaqData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };
  
  const addFaqItem = () => {
    const newItem = {
      id: uuidv4(),
      question: "Nouvelle question",
      answer: "Réponse à la nouvelle question."
    };
    setFaqData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };
  
  const removeFaqItem = (id: string) => {
    setFaqData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('faq', faqData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications de la FAQ ont été enregistrées.",
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
        <CardTitle>Configuration de la section FAQ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={faqData.title} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Sous-titre
          </label>
          <Input 
            id="subtitle" 
            name="subtitle" 
            value={faqData.subtitle} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="contactText" className="block text-sm font-medium text-gray-700">
            Texte de contact (affiché en bas de la FAQ)
          </label>
          <Input 
            id="contactText" 
            name="contactText" 
            value={faqData.contactText} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Questions & Réponses</h3>
          <div className="space-y-4">
            {faqData.items.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Q&R #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFaqItem(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    Question
                  </label>
                  <Input 
                    value={item.question} 
                    onChange={(e) => handleFaqItemChange(item.id, 'question', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    Réponse
                  </label>
                  <Textarea 
                    value={item.answer} 
                    onChange={(e) => handleFaqItemChange(item.id, 'answer', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addFaqItem}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une question
            </Button>
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

export default KinkFaqEditor;
