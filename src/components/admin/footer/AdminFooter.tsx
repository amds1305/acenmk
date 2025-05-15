
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FooterStyleManager } from './style';
import { LegalContentManager } from './legal';

const AdminFooter = () => {
  const [activeTab, setActiveTab] = useState("styles");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Administration du pied de page</h1>
      </div>

      <Tabs defaultValue="styles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="styles">Styles du footer</TabsTrigger>
          <TabsTrigger value="legal">Contenus légaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="styles" className="space-y-4 mt-4">
          <FooterStyleManager />
        </TabsContent>
        
        <TabsContent value="legal" className="space-y-4 mt-4">
          <LegalContentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFooter;
