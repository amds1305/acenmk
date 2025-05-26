
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { useSections } from '@/contexts/sections/SectionsContext';

// Liste des icônes disponibles
const availableIcons = [
  'Code', 'Palette', 'Globe', 'BarChart', 'Settings', 'Smartphone',
  'Database', 'Layout', 'Shield', 'Users', 'Zap', 'MessageSquare', 'FileText'
];

const defaultServices = [
  {
    id: '1',
    icon: 'Code',
    title: 'Développement Web',
    description: 'Sites web sur mesure, applications web progressives et intégration de systèmes.',
    order_index: 0
  },
  {
    id: '2',
    icon: 'Palette',
    title: 'Design UI/UX',
    description: 'Interfaces élégantes et expériences utilisateur intuitives et engageantes.',
    order_index: 1
  },
  {
    id: '3',
    icon: 'Globe',
    title: 'E-commerce',
    description: 'Solutions de commerce en ligne personnalisées avec gestion des paiements et du stock.',
    order_index: 2
  },
  {
    id: '4',
    icon: 'BarChart',
    title: 'Marketing Digital',
    description: 'SEO, campagnes publicitaires et stratégies de contenu pour augmenter votre visibilité.',
    order_index: 3
  },
  {
    id: '5',
    icon: 'Settings',
    title: 'Maintenance & Support',
    description: 'Services de maintenance continue pour garder votre site web rapide et sécurisé.',
    order_index: 4
  },
  {
    id: '6',
    icon: 'Smartphone',
    title: 'Applications Mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec fonctionnalités avancées.',
    order_index: 5
  },
];

const KinkServicesEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [services, setServices] = useState(
    (config.sectionData.services?.items || defaultServices).map(service => ({
      ...service,
      id: service.id || uuidv4()
    }))
  );
  
  const handleAddService = () => {
    const newService = {
      id: uuidv4(),
      icon: 'Code',
      title: 'Nouveau Service',
      description: 'Description du nouveau service',
      order_index: services.length
    };
    setServices([...services, newService]);
  };
  
  const handleRemoveService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };
  
  const handleChangeService = (id: string, field: string, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('services', { items: services });
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications des services ont été enregistrées.",
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
        <CardTitle>Configuration des services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Service #{index + 1}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveService(service.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <Input 
                    value={service.title} 
                    onChange={(e) => handleChangeService(service.id, 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Icône
                  </label>
                  <Select 
                    value={service.icon} 
                    onValueChange={(value) => handleChangeService(service.id, 'icon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une icône" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map(icon => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea 
                  value={service.description} 
                  onChange={(e) => handleChangeService(service.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddService}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter un service
          </Button>
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

export default KinkServicesEditor;
