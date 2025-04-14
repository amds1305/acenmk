
import { useState } from 'react';
import { useSections } from '@/contexts/SectionsContext';
import { SectionType } from '@/types/sections';
import { NewSectionForm } from './AddSectionDialog';

export function useSectionManager() {
  const { 
    config, 
    addNewSection, 
    removeExistingSection, 
    reorderExistingSections, 
    updateSectionVisibility,
    saveChanges
  } = useSections();

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
  };

  const handleAddSection = () => {
    if (!newSection.title.trim()) return;
    
    addNewSection(newSection.type, newSection.title);
    setNewSection({ type: 'custom', title: '' });
    setDialogOpen(false);
  };

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    updateSectionVisibility(id, !currentVisibility);
  };

  const handleRemoveSection = (id: string) => {
    removeExistingSection(id);
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
    saveChanges
  };
}
