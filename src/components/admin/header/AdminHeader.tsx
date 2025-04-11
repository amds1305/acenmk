
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NavLinkManager from './NavLinkManager';
import SocialLinkManager from './SocialLinkManager';

const AdminHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Administration de l'en-tête</h1>
      </div>

      <Tabs defaultValue="navigation">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navigation">Liens de navigation</TabsTrigger>
          <TabsTrigger value="social">Liens sociaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigation" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Liens de navigation</CardTitle>
              <CardDescription>
                Gérer les liens affichés dans le menu de navigation
              </CardDescription>
            </CardHeader>
            <NavLinkManager />
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Liens sociaux</CardTitle>
              <CardDescription>
                Gérer les liens vers les réseaux sociaux dans l'en-tête
              </CardDescription>
            </CardHeader>
            <SocialLinkManager />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHeader;
