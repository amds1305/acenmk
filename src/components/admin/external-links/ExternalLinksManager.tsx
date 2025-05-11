
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Save, Pencil, Trash2, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface ExternalLink {
  id: string;
  name: string;
  url: string;
  icon?: string;
  requires_auth: boolean;
  allowed_roles: string[];
}

interface Role {
  id: string;
  name: string;
}

const ExternalLinksManager: React.FC = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<ExternalLink>({
    id: '',
    name: '',
    url: '',
    icon: '',
    requires_auth: false,
    allowed_roles: []
  });
  
  // Fetch links and roles on mount
  useEffect(() => {
    fetchLinks();
    fetchRoles();
  }, []);
  
  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('external_links')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching external links:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les liens externes",
        variant: "destructive"
      });
    }
  };
  
  const fetchRoles = async () => {
    try {
      // Here we would fetch roles from the database
      // Since we don't have a roles table in the provided schema,
      // we'll use a mock array of roles
      const mockRoles: Role[] = [
        { id: 'user', name: 'Utilisateur' },
        { id: 'admin', name: 'Administrateur' },
        { id: 'client_premium', name: 'Client Premium' }
      ];
      
      setRoles(mockRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  
  const handleEditLink = (link: ExternalLink) => {
    setCurrentLink(link);
    setIsEditing(true);
  };
  
  const handleNewLink = () => {
    setCurrentLink({
      id: '',
      name: '',
      url: '',
      icon: '',
      requires_auth: false,
      allowed_roles: []
    });
    setIsEditing(true);
  };
  
  const handleSaveLink = async () => {
    try {
      // Validate input
      if (!currentLink.name || !currentLink.url) {
        toast({
          title: "Champs requis",
          description: "Le nom et l'URL sont requis",
          variant: "destructive"
        });
        return;
      }
      
      if (currentLink.id) {
        // Update existing link
        const { error } = await supabase
          .from('external_links')
          .update({
            name: currentLink.name,
            url: currentLink.url,
            icon: currentLink.icon || null,
            requires_auth: currentLink.requires_auth,
            allowed_roles: currentLink.allowed_roles
          })
          .eq('id', currentLink.id);
        
        if (error) throw error;
        
        toast({
          title: "Lien mis à jour",
          description: "Le lien externe a été mis à jour avec succès"
        });
      } else {
        // Create new link
        const { error } = await supabase
          .from('external_links')
          .insert({
            name: currentLink.name,
            url: currentLink.url,
            icon: currentLink.icon || null,
            requires_auth: currentLink.requires_auth,
            allowed_roles: currentLink.allowed_roles
          });
        
        if (error) throw error;
        
        toast({
          title: "Lien créé",
          description: "Le nouveau lien externe a été créé avec succès"
        });
      }
      
      // Refresh the list and close dialog
      fetchLinks();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving link:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde du lien",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('external_links')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setLinks(links.filter(link => link.id !== id));
      
      toast({
        title: "Lien supprimé",
        description: "Le lien externe a été supprimé avec succès"
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lien",
        variant: "destructive"
      });
    }
  };
  
  // Toggle a role in the allowed roles array
  const toggleRole = (roleId: string) => {
    setCurrentLink(prev => {
      const roleExists = prev.allowed_roles.includes(roleId);
      
      if (roleExists) {
        return {
          ...prev,
          allowed_roles: prev.allowed_roles.filter(id => id !== roleId)
        };
      } else {
        return {
          ...prev,
          allowed_roles: [...prev.allowed_roles, roleId]
        };
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Liens externes</CardTitle>
        <Button onClick={handleNewLink}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un lien
        </Button>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Aucun lien externe n'a été configuré.
          </div>
        ) : (
          <div className="space-y-2">
            {links.map(link => (
              <div key={link.id} className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <h3 className="font-medium">{link.name}</h3>
                  <p className="text-sm text-muted-foreground">{link.url}</p>
                  {link.requires_auth && (
                    <div className="text-xs mt-1">
                      Requiert authentification
                      {link.allowed_roles.length > 0 && (
                        <span> • Rôles: {link.allowed_roles.join(', ')}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditLink(link)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteLink(link.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentLink.id ? 'Modifier le lien' : 'Nouveau lien'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-name">Nom</Label>
              <Input 
                id="link-name" 
                value={currentLink.name} 
                onChange={e => setCurrentLink({...currentLink, name: e.target.value})}
                placeholder="Nom du lien"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input 
                id="link-url" 
                value={currentLink.url} 
                onChange={e => setCurrentLink({...currentLink, url: e.target.value})}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link-icon">Icône (optionnel)</Label>
              <Input 
                id="link-icon" 
                value={currentLink.icon || ''} 
                onChange={e => setCurrentLink({...currentLink, icon: e.target.value})}
                placeholder="Nom de l'icône"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="requires-auth" 
                checked={currentLink.requires_auth}
                onCheckedChange={checked => setCurrentLink({...currentLink, requires_auth: checked})}
              />
              <Label htmlFor="requires-auth">Requiert une authentification</Label>
            </div>
            
            {currentLink.requires_auth && (
              <div className="space-y-2">
                <Label>Rôles autorisés</Label>
                <div className="space-y-2 mt-1">
                  {roles.map(role => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Switch 
                        id={`role-${role.id}`}
                        checked={currentLink.allowed_roles.includes(role.id)}
                        onCheckedChange={() => toggleRole(role.id)}
                      />
                      <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveLink}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExternalLinksManager;
