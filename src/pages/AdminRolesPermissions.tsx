
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionsManager from '@/components/admin/permissions/PermissionsManager';

const AdminRolesPermissions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Rôles et Permissions</h1>
      
      <Tabs defaultValue="permissions">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="groups">Groupes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="pt-4">
          <PermissionsManager />
        </TabsContent>
        
        <TabsContent value="roles" className="pt-4">
          <p className="text-muted-foreground">
            La gestion avancée des rôles sera disponible dans une prochaine version.
          </p>
        </TabsContent>
        
        <TabsContent value="groups" className="pt-4">
          <p className="text-muted-foreground">
            La gestion des groupes d'utilisateurs sera disponible dans une prochaine version.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRolesPermissions;
