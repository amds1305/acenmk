
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { HeroCarouselSettings } from './types';
import { AlertCircle } from 'lucide-react';

interface CarouselSettingsProps {
  settings: HeroCarouselSettings;
  onUpdateSettings: (settings: HeroCarouselSettings) => void;
  versionsCount: number;
}

const CarouselSettings = ({ settings, onUpdateSettings, versionsCount }: CarouselSettingsProps) => {
  // Mettre à jour l'état activé/désactivé du carousel
  const updateEnabled = (enabled: boolean) => {
    onUpdateSettings({
      ...settings,
      enabled,
    });
  };

  // Mettre à jour le temps de transition
  const updateTransitionTime = (time: number) => {
    onUpdateSettings({
      ...settings,
      transitionTime: time,
    });
  };

  // Mettre à jour le type de transition
  const updateTransitionType = (type: 'fade' | 'slide' | 'zoom') => {
    onUpdateSettings({
      ...settings,
      transitionType: type,
    });
  };

  // Mettre à jour l'état de lecture automatique
  const updateAutoplay = (autoplay: boolean) => {
    onUpdateSettings({
      ...settings,
      autoplay,
    });
  };

  // Mettre à jour la vitesse de défilement automatique
  const updateAutoplaySpeed = (speed: number) => {
    onUpdateSettings({
      ...settings,
      autoplaySpeed: speed,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Paramètres du Carousel</span>
          <div className="flex items-center space-x-2">
            <Switch 
              id="carousel-enabled"
              checked={settings.enabled}
              onCheckedChange={updateEnabled}
              disabled={versionsCount < 2}
            />
            <Label htmlFor="carousel-enabled">Activer le carousel</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {versionsCount < 2 && (
          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 rounded-md p-3 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Attention</p>
              <p className="text-sm">
                Vous devez créer au moins deux versions du Hero pour pouvoir utiliser le carousel.
              </p>
            </div>
          </div>
        )}
        
        <div className={`space-y-6 ${!settings.enabled || versionsCount < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="transition-type">Type de transition</Label>
              <Select 
                value={settings.transitionType} 
                onValueChange={(value) => updateTransitionType(value as 'fade' | 'slide' | 'zoom')}
                disabled={!settings.enabled || versionsCount < 2}
              >
                <SelectTrigger id="transition-type">
                  <SelectValue placeholder="Sélectionner un type de transition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fade">Fondu (Fade)</SelectItem>
                    <SelectItem value="slide">Glissement (Slide)</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="transition-time">Durée de la transition (secondes)</Label>
                <span className="text-sm text-muted-foreground">{settings.transitionTime}s</span>
              </div>
              <Slider
                id="transition-time"
                min={0.2}
                max={2}
                step={0.1}
                disabled={!settings.enabled || versionsCount < 2}
                value={[settings.transitionTime]}
                onValueChange={(value) => updateTransitionTime(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Lecture automatique</h3>
                <p className="text-sm text-muted-foreground">
                  Définissez si les versions du Hero doivent défiler automatiquement
                </p>
              </div>
              <Switch 
                id="autoplay"
                checked={settings.autoplay}
                onCheckedChange={updateAutoplay}
                disabled={!settings.enabled || versionsCount < 2}
              />
            </div>
            
            <div className={`space-y-2 ${!settings.autoplay ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoplay-speed">Intervalle de défilement (secondes)</Label>
                <span className="text-sm text-muted-foreground">{settings.autoplaySpeed}s</span>
              </div>
              <Slider
                id="autoplay-speed"
                min={2}
                max={20}
                step={1}
                disabled={!settings.enabled || !settings.autoplay || versionsCount < 2}
                value={[settings.autoplaySpeed]}
                onValueChange={(value) => updateAutoplaySpeed(value[0])}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Temps entre chaque changement de version en secondes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarouselSettings;
