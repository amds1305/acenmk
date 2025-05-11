
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LogoManager from './LogoManager';
import NavLinkManager from './NavLinkManager';
import SocialLinkManager from './SocialLinkManager';
import SearchBarManager from './SearchBarManager';
import ActionButtonsManager from './ActionButtonsManager';
import HeaderStyleManager from './style/HeaderStyleManager';
import UserMenuManager from './UserMenuManager';
import { HeaderStyleProvider } from '@/contexts/HeaderStyleContext';

const AdminHeader = () => {
  return (
    <HeaderStyleProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Administration de l'en-tête</h1>
        </div>

        <Tabs defaultValue="logo">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="logo">Logo</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="buttons">Boutons d'action</TabsTrigger>
            <TabsTrigger value="usermenu">Espace membre</TabsTrigger>
            <TabsTrigger value="style">Style visuel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logo" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>
                  Gérer le logo du site et ses paramètres d'affichage
                </CardDescription>
              </CardHeader>
              <LogoManager />
            </Card>
          </TabsContent>
          
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
          
          <TabsContent value="search" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Barre de recherche</CardTitle>
                <CardDescription>
                  Configurer les options d'affichage de la barre de recherche
                </CardDescription>
              </CardHeader>
              <SearchBarManager />
            </Card>
          </TabsContent>
          
          <TabsContent value="buttons" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Boutons d'action</CardTitle>
                <CardDescription>
                  Gérer les boutons d'appel à l'action dans l'en-tête
                </CardDescription>
              </CardHeader>
              <ActionButtonsManager />
            </Card>
          </TabsContent>
          
          <TabsContent value="usermenu" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Espace membre</CardTitle>
                <CardDescription>
                  Configurer les options d'affichage de l'espace membre
                </CardDescription>
              </CardHeader>
              <UserMenuManager />
            </Card>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Style visuel</CardTitle>
                <CardDescription>
                  Personnaliser l'aspect visuel de l'en-tête
                </CardDescription>
              </CardHeader>
              <HeaderStyleManager />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HeaderStyleProvider>
  );
};

export default AdminHeader;
