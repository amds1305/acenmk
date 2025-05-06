
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import SectionsManager from '@/components/admin/home/SectionsManager';
import KinkHeroEditor from '@/components/admin/kink/KinkHeroEditor';
import KinkServicesEditor from '@/components/admin/kink/KinkServicesEditor';
import KinkAboutEditor from '@/components/admin/kink/KinkAboutEditor';
import KinkPricingEditor from '@/components/admin/kink/KinkPricingEditor';
import KinkTeamEditor from '@/components/admin/kink/KinkTeamEditor';
import KinkTestimonialsEditor from '@/components/admin/kink/KinkTestimonialsEditor';
import KinkFaqEditor from '@/components/admin/kink/KinkFaqEditor';
import KinkContactEditor from '@/components/admin/kink/KinkContactEditor';

const AdminKinkTemplate = () => {
  const { saveChanges } = useSections();
  const { toast } = useToast();
  
  const handleSave = async () => {
    await saveChanges();
    toast({
      title: "Modifications enregistrées",
      description: "Les paramètres du template Kink ont été mis à jour."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Template Kink</h1>
          <p className="text-muted-foreground">Personnalisez les sections et le contenu du template Kink</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des sections</CardTitle>
          <CardDescription>
            Organisez l'ordre et la visibilité des sections du template Kink
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SectionsManager />
        </CardContent>
      </Card>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero">
          <KinkHeroEditor />
        </TabsContent>
        
        <TabsContent value="services">
          <KinkServicesEditor />
        </TabsContent>
        
        <TabsContent value="about">
          <KinkAboutEditor />
        </TabsContent>
        
        <TabsContent value="pricing">
          <KinkPricingEditor />
        </TabsContent>
        
        <TabsContent value="team">
          <KinkTeamEditor />
        </TabsContent>
        
        <TabsContent value="testimonials">
          <KinkTestimonialsEditor />
        </TabsContent>
        
        <TabsContent value="faq">
          <KinkFaqEditor />
        </TabsContent>
        
        <TabsContent value="contact">
          <KinkContactEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminKinkTemplate;
