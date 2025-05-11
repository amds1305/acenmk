
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { NewSectionForm } from '../sections/types';

interface AddSectionDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  newSection: NewSectionForm;
  setNewSection: React.Dispatch<React.SetStateAction<NewSectionForm>>;
  onAddSection: () => void;
}

const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  open,
  setIsOpen,
  newSection,
  setNewSection,
  onAddSection
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSection(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewSection(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une section</DialogTitle>
          <DialogDescription>
            Configurez les détails de base de la nouvelle section
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              name="name"
              value={newSection.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select 
              value={newSection.type} 
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="about">À propos</SelectItem>
                <SelectItem value="testimonials">Témoignages</SelectItem>
                <SelectItem value="cta">Appel à l'action</SelectItem>
                <SelectItem value="team">Équipe</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
                <SelectItem value="pricing">Tarifs</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">
            Annuler
          </Button>
          <Button type="button" onClick={onAddSection}>
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
