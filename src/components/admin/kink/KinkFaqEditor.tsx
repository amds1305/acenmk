
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KinkFaqEditor = () => {
  const { toast } = useToast();

  const redirectToFaq = () => {
    // Rediriger vers la page de gestion des FAQ
    window.location.href = '/admin/faq';
    toast({
      title: "Redirection",
      description: "Vous êtes redirigé vers la page de gestion des FAQ."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des FAQ</CardTitle>
        <CardDescription>
          Gérez les questions fréquentes affichées dans le template Kink
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-6">
          Les questions fréquentes (FAQ) sont gérées de manière globale pour tous les templates. 
          Cliquez sur le bouton ci-dessous pour accéder à la page de gestion des FAQ.
        </p>
        <Button onClick={redirectToFaq} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Gérer les FAQ
        </Button>
      </CardContent>
    </Card>
  );
};

export default KinkFaqEditor;
