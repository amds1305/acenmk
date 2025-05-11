import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { Save, Upload, Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getHeaderConfig, saveHeaderLogo } from '@/services/supabase/headerService';

// Update position type to match the allowed values
type LogoPosition = 'left' | 'center';

interface HeaderLogoState {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: LogoPosition;
}

export const LogoManager = () => {
  const { toast } = useToast();
  const { showProcessing, showSaveSuccess, showSaveError } = useAdminNotification();
  const [logo, setLogo] = useState<HeaderLogoState>({
    src: '/logo.svg',
    alt: 'Logo',
    width: 120,
    height: 40,
    position: 'left'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const loadHeaderLogo = async () => {
      try {
        const { headerLogo } = await getHeaderConfig();
        if (headerLogo) {
          // Ensure position is one of the allowed values
          const position: LogoPosition = 
            headerLogo.position === 'center' ? 'center' : 'left';
            
          setLogo({
            ...headerLogo,
            position
          });
          setPreviewImage(headerLogo.src);
        }
      } catch (error) {
        console.error('Error loading header logo:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le logo",
          variant: "destructive",
        });
      }
    };
    
    loadHeaderLogo();
  }, [toast]);

  const handleSaveLogo = async () => {
    setIsSaving(true);
    showProcessing();
    
    try {
      const success = await saveHeaderLogo(logo);
      
      if (success) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Le logo a été mis à jour"
        });
        
        // Déclencher un événement pour mettre à jour l'en-tête en temps réel
        window.dispatchEvent(new CustomEvent('header-logo-updated', {
          detail: { logo }
        }));
      } else {
        throw new Error("Erreur lors de la sauvegarde du logo");
      }
    } catch (error) {
      console.error('Error saving header logo:', error);
      showSaveError();
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le logo",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setLogo({...logo, src: result});
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Label htmlFor="logo-src">URL de l'image</Label>
            <Input 
              id="logo-src" 
              value={logo.src} 
              onChange={(e) => setLogo({...logo, src: e.target.value})} 
              placeholder="https://example.com/logo.svg"
            />
          </div>
          <div>
            <Label htmlFor="logo-position">Position</Label>
            <Select 
              value={logo.position} 
              onValueChange={(value: LogoPosition) => setLogo({...logo, position: value})}
            >
              <SelectTrigger id="logo-position" className="w-[120px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Gauche</SelectItem>
                <SelectItem value="center">Centre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="logo-alt">Texte alternatif</Label>
            <Input 
              id="logo-alt" 
              value={logo.alt} 
              onChange={(e) => setLogo({...logo, alt: e.target.value})} 
              placeholder="Description du logo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-width">Largeur (px)</Label>
            <Input 
              id="logo-width" 
              type="number"
              value={logo.width} 
              onChange={(e) => setLogo({...logo, width: Number(e.target.value)})} 
              placeholder="120"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="logo-height">Hauteur (px)</Label>
            <Input 
              id="logo-height"
              type="number"
              value={logo.height} 
              onChange={(e) => setLogo({...logo, height: Number(e.target.value)})} 
              placeholder="40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Télécharger</Label>
            <div className="flex items-center space-x-2">
              <Button variant="outline" disabled={isUploading} asChild>
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  {isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Téléchargement...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Télécharger
                    </>
                  )}
                </Label>
              </Button>
              <Input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        {previewImage && (
          <div className="border rounded-md overflow-hidden">
            <Image 
              src={previewImage} 
              alt="Aperçu du logo" 
              className="object-contain w-full h-32" 
            />
          </div>
        )}

        <Button onClick={handleSaveLogo} disabled={isSaving}>
          {isSaving ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogoManager;
