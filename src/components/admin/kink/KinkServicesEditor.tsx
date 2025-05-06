
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import KinkSectionEditor from './KinkSectionEditor';

const KinkServicesEditor = () => {
  const { toast } = useToast();

  const redirectToServices = () => {
    // Rediriger vers la page de gestion des services
    window.location.href = '/admin/services';
    toast({
      title: "Redirection",
      description: "Vous êtes redirigé vers la page de gestion des services."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des services</CardTitle>
        <CardDescription>
          Gérez les services affichés dans le template Kink
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-6">
          Les services sont gérés de manière globale pour tous les templates. 
          Cliquez sur le bouton ci-dessous pour accéder à la page de gestion des services.
        </p>
        <Button onClick={redirectToServices} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Gérer les services
        </Button>
      </CardContent>
    </Card>
  );
};

export default KinkServicesEditor;
