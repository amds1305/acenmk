
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { HeaderStyle } from './types';
import { Settings, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const HeaderStyleManager = () => {
  const { toast } = useToast();
  
  // État du style de l'en-tête
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>({
    backgroundColor: '#ffffff',
    textColor: '#333333',
    hoverColor: '#ca3c66', // Primary color
    activeColor: '#ca3c66',
    fontFamily: 'Inter',
    fontSize: '1rem',
    padding: '1rem',
    sticky: true,
    transparent: false,
    glassmorphism: false,
    borderBottom: true,
    borderColor: '#e5e7eb',
    dropShadow: false
  });

  // Mettre à jour un paramètre spécifique
  const updateSetting = <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => {
    setHeaderStyle({
      ...headerStyle,
      [key]: value
    });
  };

  // Sauvegarder les paramètres
  const saveSettings = () => {
    // Ici, vous implémenteriez la sauvegarde vers votre backend
    toast({
      title: "Succès",
      description: "Style de l'en-tête mis à jour"
    });
  };

  // Options de polices disponibles
  const fontOptions = [
    { value: 'Inter', label: 'Inter (par défaut)' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'sans-serif', label: 'Sans-serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' }
  ];

  // Générer le style CSS appliqué
  const getAppliedCssStyle = () => {
    return `/* CSS du header */
.header {
  background-color: ${headerStyle.transparent ? 'transparent' : headerStyle.backgroundColor};
  ${headerStyle.glassmorphism ? 'backdrop-filter: blur(8px); background-color: rgba(255, 255, 255, 0.7);' : ''}
  color: ${headerStyle.textColor};
  font-family: ${headerStyle.fontFamily};
  font-size: ${headerStyle.fontSize};
  padding: ${headerStyle.padding};
  ${headerStyle.sticky ? 'position: sticky; top: 0; z-index: 50;' : ''}
  ${headerStyle.borderBottom ? `border-bottom: 1px solid ${headerStyle.borderColor};` : ''}
  ${headerStyle.dropShadow ? 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);' : ''}
  transition: all 0.3s ease;
}

.header-link {
  color: ${headerStyle.textColor};
}

.header-link:hover {
  color: ${headerStyle.hoverColor};
}

.header-link-active {
  color: ${headerStyle.activeColor};
}`;
  };

  // Prévisualisation du header
  const getHeaderPreview = () => {
    const style = {
      backgroundColor: headerStyle.transparent ? 'transparent' : headerStyle.backgroundColor,
      color: headerStyle.textColor,
      fontFamily: headerStyle.fontFamily,
      fontSize: headerStyle.fontSize,
      padding: headerStyle.padding,
      borderBottom: headerStyle.borderBottom ? `1px solid ${headerStyle.borderColor}` : 'none',
      boxShadow: headerStyle.dropShadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
    };

    if (headerStyle.glassmorphism) {
      style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      // @ts-ignore
      style.backdropFilter = 'blur(8px)';
    }

    return (
      <div style={style} className="rounded-md flex items-center justify-between">
        <div className="font-bold" style={{ color: headerStyle.textColor }}>
          Logo
        </div>
        <nav className="flex gap-4">
          <span style={{ color: headerStyle.activeColor }}>Accueil</span>
          <span style={{ color: headerStyle.textColor }}>Services</span>
          <span style={{ color: headerStyle.textColor }}>Contact</span>
        </nav>
      </div>
    );
  };

  return (
    <CardContent>
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="colors">Couleurs</TabsTrigger>
          <TabsTrigger value="typography">Typographie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          {/* Options générales */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sticky-header" className="text-base">En-tête fixe</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  L'en-tête reste visible lors du défilement
                </p>
              </div>
              <Switch 
                id="sticky-header"
                checked={headerStyle.sticky} 
                onCheckedChange={(checked) => updateSetting('sticky', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="transparent-bg" className="text-base">Arrière-plan transparent</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  L'en-tête a un arrière-plan transparent
                </p>
              </div>
              <Switch 
                id="transparent-bg"
                checked={headerStyle.transparent} 
                onCheckedChange={(checked) => updateSetting('transparent', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="glassmorphism" className="text-base">Effet verre (Glassmorphisme)</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Appliquer un effet de flou sur l'arrière-plan
                </p>
              </div>
              <Switch 
                id="glassmorphism"
                checked={headerStyle.glassmorphism} 
                onCheckedChange={(checked) => updateSetting('glassmorphism', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="border-bottom" className="text-base">Bordure inférieure</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Afficher une ligne de séparation sous l'en-tête
                </p>
              </div>
              <Switch 
                id="border-bottom"
                checked={headerStyle.borderBottom} 
                onCheckedChange={(checked) => updateSetting('borderBottom', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="drop-shadow" className="text-base">Ombre portée</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ajouter une ombre légère sous l'en-tête
                </p>
              </div>
              <Switch 
                id="drop-shadow"
                checked={headerStyle.dropShadow} 
                onCheckedChange={(checked) => updateSetting('dropShadow', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="padding">Espacement interne (padding)</Label>
              <Input
                id="padding"
                value={headerStyle.padding}
                onChange={(e) => updateSetting('padding', e.target.value)}
                placeholder="1rem"
              />
              <p className="text-xs text-gray-500">
                Format: 1rem, 10px, etc.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4 pt-4">
          {/* Options de couleurs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bg-color">Couleur d'arrière-plan</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: headerStyle.backgroundColor }}
                ></div>
                <Input
                  id="bg-color"
                  type="text"
                  value={headerStyle.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                />
                <Input
                  type="color"
                  value={headerStyle.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text-color">Couleur du texte</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: headerStyle.textColor }}
                ></div>
                <Input
                  id="text-color"
                  type="text"
                  value={headerStyle.textColor}
                  onChange={(e) => updateSetting('textColor', e.target.value)}
                  placeholder="#333333"
                />
                <Input
                  type="color"
                  value={headerStyle.textColor}
                  onChange={(e) => updateSetting('textColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hover-color">Couleur au survol</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: headerStyle.hoverColor }}
                ></div>
                <Input
                  id="hover-color"
                  type="text"
                  value={headerStyle.hoverColor}
                  onChange={(e) => updateSetting('hoverColor', e.target.value)}
                  placeholder="#ca3c66"
                />
                <Input
                  type="color"
                  value={headerStyle.hoverColor}
                  onChange={(e) => updateSetting('hoverColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="active-color">Couleur active</Label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: headerStyle.activeColor }}
                ></div>
                <Input
                  id="active-color"
                  type="text"
                  value={headerStyle.activeColor}
                  onChange={(e) => updateSetting('activeColor', e.target.value)}
                  placeholder="#ca3c66"
                />
                <Input
                  type="color"
                  value={headerStyle.activeColor}
                  onChange={(e) => updateSetting('activeColor', e.target.value)}
                  className="w-12 p-1 h-10"
                />
              </div>
            </div>
            
            {headerStyle.borderBottom && (
              <div className="space-y-2">
                <Label htmlFor="border-color">Couleur de bordure</Label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: headerStyle.borderColor }}
                  ></div>
                  <Input
                    id="border-color"
                    type="text"
                    value={headerStyle.borderColor}
                    onChange={(e) => updateSetting('borderColor', e.target.value)}
                    placeholder="#e5e7eb"
                  />
                  <Input
                    type="color"
                    value={headerStyle.borderColor}
                    onChange={(e) => updateSetting('borderColor', e.target.value)}
                    className="w-12 p-1 h-10"
                  />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-4 pt-4">
          {/* Options de typographie */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-family">Police</Label>
              <Select
                value={headerStyle.fontFamily}
                onValueChange={(value) => updateSetting('fontFamily', value)}
              >
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Sélectionner une police" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="font-size">Taille de police</Label>
                <span className="text-sm text-gray-500">{headerStyle.fontSize}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs">0.75rem</span>
                <Slider
                  value={[parseFloat(headerStyle.fontSize)]}
                  min={0.75}
                  max={2}
                  step={0.05}
                  onValueChange={(value) => updateSetting('fontSize', `${value[0]}rem`)}
                  className="flex-1"
                />
                <span className="text-lg">2rem</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 space-y-2">
        <Label>Prévisualisation</Label>
        <div className="border p-4 rounded-lg bg-gray-800">
          {getHeaderPreview()}
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <Label>CSS généré</Label>
        <pre className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-x-auto text-sm">
          {getAppliedCssStyle()}
        </pre>
      </div>

      {/* Bouton de sauvegarde */}
      <Button onClick={saveSettings} className="w-full mt-6">
        Sauvegarder les modifications
      </Button>
    </CardContent>
  );
};

export default HeaderStyleManager;
