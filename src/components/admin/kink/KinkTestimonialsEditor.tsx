
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import { v4 as uuidv4 } from 'uuid';

const defaultTestimonials = [
  {
    id: '1',
    text: "L'équipe a parfaitement compris notre vision et l'a transformée en une expérience numérique exceptionnelle qui a dépassé toutes nos attentes.",
    author: "Marie Dubois",
    position: "Directrice Marketing, TechStart",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1471",
    rating: 5
  },
  {
    id: '2',
    text: "Leur approche méthodique et leur expertise technique nous ont permis de lancer notre plateforme e-commerce en un temps record avec des résultats impressionnants.",
    author: "Alexandre Martin",
    position: "CEO, FashionRetail",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=687",
    rating: 5
  },
  {
    id: '3',
    text: "Une collaboration exceptionnelle qui a transformé notre présence en ligne et augmenté significativement notre taux de conversion.",
    author: "Sophie Lambert",
    position: "Fondatrice, GreenSolutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=764",
    rating: 4
  }
];

const KinkTestimonialsEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [testimonialsData, setTestimonialsData] = useState({
    title: "Ce qu'en disent nos clients",
    subtitle: "Découvrez les témoignages de nos clients satisfaits",
    testimonials: config.sectionData.testimonials?.testimonials || defaultTestimonials.map(testimonial => ({
      ...testimonial,
      id: testimonial.id || uuidv4()
    }))
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonialsData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTestimonialChange = (id: string, field: string, value: any) => {
    setTestimonialsData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };
  
  const addTestimonial = () => {
    const newTestimonial = {
      id: uuidv4(),
      text: "Nouveau témoignage client.",
      author: "Nom du client",
      position: "Position, Entreprise",
      avatar: "https://placehold.co/100x100/lightgray/darkgray?text=Photo",
      rating: 5
    };
    setTestimonialsData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial]
    }));
  };
  
  const removeTestimonial = (id: string) => {
    setTestimonialsData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(testimonial => testimonial.id !== id)
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('testimonials', testimonialsData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications des témoignages ont été enregistrées.",
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
        <CardTitle>Configuration des témoignages clients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={testimonialsData.title} 
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
            value={testimonialsData.subtitle} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Témoignages</h3>
          <div className="space-y-6">
            {testimonialsData.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Témoignage #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeTestimonial(testimonial.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    Texte du témoignage
                  </label>
                  <Textarea 
                    value={testimonial.text} 
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">
                      Nom
                    </label>
                    <Input 
                      value={testimonial.author} 
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'author', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500">
                      Position
                    </label>
                    <Input 
                      value={testimonial.position} 
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'position', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500">
                      Note (1-5)
                    </label>
                    <Input 
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating} 
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'rating', parseInt(e.target.value) || 5)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    URL de l'avatar
                  </label>
                  <Input 
                    value={testimonial.avatar} 
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'avatar', e.target.value)}
                  />
                  {testimonial.avatar && (
                    <div className="mt-2 border rounded-md overflow-hidden h-16 w-16 flex justify-center">
                      <img src={testimonial.avatar} alt={testimonial.author} className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addTestimonial}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un témoignage
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

export default KinkTestimonialsEditor;
