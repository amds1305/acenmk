
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Define common permission sets
const commonPermissions = [
  'view_profile', 'edit_profile', 
  'view_projects', 'create_projects', 'edit_projects',
  'view_messages', 'send_messages'
];

const adminPermissions = [
  ...commonPermissions,
  'manage_users', 'manage_roles', 'manage_site', 'delete_users',
  'view_analytics', 'manage_templates', 'manage_billing'
];

export const useUserPermissions = (users: User[]) => {
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Initialize the permissions map based on user roles
  useEffect(() => {
    if (users && users.length > 0) {
      const permMap: Record<string, string[]> = {};
      
      users.forEach(user => {
        if (user.role === 'super_admin' || user.role === 'business_admin' || user.role === 'admin') {
          permMap[user.id] = adminPermissions;
        } else if (user.role === 'manager') {
          permMap[user.id] = [...commonPermissions, 'view_analytics', 'manage_projects'];
        } else if (user.role === 'contributor') {
          permMap[user.id] = [...commonPermissions, 'create_content', 'edit_content'];
        } else {
          permMap[user.id] = ['view_profile', 'edit_profile', 'view_projects', 'view_messages', 'send_messages'];
        }
      });
      
      setPermissionsMap(permMap);
    }
  }, [users]);

  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePermission = (permission: string, hasPermission: boolean) => {
    if (!selectedUser) return;
    
    setPermissionsMap(prev => {
      const userPermissions = [...(prev[selectedUser.id] || [])];
      
      if (hasPermission) {
        if (!userPermissions.includes(permission)) {
          userPermissions.push(permission);
        }
      } else {
        const index = userPermissions.indexOf(permission);
        if (index !== -1) {
          userPermissions.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        [selectedUser.id]: userPermissions
      };
    });
  };

  const handleSavePermissions = async () => {
    // In a real implementation, you would save these permissions to the database
    toast({
      title: "Permissions mises à jour",
      description: "Les permissions de l'utilisateur ont été mises à jour avec succès."
    });
    setIsEditDialogOpen(false);
  };

  return {
    permissionsMap,
    selectedUser,
    isEditDialogOpen,
    handleEditPermissions,
    handleUpdatePermission,
    handleSavePermissions,
    setSelectedUser,
    setIsEditDialogOpen,
  };
};
