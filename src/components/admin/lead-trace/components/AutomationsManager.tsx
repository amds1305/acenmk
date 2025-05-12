
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AutomationsManager: React.FC = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: 'Paramètres sauvegardés',
      description: 'Les paramètres d\'automatisation ont été mis à jour.',
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>Réponse automatique</span>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Disponible</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Envoyez automatiquement un email de confirmation lors de la réception d'un nouveau lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="auto-reply" />
            <label htmlFor="auto-reply">Activer les réponses automatiques</label>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Un email sera envoyé à chaque nouveau lead pour confirmer la bonne réception de sa demande et l'informer qu'un conseiller le contactera prochainement.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Personnaliser le modèle d'email</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>Rappels de suivi</span>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pro</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Créez des rappels automatiques pour assurer le suivi des leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="reminder-new" />
                <label htmlFor="reminder-new">Rappel pour nouveaux leads</label>
              </div>
              <span className="text-sm">48 heures</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="reminder-followup" />
                <label htmlFor="reminder-followup">Rappel pour leads sans réponse</label>
              </div>
              <span className="text-sm">5 jours</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="reminder-old" disabled />
                <label htmlFor="reminder-old" className="text-muted-foreground">Rappel pour leads inactifs</label>
              </div>
              <span className="text-sm text-muted-foreground">30 jours</span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Les rappels seront envoyés aux personnes responsables des leads correspondants.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>Workflow personnalisable</span>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pro</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Créez des workflows automatisés adaptés à différents types de demandes
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Fonctionnalité disponible avec l'abonnement Pro</p>
          <Button variant="outline" className="mt-4">Mettre à niveau</Button>
        </CardContent>
      </Card>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Enregistrer les paramètres</Button>
      </div>
    </div>
  );
};

export default AutomationsManager;
