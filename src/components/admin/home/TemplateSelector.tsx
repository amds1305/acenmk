
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Trash2, AlertCircle } from 'lucide-react';
import { useSections } from '@/contexts/sections/SectionsContext';
import { HomeTemplateType } from '@/services/sections/types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const defaultTemplates = [
  {
    id: 'nmk_kink',
    name: 'Template Kink',
    description: 'Design élégant et minimaliste inspiré par NetDreams avec un style épuré et professionnel.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1655&auto=format&fit=crop&ixlib=rb-4.0.3&fit=crop&w=400&h=250',
    badge: 'Défaut',
    isDefault: true
  }
];

const additionalTemplates = [
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
  }
];

const TemplateSelector: React.FC = () => {
  const { config, updateTemplateType, saveChanges } = useSections();
  const { toast } = useToast();
  const [availableTemplates, setAvailableTemplates] = useState(() => {
    // Récupérer les templates supprimés du localStorage s'ils existent
    const deletedTemplates = JSON.parse(localStorage.getItem('deletedTemplates') || '[]');
    return additionalTemplates.filter(template => !deletedTemplates.includes(template.id));
  });
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  
  const activeTemplate = config.templateConfig?.activeTemplate || 'nmk_kink';
  const allTemplates = [...defaultTemplates, ...availableTemplates];
  
  const handleTemplateChange = (value: string) => {
    updateTemplateType(value as HomeTemplateType);
  };
  
  const handleSave = () => {
    saveChanges();
    toast({
      title: "Template sauvegardé",
      description: "La configuration du template a été sauvegardée avec succès.",
    });
  };

  const confirmDeleteTemplate = (templateId: string) => {
    setTemplateToDelete(templateId);
  };
  
  const handleDeleteTemplate = () => {
    if (!templateToDelete) return;
    
    // Mettre à jour la liste des templates disponibles
    setAvailableTemplates(prevTemplates => 
      prevTemplates.filter(template => template.id !== templateToDelete)
    );
    
    // Stocker les templates supprimés dans localStorage
    const deletedTemplates = JSON.parse(localStorage.getItem('deletedTemplates') || '[]');
    localStorage.setItem('deletedTemplates', JSON.stringify([...deletedTemplates, templateToDelete]));
    
    // Afficher une notification de succès
    toast({
      title: "Template supprimé",
      description: "Le template a été supprimé avec succès.",
    });
    
    // Si le template actif est supprimé, activer le template par défaut
    if (activeTemplate === templateToDelete) {
      updateTemplateType('nmk_kink');
    }
    
    // Réinitialiser templateToDelete
    setTemplateToDelete(null);
  };

  const handleCancelDelete = () => {
    setTemplateToDelete(null);
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Template par défaut</h3>
          <div className="grid grid-cols-1 gap-6">
            {defaultTemplates.map((template) => (
              <div key={template.id} className="relative">
                <RadioGroup 
                  value={activeTemplate === template.id ? template.id : ""}
                  onValueChange={handleTemplateChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={template.id}
                      id={`template-${template.id}`}
                      className="sr-only peer"
                    />
                    <Label
                      htmlFor={`template-${template.id}`}
                      className="flex flex-col border border-gray-200 rounded-md p-4 cursor-pointer hover:border-primary transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary w-full"
                    >
                      <div className="flex justify-between items-start">
                        <div className="aspect-video w-full max-w-[300px] mb-3 overflow-hidden rounded-md relative">
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
                </RadioGroup>
              </div>
            ))}
          </div>
        </div>

        {availableTemplates.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Templates supplémentaires</h3>
            <RadioGroup 
              value={activeTemplate}
              onValueChange={handleTemplateChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {availableTemplates.map((template) => (
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
                    <div className="flex justify-between items-start">
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          confirmDeleteTemplate(template.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
          </div>
        )}

        {availableTemplates.length === 0 && (
          <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">Aucun template supplémentaire</h3>
            <p className="text-gray-500 mt-1">Tous les templates supplémentaires ont été supprimés.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
          Enregistrer la sélection
        </Button>
      </CardFooter>

      {/* Boîte de dialogue de confirmation de suppression */}
      <AlertDialog open={templateToDelete !== null} onOpenChange={(open) => !open && handleCancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce template ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTemplate} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default TemplateSelector;
