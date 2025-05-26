
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NavLinkForm from './NavLinkForm';
import { NavLink } from '../../../header/types';

interface NavLinkDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingLink: NavLink | null;
  navLinks: NavLink[];
  isLoading: boolean;
  onSave: (link: NavLink) => void;
}

const NavLinkDialog = ({ 
  isOpen, 
  setIsOpen, 
  editingLink, 
  navLinks, 
  isLoading, 
  onSave 
}: NavLinkDialogProps) => {
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
          editingLink={editingLink} 
          navLinks={navLinks} 
          isLoading={isLoading} 
          onSubmit={onSave} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default NavLinkDialog;
