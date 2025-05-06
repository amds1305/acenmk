
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const KinkContactEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [contactData, setContactData] = useState({
    title: "Parlons de votre projet",
    subtitle: "Prenez contact avec nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider.",
    submitMessage: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.",
    formTitle: "Envoyez-nous un message",
    emailRecipient: "contact@example.com",
    showCompanyField: true,
    showWebsiteField: true,
    showServiceField: true,
    showReferralField: true,
    showPhoneField: true,
    termsText: "J'accepte que mes données soient utilisées pour me recontacter concernant ma demande.",
    ...(config.sectionData.contact || {})
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setContactData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('contact', contactData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications du formulaire de contact ont été enregistrées.",
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
        <CardTitle>Configuration du formulaire de contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre principal
            </label>
            <Input 
              id="title" 
              name="title" 
              value={contactData.title} 
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="formTitle" className="block text-sm font-medium text-gray-700">
              Titre du formulaire
            </label>
            <Input 
              id="formTitle" 
              name="formTitle" 
              value={contactData.formTitle} 
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Sous-titre
          </label>
          <Textarea 
            id="subtitle" 
            name="subtitle" 
            value={contactData.subtitle} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="emailRecipient" className="block text-sm font-medium text-gray-700">
            Email de réception des messages
          </label>
          <Input 
            id="emailRecipient" 
            name="emailRecipient" 
            type="email" 
            value={contactData.emailRecipient} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="submitMessage" className="block text-sm font-medium text-gray-700">
            Message de confirmation après envoi
          </label>
          <Input 
            id="submitMessage" 
            name="submitMessage" 
            value={contactData.submitMessage} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="termsText" className="block text-sm font-medium text-gray-700">
            Texte des conditions d'utilisation
          </label>
          <Textarea 
            id="termsText" 
            name="termsText" 
            value={contactData.termsText} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Champs optionnels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showCompanyField">
                Afficher le champ "Entreprise"
              </Label>
              <Switch 
                id="showCompanyField"
                checked={contactData.showCompanyField} 
                onCheckedChange={(checked) => handleSwitchChange('showCompanyField', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showWebsiteField">
                Afficher le champ "Site web"
              </Label>
              <Switch 
                id="showWebsiteField"
                checked={contactData.showWebsiteField} 
                onCheckedChange={(checked) => handleSwitchChange('showWebsiteField', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showPhoneField">
                Afficher le champ "Téléphone"
              </Label>
              <Switch 
                id="showPhoneField"
                checked={contactData.showPhoneField} 
                onCheckedChange={(checked) => handleSwitchChange('showPhoneField', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showServiceField">
                Afficher le champ "Service souhaité"
              </Label>
              <Switch 
                id="showServiceField"
                checked={contactData.showServiceField} 
                onCheckedChange={(checked) => handleSwitchChange('showServiceField', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showReferralField">
                Afficher le champ "Comment nous avez-vous connu"
              </Label>
              <Switch 
                id="showReferralField"
                checked={contactData.showReferralField} 
                onCheckedChange={(checked) => handleSwitchChange('showReferralField', checked)}
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

export default KinkContactEditor;
