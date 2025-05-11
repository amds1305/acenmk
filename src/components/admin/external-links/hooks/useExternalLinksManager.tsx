
import { useState } from 'react';
import { Section } from '@/types/sections';
import { useSections } from '@/contexts/sections/SectionsContext';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';

export const availableRoles = [
  { id: 'user', label: 'Client' },
  { id: 'client_premium', label: 'Client Premium' },
  { id: 'admin', label: 'Admin' },
  { id: 'super_admin', label: 'Super Admin' },
];

export interface ExternalLinkFormData {
  title: string;
  externalUrl: string;
  requiresAuth: boolean;
  allowedRoles: string[];
}

export const useExternalLinksManager = () => {
  const { config, updateExistingSection, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  const adminNotification = useAdminNotification();
  
  const [editSection, setEditSection] = useState<Section | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Filtrer uniquement les sections de type 'external-link'
  const externalLinks = config.sections.filter(section => section.type === 'external-link');

  // Formulaire d'édition
  const [editForm, setEditForm] = useState<ExternalLinkFormData>({
    title: '',
    externalUrl: '',
    requiresAuth: false,
    allowedRoles: []
  });

  // Ouvrir le dialogue d'édition
  const handleEdit = (section: Section) => {
    setEditSection(section);
    setEditForm({
      title: section.title,
      externalUrl: section.externalUrl || '',
      requiresAuth: section.requiresAuth || false,
      allowedRoles: section.allowedRoles || []
    });
    setDialogOpen(true);
  };

  // Gérer la mise à jour d'une section
  const handleUpdateSection = async () => {
    if (!editSection) return;
    
    try {
      // Mettre à jour la section
      await updateExistingSection(editSection.id, {
        title: editForm.title,
        externalUrl: editForm.externalUrl,
        requiresAuth: editForm.requiresAuth,
        allowedRoles: editForm.allowedRoles
      });
      
      // Mettre à jour les données de la section
      await updateExistingSectionData(editSection.id, {
        url: editForm.externalUrl,
        title: editForm.title,
        requiresAuth: editForm.requiresAuth,
        allowedRoles: editForm.allowedRoles
      });
      
      // Fermer le dialogue
      setDialogOpen(false);
      
      toast({
        title: "Succès",
        description: "Le lien externe a été mis à jour"
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lien:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le lien externe",
        variant: "destructive"
      });
    }
  };

  // Gérer la bascule de visibilité
  const handleToggleVisibility = async (section: Section) => {
    try {
      await updateExistingSection(section.id, {
        visible: !section.visible
      });
      
      toast({
        title: "Succès",
        description: `Le lien est maintenant ${!section.visible ? 'visible' : 'masqué'}`
      });
    } catch (error) {
      console.error('Erreur lors de la modification de la visibilité:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité",
        variant: "destructive"
      });
    }
  };

  // Gérer la sélection d'un rôle
  const handleRoleToggle = (roleId: string) => {
    setEditForm(prev => {
      const isSelected = prev.allowedRoles.includes(roleId);
      if (isSelected) {
        return {
          ...prev,
          allowedRoles: prev.allowedRoles.filter(id => id !== roleId)
        };
      } else {
        return {
          ...prev,
          allowedRoles: [...prev.allowedRoles, roleId]
        };
      }
    });
  };

  // Mettre à jour le formulaire d'édition
  const handleFormChange = (data: Partial<ExternalLinkFormData>) => {
    setEditForm(prev => ({ ...prev, ...data }));
  };

  // Sauvegarder toutes les modifications
  const handleSaveAll = async () => {
    try {
      setSaveStatus('saving');
      await saveChanges();
      setSaveStatus('success');
      
      // Notifier avec le context si disponible
      if (adminNotification) {
        adminNotification.showSaveSuccess?.();
      } else {
        // Déclencher l'événement de sauvegarde de façon traditionnelle
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
        
        // Réinitialiser le statut après un délai
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      console.error('Erreur lors de la sauvegarde:', error);
      
      // Notifier avec le context si disponible
      if (adminNotification) {
        adminNotification.showSaveError?.(error);
      } else {
        // Réinitialiser le statut après un délai même en cas d'erreur
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }
    }
  };

  return {
    externalLinks,
    editForm,
    dialogOpen,
    saveStatus,
    availableRoles,
    handleEdit,
    handleUpdateSection,
    handleToggleVisibility,
    handleRoleToggle,
    handleFormChange,
    handleSaveAll,
    setDialogOpen
  };
};
