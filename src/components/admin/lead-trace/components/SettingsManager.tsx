
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const SettingsManager = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: 'Paramètres enregistrés',
      description: 'Les paramètres ont été mis à jour avec succès.',
    });
  };

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid grid-cols-3 w-full md:w-auto">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="fields">Champs personnalisés</TabsTrigger>
        <TabsTrigger value="permissions">Permissions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>
              Configurez les paramètres généraux du module LeadTrace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input id="companyName" defaultValue="ACE Company" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailContact">Email de contact principal</Label>
                <Input id="emailContact" type="email" defaultValue="contact@example.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadAssignment">Attribution automatique des leads</Label>
                <Select defaultValue="round-robin">
                  <SelectTrigger id="leadAssignment">
                    <SelectValue placeholder="Méthode d'attribution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Attribution manuelle</SelectItem>
                    <SelectItem value="round-robin">Rotation (round-robin)</SelectItem>
                    <SelectItem value="load-balancing">Équilibrage de charge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultStatus">Statut par défaut</Label>
                <Select defaultValue="new">
                  <SelectTrigger id="defaultStatus">
                    <SelectValue placeholder="Statut par défaut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nouveau</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="processed">Traité</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Intégration avec le CRM</Label>
                  <div className="text-sm text-muted-foreground">
                    Envoyer automatiquement les leads qualifiés vers le CRM
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Historisation complète</Label>
                  <div className="text-sm text-muted-foreground">
                    Enregistrer toutes les interactions et modifications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode RGPD strict</Label>
                  <div className="text-sm text-muted-foreground">
                    Activer des contrôles supplémentaires pour la conformité RGPD
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>
              Enregistrer les paramètres
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Intégrations</CardTitle>
            <CardDescription>
              Connectez LeadTrace à d'autres services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div>
                <div className="font-medium">Email Marketing</div>
                <p className="text-sm text-muted-foreground">Intégration avec votre système d'emailing</p>
              </div>
              <div className="ml-auto">
                <Button variant="outline">Configurer</Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div>
                <div className="font-medium">CRM</div>
                <p className="text-sm text-muted-foreground">Connectez-vous à votre CRM existant</p>
              </div>
              <div className="ml-auto">
                <Button variant="outline">Configurer</Button>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-md">
              <div>
                <div className="font-medium">Calendrier</div>
                <p className="text-sm text-muted-foreground">Synchronisation avec Google Calendar ou Outlook</p>
              </div>
              <div className="ml-auto">
                <Button variant="outline">Configurer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="fields" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Champs personnalisés</CardTitle>
            <CardDescription>
              Configurez des champs personnalisés pour vos leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex-1 grid grid-cols-5 gap-2">
                  <div className="col-span-2 font-medium">Nom du champ</div>
                  <div className="font-medium">Type</div>
                  <div className="font-medium">Obligatoire</div>
                  <div className="font-medium text-right">Actions</div>
                </div>
              </div>
              
              {[
                { id: 1, name: "Budget", type: "number", required: true },
                { id: 2, name: "Taille de l'entreprise", type: "select", required: false },
                { id: 3, name: "Date souhaitée de début", type: "date", required: false },
              ].map((field) => (
                <div key={field.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1 grid grid-cols-5 gap-2 items-center">
                    <div className="col-span-2">{field.name}</div>
                    <div>{field.type}</div>
                    <div>{field.required ? "Oui" : "Non"}</div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">Éditer</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Supprimer</Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="mt-2">
                Ajouter un champ personnalisé
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="permissions" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Permissions et accès</CardTitle>
            <CardDescription>
              Configurez qui peut accéder au module LeadTrace et avec quelles permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex-1 grid grid-cols-4 gap-2">
                  <div className="font-medium">Rôle</div>
                  <div className="font-medium">Voir</div>
                  <div className="font-medium">Éditer</div>
                  <div className="font-medium">Supprimer</div>
                </div>
              </div>
              
              {[
                { role: "Administrateur", view: true, edit: true, delete: true },
                { role: "Commercial", view: true, edit: true, delete: false },
                { role: "Support", view: true, edit: false, delete: false },
              ].map((role, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1 grid grid-cols-4 gap-2 items-center">
                    <div>{role.role}</div>
                    <div><Switch checked={role.view} /></div>
                    <div><Switch checked={role.edit} /></div>
                    <div><Switch checked={role.delete} /></div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="mt-2">
                Ajouter un rôle
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>
              Enregistrer les permissions
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsManager;
