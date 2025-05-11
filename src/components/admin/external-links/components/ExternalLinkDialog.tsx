
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface ExternalLinkFormData {
  title: string;
  externalUrl: string;
  requiresAuth: boolean;
  allowedRoles: string[];
}

interface ExternalLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ExternalLinkFormData;
  onFormChange: (data: Partial<ExternalLinkFormData>) => void;
  onRoleToggle: (roleId: string) => void;
  onSubmit: () => void;
  availableRoles: { id: string; label: string }[];
}

const ExternalLinkDialog: React.FC<ExternalLinkDialogProps> = ({
  open,
  onOpenChange,
  formData,
  onFormChange,
  onRoleToggle,
  onSubmit,
  availableRoles
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le lien externe</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du lien</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="externalUrl">URL externe</Label>
            <Input 
              id="externalUrl" 
              value={formData.externalUrl}
              onChange={(e) => onFormChange({ externalUrl: e.target.value })}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="requiresAuth"
              checked={formData.requiresAuth}
              onCheckedChange={(checked) => onFormChange({ requiresAuth: checked })}
            />
            <Label htmlFor="requiresAuth">Nécessite une authentification</Label>
          </div>
          
          {formData.requiresAuth && (
            <div className="space-y-2">
              <Label>Rôles autorisés</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableRoles.map(role => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`role-edit-${role.id}`}
                      checked={formData.allowedRoles.includes(role.id)}
                      onCheckedChange={() => onRoleToggle(role.id)}
                    />
                    <Label htmlFor={`role-edit-${role.id}`}>{role.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSubmit}>
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExternalLinkDialog;
