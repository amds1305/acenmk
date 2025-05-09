
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { HeaderStyle } from './types';

const HeaderStyleManager = () => {
  const { toast } = useToast();
  
  // État initial des styles du header
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>({
    backgroundColor: 'transparent',
    textColor: '#333333',
    hoverColor: '#ca3c66',
    activeColor: '#ca3c66',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    padding: '1rem',
    sticky: true,
    transparent: true,
    glassmorphism: true,
    borderBottom: true,
    borderColor: '#e5e7eb',
    dropShadow: true,
    showThemeSelector: true,
  });

  // Fonction pour mettre à jour un style spécifique
  const updateStyle = <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => {
    setHeaderStyle(prev => ({ ...prev, [key]: value }));
  };

  // Fonction pour sauvegarder les changements
  const saveChanges = () => {
    toast({
      title: 'Styles sauvegardés',
      description: 'Les styles du header ont été mis à jour avec succès.',
    });
    
    console.log('Styles du header sauvegardés:', headerStyle);
    // Ici, vous pourriez appeler une API pour sauvegarder les styles
  };

  return (
    <CardContent>
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="text">Texte</TabsTrigger>
          <TabsTrigger value="visual">Effets visuels</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="backgroundColor">Couleur d'arrière-plan</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="backgroundColor"
                  type="text"
                  value={headerStyle.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                />
                <Input 
                  type="color"
                  value={headerStyle.backgroundColor !== 'transparent' ? headerStyle.backgroundColor : '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sticky-header">Header fixe</Label>
              <Switch 
                id="sticky-header"
                checked={headerStyle.sticky}
                onCheckedChange={(checked) => updateStyle('sticky', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="transparent-header">Fond transparent</Label>
              <Switch 
                id="transparent-header"
                checked={headerStyle.transparent}
                onCheckedChange={(checked) => updateStyle('transparent', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-selector">Afficher le sélecteur de thème</Label>
              <Switch 
                id="theme-selector"
                checked={headerStyle.showThemeSelector}
                onCheckedChange={(checked) => updateStyle('showThemeSelector', checked)}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="text">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="textColor">Couleur du texte</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="textColor"
                  type="text"
                  value={headerStyle.textColor}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                />
                <Input 
                  type="color"
                  value={headerStyle.textColor}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hoverColor">Couleur au survol</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="hoverColor"
                  type="text"
                  value={headerStyle.hoverColor}
                  onChange={(e) => updateStyle('hoverColor', e.target.value)}
                />
                <Input 
                  type="color"
                  value={headerStyle.hoverColor}
                  onChange={(e) => updateStyle('hoverColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fontFamily">Police de caractères</Label>
              <Input 
                id="fontFamily"
                type="text"
                value={headerStyle.fontFamily}
                onChange={(e) => updateStyle('fontFamily', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fontSize">Taille de la police</Label>
              <Input 
                id="fontSize"
                type="text"
                value={headerStyle.fontSize}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="visual">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="glassmorphism">Effet verre (Glassmorphism)</Label>
              <Switch 
                id="glassmorphism"
                checked={headerStyle.glassmorphism}
                onCheckedChange={(checked) => updateStyle('glassmorphism', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="borderBottom">Bordure inférieure</Label>
              <Switch 
                id="borderBottom"
                checked={headerStyle.borderBottom}
                onCheckedChange={(checked) => updateStyle('borderBottom', checked)}
              />
            </div>
            
            {headerStyle.borderBottom && (
              <div className="grid gap-2">
                <Label htmlFor="borderColor">Couleur de la bordure</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="borderColor"
                    type="text"
                    value={headerStyle.borderColor}
                    onChange={(e) => updateStyle('borderColor', e.target.value)}
                  />
                  <Input 
                    type="color"
                    value={headerStyle.borderColor}
                    onChange={(e) => updateStyle('borderColor', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dropShadow">Ombre portée</Label>
              <Switch 
                id="dropShadow"
                checked={headerStyle.dropShadow}
                onCheckedChange={(checked) => updateStyle('dropShadow', checked)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="padding">Espacement (padding)</Label>
              <Input 
                id="padding"
                type="text"
                value={headerStyle.padding}
                onChange={(e) => updateStyle('padding', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Enregistrer les styles
        </button>
      </div>
    </CardContent>
  );
};

export default HeaderStyleManager;
