
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Clock, Calendar, Bell, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AutomationsManager = () => {
  const { toast } = useToast();
  
  const handleSaveTemplate = () => {
    toast({
      title: 'Template enregistré',
      description: 'Le template de réponse a été enregistré avec succès.',
    });
  };
  
  const handleUpdateAutomation = () => {
    toast({
      title: 'Automatisation mise à jour',
      description: 'Les paramètres d\'automatisation ont été mis à jour.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Réponses automatiques</CardTitle>
          <CardDescription>
            Configurez des réponses automatiques pour les nouveaux leads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Activer les réponses automatiques</div>
              <div className="text-sm text-muted-foreground">
                Envoyer un email automatiquement aux nouveaux contacts
              </div>
            </div>
            <Switch />
          </div>
          
          <Tabs defaultValue="new">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="new">
                <Mail className="mr-2 h-4 w-4" />
                Nouveau contact
              </TabsTrigger>
              <TabsTrigger value="followup">
                <Clock className="mr-2 h-4 w-4" />
                Suivi automatique
              </TabsTrigger>
              <TabsTrigger value="meeting">
                <Calendar className="mr-2 h-4 w-4" />
                Confirmation réunion
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Objet de l'email</Label>
                  <div className="relative">
                    <Input 
                      id="subject"
                      defaultValue="Merci pour votre demande - [Nom de l'entreprise]" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template">Template de l'email</Label>
                  <Textarea 
                    id="template"
                    defaultValue={`Bonjour {{prenom}},

Merci d'avoir pris contact avec nous concernant votre projet {{service_requis}}.

Nous avons bien reçu votre demande et nous allons l'examiner dans les plus brefs délais. Un membre de notre équipe vous contactera d'ici 24 heures ouvrées.

N'hésitez pas à nous contacter si vous avez des questions supplémentaires.

Cordialement,
L'équipe [Nom de l'entreprise]`} 
                    rows={10} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Variables disponibles</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{{prenom}}</Badge>
                    <Badge variant="secondary">{{nom}}</Badge>
                    <Badge variant="secondary">{{email}}</Badge>
                    <Badge variant="secondary">{{entreprise}}</Badge>
                    <Badge variant="secondary">{{service_requis}}</Badge>
                  </div>
                </div>
                
                <Button onClick={handleSaveTemplate}>Enregistrer le template</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="followup">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Délai de suivi automatique</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un délai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 jours après le contact</SelectItem>
                      <SelectItem value="3">3 jours après le contact</SelectItem>
                      <SelectItem value="5">5 jours après le contact</SelectItem>
                      <SelectItem value="7">7 jours après le contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="followupSubject">Objet de l'email</Label>
                  <div className="relative">
                    <Input 
                      id="followupSubject"
                      defaultValue="Suivi de votre demande - [Nom de l'entreprise]" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="followupTemplate">Template de l'email</Label>
                  <Textarea 
                    id="followupTemplate"
                    defaultValue={`Bonjour {{prenom}},

Nous espérons que vous allez bien depuis notre dernier échange.

Je me permets de vous recontacter concernant votre projet {{service_requis}}. Avez-vous eu le temps d'examiner les informations que nous vous avons transmises ?

N'hésitez pas à nous faire part de vos questions ou à nous indiquer si vous souhaitez planifier un appel pour discuter plus en détail de votre projet.

Cordialement,
L'équipe [Nom de l'entreprise]`} 
                    rows={10} 
                  />
                </div>
                
                <Button onClick={handleSaveTemplate}>Enregistrer le template</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="meeting">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meetingSubject">Objet de l'email</Label>
                  <div className="relative">
                    <Input 
                      id="meetingSubject"
                      defaultValue="Confirmation de notre rendez-vous - [Nom de l'entreprise]" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meetingTemplate">Template de l'email</Label>
                  <Textarea 
                    id="meetingTemplate"
                    defaultValue={`Bonjour {{prenom}},

Je vous confirme notre rendez-vous prévu le {{date_rendez_vous}} à {{heure_rendez_vous}}.

{{lien_visioconference}}

Afin de préparer au mieux cette réunion, pourriez-vous nous préciser quels sont vos principaux objectifs pour ce projet ?

N'hésitez pas à me contacter si vous avez besoin de modifier cette date ou pour toute autre question.

Cordialement,
L'équipe [Nom de l'entreprise]`} 
                    rows={10} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Variables disponibles</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{{prenom}}</Badge>
                    <Badge variant="secondary">{{nom}}</Badge>
                    <Badge variant="secondary">{{date_rendez_vous}}</Badge>
                    <Badge variant="secondary">{{heure_rendez_vous}}</Badge>
                    <Badge variant="secondary">{{lien_visioconference}}</Badge>
                  </div>
                </div>
                
                <Button onClick={handleSaveTemplate}>Enregistrer le template</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rappels et notifications</CardTitle>
          <CardDescription>
            Configurez les rappels automatiques pour le suivi des leads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Activer les notifications</div>
              <div className="text-sm text-muted-foreground">
                Recevoir des notifications pour les nouveaux leads et les tâches
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Nouveau message de contact</p>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Recevoir une notification quand un nouveau contact est créé
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Rappel de suivi</p>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Rappel quand un lead n'a pas été contacté depuis 3 jours
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Rappel de tâche</p>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Rappel 24h avant l'échéance d'une tâche
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateAutomation}>
            Enregistrer les paramètres
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Custom Input component to avoid conflicts with shadcn Input
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default AutomationsManager;
