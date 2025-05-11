
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFooterStyle } from './useFooterStyle';
import { 
  CompanyNameTab, 
  LinksTab, 
  SocialTab, 
  VisibilityTabs, 
  ButtonTab,
  SectionTitlesTab
} from './components';

const FooterStyleManager = () => {
  const { footerStyle, footerData, loading, handleStyleChange, handleDataChange, saveFooterStyle } = useFooterStyle();

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
        <Tabs defaultValue="titles">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="titles">Titres</TabsTrigger>
            <TabsTrigger value="company">Style Entreprise</TabsTrigger>
            <TabsTrigger value="links">Liens</TabsTrigger>
            <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="legal">Légal</TabsTrigger>
            <TabsTrigger value="button">Bouton Retour</TabsTrigger>
          </TabsList>

          <TabsContent value="titles" className="space-y-4 mt-4">
            <SectionTitlesTab 
              footerStyle={footerStyle}
              footerData={footerData}
              handleStyleChange={handleStyleChange}
              handleDataChange={handleDataChange}
            />
          </TabsContent>
          
          <TabsContent value="company" className="space-y-4 mt-4">
            <CompanyNameTab 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
            />
          </TabsContent>
          
          <TabsContent value="links">
            <LinksTab 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
            />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialTab 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
            />
          </TabsContent>
          
          <TabsContent value="services">
            <VisibilityTabs 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
              type="services"
            />
          </TabsContent>
          
          <TabsContent value="legal">
            <VisibilityTabs 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
              type="legal"
            />
          </TabsContent>
          
          <TabsContent value="button">
            <ButtonTab 
              footerStyle={footerStyle}
              handleStyleChange={handleStyleChange}
            />
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
