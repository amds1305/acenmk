
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KinkTeamEditor = () => {
  const { toast } = useToast();

  const redirectToTeam = () => {
    // Rediriger vers la page de gestion de l'équipe
    window.location.href = '/admin/team';
    toast({
      title: "Redirection",
      description: "Vous êtes redirigé vers la page de gestion de l'équipe."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion de l'équipe</CardTitle>
        <CardDescription>
          Gérez les membres de l'équipe affichés dans le template Kink
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-6">
          Les membres de l'équipe sont gérés de manière globale pour tous les templates. 
          Cliquez sur le bouton ci-dessous pour accéder à la page de gestion de l'équipe.
        </p>
        <Button onClick={redirectToTeam} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Gérer l'équipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default KinkTeamEditor;
