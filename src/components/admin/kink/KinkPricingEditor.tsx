
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KinkPricingEditor = () => {
  const { toast } = useToast();

  const redirectToPricing = () => {
    // Rediriger vers la page de gestion des tarifs
    window.location.href = '/admin/pricing';
    toast({
      title: "Redirection",
      description: "Vous êtes redirigé vers la page de gestion des tarifs."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des offres tarifaires</CardTitle>
        <CardDescription>
          Gérez les offres tarifaires affichées dans le template Kink
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-6">
          Les offres tarifaires sont gérées de manière globale pour tous les templates. 
          Cliquez sur le bouton ci-dessous pour accéder à la page de gestion des tarifs.
        </p>
        <Button onClick={redirectToPricing} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Gérer les offres tarifaires
        </Button>
      </CardContent>
    </Card>
  );
};

export default KinkPricingEditor;
