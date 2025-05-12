
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LeadList from '@/components/admin/lead-trace/components/LeadList';
import LeadStats from '@/components/admin/lead-trace/components/LeadStats';

const LeadTraceManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Gestion des leads</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default LeadTraceManager;
