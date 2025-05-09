
import { useState, useEffect } from 'react';
import { useSections } from '@/contexts/sections/SectionsContext';
import { SectionType } from '@/types/sections';
import { NewSectionForm } from './AddSectionDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function useSectionManager() {
  const { 
    config, 
    addNewSection, 
    removeExistingSection, 
    reorderExistingSections, 
    updateSectionVisibility,
    saveChanges,
    reloadConfig
  } = useSections();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [newSection, setNewSection] = useState<NewSectionForm>({
    type: 'custom',
    title: '',
  });
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Force reload of the configuration when the component mounts
  useEffect(() => {
    console.log('useSectionManager: Reloading configuration...');
    reloadConfig();
    
    // Force invalidation of the relevant queries
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
  }, [reloadConfig, queryClient]);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    // Make sure config.sections exists
    if (!config.sections || config.sections.length === 0) {
      console.warn('No sections available for drag and drop');
      return;
    }

    const newOrder = [...config.sections].sort((a, b) => a.order - b.order);
    const draggedSection = newOrder[draggingIndex];
    
    // Réorganiser les sections
    newOrder.splice(draggingIndex, 1);
    newOrder.splice(index, 0, draggedSection);
    
    // Mettre à jour les ordres
    const orderedIds = newOrder.map(section => section.id);
    reorderExistingSections(orderedIds);
    
    // Mettre à jour l'index de l'élément en cours de glissement
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    
    // Force un rechargement des données après modification
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
  };

  const handleAddSection = async () => {
    if (!newSection.title.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le titre de la section ne peut pas être vide.",
      });
      return;
    }
    
    // Pour les liens externes, vérifier que l'URL est fournie
    if (newSection.type === 'external-link' && !newSection.externalUrl?.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'URL externe est obligatoire pour ce type de section.",
      });
      return;
    }

    try {
      // Ajouter la section avec toutes ses propriétés
      await addNewSection(
        newSection.type, 
        newSection.title, 
        {
          externalUrl: newSection.externalUrl,
          requiresAuth: newSection.requiresAuth,
          allowedRoles: newSection.allowedRoles
        }
      );
      
      // Force un rechargement des données après modification
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      
      // Réinitialiser le formulaire
      setNewSection({ 
        type: 'custom', 
        title: '',
        externalUrl: undefined,
        requiresAuth: false,
        allowedRoles: []
      });
      
      setDialogOpen(false);
      
      toast({
        title: "Section ajoutée",
        description: "La section a été ajoutée avec succès.",
      });
    } catch (error) {
      console.error('Error adding section:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la section.",
      });
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await updateSectionVisibility(id, !currentVisibility);
      
      // Force un rechargement des données après modification
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      
      toast({
        title: "Visibilité mise à jour",
        description: `La section est maintenant ${!currentVisibility ? 'visible' : 'masquée'}.`,
      });
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la visibilité.",
      });
    }
  };

  const handleRemoveSection = async (id: string) => {
    try {
      await removeExistingSection(id);
      
      // Force un rechargement des données après modification
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      
      toast({
        title: "Section supprimée",
        description: "La section a été supprimée avec succès.",
      });
    } catch (error) {
      console.error('Error removing section:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la section.",
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      await saveChanges();
      
      // Forcer un rechargement complet après sauvegarde
      queryClient.invalidateQueries();
      
      // Déclencher l'événement de sauvegarde administrative
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      return true;
    } catch (error) {
      console.error('Error saving changes:', error);
      throw error;
    }
  };

  return {
    config,
    newSection,
    setNewSection,
    draggingIndex,
    dialogOpen,
    setDialogOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddSection,
    handleToggleVisibility,
    handleRemoveSection,
    saveChanges: handleSaveChanges
  };
}
