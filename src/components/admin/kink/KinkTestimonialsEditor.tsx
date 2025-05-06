
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KinkTestimonialsEditor = () => {
  const { toast } = useToast();

  const redirectToTestimonials = () => {
    // Rediriger vers la page de gestion des témoignages
    window.location.href = '/admin/testimonials';
    toast({
      title: "Redirection",
      description: "Vous êtes redirigé vers la page de gestion des témoignages."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des témoignages</CardTitle>
        <CardDescription>
          Gérez les témoignages clients affichés dans le template Kink
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-6">
          Les témoignages sont gérés de manière globale pour tous les templates. 
          Cliquez sur le bouton ci-dessous pour accéder à la page de gestion des témoignages.
        </p>
        <Button onClick={redirectToTestimonials} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Gérer les témoignages
        </Button>
      </CardContent>
    </Card>
  );
};

export default KinkTestimonialsEditor;
