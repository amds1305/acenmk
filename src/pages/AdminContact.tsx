
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactRequestsTable from '@/components/admin/contact/ContactRequestsTable';
import EmailSettingsForm from '@/components/admin/contact/EmailSettingsForm';

const AdminContactPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gestion des contacts</h1>
      <p className="text-muted-foreground">
        Consultez les demandes reçues via le formulaire de contact et configurez les notifications par email.
      </p>
      
      <Tabs defaultValue="requests" className="mt-6">
        <TabsList>
          <TabsTrigger value="requests">Demandes</TabsTrigger>
          <TabsTrigger value="settings">Paramètres d'email</TabsTrigger>
        </TabsList>
        <TabsContent value="requests" className="mt-4">
          <ContactRequestsTable />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <EmailSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContactPage;
