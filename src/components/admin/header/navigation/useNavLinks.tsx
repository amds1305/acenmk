
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveNavLinks, getHeaderConfig } from '@/services/supabase/headerService';
import { NavLink } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface UseNavLinksReturn {
  navLinks: NavLink[];
  editingLink: NavLink | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  setEditingLink: (link: NavLink | null) => void;
  setIsDialogOpen: (open: boolean) => void;
  handleAddLink: () => void;
  handleEditLink: (link: NavLink) => void;
  handleDeleteLink: (linkId: string) => void;
  handleSaveLink: (data: NavLink) => void;
  toggleLinkVisibility: (linkId: string) => void;
  moveLink: (linkId: string, direction: 'up' | 'down') => void;
}

export const useNavLinks = (): UseNavLinksReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // État initial des liens de navigation
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Charger les liens de navigation depuis Supabase
  useEffect(() => {
    const loadNavLinks = async () => {
      try {
        setIsLoading(true);
        const { navLinks: links } = await getHeaderConfig();
        if (links && links.length > 0) {
          setNavLinks(links);
        } else {
          // Valeurs par défaut si aucun lien n'est trouvé
          setNavLinks([
            { id: uuidv4(), name: 'Accueil', href: '/', order: 1, isVisible: true, parentId: null },
            { id: uuidv4(), name: 'Services', href: '/#services', order: 2, isVisible: true, parentId: null },
            { id: uuidv4(), name: 'Portfolio', href: '/portfolio', order: 3, isVisible: true, parentId: null },
            { id: uuidv4(), name: 'Contact', href: '/#contact', order: 5, isVisible: true, parentId: null },
          ]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des liens de navigation:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les liens de navigation",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNavLinks();
  }, [toast]);

  // Sauvegarder les liens dans la base de données
  const saveToDatabase = async (updatedLinks: NavLink[]): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveNavLinks(updatedLinks);
      
      if (success) {
        showSaveSuccess();
        return true;
      } else {
        showSaveError();
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des liens de navigation:', error);
      showSaveError();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Ouvrir le dialogue d'édition pour un lien existant
  const handleEditLink = (link: NavLink) => {
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  // Ouvrir le dialogue pour ajouter un nouveau lien
  const handleAddLink = () => {
    setEditingLink(null);
    setIsDialogOpen(true);
  };

  // Supprimer un lien
  const handleDeleteLink = async (linkId: string) => {
    // Vérifier si le lien a des enfants
    const hasChildren = navLinks.some(link => link.parentId === linkId);
    
    if (hasChildren) {
      toast({
        title: "Action impossible",
        description: "Ce lien possède des sous-menus. Veuillez d'abord supprimer ou déplacer ses sous-menus.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLinks = navLinks.filter(link => link.id !== linkId);
    setNavLinks(updatedLinks);
    
    const success = await saveToDatabase(updatedLinks);
    if (success) {
      toast({
        title: "Succès",
        description: "Lien supprimé"
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le lien",
        variant: "destructive"
      });
    }
  };

  // Soumettre le formulaire pour ajouter/éditer un lien
  const handleSaveLink = async (data: NavLink) => {
    let updatedLinks: NavLink[];
    
    if (editingLink) {
      // Mise à jour d'un lien existant
      updatedLinks = navLinks.map(link => 
        link.id === editingLink.id ? data : link
      );
    } else {
      // Ajout d'un nouveau lien
      updatedLinks = [...navLinks, data];
    }
    
    setNavLinks(updatedLinks);
    
    const success = await saveToDatabase(updatedLinks);
    if (success) {
      toast({
        title: "Succès",
        description: editingLink ? "Lien mis à jour" : "Lien ajouté"
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le lien",
        variant: "destructive"
      });
    }
    
    setIsDialogOpen(false);
  };

  // Basculer la visibilité d'un lien
  const toggleLinkVisibility = async (linkId: string) => {
    const updatedLinks = navLinks.map(link => 
      link.id === linkId ? { ...link, isVisible: !link.isVisible } : link
    );
    
    setNavLinks(updatedLinks);
    
    const success = await saveToDatabase(updatedLinks);
    if (!success) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité du lien",
        variant: "destructive"
      });
    }
  };

  // Déplacer un lien vers le haut ou le bas dans l'ordre
  const moveLink = async (linkId: string, direction: 'up' | 'down') => {
    const linkIndex = navLinks.findIndex(link => link.id === linkId);
    const link = navLinks[linkIndex];
    
    // Trouver tous les liens au même niveau (même parent ou null)
    const sameLevelLinks = navLinks.filter(l => l.parentId === link.parentId);
    const linkLevelIndex = sameLevelLinks.findIndex(l => l.id === linkId);
    
    if ((direction === 'up' && linkLevelIndex === 0) || 
        (direction === 'down' && linkLevelIndex === sameLevelLinks.length - 1)) {
      return; // Ne peut pas déplacer plus haut/bas
    }
    
    // Mettre à jour l'ordre de tous les liens au même niveau
    const newSameLevelLinks = [...sameLevelLinks];
    const swapIndex = direction === 'up' ? linkLevelIndex - 1 : linkLevelIndex + 1;
    
    // Échanger l'ordre des deux liens
    const tempOrder = newSameLevelLinks[linkLevelIndex].order;
    newSameLevelLinks[linkLevelIndex].order = newSameLevelLinks[swapIndex].order;
    newSameLevelLinks[swapIndex].order = tempOrder;
    
    // Mettre à jour l'état global
    const updatedLinks = navLinks.map(l => {
      const updatedLink = newSameLevelLinks.find(nl => nl.id === l.id);
      return updatedLink || l;
    });
    
    setNavLinks(updatedLinks);
    
    const success = await saveToDatabase(updatedLinks);
    if (!success) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'ordre des liens",
        variant: "destructive"
      });
    }
  };

  return {
    navLinks,
    editingLink,
    isDialogOpen,
    isLoading,
    setEditingLink,
    setIsDialogOpen,
    handleAddLink,
    handleEditLink,
    handleDeleteLink,
    handleSaveLink,
    toggleLinkVisibility,
    moveLink
  };
};
