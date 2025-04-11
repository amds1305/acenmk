
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SearchBarSettings } from './types';
import { Search } from 'lucide-react';

const SearchBarManager = () => {
  const { toast } = useToast();
  
  // État des paramètres de la barre de recherche
  const [searchSettings, setSearchSettings] = useState<SearchBarSettings>({
    isEnabled: true,
    placeholder: 'Rechercher...',
    position: 'right',
    expandOnFocus: true
  });

  // Mettre à jour un paramètre spécifique
  const updateSetting = <K extends keyof SearchBarSettings>(key: K, value: SearchBarSettings[K]) => {
    setSearchSettings({
      ...searchSettings,
      [key]: value
    });
  };

  // Sauvegarder les paramètres
  const saveSettings = () => {
    // Ici, vous implémenteriez la sauvegarde vers votre backend
    toast({
      title: "Succès",
      description: "Paramètres de la barre de recherche mis à jour"
    });
  };

  return (
    <CardContent>
      <div className="space-y-6">
        {/* Activation de la barre de recherche */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="search-enabled" className="text-base">Activer la barre de recherche</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Afficher la barre de recherche dans l'en-tête
            </p>
          </div>
          <Switch 
            id="search-enabled"
            checked={searchSettings.isEnabled} 
            onCheckedChange={(checked) => updateSetting('isEnabled', checked)}
          />
        </div>

        {/* Texte d'espace réservé */}
        <div className="space-y-2">
          <Label htmlFor="search-placeholder">Texte d'espace réservé</Label>
          <Input
            id="search-placeholder"
            value={searchSettings.placeholder}
            onChange={(e) => updateSetting('placeholder', e.target.value)}
            placeholder="Rechercher..."
          />
        </div>

        {/* Position de la barre de recherche */}
        <div className="space-y-2">
          <Label>Position dans l'en-tête</Label>
          <RadioGroup
            value={searchSettings.position}
            onValueChange={(value) => updateSetting('position', value as 'left' | 'center' | 'right')}
            className="flex space-x-4"
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

        {/* Option d'expansion au focus */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="expand-on-focus" className="text-base">Expansion au focus</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Agrandir la barre de recherche lorsqu'elle reçoit le focus
            </p>
          </div>
          <Switch 
            id="expand-on-focus"
            checked={searchSettings.expandOnFocus} 
            onCheckedChange={(checked) => updateSetting('expandOnFocus', checked)}
          />
        </div>

        {/* Prévisualisation */}
        <div className="space-y-2">
          <Label>Prévisualisation</Label>
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className={`relative w-${searchSettings.expandOnFocus ? '40' : '64'} mx-auto transition-all duration-300 hover:w-64`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                disabled
                className="pl-10"
                placeholder={searchSettings.placeholder}
              />
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <Button onClick={saveSettings} className="w-full">
          Sauvegarder les modifications
        </Button>
      </div>
    </CardContent>
  );
};

export default SearchBarManager;
