
import React from 'react';
import { FileText, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CVTemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
}

const templates: Template[] = [
  { id: "modern", name: "Moderne", description: "Design épuré et contemporain" },
  { id: "classic", name: "Classique", description: "Mise en page traditionnelle et professionnelle" },
  { id: "creative", name: "Créatif", description: "Style unique pour se démarquer" },
  { id: "minimalist", name: "Minimaliste", description: "Simplicité et élégance" },
  { id: "executive", name: "Exécutif", description: "Pour les postes de direction" },
  { id: "technical", name: "Technique", description: "Idéal pour les profils IT" }
];

const CVTemplateSelector = ({ selectedTemplate, onSelectTemplate }: CVTemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map(template => (
        <Card 
          key={template.id} 
          className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <FileText className="h-10 w-10 text-gray-400" />
          </CardContent>
          <CardFooter className="pt-2">
            {selectedTemplate === template.id ? (
              <div className="flex items-center text-primary gap-1">
                <Check className="h-4 w-4" />
                <span>Sélectionné</span>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onSelectTemplate(template.id)}>
                Sélectionner
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CVTemplateSelector;
