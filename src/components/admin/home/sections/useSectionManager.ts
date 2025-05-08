
import { useState } from 'react';
import { useSections } from '@/contexts/SectionsContext';
import { SectionType } from '@/types/sections';
import { NewSectionForm } from './AddSectionDialog';
import { useQueryClient } from '@tanstack/react-query';

export function useSectionManager() {
  const { 
    config, 
    addNewSection, 
    removeExistingSection, 
    reorderExistingSections, 
    updateSectionVisibility,
    saveChanges
  } = useSections();

  const queryClient = useQueryClient();
  const [newSection, setNewSection] = useState<NewSectionForm>({
    type: 'custom',
    title: '',
  });
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

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
    if (!newSection.title.trim()) return;
    
    // Pour les liens externes, vérifier que l'URL est fournie
    if (newSection.type === 'external-link' && !newSection.externalUrl?.trim()) {
      return;
    }

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
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    await updateSectionVisibility(id, !currentVisibility);
    
    // Force un rechargement des données après modification
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
  };

  const handleRemoveSection = async (id: string) => {
    await removeExistingSection(id);
    
    // Force un rechargement des données après modification
    queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
  };

  const handleSaveChanges = async () => {
    await saveChanges();
    
    // Forcer un rechargement complet après sauvegarde
    setTimeout(() => {
      queryClient.invalidateQueries();
      // Déclencher l'événement de sauvegarde administrative
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
    }, 500);
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
