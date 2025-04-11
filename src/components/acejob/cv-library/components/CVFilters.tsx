
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface CVFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
}

const CVFilters = ({ isOpen, onClose, onApplyFilters }: CVFiltersProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filtres avancés</DialogTitle>
          <DialogDescription>
            Affinez votre recherche de CV avec des critères précis
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Expérience (années)</Label>
              <div className="flex items-center gap-4">
                <Slider 
                  defaultValue={[0, 10]} 
                  max={15} 
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm">0-10 ans</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Niveau d'études</Label>
              <div className="space-y-2">
                {['Bac', 'Bac+2', 'Licence/Bac+3', 'Master/Bac+5', 'Doctorat'].map((level) => (
                  <div className="flex items-center space-x-2" key={level}>
                    <Checkbox id={`education-${level}`} />
                    <label
                      htmlFor={`education-${level}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Compétences</Label>
              <Input id="skills" placeholder="ex: React, TypeScript, Java..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilité</Label>
              <Select defaultValue="any">
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Sélectionner une disponibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Tous</SelectItem>
                  <SelectItem value="immediate">Immédiate</SelectItem>
                  <SelectItem value="1month">1 mois</SelectItem>
                  <SelectItem value="3months">3 mois</SelectItem>
                  <SelectItem value="contract-end">Fin de contrat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="space-y-2">
                {['Disponible', 'En processus', 'Entretien planifié', 'Embauché', 'Refusé'].map((status) => (
                  <div className="flex items-center space-x-2" key={status}>
                    <Checkbox id={`status-${status}`} />
                    <label
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={onApplyFilters}>Appliquer les filtres</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVFilters;
