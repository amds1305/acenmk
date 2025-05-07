
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateSelector from '@/components/admin/home/TemplateSelector';
import KinkHeroEditor from '@/components/admin/kink/KinkHeroEditor';
import KinkServicesEditor from '@/components/admin/kink/KinkServicesEditor';
import KinkAboutEditor from '@/components/admin/kink/KinkAboutEditor';
import KinkTeamEditor from '@/components/admin/kink/KinkTeamEditor';
import KinkTestimonialsEditor from '@/components/admin/kink/KinkTestimonialsEditor';
import KinkTrustedClientsEditor from '@/components/admin/kink/KinkTrustedClientsEditor';
import KinkFaqEditor from '@/components/admin/kink/KinkFaqEditor';
import KinkContactEditor from '@/components/admin/kink/KinkContactEditor';
import KinkPricingEditor from '@/components/admin/kink/KinkPricingEditor';
import { useSections } from '@/contexts/sections/SectionsContext';

const AdminTemplateChooser = () => {
  const { config, updateTemplateType } = useSections();
  const isKinkTemplate = config?.templateConfig?.activeTemplate === 'nmk_kink';

  // Si aucun template n'est sélectionné, définir Kink comme template par défaut
  React.useEffect(() => {
    if (config?.templateConfig && !config.templateConfig.activeTemplate) {
      updateTemplateType('nmk_kink');
    }
  }, [config?.templateConfig, updateTemplateType]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion du template</h1>
      
      <div className="mb-6">
        <p className="text-muted-foreground mb-4">
          Sélectionnez le template à utiliser pour votre site web, puis configurez ses sections.
          <br />
          <span className="text-sm font-medium text-primary">Le template Kink est défini comme template par défaut.</span>
        </p>
        <TemplateSelector />
      </div>

      {isKinkTemplate && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Configuration du template Kink</h2>
          
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="pricing">Tarifs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hero" className="p-4 border rounded-lg">
              <KinkHeroEditor />
            </TabsContent>
            
            <TabsContent value="services" className="p-4 border rounded-lg">
              <KinkServicesEditor />
            </TabsContent>
            
            <TabsContent value="about" className="p-4 border rounded-lg">
              <KinkAboutEditor />
            </TabsContent>
            
            <TabsContent value="team" className="p-4 border rounded-lg">
              <KinkTeamEditor />
            </TabsContent>
            
            <TabsContent value="clients" className="p-4 border rounded-lg">
              <KinkTrustedClientsEditor />
            </TabsContent>
            
            <TabsContent value="testimonials" className="p-4 border rounded-lg">
              <KinkTestimonialsEditor />
            </TabsContent>
            
            <TabsContent value="faq" className="p-4 border rounded-lg">
              <KinkFaqEditor />
            </TabsContent>
            
            <TabsContent value="contact" className="p-4 border rounded-lg">
              <KinkContactEditor />
            </TabsContent>
            
            <TabsContent value="pricing" className="p-4 border rounded-lg">
              <KinkPricingEditor />
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {!isKinkTemplate && (
        <div className="p-8 border rounded-lg">
          <p className="text-center text-muted-foreground">
            Sélectionnez le template "Kink" pour configurer ses sections.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTemplateChooser;
