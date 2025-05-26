
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionsManager from '@/components/admin/permissions/PermissionsManager';
import RolesManager from '@/components/admin/roles/RolesManager';
import UsersPermissionsManager from '@/components/admin/permissions/UsersPermissionsManager';
import GroupsManager from '@/components/admin/permissions/GroupsManager';
import RoutePermissionsManager from '@/components/admin/permissions/RoutePermissionsManager';

const AdminRolesPermissions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Rôles et Permissions</h1>
      
      <Tabs defaultValue="route-permissions">
        <TabsList>
          <TabsTrigger value="route-permissions">Accès aux rubriques</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="groups">Groupes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="route-permissions" className="pt-4">
          <RoutePermissionsManager />
        </TabsContent>
        
        <TabsContent value="permissions" className="pt-4">
          <PermissionsManager />
        </TabsContent>
        
        <TabsContent value="roles" className="pt-4">
          <RolesManager />
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <UsersPermissionsManager />
        </TabsContent>
        
        <TabsContent value="groups" className="pt-4">
          <GroupsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRolesPermissions;
