import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Section } from '@/types/sections';
import { useSections } from '@/contexts/SectionsContext';
import { useToast } from '@/hooks/use-toast';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';

const availableRoles = [
  { id: 'user', label: 'Client' },
  { id: 'client_premium', label: 'Client Premium' },
  { id: 'admin', label: 'Admin' },
  { id: 'super_admin', label: 'Super Admin' },
];

const ExternalLinksManager = () => {
  const { config, updateExistingSection, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  const adminNotification = useAdminNotification();
  
  const [editSection, setEditSection] = useState<Section | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Filtrer uniquement les sections de type 'external-link'
  const externalLinks = config.sections.filter(section => section.type === 'external-link');

  // Formulaire d'édition
  const [editForm, setEditForm] = useState({
    title: '',
    externalUrl: '',
    requiresAuth: false,
    allowedRoles: [] as string[]
  });

  // Ouvrir le dialogue d'édition
  const handleEdit = (section: Section) => {
    const sectionData = config.sectionData[section.id] || {};
    setEditSection(section);
    setEditForm({
      title: section.title,
      externalUrl: section.externalUrl || '',
      requiresAuth: section.requiresAuth || false,
      allowedRoles: section.allowedRoles || []
    });
    setDialogOpen(true);
  };

  // Gérer la mise à jour d'une section
  const handleUpdateSection = async () => {
    if (!editSection) return;
    
    try {
      // Mettre à jour la section
      await updateExistingSection(editSection.id, {
        title: editForm.title,
        externalUrl: editForm.externalUrl,
        requiresAuth: editForm.requiresAuth,
        allowedRoles: editForm.allowedRoles
      });
      
      // Mettre à jour les données de la section
      await updateExistingSectionData(editSection.id, {
        url: editForm.externalUrl,
        title: editForm.title,
        requiresAuth: editForm.requiresAuth,
        allowedRoles: editForm.allowedRoles
      });
      
      // Fermer le dialogue
      setDialogOpen(false);
      
      toast({
        title: "Succès",
        description: "Le lien externe a été mis à jour"
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lien:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le lien externe",
        variant: "destructive"
      });
    }
  };

  // Gérer la bascule de visibilité
  const handleToggleVisibility = async (section: Section) => {
    try {
      await updateExistingSection(section.id, {
        visible: !section.visible
      });
      
      toast({
        title: "Succès",
        description: `Le lien est maintenant ${!section.visible ? 'visible' : 'masqué'}`
      });
    } catch (error) {
      console.error('Erreur lors de la modification de la visibilité:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité",
        variant: "destructive"
      });
    }
  };

  // Gérer la sélection d'un rôle
  const handleRoleToggle = (roleId: string) => {
    setEditForm(prev => {
      const isSelected = prev.allowedRoles.includes(roleId);
      if (isSelected) {
        return {
          ...prev,
          allowedRoles: prev.allowedRoles.filter(id => id !== roleId)
        };
      } else {
        return {
          ...prev,
          allowedRoles: [...prev.allowedRoles, roleId]
        };
      }
    });
  };

  // Sauvegarder toutes les modifications
  const handleSaveAll = async () => {
    try {
      setSaveStatus('saving');
      await saveChanges();
      setSaveStatus('success');
      
      // Notifier avec le context si disponible
      if (adminNotification) {
        adminNotification.showSaveSuccess();
      } else {
        // Déclencher l'événement de sauvegarde de façon traditionnelle
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
        
        // Réinitialiser le statut après un délai
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      console.error('Erreur lors de la sauvegarde:', error);
      
      // Notifier avec le context si disponible
      if (adminNotification) {
        adminNotification.showSaveError(error);
      } else {
        // Réinitialiser le statut après un délai même en cas d'erreur
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Liens externes</h2>
          <p className="text-sm text-muted-foreground">
            Gérez les liens vers des applications web externes avec contrôle d'accès
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SaveIndicator status={saveStatus} />
          <Button onClick={handleSaveAll} disabled={saveStatus === 'saving'}>
            Enregistrer tout
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des liens externes</CardTitle>
          <CardDescription>
            Ces liens peuvent être configurés pour être accessibles uniquement par certains rôles d'utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {externalLinks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ExternalLink className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Aucun lien externe configuré</p>
              <p className="text-sm mt-2">
                Ajoutez des liens externes depuis le gestionnaire de sections
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Accès</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {externalLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <a 
                        href={link.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        {link.externalUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      {link.requiresAuth ? (
                        <div className="space-y-1">
                          <Badge variant="outline" className="bg-amber-100 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                            Authentification requise
                          </Badge>
                          {(link.allowedRoles && link.allowedRoles.length > 0) ? (
                            <div className="flex flex-wrap gap-1">
                              {link.allowedRoles.map(role => (
                                <Badge key={role} variant="secondary" className="text-xs">
                                  {availableRoles.find(r => r.id === role)?.label || role}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Tous les utilisateurs connectés
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
                          Public
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {link.visible ? (
                        <Badge className="bg-green-500">Visible</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Masqué</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleToggleVisibility(link)}>
                          {link.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Dialogue d'édition */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le lien externe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du lien</Label>
              <Input 
                id="title" 
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="externalUrl">URL externe</Label>
              <Input 
                id="externalUrl" 
                value={editForm.externalUrl}
                onChange={(e) => setEditForm({...editForm, externalUrl: e.target.value})}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="requiresAuth"
                checked={editForm.requiresAuth}
                onCheckedChange={(checked) => 
                  setEditForm({...editForm, requiresAuth: checked})
                }
              />
              <Label htmlFor="requiresAuth">Nécessite une authentification</Label>
            </div>
            
            {editForm.requiresAuth && (
              <div className="space-y-2">
                <Label>Rôles autorisés</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableRoles.map(role => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-edit-${role.id}`}
                        checked={editForm.allowedRoles.includes(role.id)}
                        onCheckedChange={() => handleRoleToggle(role.id)}
                      />
                      <Label htmlFor={`role-edit-${role.id}`}>{role.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateSection}>
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExternalLinksManager;
