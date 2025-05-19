
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import CVForm from './CVForm';
import CVTemplateSelector from './CVTemplateSelector';
import CVStyleEditor from './CVStyleEditor';
import CVPreview from './CVPreview';
import CVAIOptimizer from './CVAIOptimizer';
import { CVFormData, defaultCV } from './types';

const CVGeneratorRefactored = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [cvData, setCvData] = useState<CVFormData>(defaultCV);
  const [mainColor, setMainColor] = useState("#3b82f6");
  const [mainFont, setMainFont] = useState("Roboto");
  const { toast } = useToast();

  const handleFormSubmit = (data: CVFormData) => {
    setCvData(data);
    setActiveTab("preview");
    toast({
      title: "CV mis à jour",
      description: "Votre CV a été mis à jour avec succès."
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Modèle sélectionné",
      description: `Le modèle "${templateId}" a été appliqué à votre CV.`
    });
  };

  const handleOptimize = (optimizedContent: string) => {
    // Dans une vraie implémentation, cela mettrait à jour les champs spécifiques
    // Pour la démo, on simule juste le changement
    toast({
      title: "CV optimisé",
      description: "L'IA a appliqué des améliorations à votre CV."
    });
    setActiveTab("preview");
  };

  return (
    <div className="space-y-6">
      {/* Navigation fil d'ariane */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/ace-job">ACE JOB</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Générateur de CV</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Générateur de CV</CardTitle>
          <CardDescription>Créez un CV professionnel en quelques étapes simples</CardDescription>
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-2">
              <TabsTrigger value="edit">Édition</TabsTrigger>
              <TabsTrigger value="template">Modèles</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="optimize">Optimiser</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="edit" className="p-6">
            <CVForm defaultValues={cvData} onSubmit={handleFormSubmit} />
          </TabsContent>

          <TabsContent value="template" className="p-6">
            <CVTemplateSelector 
              selectedTemplate={selectedTemplate} 
              onSelectTemplate={handleTemplateSelect} 
            />
          </TabsContent>

          <TabsContent value="style" className="p-6">
            <CVStyleEditor 
              onColorChange={setMainColor} 
              onFontChange={setMainFont} 
            />
          </TabsContent>

          <TabsContent value="optimize" className="p-6">
            <CVAIOptimizer 
              cvContent={JSON.stringify(cvData)} 
              onOptimize={handleOptimize} 
            />
          </TabsContent>

          <TabsContent value="preview" className="p-0">
            <CVPreview 
              cvData={cvData}
              selectedTemplate={selectedTemplate}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVGeneratorRefactored;
