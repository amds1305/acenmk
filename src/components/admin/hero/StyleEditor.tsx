
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { HexColorPicker } from 'react-colorful';
import { HeroVersion } from './types';
import { v4 as uuidv4 } from 'uuid';

interface StyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

const StyleEditor = ({ version, onUpdateVersion }: StyleEditorProps) => {
  // Update text color
  const updateTextColor = (color: string) => {
    onUpdateVersion({
      ...version,
      textColor: color,
    });
  };

  // Update background color
  const updateBackgroundColor = (color: string) => {
    onUpdateVersion({
      ...version,
      backgroundColor: color,
    });
  };

  // Update background type
  const updateBackgroundType = (type: 'color' | 'image' | 'gradient') => {
    onUpdateVersion({
      ...version,
      backgroundType: type,
    });
  };

  // Update background image URL
  const updateBackgroundImage = (url: string) => {
    onUpdateVersion({
      ...version,
      backgroundImage: url,
    });
  };

  // Update background gradient
  const updateBackgroundGradient = (gradient: string) => {
    onUpdateVersion({
      ...version,
      backgroundGradient: gradient,
    });
  };

  // Update title font size
  const updateTitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      titleFontSize: size,
    });
  };

  // Update subtitle font size
  const updateSubtitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      subtitleFontSize: size,
    });
  };

  // Update spacing
  const updateSpacing = (property: 'marginTop' | 'marginBottom' | 'padding', value: string) => {
    onUpdateVersion({
      ...version,
      [property]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style du Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="text">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="text">Texte</TabsTrigger>
            <TabsTrigger value="background">Arrière-plan</TabsTrigger>
            <TabsTrigger value="spacing">Espacement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="textColor">Couleur du texte</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border" 
                  style={{ backgroundColor: version.textColor }}
                />
                <Input 
                  id="textColor"
                  type="color" 
                  value={version.textColor} 
                  onChange={(e) => updateTextColor(e.target.value)}
                  className="w-12 p-0 h-8"
                />
                <Input 
                  value={version.textColor} 
                  onChange={(e) => updateTextColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titleFontSize">Taille du titre</Label>
              <Select 
                value={version.titleFontSize} 
                onValueChange={updateTitleFontSize}
              >
                <SelectTrigger id="titleFontSize">
                  <SelectValue placeholder="Sélectionner une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lg">Petit</SelectItem>
                    <SelectItem value="xl">Normal</SelectItem>
                    <SelectItem value="2xl">Grand</SelectItem>
                    <SelectItem value="3xl">Très grand</SelectItem>
                    <SelectItem value="4xl">Énorme</SelectItem>
                    <SelectItem value="5xl">Gigantesque</SelectItem>
                    <SelectItem value="6xl">Maximal</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitleFontSize">Taille du sous-titre</Label>
              <Select 
                value={version.subtitleFontSize} 
                onValueChange={updateSubtitleFontSize}
              >
                <SelectTrigger id="subtitleFontSize">
                  <SelectValue placeholder="Sélectionner une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="base">Petit</SelectItem>
                    <SelectItem value="lg">Normal</SelectItem>
                    <SelectItem value="xl">Grand</SelectItem>
                    <SelectItem value="2xl">Très grand</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="background" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Type d'arrière-plan</Label>
              <div className="grid grid-cols-3 gap-2">
                <div 
                  className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'color' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
                  onClick={() => updateBackgroundType('color')}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  <span className="text-sm">Couleur</span>
                </div>
                <div 
                  className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'image' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
                  onClick={() => updateBackgroundType('image')}
                >
                  <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <span className="text-sm">Image</span>
                </div>
                <div 
                  className={`border rounded-md p-3 flex flex-col items-center gap-2 cursor-pointer ${version.backgroundType === 'gradient' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'}`}
                  onClick={() => updateBackgroundType('gradient')}
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <span className="text-sm">Dégradé</span>
                </div>
              </div>
            </div>
            
            {version.backgroundType === 'color' && (
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Couleur d'arrière-plan</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border" 
                    style={{ backgroundColor: version.backgroundColor }}
                  />
                  <Input 
                    id="backgroundColor"
                    type="color" 
                    value={version.backgroundColor} 
                    onChange={(e) => updateBackgroundColor(e.target.value)}
                    className="w-12 p-0 h-8"
                  />
                  <Input 
                    value={version.backgroundColor} 
                    onChange={(e) => updateBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
            
            {version.backgroundType === 'image' && (
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">URL de l'image d'arrière-plan</Label>
                <Input 
                  id="backgroundImage"
                  value={version.backgroundImage} 
                  onChange={(e) => updateBackgroundImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {version.backgroundImage && (
                  <div className="mt-2 rounded-md overflow-hidden border">
                    <img 
                      src={version.backgroundImage} 
                      alt="Aperçu de l'arrière-plan" 
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x200?text=Image+Error';
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            
            {version.backgroundType === 'gradient' && (
              <div className="space-y-2">
                <Label htmlFor="backgroundGradient">Dégradé</Label>
                <Input 
                  id="backgroundGradient"
                  value={version.backgroundGradient || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'}
                  onChange={(e) => updateBackgroundGradient(e.target.value)}
                  placeholder="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
                />
                <div 
                  className="mt-2 h-16 rounded-md" 
                  style={{ background: version.backgroundGradient || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button 
                    className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
                    onClick={() => updateBackgroundGradient('linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)')}
                  >
                    Bleu-Violet
                  </button>
                  <button 
                    className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
                    onClick={() => updateBackgroundGradient('linear-gradient(135deg, #10b981 0%, #3b82f6 100%)')}
                  >
                    Vert-Bleu
                  </button>
                  <button 
                    className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
                    onClick={() => updateBackgroundGradient('linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)')}
                  >
                    Jaune-Rouge
                  </button>
                  <button 
                    className="px-3 py-1 text-xs rounded border hover:bg-muted/50"
                    onClick={() => updateBackgroundGradient('linear-gradient(135deg, #111827 0%, #374151 100%)')}
                  >
                    Noir-Gris
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="spacing" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="marginTop">Marge supérieure</Label>
              <Input 
                id="marginTop"
                value={version.marginTop} 
                onChange={(e) => updateSpacing('marginTop', e.target.value)}
                placeholder="0px"
              />
              <p className="text-xs text-muted-foreground">
                Exemple: 0px, 1rem, 20px, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marginBottom">Marge inférieure</Label>
              <Input 
                id="marginBottom"
                value={version.marginBottom} 
                onChange={(e) => updateSpacing('marginBottom', e.target.value)}
                placeholder="0px"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="padding">Padding (interne)</Label>
              <Input 
                id="padding"
                value={version.padding} 
                onChange={(e) => updateSpacing('padding', e.target.value)}
                placeholder="2rem"
              />
              <p className="text-xs text-muted-foreground">
                Exemple: 1rem, 2rem, 20px 40px (haut/bas gauche/droite), etc.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StyleEditor;
