
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminApplications from '@/components/admin/AdminApplications';
import CVLibrary from '@/components/acejob/CVLibrary';
import CVGenerator from '@/components/acejob/CVGenerator';

const AdminAceJobPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">AceJob - Gestion des candidatures</h1>
      <p className="text-muted-foreground">
        Gérez les candidatures et accédez aux outils liés au recrutement.
      </p>
      
      <Tabs defaultValue="applications" className="mt-6">
        <TabsList>
          <TabsTrigger value="applications">Candidatures</TabsTrigger>
          <TabsTrigger value="cvlibrary">CVthèque</TabsTrigger>
          <TabsTrigger value="cvgenerator">Générateur de CV</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="mt-4">
          <AdminApplications />
        </TabsContent>
        <TabsContent value="cvlibrary" className="mt-4">
          <CVLibrary />
        </TabsContent>
        <TabsContent value="cvgenerator" className="mt-4">
          <CVGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAceJobPage;
