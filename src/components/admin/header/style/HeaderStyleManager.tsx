import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Undo2, Palette, Bookmark } from 'lucide-react';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MenuStylesTab from './MenuStylesTab';
import IconStylesTab from './IconStylesTab';
import GeneralTab from './components/GeneralTab';
import TypographyTab from './components/TypographyTab';
import AnimationsTab from './components/AnimationsTab';
import StateEffectsTab from './components/StateEffectsTab';
import PresetsTab from './components/PresetsTab';
import PreviewHeader from './components/PreviewHeader';

const HeaderStyleManager = () => {
  const { saveStatus } = useAdminNotification();
  const { headerStyle, updateStyle, saveChanges, resetToDefaults, isLoading, availablePresets, loadPreset } = useHeaderStyle();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <CardContent>
      {showPreview && (
        <div className="mb-6 border rounded-lg overflow-hidden">
          <PreviewHeader />
          <div className="flex justify-end p-2 bg-gray-50 dark:bg-gray-800">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
              Fermer la prévisualisation
            </Button>
          </div>
        </div>
      )}
      
      {!showPreview && (
        <div className="mb-4 flex justify-end">
          <Button 
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="text-sm"
          >
            Prévisualiser les changements
          </Button>
        </div>
      )}
      
      <Tabs defaultValue="general">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="typography">Typographie</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="icons">Icônes</TabsTrigger>
            <TabsTrigger value="states">États</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Palette className="h-4 w-4" />
                  <span>Préréglages</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <PresetsTab availablePresets={availablePresets} loadPreset={loadPreset} />
              </PopoverContent>
            </Popover>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={resetToDefaults}
            >
              <Undo2 className="h-4 w-4" />
              <span>Réinitialiser</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="general">
          <GeneralTab headerStyle={headerStyle} updateStyle={updateStyle} />
        </TabsContent>
        
        <TabsContent value="typography">
          <TypographyTab headerStyle={headerStyle} updateStyle={updateStyle} />
        </TabsContent>
        
        <TabsContent value="menu">
          <MenuStylesTab headerStyle={headerStyle} updateStyle={updateStyle} />
        </TabsContent>
        
        <TabsContent value="icons">
          <IconStylesTab headerStyle={headerStyle} updateStyle={updateStyle} />
        </TabsContent>
        
        <TabsContent value="states">
          <StateEffectsTab headerStyle={headerStyle} updateStyle={updateStyle} />
        </TabsContent>
        
        <TabsContent value="animations">
          <AnimationsTab headerStyle={headerStyle} updateStyle={updateStyle} />
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
