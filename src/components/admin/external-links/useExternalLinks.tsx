
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
  icon?: string;
  requires_auth: boolean;
  allowed_roles: string[];
}

export interface Role {
  id: string;
  name: string;
}

const useExternalLinks = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch links and roles on mount
  useEffect(() => {
    fetchLinks();
    fetchRoles();
  }, []);
  
  const fetchLinks = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
  
  const saveLink = async (link: ExternalLink): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Validate input
      if (!link.name || !link.url) {
        toast({
          title: "Champs requis",
          description: "Le nom et l'URL sont requis",
          variant: "destructive"
        });
        return false;
      }
      
      if (link.id) {
        // Update existing link
        const { error } = await supabase
          .from('external_links')
          .update({
            name: link.name,
            url: link.url,
            icon: link.icon || null,
            requires_auth: link.requires_auth,
            allowed_roles: link.allowed_roles
          })
          .eq('id', link.id);
        
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
            name: link.name,
            url: link.url,
            icon: link.icon || null,
            requires_auth: link.requires_auth,
            allowed_roles: link.allowed_roles
          });
        
        if (error) throw error;
        
        toast({
          title: "Lien créé",
          description: "Le nouveau lien externe a été créé avec succès"
        });
      }
      
      // Refresh the list
      await fetchLinks();
      return true;
    } catch (error) {
      console.error('Error saving link:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde du lien",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteLink = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
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
      
      return true;
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lien",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    links,
    roles,
    isLoading,
    fetchLinks,
    fetchRoles,
    saveLink,
    deleteLink
  };
};

export default useExternalLinks;
