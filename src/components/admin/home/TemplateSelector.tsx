
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections';
import { HomeTemplateType } from '@/types/sections';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  badgeText?: string; // Make badge optional
  variant?: 'default' | 'pro' | 'premium';
}

const availableTemplates: Template[] = [
  {
    id: 'business',
    name: 'Business',
    description: 'Template professionnel pour les entreprises',
    image: '/images/templates/business-template.jpg',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Template optimisé pour la conversion',
    image: '/images/templates/landing-template.jpg',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Mettez en valeur vos réalisations',
    image: '/images/templates/portfolio-template.jpg',
    badgeText: 'Pro',
    variant: 'pro',
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Présentez vos services de manière professionnelle',
    image: '/images/templates/services-template.jpg',
    badgeText: 'Premium',
    variant: 'premium',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Design épuré et moderne',
    image: '/images/templates/minimal-template.jpg',
  },
];

export function TemplateSelector() {
  const { toast } = useToast();
  const { config, updateTemplateType, saveChanges } = useSections();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(config.template || 'business');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
  };

  const handleApplyTemplate = async () => {
    setIsLoading(true);
    try {
      updateTemplateType(selectedTemplate as HomeTemplateType);
      await saveChanges();
      
      toast({
        title: "Template appliqué",
        description: "Le template a été appliqué avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'application du template:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'appliquer le template sélectionné.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template de la page d'accueil</CardTitle>
        <CardDescription>
          Choisissez le template qui convient le mieux à votre site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template selector using Combobox */}
        <div className="space-y-2">
          <Label htmlFor="template">Sélectionnez un template</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedTemplate
                  ? availableTemplates.find((template) => template.id === selectedTemplate)?.name
                  : "Choisir un template..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Rechercher un template..." />
                <CommandEmpty>Aucun template trouvé.</CommandEmpty>
                <CommandGroup>
                  {availableTemplates.map((template) => (
                    <CommandItem
                      key={template.id}
                      value={template.id}
                      onSelect={() => {
                        setSelectedTemplate(template.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTemplate === template.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">
                        <span>{template.name}</span>
                        {template.badgeText && (
                          <span className={`ml-2 text-xs bg-${template.variant || 'blue'}-100 text-${template.variant || 'blue'}-800 py-0.5 px-2 rounded`}>
                            {template.badgeText}
                          </span>
                        )}
                        <span className="block text-xs text-muted-foreground">
                          {template.description}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Template preview */}
        <div>
          <Label>Aperçu</Label>
          <div className="mt-2 aspect-video bg-muted rounded-md overflow-hidden">
            {/* Placeholder for template preview image */}
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              {selectedTemplate && (
                <img
                  src={availableTemplates.find(t => t.id === selectedTemplate)?.image || '/images/templates/placeholder.jpg'}
                  alt={`${selectedTemplate} template preview`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="flex justify-end">
          <Button
            onClick={handleApplyTemplate}
            disabled={isLoading}
          >
            {isLoading ? "Application en cours..." : "Appliquer ce template"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TemplateSelector;
