
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { NavLink } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { UseNavLinksReturn } from './types';
import { getDefaultNavLinks, hasChildren, getSameLevelLinks } from './utils';
import { loadNavLinks, saveNavLinksToDatabase } from './api';

export const useNavLinks = (): UseNavLinksReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial state for navigation links
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load navigation links from Supabase
  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        setIsLoading(true);
        const links = await loadNavLinks();
        if (links && links.length > 0) {
          setNavLinks(links);
        } else {
          // Default values if no links are found, with Home as an icon
          setNavLinks(getDefaultNavLinks());
        }
      } catch (error) {
        console.error('Error loading navigation links:', error);
        toast({
          title: "Error",
          description: "Unable to load navigation links",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNavLinks();
  }, [toast]);

  // Save links to the database
  const saveToDatabase = async (updatedLinks: NavLink[]): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveNavLinksToDatabase(updatedLinks);
      
      if (success) {
        showSaveSuccess();
        return true;
      } else {
        showSaveError();
        return false;
      }
    } catch (error) {
      console.error('Error saving navigation links:', error);
      showSaveError();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Open editor dialog for an existing link
  const handleEditLink = (link: NavLink) => {
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  // Open dialog to add a new link
  const handleAddLink = () => {
    setEditingLink(null);
    setIsDialogOpen(true);
  };

  // Delete a link
  const handleDeleteLink = async (linkId: string) => {
    // Check if the link has children
    if (hasChildren(navLinks, linkId)) {
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

  // Submit form to add/edit a link
  const handleSaveLink = async (data: NavLink) => {
    let updatedLinks: NavLink[];
    
    if (editingLink) {
      // Update an existing link
      updatedLinks = navLinks.map(link => 
        link.id === editingLink.id ? data : link
      );
    } else {
      // Add a new link
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

  // Toggle a link's visibility
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

  // Move a link up or down in order
  const moveLink = async (linkId: string, direction: 'up' | 'down') => {
    const linkIndex = navLinks.findIndex(link => link.id === linkId);
    const link = navLinks[linkIndex];
    
    // Find all links at the same level (same parent or null)
    const sameLevelLinks = getSameLevelLinks(navLinks, link.parentId);
    const linkLevelIndex = sameLevelLinks.findIndex(l => l.id === linkId);
    
    if ((direction === 'up' && linkLevelIndex === 0) || 
        (direction === 'down' && linkLevelIndex === sameLevelLinks.length - 1)) {
      return; // Cannot move further up/down
    }
    
    // Update the order of all links at the same level
    const newSameLevelLinks = [...sameLevelLinks];
    const swapIndex = direction === 'up' ? linkLevelIndex - 1 : linkLevelIndex + 1;
    
    // Swap the order of the two links
    const tempOrder = newSameLevelLinks[linkLevelIndex].order;
    newSameLevelLinks[linkLevelIndex].order = newSameLevelLinks[swapIndex].order;
    newSameLevelLinks[swapIndex].order = tempOrder;
    
    // Update the global state
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
