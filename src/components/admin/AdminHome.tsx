
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SaveIcon, EyeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminHome = () => {
  const { toast } = useToast();
  
  const [heroData, setHeroData] = React.useState({
    title: 'Transformez Votre Vision en Réalité Numérique',
    subtitle: 'Solutions innovantes de développement web et mobile pour propulser votre entreprise vers l\'avenir',
    ctaText: 'Discuter de votre projet',
    ctaSecondaryText: 'Découvrir nos services',
    backgroundImage: '/images/hero-bg.jpg'
  });

  const handleSave = () => {
    // Ici, nous enverrions normalement les données à une API
    console.log('Hero data', heroData);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section Hero a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Page d'accueil</h1>
          <p className="text-muted-foreground">
            Personnalisez les différentes sections de votre page d'accueil.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir le site
          </Button>
          <Button onClick={handleSave}>
            <SaveIcon className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 sm:grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Titre</Label>
                <Input 
                  id="hero-title" 
                  value={heroData.title} 
                  onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Sous-titre</Label>
                <Textarea 
                  id="hero-subtitle" 
                  value={heroData.subtitle} 
                  onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-cta">Texte du bouton principal</Label>
                  <Input 
                    id="hero-cta" 
                    value={heroData.ctaText} 
                    onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero-cta-secondary">Texte du bouton secondaire</Label>
                  <Input 
                    id="hero-cta-secondary" 
                    value={heroData.ctaSecondaryText} 
                    onChange={(e) => setHeroData({...heroData, ctaSecondaryText: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-background">Image de fond</Label>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input 
                      id="hero-background" 
                      value={heroData.backgroundImage} 
                      onChange={(e) => setHeroData({...heroData, backgroundImage: e.target.value})}
                    />
                  </div>
                  <Button variant="outline">Parcourir</Button>
                </div>
                {heroData.backgroundImage && (
                  <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-50">
                    <div className="aspect-video h-full flex items-center justify-center text-gray-400">
                      [Aperçu de l'image]
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Section Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous pouvez gérer la section Services dans l'onglet dédié dans le menu latéral.
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/admin/services'}>
                  Gérer les services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Section À propos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous pouvez gérer la section À propos dans l'onglet dédié dans le menu latéral.
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/admin/about'}>
                  Gérer la section À propos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Section Équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous pouvez gérer les membres de l'équipe dans l'onglet dédié dans le menu latéral.
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/admin/team'}>
                  Gérer l'équipe
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Section Témoignages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous pouvez gérer les témoignages clients dans l'onglet dédié dans le menu latéral.
              </p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/admin/testimonials'}>
                  Gérer les témoignages
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHome;
