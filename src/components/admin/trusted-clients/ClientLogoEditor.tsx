
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClientLogo } from '@/types/sections';

interface ClientLogoEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogo: ClientLogo | null;
  setCurrentLogo: (logo: ClientLogo | null) => void;
  onSave: () => void;
}

const ClientLogoEditor = ({ 
  isOpen,
  onClose,
  currentLogo,
  setCurrentLogo,
  onSave
}: ClientLogoEditorProps) => {
  const handleChange = (field: keyof ClientLogo, value: string) => {
    if (currentLogo) {
      setCurrentLogo({
        ...currentLogo,
        [field]: value
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentLogo && currentLogo.name ? `Modifier ${currentLogo.name}` : 'Ajouter un logo client'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="logo-name">Nom du client</Label>
            <Input 
              id="logo-name" 
              value={currentLogo?.name || ''} 
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: ace nümerik"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logo-url">URL du logo</Label>
            <Input 
              id="logo-url" 
              value={currentLogo?.logoUrl || ''} 
              onChange={(e) => handleChange('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            {currentLogo?.logoUrl && (
              <div className="mt-2 p-2 border rounded flex justify-center">
                <img 
                  src={currentLogo.logoUrl} 
                  alt="Aperçu" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie du client</Label>
            <Input 
              id="category" 
              value={currentLogo?.category || ''} 
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="Ex: Technologie, Gouvernement, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website-url">URL du site web (optionnel)</Label>
            <Input 
              id="website-url" 
              value={currentLogo?.websiteUrl || ''} 
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientLogoEditor;
