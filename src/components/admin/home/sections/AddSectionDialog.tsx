
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionType } from '@/types/sections';

export interface NewSectionForm {
  type: SectionType;
  title: string;
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

const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  open,
  onOpenChange,
  newSection,
  setNewSection,
  handleAddSection
}) => {
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
              onValueChange={(value) => setNewSection({...newSection, type: value as SectionType})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {standardSectionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Section personnalisée</SelectItem>
                <SelectItem value="trusted-clients">Clients de confiance</SelectItem>
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
          <Button onClick={handleAddSection} className="w-full">
            Ajouter la section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
