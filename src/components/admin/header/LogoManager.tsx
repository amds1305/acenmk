
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UploadCloud, Trash2, Save } from 'lucide-react';
import { useLogo } from './logo/useLogo';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';

const LogoManager = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saveStatus } = useAdminNotification();
  const {
    logo,
    selectedFile,
    updateLogoProperty,
    handleFileChange,
    handleUpload,
    saveLogoChanges,
    isLoading
  } = useLogo();

  // Déclencheur pour ouvrir la boîte de dialogue de sélection de fichier
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <CardContent>
      <div className="space-y-6">
        {/* Prévisualisation du logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 w-full flex justify-center">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              style={{ width: logo.width, height: 'auto' }} 
              className="max-h-32 object-contain"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={triggerFileInput} className="flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              Sélectionner un logo
            </Button>
            <Button 
              variant="outline" 
              onClick={() => updateLogoProperty('src', '/placeholder.svg')}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Réinitialiser
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          
          {selectedFile && (
            <Button onClick={handleUpload}>
              Télécharger le logo
            </Button>
          )}
        </div>

        {/* Dimensions du logo */}
        <div className="space-y-2">
          <Label>Largeur du logo (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[logo.width]}
              min={50}
              max={300}
              step={1}
              onValueChange={(value) => updateLogoProperty('width', value[0])}
              className="flex-1"
            />
            <span className="w-12 text-right">{logo.width}px</span>
          </div>
        </div>

        {/* Texte alternatif */}
        <div className="space-y-2">
          <Label htmlFor="alt-text">Texte alternatif (pour accessibilité)</Label>
          <Input
            id="alt-text"
            value={logo.alt}
            onChange={(e) => updateLogoProperty('alt', e.target.value)}
            placeholder="Description du logo pour l'accessibilité"
          />
        </div>

        {/* Position du logo */}
        <div className="space-y-2">
          <Label>Position du logo</Label>
          <RadioGroup
            value={logo.position}
            onValueChange={(value) => updateLogoProperty('position', value as 'left' | 'center' | 'right')}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="position-left" />
              <Label htmlFor="position-left">Gauche</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="position-center" />
              <Label htmlFor="position-center">Centre</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="position-right" />
              <Label htmlFor="position-right">Droite</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex items-center justify-between">
          <SaveIndicator status={saveStatus} />
          <Button 
            onClick={saveLogoChanges} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default LogoManager;
