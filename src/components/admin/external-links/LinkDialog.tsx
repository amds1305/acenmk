
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Role } from './useExternalLinks';
import LinkForm from './LinkForm';

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentLink: ExternalLink;
  roles: Role[];
  onSave: () => void;
  onChange: (link: ExternalLink) => void;
  isLoading: boolean;
}

const LinkDialog: React.FC<LinkDialogProps> = ({ 
  isOpen, 
  onClose, 
  currentLink, 
  roles,
  onSave,
  onChange,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentLink.id ? 'Modifier le lien' : 'Nouveau lien'}</DialogTitle>
        </DialogHeader>
        
        <LinkForm 
          currentLink={currentLink} 
          roles={roles} 
          onChange={onChange} 
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;
