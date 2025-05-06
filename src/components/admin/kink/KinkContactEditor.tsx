
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSections } from '@/contexts/sections/SectionsContext';
import KinkSectionEditor from './KinkSectionEditor';

type ContactData = {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
};

const KinkContactEditor = () => {
  const { config, updateExistingSectionData } = useSections();
  
  // Get existing data or use default values
  const defaultData: ContactData = {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour répondre à vos questions et discuter de vos projets",
    email: "contact@exemple.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue Exemple, 75000 Paris, France",
  };
  
  const initialData = config.sectionData?.contact ? { ...defaultData, ...config.sectionData.contact } : defaultData;
  const [contactData, setContactData] = useState<ContactData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const saveContactData = () => {
    updateExistingSectionData('contact', contactData);
  };

  return (
    <KinkSectionEditor 
      title="Section Contact" 
      description="Personnalisez le contenu de la section Contact"
      onSave={saveContactData}
    >
      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Titre</Label>
          <Input 
            id="title"
            name="title"
            value={contactData.title}
            onChange={handleChange}
            placeholder="Titre de la section"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="subtitle">Sous-titre</Label>
          <Textarea 
            id="subtitle"
            name="subtitle"
            value={contactData.subtitle}
            onChange={handleChange}
            placeholder="Description de la section contact"
            rows={3}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            placeholder="Adresse email de contact"
            type="email"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input 
            id="phone"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="address">Adresse</Label>
          <Textarea 
            id="address"
            name="address"
            value={contactData.address}
            onChange={handleChange}
            placeholder="Adresse postale"
            rows={3}
          />
        </div>
      </div>
    </KinkSectionEditor>
  );
};

export default KinkContactEditor;
