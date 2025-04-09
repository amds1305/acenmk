
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HeroVersion } from './types';

interface StyleEditorProps {
  version: HeroVersion;
  onUpdateVersion: (version: HeroVersion) => void;
}

// Fonction utilitaire pour convertir px en nombre et inversement
const pxToNumber = (pxValue: string): number => {
  return parseInt(pxValue, 10) || 0;
};

const numberToPx = (value: number): string => {
  return `${value}px`;
};

// Options de taille de police
const fontSizeOptions = [
  { value: 'xs', label: 'Très petit' },
  { value: 'sm', label: 'Petit' },
  { value: 'base', label: 'Normal' },
  { value: 'lg', label: 'Grand' },
  { value: 'xl', label: 'Très grand' },
  { value: '2xl', label: 'XX-Large' },
  { value: '3xl', label: 'XXX-Large' },
  { value: '4xl', label: '4X-Large' },
  { value: '5xl', label: '5X-Large' },
  { value: '6xl', label: '6X-Large' },
  { value: '7xl', label: '7X-Large' },
];

// Gradients prédéfinis
const predefinedGradients = [
  { value: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)', label: 'Soft Peach' },
  { value: 'linear-gradient(180deg, rgb(254,100,121) 0%, rgb(251,221,186) 100%)', label: 'Warm Sunset' },
  { value: 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)', label: 'Deep Blue' },
  { value: 'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)', label: 'Orange Glow' },
  { value: 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)', label: 'Royal Purple' },
  { value: 'linear-gradient(to right, #243949 0%, #517fa4 100%)', label: 'Ocean Blue' },
  { value: 'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)', label: 'Candy' },
];

const StyleEditor = ({ version, onUpdateVersion }: StyleEditorProps) => {
  // Mettre à jour la couleur du texte
  const updateTextColor = (color: string) => {
    onUpdateVersion({
      ...version,
      textColor: color,
    });
  };

  // Mettre à jour les tailles de police
  const updateTitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      titleFontSize: size,
    });
  };

  const updateSubtitleFontSize = (size: string) => {
    onUpdateVersion({
      ...version,
      subtitleFontSize: size,
    });
  };

  // Mettre à jour le type d'arrière-plan
  const updateBackgroundType = (type: 'color' | 'image' | 'gradient') => {
    onUpdateVersion({
      ...version,
      backgroundType: type,
    });
  };

  // Mettre à jour la couleur d'arrière-plan
  const updateBackgroundColor = (color: string) => {
    onUpdateVersion({
      ...version,
      backgroundColor: color,
    });
  };

  // Mettre à jour le dégradé d'arrière-plan
  const updateBackgroundGradient = (gradient: string) => {
    onUpdateVersion({
      ...version,
      backgroundGradient: gradient,
    });
  };

  // Mettre à jour l'image d'arrière-plan
  const updateBackgroundImage = (imageUrl: string) => {
    onUpdateVersion({
      ...version,
      backgroundImage: imageUrl,
    });
  };

  // Mettre à jour les marges
  const updateMarginTop = (value: number) => {
    onUpdateVersion({
      ...version,
      marginTop: numberToPx(value),
    });
  };

  const updateMarginBottom = (value: number) => {
    onUpdateVersion({
      ...version,
      marginBottom: numberToPx(value),
    });
  };

  // Mettre à jour le padding
  const updatePadding = (value: number) => {
    onUpdateVersion({
      ...version,
      padding: numberToPx(value),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Styles visuels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Typographie */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Typographie</h3>
          
          <div className="space-y-2">
            <Label htmlFor="text-color">Couleur du texte</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full border" 
                style={{ backgroundColor: version.textColor }}
              />
              <Input 
                id="text-color"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title-font-size">Taille du titre</Label>
              <Select 
                value={version.titleFontSize} 
                onValueChange={updateTitleFontSize}
              >
                <SelectTrigger id="title-font-size">
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fontSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="text-sm mt-1">
                <span className={`text-${version.titleFontSize}`}>Aperçu du titre</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle-font-size">Taille du sous-titre</Label>
              <Select 
                value={version.subtitleFontSize} 
                onValueChange={updateSubtitleFontSize}
              >
                <SelectTrigger id="subtitle-font-size">
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fontSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="text-sm mt-1">
                <span className={`text-${version.subtitleFontSize}`}>Aperçu du sous-titre</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Arrière-plan */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Arrière-plan</h3>
          
          <Tabs defaultValue={version.backgroundType} onValueChange={(v) => updateBackgroundType(v as 'color' | 'image' | 'gradient')}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="color">Couleur</TabsTrigger>
              <TabsTrigger value="gradient">Dégradé</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="color" className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bg-color">Couleur d'arrière-plan</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border" 
                    style={{ backgroundColor: version.backgroundColor }}
                  />
                  <Input 
                    id="bg-color"
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
            </TabsContent>
            
            <TabsContent value="gradient" className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bg-gradient">Dégradé prédéfini</Label>
                <Select 
                  value={version.backgroundGradient || ''} 
                  onValueChange={updateBackgroundGradient}
                >
                  <SelectTrigger id="bg-gradient">
                    <SelectValue placeholder="Sélectionnez un dégradé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {predefinedGradients.map((gradient) => (
                        <SelectItem key={gradient.value} value={gradient.value}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ background: gradient.value }}
                            />
                            {gradient.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <div 
                  className="h-14 rounded-md mt-2"
                  style={{ background: version.backgroundGradient || 'none' }}
                ></div>
                
                <div className="mt-2">
                  <Label htmlFor="custom-gradient">Dégradé personnalisé</Label>
                  <Input 
                    id="custom-gradient"
                    value={version.backgroundGradient || ''} 
                    onChange={(e) => updateBackgroundGradient(e.target.value)}
                    placeholder="linear-gradient(to right, #color1, #color2)"
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bg-image">URL de l'image</Label>
                <Input 
                  id="bg-image"
                  value={version.backgroundImage} 
                  onChange={(e) => updateBackgroundImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                
                {version.backgroundImage && (
                  <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-50">
                    <img 
                      src={version.backgroundImage} 
                      alt="Aperçu de l'arrière-plan" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Invalide';
                      }}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Espacement */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Espacement</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="margin-top">Marge supérieure</Label>
                <span className="text-sm text-muted-foreground">{version.marginTop}</span>
              </div>
              <Slider
                id="margin-top"
                min={0}
                max={200}
                step={1}
                value={[pxToNumber(version.marginTop)]}
                onValueChange={(value) => updateMarginTop(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="margin-bottom">Marge inférieure</Label>
                <span className="text-sm text-muted-foreground">{version.marginBottom}</span>
              </div>
              <Slider
                id="margin-bottom"
                min={0}
                max={200}
                step={1}
                value={[pxToNumber(version.marginBottom)]}
                onValueChange={(value) => updateMarginBottom(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="padding">Padding interne</Label>
                <span className="text-sm text-muted-foreground">{version.padding}</span>
              </div>
              <Slider
                id="padding"
                min={0}
                max={100}
                step={1}
                value={[pxToNumber(version.padding)]}
                onValueChange={(value) => updatePadding(value[0])}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleEditor;
