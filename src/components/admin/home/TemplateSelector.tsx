
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useSections } from '@/contexts/SectionsContext';
import { HomeTemplateType } from '@/services/sections/types';

const templates = [
  {
    id: 'default',
    name: 'Template Standard',
    description: 'Le design original par défaut avec sections individuelles.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&fit=crop&w=400&h=250',
  },
  {
    id: 'teko',
    name: 'Template Teko',
    description: 'Un design moderne inspiré par Teko.com.au avec mise en page élégante.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&fit=crop&w=400&h=250',
  },
  {
    id: 'nmk_fire',
    name: 'Template Teko Fire',
    description: 'Design fidèle à Teko.com.au avec effet pixellisé et interface moderne dark.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&fit=crop&w=400&h=250',
  },
  {
    id: 'nmk_robot',
    name: 'Template Robot',
    description: 'Design futuriste inspiré par Elite Robots avec une interface sombre et une touche high-tech.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&fit=crop&w=400&h=250',
    badge: 'Nouveau'
  }
];

const TemplateSelector: React.FC = () => {
  const { config, updateTemplateType, saveChanges } = useSections();
  
  const activeTemplate = config.templateConfig?.activeTemplate || 'default';
  
  const handleTemplateChange = (value: string) => {
    updateTemplateType(value as HomeTemplateType);
  };
  
  const handleSave = () => {
    saveChanges();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sélectionner un template</CardTitle>
        <CardDescription>
          Choisissez l'apparence de votre page d'accueil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={activeTemplate} 
          onValueChange={handleTemplateChange}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <RadioGroupItem
                value={template.id}
                id={`template-${template.id}`}
                className="sr-only peer"
              />
              <Label
                htmlFor={`template-${template.id}`}
                className="flex flex-col border border-gray-200 rounded-md p-4 cursor-pointer hover:border-primary transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
              >
                <div className="aspect-video w-full mb-3 overflow-hidden rounded-md relative">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                  {template.badge && (
                    <div className="absolute top-2 right-2 bg-primary/80 text-white rounded-full py-1 px-3 text-xs font-medium">
                      {template.badge}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{template.name}</div>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
                {activeTemplate === template.id && (
                  <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
          Enregistrer le template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateSelector;
