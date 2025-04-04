
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash, Save, ExternalLink, EyeIcon, Upload, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';
import { ClientLogo, TrustedClientsSectionData } from '@/types/sections';
import { v4 as uuidv4 } from 'uuid';

const AdminTrustedClients = () => {
  const { toast } = useToast();
  const { config, updateExistingSectionData, updateSectionVisibility, saveChanges } = useSections();

  // Récupérer la section "Ils nous font confiance" dans Hero
  const heroData = config.sectionData.hero || {};
  const [showTrustedClients, setShowTrustedClients] = useState<boolean>(
    heroData.showTrustedClients !== undefined ? heroData.showTrustedClients : true
  );
  const [trustedClientsTitle, setTrustedClientsTitle] = useState<string>(
    heroData.trustedClientsTitle || 'Ils nous font confiance'
  );
  const [trustedClients, setTrustedClients] = useState<ClientLogo[]>(
    heroData.trustedClients || []
  );

  // États pour gérer l'édition d'un logo
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentLogo, setCurrentLogo] = useState<ClientLogo | null>(null);
  const [logoToDelete, setLogoToDelete] = useState<ClientLogo | null>(null);

  // Fonction pour ouvrir le dialogue d'ajout/édition de logo
  const handleEditLogo = (logo?: ClientLogo) => {
    if (logo) {
      setCurrentLogo(logo);
    } else {
      setCurrentLogo({
        id: uuidv4(),
        name: '',
        logoUrl: '',
        websiteUrl: ''
      });
    }
    setIsEditing(true);
  };

  // Fonction pour sauvegarder un logo
  const handleSaveLogo = () => {
    if (!currentLogo) return;

    let updatedLogos = [...trustedClients];
    const existingIndex = updatedLogos.findIndex(logo => logo.id === currentLogo.id);

    if (existingIndex >= 0) {
      updatedLogos[existingIndex] = currentLogo;
    } else {
      updatedLogos.push(currentLogo);
    }

    setTrustedClients(updatedLogos);
    setIsEditing(false);
    setCurrentLogo(null);

    toast({
      title: "Logo client sauvegardé",
      description: "Le logo client a été mis à jour avec succès."
    });
  };

  // Fonction pour supprimer un logo
  const handleDeleteLogo = (id: string) => {
    const updatedLogos = trustedClients.filter(logo => logo.id !== id);
    setTrustedClients(updatedLogos);
    setLogoToDelete(null);

    toast({
      title: "Logo supprimé",
      description: "Le logo client a été supprimé avec succès."
    });
  };

  // Fonction pour sauvegarder les changements
  const handleSaveChanges = () => {
    const updatedHeroData = {
      ...heroData,
      showTrustedClients,
      trustedClientsTitle,
      trustedClients
    };

    updateExistingSectionData('hero', updatedHeroData);
    saveChanges();

    toast({
      title: "Modifications enregistrées",
      description: "Les paramètres de la section 'Ils nous font confiance' ont été mis à jour."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients de confiance</h1>
          <p className="text-muted-foreground">
            Gérez la section "Ils nous font confiance" qui apparaît sur la page d'accueil.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/#hero', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de la section</CardTitle>
          <CardDescription>Personnalisez la section "Ils nous font confiance"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-trusted-clients">Afficher la section</Label>
              <p className="text-sm text-muted-foreground">Activez ou désactivez l'affichage de la section</p>
            </div>
            <Switch 
              id="show-trusted-clients" 
              checked={showTrustedClients} 
              onCheckedChange={setShowTrustedClients}
            />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="trusted-clients-title">Titre de la section</Label>
            <Input 
              id="trusted-clients-title" 
              value={trustedClientsTitle} 
              onChange={(e) => setTrustedClientsTitle(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Logos clients</h2>
        <Button onClick={() => handleEditLogo()}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un logo
        </Button>
      </div>

      {trustedClients.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Aucun logo client n'a été ajouté.</p>
          <p className="text-muted-foreground">Cliquez sur "Ajouter un logo" pour commencer.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustedClients.map((logo) => (
            <Card key={logo.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-16 mb-4">
                    <img 
                      src={logo.logoUrl} 
                      alt={logo.name} 
                      className="h-full w-auto object-contain" 
                    />
                  </div>
                  <h3 className="font-medium text-center">{logo.name}</h3>
                  {logo.websiteUrl && (
                    <a 
                      href={logo.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center mt-1"
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      {logo.websiteUrl}
                    </a>
                  )}
                </div>
                
                <div className="flex justify-end items-center mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditLogo(logo)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setLogoToDelete(logo)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le logo de {logoToDelete?.name} ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => logoToDelete && handleDeleteLogo(logoToDelete.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogue pour éditer un logo */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentLogo && currentLogo.name ? `Modifier ${currentLogo.name}` : 'Ajouter un logo client'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="logo-name">Nom du client</Label>
              <Input 
                id="logo-name" 
                value={currentLogo?.name || ''} 
                onChange={(e) => setCurrentLogo(current => current ? {...current, name: e.target.value} : null)}
                placeholder="Ex: Entreprise ABC"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo-url">URL du logo</Label>
              <Input 
                id="logo-url" 
                value={currentLogo?.logoUrl || ''} 
                onChange={(e) => setCurrentLogo(current => current ? {...current, logoUrl: e.target.value} : null)}
                placeholder="https://example.com/logo.png"
              />
              {currentLogo?.logoUrl && (
                <div className="mt-2 p-2 border rounded flex justify-center">
                  <img 
                    src={currentLogo.logoUrl} 
                    alt="Aperçu" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website-url">URL du site web (optionnel)</Label>
              <Input 
                id="website-url" 
                value={currentLogo?.websiteUrl || ''} 
                onChange={(e) => setCurrentLogo(current => current ? {...current, websiteUrl: e.target.value} : null)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveLogo}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTrustedClients;
