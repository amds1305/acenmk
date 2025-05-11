import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useSections } from '@/contexts/sections/SectionsContext';
import { ExternalLinkSectionData, Section } from '@/types/sections';
import { Trash2, Plus, ExternalLink } from 'lucide-react';
import { useAdminNotification } from '@/hooks/use-admin-notification';

interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  openInNewTab: boolean;
  requiresAuth: boolean;
  allowedRoles: string[];
}

const ExternalLinksManager: React.FC = () => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const { config, addNewSection, updateExistingSection, removeExistingSection } = useSections();
  
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // État pour le formulaire d'ajout/édition
  const [editingLink, setEditingLink] = useState<ExternalLink | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Charger les liens externes existants
  useEffect(() => {
    const loadExternalLinks = () => {
      const externalLinkSections = config.sections.filter(section => section.type === 'external-link');
      
      const loadedLinks = externalLinkSections.map(section => {
        const sectionData = config.sectionData[section.id] as ExternalLinkSectionData;
        return {
          id: section.id,
          title: section.title,
          url: sectionData?.url || '',
          description: sectionData?.description || '',
          icon: sectionData?.icon || '',
          openInNewTab: sectionData?.openInNewTab !== false,
          requiresAuth: section.requiresAuth || false,
          allowedRoles: section.allowedRoles || []
        };
      });
      
      setLinks(loadedLinks);
    };
    
    loadExternalLinks();
  }, [config]);
  
  // Charger les rôles disponibles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('name')
          .order('name');
          
        if (error) throw error;
        
        if (data) {
          setRoles(data.map(role => role.name));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des rôles:', error);
      }
    };
    
    loadRoles();
  }, []);
  
  // Ajouter un nouveau lien externe
  const addNewExternalLink = (newLink: Omit<ExternalLink, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Générer un ID unique
      const linkId = `external-link-${Date.now()}`;
      
      // Créer une nouvelle section
      const newSection: Section = {
        id: linkId,
        type: 'external-link',
        title: newLink.title,
        visible: true,
        order: config.sections.length + 1,
        externalUrl: newLink.url,
        requiresAuth: newLink.requiresAuth,
        allowedRoles: newLink.allowedRoles
      };
      
      // Créer les données de section
      const sectionData: ExternalLinkSectionData = {
        url: newLink.url,
        title: newLink.title,
        description: newLink.description || '',
        icon: newLink.icon || '',
        openInNewTab: newLink.openInNewTab,
        requiresAuth: newLink.requiresAuth,
        allowedRoles: newLink.allowedRoles
      };
      
      // Ajouter la section
      addNewSection(newSection);
      
      // Mettre à jour l'état local
      setLinks(prev => [...prev, { ...newLink, id: linkId }]);
      
      toast({
        title: "Lien externe ajouté",
        description: "Le lien externe a été ajouté avec succès."
      });
      
      showSaveSuccess();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du lien externe:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du lien externe."
      });
      showSaveError();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mettre à jour un lien externe existant
  const updateExternalLink = (linkToUpdate: ExternalLink) => {
    try {
      setIsLoading(true);
      
      // Mettre à jour la section
      const updatedSection: Section = {
        id: linkToUpdate.id,
        type: 'external-link',
        title: linkToUpdate.title,
        visible: true,
        order: config.sections.find(s => s.id === linkToUpdate.id)?.order || 0,
        externalUrl: linkToUpdate.url,
        requiresAuth: linkToUpdate.requiresAuth,
        allowedRoles: linkToUpdate.allowedRoles
      };
      
      // Mettre à jour les données de section
      const sectionData: ExternalLinkSectionData = {
        url: linkToUpdate.url,
        title: linkToUpdate.title,
        description: linkToUpdate.description || '',
        icon: linkToUpdate.icon || '',
        openInNewTab: linkToUpdate.openInNewTab,
        requiresAuth: linkToUpdate.requiresAuth,
        allowedRoles: linkToUpdate.allowedRoles
      };
      
      // Mettre à jour la section
      updateExistingSection(updatedSection);
      
      // Mettre à jour l'état local
      setLinks(prev => prev.map(link => 
        link.id === linkToUpdate.id ? linkToUpdate : link
      ));
      
      toast({
        title: "Lien externe mis à jour",
        description: "Le lien externe a été mis à jour avec succès."
      });
      
      showSaveSuccess();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lien externe:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du lien externe."
      });
      showSaveError();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Supprimer un lien externe
  const deleteExternalLink = (linkId: string) => {
    try {
      setIsLoading(true);
      
      // Supprimer la section
      removeExistingSection(linkId);
      
      // Mettre à jour l'état local
      setLinks(prev => prev.filter(link => link.id !== linkId));
      
      toast({
        title: "Lien externe supprimé",
        description: "Le lien externe a été supprimé avec succès."
      });
      
      showSaveSuccess();
    } catch (error) {
      console.error('Erreur lors de la suppression du lien externe:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lien externe."
      });
      showSaveError();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingLink) return;
    
    if (isEditing) {
      updateExternalLink(editingLink);
    } else {
      addNewExternalLink(editingLink);
    }
    
    // Réinitialiser le formulaire
    setEditingLink(null);
    setIsEditing(false);
  };
  
  // Initialiser le formulaire pour l'ajout
  const handleAddNew = () => {
    setEditingLink({
      id: '',
      title: '',
      url: '',
      description: '',
      icon: '',
      openInNewTab: true,
      requiresAuth: false,
      allowedRoles: []
    });
    setIsEditing(false);
  };
  
  // Initialiser le formulaire pour l'édition
  const handleEdit = (link: ExternalLink) => {
    setEditingLink({ ...link });
    setIsEditing(true);
  };
  
  // Annuler l'édition
  const handleCancel = () => {
    setEditingLink(null);
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Liens externes</CardTitle>
          <CardDescription>
            Gérez les liens externes qui apparaîtront dans la navigation de votre site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun lien externe n'a été ajouté.
              </div>
            ) : (
              <div className="space-y-4">
                {links.map(link => (
                  <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{link.title}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {link.url}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(link)}
                      >
                        Modifier
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteExternalLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!editingLink && (
              <Button onClick={handleAddNew} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un lien externe
              </Button>
            )}
            
            {editingLink && (
              <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
                <h3 className="text-lg font-medium">
                  {isEditing ? 'Modifier le lien externe' : 'Ajouter un lien externe'}
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    value={editingLink.title} 
                    onChange={e => setEditingLink({...editingLink, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input 
                    id="url" 
                    type="url"
                    value={editingLink.url} 
                    onChange={e => setEditingLink({...editingLink, url: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optionnelle)</Label>
                  <Textarea 
                    id="description" 
                    value={editingLink.description || ''} 
                    onChange={e => setEditingLink({...editingLink, description: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="icon">Icône (optionnelle)</Label>
                  <Input 
                    id="icon" 
                    value={editingLink.icon || ''} 
                    onChange={e => setEditingLink({...editingLink, icon: e.target.value})}
                    placeholder="Nom de l'icône Lucide (ex: ExternalLink)"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="openInNewTab" 
                    checked={editingLink.openInNewTab}
                    onCheckedChange={checked => setEditingLink({...editingLink, openInNewTab: checked as boolean})}
                  />
                  <Label htmlFor="openInNewTab">Ouvrir dans un nouvel onglet</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="requiresAuth" 
                    checked={editingLink.requiresAuth}
                    onCheckedChange={checked => setEditingLink({...editingLink, requiresAuth: checked as boolean})}
                  />
                  <Label htmlFor="requiresAuth">Nécessite une authentification</Label>
                </div>
                
                {editingLink.requiresAuth && (
                  <div className="space-y-2">
                    <Label htmlFor="roles">Rôles autorisés</Label>
                    <Select 
                      value={editingLink.allowedRoles.join(',')}
                      onValueChange={value => {
                        const selectedRoles = value ? value.split(',') : [];
                        setEditingLink({...editingLink, allowedRoles: selectedRoles});
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez les rôles" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Si aucun rôle n'est sélectionné, tous les utilisateurs authentifiés auront accès.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Chargement...' : isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExternalLinksManager;
