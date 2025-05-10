
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useHeaderStyle } from './style/useHeaderStyle';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import MenuStylesTab from './style/MenuStylesTab';
import IconStylesTab from './style/IconStylesTab';

const HeaderStyleManager = () => {
  const { saveStatus } = useAdminNotification();
  const { headerStyle, updateStyle, saveChanges, isLoading } = useHeaderStyle();

  return (
    <CardContent>
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="icons">Icônes</TabsTrigger>
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
        
        <TabsContent value="menu">
          <MenuStylesTab 
            headerStyle={headerStyle} 
            updateStyle={updateStyle} 
          />
        </TabsContent>
        
        <TabsContent value="icons">
          <IconStylesTab 
            headerStyle={headerStyle} 
            updateStyle={updateStyle} 
          />
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
      
      <div className="mt-6 flex items-center justify-between">
        <SaveIndicator status={saveStatus} />
        <Button
          onClick={saveChanges}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Enregistrer les styles
        </Button>
      </div>
    </CardContent>
  );
};

// Importation nécessaire
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default HeaderStyleManager;
