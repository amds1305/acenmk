
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { saveAs } from 'file-saver';

export type UserRole = 'super_admin' | 'admin' | 'user' | 'client_premium';

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  name?: string;
  avatar_url?: string;
  company?: string;
  phone?: string;
}

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // We need to join two tables to get both roles and profiles
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles!user_id(
            email,
            name,
            created_at,
            avatar_url,
            company,
            phone
          )
        `)
        .order('created_at', { referencedTable: 'profiles', ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des utilisateurs",
          variant: "destructive"
        });
      } else if (data) {
        const formattedUsers = data.map(item => ({
          id: item.user_id,
          email: item.profiles?.email || 'unknown@example.com',
          role: item.role as UserRole,
          created_at: item.profiles?.created_at || new Date().toISOString(),
          name: item.profiles?.name,
          avatar_url: item.profiles?.avatar_url,
          company: item.profiles?.company,
          phone: item.profiles?.phone
        }));
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Unexpected error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors du chargement des utilisateurs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [toast]);

  useEffect(() => {
    let result = [...users];
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.email.toLowerCase().includes(lowercasedSearch) ||
        (user.name && user.name.toLowerCase().includes(lowercasedSearch)) ||
        (user.company && user.company.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    // Filter by role
    if (selectedRole !== 'all') {
      result = result.filter(user => user.role === selectedRole);
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, selectedRole]);

  const handleViewProfile = (user: UserData) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
    setIsEditingProfile(false);
  };

  const handleEditProfile = (user: UserData) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
    setIsEditingProfile(true);
  };

  const handleSendMessage = (user: UserData) => {
    setSelectedUser(user);
    setIsMessageDialogOpen(true);
  };

  const handleUpdateProfile = async (updatedData: Partial<UserData>) => {
    if (!selectedUser) return;
    
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: updatedData.name,
          company: updatedData.company,
          phone: updatedData.phone,
          // Do not update email or id
        })
        .eq('id', selectedUser.id);

      if (profileError) {
        throw profileError;
      }
      
      // Update role if it has changed
      if (updatedData.role && updatedData.role !== selectedUser.role) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: updatedData.role as UserRole })
          .eq('user_id', selectedUser.id);
          
        if (roleError) {
          throw roleError;
        }
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès"
      });
      
      // Refresh user list
      fetchUsers();
      
      // Close dialog
      setIsProfileOpen(false);
      setSelectedUser(null);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil de l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;
      
      toast({
        title: "Rôle mis à jour",
        description: "Le rôle de l'utilisateur a été mis à jour avec succès"
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle de l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // This will cascade delete from profiles and user_roles due to foreign key constraints
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;
      
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès"
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const handleExportUsers = () => {
    try {
      const exportData = filteredUsers.map(user => ({
        ID: user.id,
        Email: user.email,
        Name: user.name || '',
        Role: user.role,
        Company: user.company || '',
        Phone: user.phone || '',
        Created: new Date(user.created_at).toLocaleDateString()
      }));
      
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      saveAs(blob, `users-export-${new Date().toISOString().slice(0, 10)}.json`);
      
      toast({
        title: "Export réussi",
        description: "La liste des utilisateurs a été exportée avec succès"
      });
    } catch (error) {
      console.error('Error exporting users:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'exporter la liste des utilisateurs",
        variant: "destructive"
      });
    }
  };

  const handleRefreshUsers = () => {
    fetchUsers();
    toast({
      title: "Liste actualisée",
      description: "La liste des utilisateurs a été actualisée"
    });
  };

  const handleAddUser = () => {
    setIsAddUserDialogOpen(true);
  };

  return {
    users,
    filteredUsers,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    selectedUser,
    setSelectedUser,
    isProfileOpen,
    setIsProfileOpen,
    isEditingProfile,
    setIsEditingProfile,
    isMessageDialogOpen,
    setIsMessageDialogOpen,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    handleViewProfile,
    handleEditProfile,
    handleUpdateProfile,
    handleSendMessage,
    handleDeleteUser,
    handleChangeRole,
    handleExportUsers,
    handleRefreshUsers,
    handleAddUser,
    fetchUsers
  };
};
