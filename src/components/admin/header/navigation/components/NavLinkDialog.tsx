
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NavLinkForm from './NavLinkForm';
import { NavLink } from '../../../header/types';
import { NavLinkDialogProps } from '../types';

const NavLinkDialog: React.FC<NavLinkDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  editingLink, 
  navLinks, 
  isLoading, 
  onSave 
}: NavLinkDialogProps) => {
  const [currentLink, setCurrentLink] = useState<NavLink>({
    id: '',
    name: '',
    href: '',
    icon: null,
    parentId: null,
    order: 0,
    isVisible: true,
    requiresAuth: false,
    isExternal: false
  });

  // Update currentLink when editingLink changes
  React.useEffect(() => {
    if (editingLink) {
      setCurrentLink(editingLink);
    } else {
      // Reset to default values when adding a new link
      setCurrentLink({
        id: '',
        name: '',
        href: '',
        icon: null,
        parentId: null,
        order: navLinks.length,
        isVisible: true,
        requiresAuth: false,
        isExternal: false
      });
    }
  }, [editingLink, navLinks]);

  const updateNavLink = (key: keyof NavLink, value: any) => {
    setCurrentLink({
      ...currentLink,
      [key]: value
    });
  };

  const handleSave = () => {
    onSave(currentLink);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingLink ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
          </DialogTitle>
          <DialogDescription>
            {editingLink 
              ? 'Modifiez les détails de ce lien de navigation.' 
              : 'Créez un nouveau lien dans le menu de navigation.'}
          </DialogDescription>
        </DialogHeader>

        <NavLinkForm 
          navLink={currentLink}
          updateNavLink={updateNavLink}
          existingLinks={navLinks}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NavLinkDialog;
