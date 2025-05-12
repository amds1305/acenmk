
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LeadList from './components/LeadList';
import LeadStats from './components/LeadStats';
import TagsManager from './components/TagsManager';
import SettingsManager from './components/SettingsManager';
import AutomationsManager from './components/AutomationsManager';

const LeadTraceManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Gestion des leads</h2>
        <Button>Nouveau lead</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="automations">Automatisations</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Liste des leads</CardTitle>
              <CardDescription>
                Gérez vos contacts et leurs statuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>
                Visualisez vos données de conversion et performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadStats />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tags" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Gestion des tags</CardTitle>
              <CardDescription>
                Créez et modifiez des tags pour catégoriser vos leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TagsManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automations" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Automatisations</CardTitle>
              <CardDescription>
                Configurez des règles d'automatisation pour vos leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationsManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>
                Configurez les options du module LeadTrace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadTraceManager;
