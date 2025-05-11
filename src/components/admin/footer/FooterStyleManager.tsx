
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bold, Italic, Underline } from 'lucide-react';

interface FooterStyle {
  companyName: {
    color: string;
    fontSize: string;
    fontWeight: string;
    isVisible: boolean;
  };
  sectionTitles: {
    color: string;
    fontSize: string;
    fontWeight: string;
    isVisible: boolean;
  };
  links: {
    isVisible: boolean;
    color: string;
    hoverColor: string;
  };
  services: {
    isVisible: boolean;
  };
  legalLinks: {
    isVisible: boolean;
  };
  social: {
    isVisible: boolean;
    iconColor: string;
    iconHoverColor: string;
    iconBgColor: string;
    iconBgHoverColor: string;
  };
  backToTopButton: {
    isVisible: boolean;
    textColor: string;
    bgColor: string;
    borderColor: string;
    hoverBgColor: string;
    hoverTextColor: string;
  };
}

const defaultFooterStyle: FooterStyle = {
  companyName: {
    color: "#FFFFFF",
    fontSize: "1.5rem",
    fontWeight: "700",
    isVisible: true,
  },
  sectionTitles: {
    color: "#FFFFFF",
    fontSize: "1.25rem",
    fontWeight: "600",
    isVisible: true,
  },
  links: {
    isVisible: true,
    color: "#9CA3AF",
    hoverColor: "#FFFFFF",
  },
  services: {
    isVisible: true,
  },
  legalLinks: {
    isVisible: true,
  },
  social: {
    isVisible: true,
    iconColor: "#9CA3AF",
    iconHoverColor: "#FFFFFF",
    iconBgColor: "rgba(255, 255, 255, 0.1)",
    iconBgHoverColor: "rgba(255, 255, 255, 0.2)",
  },
  backToTopButton: {
    isVisible: true,
    textColor: "#FFFFFF",
    bgColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "transparent",
    hoverBgColor: "rgba(255, 255, 255, 0.2)",
    hoverTextColor: "#FFFFFF",
  }
};

