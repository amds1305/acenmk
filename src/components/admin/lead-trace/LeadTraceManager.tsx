
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadList from './components/LeadList';
import LeadStats from './components/LeadStats';
import TagsManager from './components/TagsManager';
import AutomationsManager from './components/AutomationsManager';
import SettingsManager from './components/SettingsManager';

const LeadTraceManager = () => {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="leads" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="automations">Automatisations</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="space-y-4 mt-4">
          <LeadList />
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-4 mt-4">
          <LeadStats />
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-4 mt-4">
          <TagsManager />
        </TabsContent>
        
        <TabsContent value="automations" className="space-y-4 mt-4">
          <AutomationsManager />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <SettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadTraceManager;
