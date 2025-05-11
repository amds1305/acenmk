
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section, SectionType } from '@/types/sections';
import { useSections } from '@/contexts/sections/SectionsContext';

export interface NewSectionForm {
  type: SectionType;
  title: string;
  visible?: boolean;
  externalUrl?: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
}

export function useSectionManager() {
  const { 
    config, 
    updateSectionOrder, 
    updateSectionVisibility, 
    removeExistingSection, 
    addNewSection, 
    reloadConfig, 
    saveChanges 
  } = useSections();
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState<NewSectionForm>({
    type: 'hero',
    title: '',
    visible: true,
  });
  
  // Force le rechargement des sections au montage
  useEffect(() => {
    console.log("useSectionManager - Rechargement forcé des sections");
    reloadConfig();
  }, [reloadConfig]);
  
  const handleDragStart = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);
  
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
    
    updateSectionOrder(reorderedSections);
    setDraggingIndex(index);
  }, [draggingIndex, config.sections, updateSectionOrder]);
  
  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);
  
  const handleAddSection = useCallback(() => {
    if (newSection.type && newSection.title) {
      const section: Section = {
        id: newSection.type === 'custom' ? uuidv4() : newSection.type as string,
        type: newSection.type as SectionType,
        title: newSection.title,
        visible: newSection.visible ?? true,
        order: config.sections ? config.sections.length : 0,
        externalUrl: newSection.externalUrl,
        requiresAuth: newSection.requiresAuth,
        allowedRoles: newSection.allowedRoles
      };
      
      addNewSection(section);
      
      setDialogOpen(false);
      setNewSection({
        type: 'hero',
        title: '',
        visible: true,
      });
    }
  }, [newSection, config.sections, addNewSection]);
  
  const handleToggleVisibility = useCallback((id: string, currentVisibility: boolean) => {
    updateSectionVisibility(id, !currentVisibility);
  }, [updateSectionVisibility]);
  
  const handleRemoveSection = useCallback((id: string) => {
    removeExistingSection(id);
  }, [removeExistingSection]);
  
  // Créer les sections par défaut si elles n'existent pas
  useEffect(() => {
    const defaultSections = [
      { id: 'hero', type: 'hero' as SectionType, title: 'Hero', visible: true, order: 0 },
      { id: 'services', type: 'services' as SectionType, title: 'Nos Services', visible: true, order: 1 },
      { id: 'about', type: 'about' as SectionType, title: 'À propos de nous', visible: true, order: 2 },
      { id: 'team', type: 'team' as SectionType, title: 'Notre équipe', visible: true, order: 3 },
      { id: 'testimonials', type: 'testimonials' as SectionType, title: 'Témoignages', visible: true, order: 4 },
      { id: 'faq', type: 'faq' as SectionType, title: 'FAQ', visible: true, order: 5 },
      { id: 'contact', type: 'contact' as SectionType, title: 'Contact', visible: true, order: 6 },
      { id: 'trusted-clients', type: 'trusted-clients' as SectionType, title: 'Nos clients', visible: true, order: 7 },
    ];
    
    if (!config.sections || config.sections.length === 0) {
      console.log("useSectionManager - Ajout des sections par défaut");
      // Ajouter les sections par défaut
      defaultSections.forEach(section => {
        addNewSection(section);
      });
    }
  }, [config.sections, addNewSection]);
  
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
    saveChanges,
    reloadConfig
  };
}
