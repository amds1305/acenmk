
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useUsers } from '@/hooks/useUsers';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import UserPermissionsList from './UserPermissionsList';
import UserPermissionDialog from './UserPermissionDialog';
import UserPermissionsError from './UserPermissionsError';

const UsersPermissionsManager: React.FC = () => {
  const { users, isLoading, error } = useUsers();
  const {
    permissionsMap,
    selectedUser,
    isEditDialogOpen,
    handleEditPermissions,
    handleUpdatePermission,
    handleSavePermissions,
    setIsEditDialogOpen,
    setSelectedUser
  } = useUserPermissions(users);
  
  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };
  
  if (error) {
    return <UserPermissionsError onRetry={() => window.location.reload()} />;
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Permissions</CardTitle>
        <CardDescription>
          Gérez les permissions individuelles des utilisateurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserPermissionsList 
          users={users}
          permissionsMap={permissionsMap}
          onEditPermissions={handleEditPermissions}
          isLoading={isLoading}
        />
        
        <UserPermissionDialog
          user={selectedUser}
          isOpen={isEditDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSavePermissions}
          permissionsMap={permissionsMap}
          onUpdatePermission={handleUpdatePermission}
        />
      </CardContent>
    </Card>
  );
};

export default UsersPermissionsManager;
