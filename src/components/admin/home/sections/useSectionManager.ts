import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section } from '@/types/sections';
import { useSections } from '@/contexts/sections/SectionsContext';

export function useSectionManager() {
  const { config, setConfig, updateSections, saveChanges, reloadConfig } = useSections();
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState<Partial<Section>>({
    type: 'hero',
    title: '',
    visible: true,
  });
  
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggingIndex === null || draggingIndex === index) return;
    
    const updatedSections = [...(config.sections || [])];
    const draggedSection = updatedSections[draggingIndex];
    
    // Remove the dragged item
    updatedSections.splice(draggingIndex, 1);
    // Insert it at the new position
    updatedSections.splice(index, 0, draggedSection);
    
    // Update the order property for each section
    const reorderedSections = updatedSections.map((section, idx) => ({
      ...section,
      order: idx
    }));
    
    updateSections(reorderedSections);
    setDraggingIndex(index);
  }, [draggingIndex, config.sections, updateSections]);
  
  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);
  
  const handleAddSection = useCallback(() => {
    if (newSection.type && newSection.title) {
      const section: Section = {
        id: uuidv4(),
        type: newSection.type,
        title: newSection.title,
        visible: newSection.visible ?? true,
        order: config.sections ? config.sections.length : 0
      };
      
      const updatedSections = [...(config.sections || []), section];
      updateSections(updatedSections);
      
      setDialogOpen(false);
      setNewSection({
        type: 'hero',
        title: '',
        visible: true,
      });
    }
  }, [newSection, config.sections, updateSections]);
  
  const handleToggleVisibility = useCallback((id: string, currentVisibility: boolean) => {
    const updatedSections = (config.sections || []).map(section => 
      section.id === id ? { ...section, visible: !currentVisibility } : section
    );
    
    updateSections(updatedSections);
  }, [config.sections, updateSections]);
  
  const handleRemoveSection = useCallback((id: string) => {
    const updatedSections = (config.sections || [])
      .filter(section => section.id !== id)
      .map((section, index) => ({ ...section, order: index }));
    
    updateSections(updatedSections);
  }, [config.sections, updateSections]);
  
  return {
    config,
    newSection,
    setNewSection,
    draggingIndex,
    dialogOpen,
    setDialogOpen,
    handleDragStart: (index: number) => setDraggingIndex(index),
    handleDragOver,
    handleDragEnd,
    handleAddSection,
    handleToggleVisibility,
    handleRemoveSection,
    saveChanges,
    reloadConfig
  };
}
