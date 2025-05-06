
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import { v4 as uuidv4 } from 'uuid';

const defaultClients = [
  {
    id: uuidv4(),
    name: 'TechCorp',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=TechCorp',
    websiteUrl: 'https://example.com',
    category: 'Technologie'
  },
  {
    id: uuidv4(),
    name: 'DesignStudio',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=DesignStudio',
    websiteUrl: 'https://example.com',
    category: 'Design'
  },
  {
    id: uuidv4(),
    name: 'EcoSolutions',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=EcoSolutions',
    websiteUrl: 'https://example.com',
    category: 'Environnement'
  },
  {
    id: uuidv4(),
    name: 'MediaGroup',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=MediaGroup',
    websiteUrl: 'https://example.com',
    category: 'Médias'
  },
  {
    id: uuidv4(),
    name: 'FinancePartners',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=FinancePartners',
    websiteUrl: 'https://example.com',
    category: 'Finance'
  },
  {
    id: uuidv4(),
    name: 'HealthTech',
    logoUrl: 'https://placehold.co/200x80/eee/999?text=HealthTech',
    websiteUrl: 'https://example.com',
    category: 'Santé'
  }
];

const KinkTrustedClientsEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [clientsData, setClientsData] = useState({
    title: 'Ils nous font confiance',
    featuredLabel: 'Nos clients',
    clients: config.sectionData['trusted-clients']?.clients || defaultClients
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientsData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleClientChange = (id: string, field: string, value: string) => {
    setClientsData(prev => ({
      ...prev,
      clients: prev.clients.map(client => 
        client.id === id ? { ...client, [field]: value } : client
      )
    }));
  };
  
  const addClient = () => {
    const newClient = {
      id: uuidv4(),
      name: 'Nouveau Client',
      logoUrl: 'https://placehold.co/200x80/eee/999?text=Logo',
      websiteUrl: 'https://example.com',
      category: 'Catégorie'
    };
    setClientsData(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }));
  };
  
  const removeClient = (id: string) => {
    setClientsData(prev => ({
      ...prev,
      clients: prev.clients.filter(client => client.id !== id)
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('trusted-clients', clientsData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications des clients ont été enregistrées.",
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
        <CardTitle>Configuration des clients de confiance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={clientsData.title} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="featuredLabel" className="block text-sm font-medium text-gray-700">
            Label (petit texte au-dessus du titre)
          </label>
          <Input 
            id="featuredLabel" 
            name="featuredLabel" 
            value={clientsData.featuredLabel} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Liste des clients</h3>
          <div className="space-y-4">
            {clientsData.clients.map((client, index) => (
              <div key={client.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Client #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeClient(client.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">
                      Nom
                    </label>
                    <Input 
                      value={client.name} 
                      onChange={(e) => handleClientChange(client.id, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500">
                      Catégorie
                    </label>
                    <Input 
                      value={client.category} 
                      onChange={(e) => handleClientChange(client.id, 'category', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    URL du logo
                  </label>
                  <Input 
                    value={client.logoUrl} 
                    onChange={(e) => handleClientChange(client.id, 'logoUrl', e.target.value)}
                  />
                  {client.logoUrl && (
                    <div className="mt-2 border rounded-md overflow-hidden h-16 flex justify-center">
                      <img src={client.logoUrl} alt={client.name} className="object-contain h-full" />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    URL du site web
                  </label>
                  <Input 
                    value={client.websiteUrl} 
                    onChange={(e) => handleClientChange(client.id, 'websiteUrl', e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addClient}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un client
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

export default KinkTrustedClientsEditor;
