
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionType } from '@/types/sections';
import { Checkbox } from '@/components/ui/checkbox';
import { UserRole } from '@/types/auth';

export interface NewSectionForm {
  type: SectionType;
  title: string;
  externalUrl?: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
}

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newSection: NewSectionForm;
  setNewSection: React.Dispatch<React.SetStateAction<NewSectionForm>>;
  handleAddSection: () => void;
}

const standardSectionTypes: SectionType[] = [
  'hero', 'services', 'about', 'team', 'testimonials', 'faq', 'contact'
];

// Fonction d'aide pour formater les noms de type de section
const formatSectionType = (type: string): string => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Rôles disponibles (à adapter selon votre système)
const availableRoles: { id: string; label: string }[] = [
  { id: 'user', label: 'Client' },
  { id: 'client_premium', label: 'Client Premium' },
  { id: 'admin', label: 'Admin' },
  { id: 'super_admin', label: 'Super Admin' },
];

const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  open,
  onOpenChange,
  newSection,
  setNewSection,
  handleAddSection
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(current => {
      const isSelected = current.includes(roleId);
      if (isSelected) {
        // Retirer le rôle s'il est déjà sélectionné
        const updated = current.filter(id => id !== roleId);
        setNewSection(prev => ({ ...prev, allowedRoles: updated }));
        return updated;
      } else {
        // Ajouter le rôle s'il n'est pas sélectionné
        const updated = [...current, roleId];
        setNewSection(prev => ({ ...prev, allowedRoles: updated }));
        return updated;
      }
    });
  };
  
  const isExternalLink = newSection.type === 'external-link';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-type">Type de section</Label>
            <Select 
              value={newSection.type} 
              onValueChange={(value) => {
                const sectionType = value as SectionType;
                setNewSection({...newSection, type: sectionType});
                
                // Réinitialiser les champs spécifiques aux liens externes si on change de type
                if (sectionType !== 'external-link') {
                  setNewSection(prev => ({
                    ...prev,
                    type: sectionType,
                    externalUrl: undefined,
                    requiresAuth: false,
                    allowedRoles: []
                  }));
                  setSelectedRoles([]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {standardSectionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatSectionType(type)}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Section personnalisée</SelectItem>
                <SelectItem value="trusted-clients">Clients de confiance</SelectItem>
                <SelectItem value="external-link">Lien externe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-title">Titre de la section</Label>
            <Input 
              id="section-title" 
              value={newSection.title} 
              onChange={(e) => setNewSection({...newSection, title: e.target.value})}
              placeholder="Ex: Nos partenaires"
            />
          </div>
          
          {isExternalLink && (
            <>
              <div className="space-y-2">
                <Label htmlFor="external-url">URL externe</Label>
                <Input 
                  id="external-url" 
                  value={newSection.externalUrl || ''} 
                  onChange={(e) => setNewSection({...newSection, externalUrl: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requires-auth"
                  checked={newSection.requiresAuth || false}
                  onCheckedChange={(checked) => 
                    setNewSection({...newSection, requiresAuth: !!checked})
                  }
                />
                <Label htmlFor="requires-auth">Nécessite une authentification</Label>
              </div>
              
              {newSection.requiresAuth && (
                <div className="space-y-2">
                  <Label>Rôles autorisés</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableRoles.map(role => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`role-${role.id}`}
                          checked={selectedRoles.includes(role.id)}
                          onCheckedChange={() => handleRoleToggle(role.id)}
                        />
                        <Label htmlFor={`role-${role.id}`}>{role.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <Button 
            onClick={handleAddSection} 
            className="w-full"
            disabled={isExternalLink && !newSection.externalUrl}
          >
            Ajouter la section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