export const FooterStyleManager = () => {
  const { toast } = useToast();
  const [footerStyle, setFooterStyle] = useState<FooterStyle>(defaultFooterStyle);
  const [loading, setLoading] = useState(true);

  // Charger les styles depuis la base de données
  React.useEffect(() => {
    const loadFooterStyle = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('section_data')
          .select('data')
          .eq('section_id', 'footer-style')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
            console.error("Erreur lors du chargement des styles:", error);
          }
          // Utiliser les styles par défaut si aucun style n'est trouvé
        } else if (data) {
          setFooterStyle(data.data as FooterStyle);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFooterStyle();
  }, []);

  const handleStyleChange = <K extends keyof FooterStyle>(
    section: K,
    property: keyof FooterStyle[K],
    value: any
  ) => {
    setFooterStyle(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [property]: value
      }
    }));
  };

  const saveFooterStyle = async () => {
    try {
      const { error } = await supabase
        .from('section_data')
        .upsert({
          section_id: 'footer-style',
          data: footerStyle,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_id' });

      if (error) throw error;

      toast({
        title: "Styles sauvegardés",
        description: "Les styles du pied de page ont été mis à jour avec succès"
      });

      // Trigger event to update the footer in real-time
      window.dispatchEvent(new CustomEvent('footer-style-updated', { detail: footerStyle }));
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des styles",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="p-4">Chargement des styles...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style du pied de page</CardTitle>
        <CardDescription>
          Personnalisez l'apparence du pied de page de votre site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="company">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company">Entreprise</TabsTrigger>
            <TabsTrigger value="links">Liens</TabsTrigger>
            <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="legal">Légal</TabsTrigger>
            <TabsTrigger value="button">Bouton Retour</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Nom de l'entreprise</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={footerStyle.companyName.isVisible} 
                    onCheckedChange={(checked) => handleStyleChange('companyName', 'isVisible', checked)}
                  />
                  <Label>Visible</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full border-2"
                          style={{ borderColor: footerStyle.companyName.color }}
                        >
                          <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.companyName.color }}></span>
                          {footerStyle.companyName.color}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <HexColorPicker 
                          color={footerStyle.companyName.color} 
                          onChange={(color) => handleStyleChange('companyName', 'color', color)} 
                        />
                        <Input
                          value={footerStyle.companyName.color}
                          onChange={(e) => handleStyleChange('companyName', 'color', e.target.value)}
                          className="mt-2"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Taille de police</Label>
                  <Select 
                    value={footerStyle.companyName.fontSize}
                    onValueChange={(value) => handleStyleChange('companyName', 'fontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1rem">Petit (1rem)</SelectItem>
                      <SelectItem value="1.25rem">Moyen (1.25rem)</SelectItem>
                      <SelectItem value="1.5rem">Grand (1.5rem)</SelectItem>
                      <SelectItem value="1.75rem">Très grand (1.75rem)</SelectItem>
                      <SelectItem value="2rem">Énorme (2rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Graisse de police</Label>
                  <Select 
                    value={footerStyle.companyName.fontWeight}
                    onValueChange={(value) => handleStyleChange('companyName', 'fontWeight', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une graisse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="400">Normal (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi-gras (600)</SelectItem>
                      <SelectItem value="700">Gras (700)</SelectItem>
                      <SelectItem value="800">Extra-gras (800)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Titres des sections</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={footerStyle.sectionTitles.isVisible} 
                    onCheckedChange={(checked) => handleStyleChange('sectionTitles', 'isVisible', checked)}
                  />
                  <Label>Visible</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full border-2"
                          style={{ borderColor: footerStyle.sectionTitles.color }}
                        >
                          <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.sectionTitles.color }}></span>
                          {footerStyle.sectionTitles.color}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <HexColorPicker 
                          color={footerStyle.sectionTitles.color} 
                          onChange={(color) => handleStyleChange('sectionTitles', 'color', color)} 
                        />
                        <Input
                          value={footerStyle.sectionTitles.color}
                          onChange={(e) => handleStyleChange('sectionTitles', 'color', e.target.value)}
                          className="mt-2"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Taille de police</Label>
                  <Select 
                    value={footerStyle.sectionTitles.fontSize}
                    onValueChange={(value) => handleStyleChange('sectionTitles', 'fontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1rem">Petit (1rem)</SelectItem>
                      <SelectItem value="1.25rem">Moyen (1.25rem)</SelectItem>
                      <SelectItem value="1.5rem">Grand (1.5rem)</SelectItem>
                      <SelectItem value="1.75rem">Très grand (1.75rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Graisse de police</Label>
                  <Select 
                    value={footerStyle.sectionTitles.fontWeight}
                    onValueChange={(value) => handleStyleChange('sectionTitles', 'fontWeight', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une graisse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="400">Normal (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semi-gras (600)</SelectItem>
                      <SelectItem value="700">Gras (700)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="links" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Liens</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={footerStyle.links.isVisible} 
                  onCheckedChange={(checked) => handleStyleChange('links', 'isVisible', checked)}
                />
                <Label>Visibles</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur des liens</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.links.color }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.links.color }}></span>
                        {footerStyle.links.color}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.links.color} 
                        onChange={(color) => handleStyleChange('links', 'color', color)} 
                      />
                      <Input
                        value={footerStyle.links.color}
                        onChange={(e) => handleStyleChange('links', 'color', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur au survol</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.links.hoverColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.links.hoverColor }}></span>
                        {footerStyle.links.hoverColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.links.hoverColor} 
                        onChange={(color) => handleStyleChange('links', 'hoverColor', color)} 
                      />
                      <Input
                        value={footerStyle.links.hoverColor}
                        onChange={(e) => handleStyleChange('links', 'hoverColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Réseaux sociaux</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={footerStyle.social.isVisible} 
                  onCheckedChange={(checked) => handleStyleChange('social', 'isVisible', checked)}
                />
                <Label>Visibles</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur des icônes</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.social.iconColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconColor }}></span>
                        {footerStyle.social.iconColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.social.iconColor} 
                        onChange={(color) => handleStyleChange('social', 'iconColor', color)} 
                      />
                      <Input
                        value={footerStyle.social.iconColor}
                        onChange={(e) => handleStyleChange('social', 'iconColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur des icônes au survol</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.social.iconHoverColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconHoverColor }}></span>
                        {footerStyle.social.iconHoverColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.social.iconHoverColor} 
                        onChange={(color) => handleStyleChange('social', 'iconHoverColor', color)} 
                      />
                      <Input
                        value={footerStyle.social.iconHoverColor}
                        onChange={(e) => handleStyleChange('social', 'iconHoverColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur de fond des icônes</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.social.iconBgColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconBgColor }}></span>
                        {footerStyle.social.iconBgColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.social.iconBgColor} 
                        onChange={(color) => handleStyleChange('social', 'iconBgColor', color)} 
                      />
                      <Input
                        value={footerStyle.social.iconBgColor}
                        onChange={(e) => handleStyleChange('social', 'iconBgColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur de fond au survol</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.social.iconBgHoverColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.social.iconBgHoverColor }}></span>
                        {footerStyle.social.iconBgHoverColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.social.iconBgHoverColor} 
                        onChange={(color) => handleStyleChange('social', 'iconBgHoverColor', color)} 
                      />
                      <Input
                        value={footerStyle.social.iconBgHoverColor}
                        onChange={(e) => handleStyleChange('social', 'iconBgHoverColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Services</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={footerStyle.services.isVisible} 
                  onCheckedChange={(checked) => handleStyleChange('services', 'isVisible', checked)}
                />
                <Label>Visibles</Label>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Activez ou désactivez l'affichage de la section des services dans le pied de page.
            </p>
          </TabsContent>
          
          <TabsContent value="legal" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Liens légaux</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={footerStyle.legalLinks.isVisible} 
                  onCheckedChange={(checked) => handleStyleChange('legalLinks', 'isVisible', checked)}
                />
                <Label>Visibles</Label>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Activez ou désactivez l'affichage des liens légaux dans le pied de page.
            </p>
          </TabsContent>
          
          <TabsContent value="button" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Bouton "Retour en haut"</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={footerStyle.backToTopButton.isVisible} 
                  onCheckedChange={(checked) => handleStyleChange('backToTopButton', 'isVisible', checked)}
                />
                <Label>Visible</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur du texte</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.backToTopButton.textColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.textColor }}></span>
                        {footerStyle.backToTopButton.textColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.backToTopButton.textColor} 
                        onChange={(color) => handleStyleChange('backToTopButton', 'textColor', color)} 
                      />
                      <Input
                        value={footerStyle.backToTopButton.textColor}
                        onChange={(e) => handleStyleChange('backToTopButton', 'textColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur du texte au survol</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.backToTopButton.hoverTextColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.hoverTextColor }}></span>
                        {footerStyle.backToTopButton.hoverTextColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.backToTopButton.hoverTextColor} 
                        onChange={(color) => handleStyleChange('backToTopButton', 'hoverTextColor', color)} 
                      />
                      <Input
                        value={footerStyle.backToTopButton.hoverTextColor}
                        onChange={(e) => handleStyleChange('backToTopButton', 'hoverTextColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur de fond</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.backToTopButton.bgColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.bgColor }}></span>
                        {footerStyle.backToTopButton.bgColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.backToTopButton.bgColor} 
                        onChange={(color) => handleStyleChange('backToTopButton', 'bgColor', color)} 
                      />
                      <Input
                        value={footerStyle.backToTopButton.bgColor}
                        onChange={(e) => handleStyleChange('backToTopButton', 'bgColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur de fond au survol</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.backToTopButton.hoverBgColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.hoverBgColor }}></span>
                        {footerStyle.backToTopButton.hoverBgColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.backToTopButton.hoverBgColor} 
                        onChange={(color) => handleStyleChange('backToTopButton', 'hoverBgColor', color)} 
                      />
                      <Input
                        value={footerStyle.backToTopButton.hoverBgColor}
                        onChange={(e) => handleStyleChange('backToTopButton', 'hoverBgColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Couleur de bordure</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2"
                        style={{ borderColor: footerStyle.backToTopButton.borderColor }}
                      >
                        <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: footerStyle.backToTopButton.borderColor }}></span>
                        {footerStyle.backToTopButton.borderColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker 
                        color={footerStyle.backToTopButton.borderColor} 
                        onChange={(color) => handleStyleChange('backToTopButton', 'borderColor', color)} 
                      />
                      <Input
                        value={footerStyle.backToTopButton.borderColor}
                        onChange={(e) => handleStyleChange('backToTopButton', 'borderColor', e.target.value)}
                        className="mt-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveFooterStyle}>Enregistrer les styles</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FooterStyleManager;
