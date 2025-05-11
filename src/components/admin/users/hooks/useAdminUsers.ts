
import { useState } from 'react';
import { User, UserRole } from '@/types/auth';
import { useSupabaseUsers } from './useSupabaseUsers';
import { useToast } from '@/hooks/use-toast';

export const useAdminUsers = () => {
  const { users, isLoading, fetchUsers, setUsers } = useSupabaseUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      // Supprimer l'utilisateur dans Supabase
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (deleteError) throw deleteError;
      
      // Mettre à jour l'état local
      setUsers(users.filter(user => user.id !== userId));
      
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès."
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur."
      });
    }
  };

  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    try {
      // Vérifier si l'utilisateur a déjà un rôle
      const { data: existingRoles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (existingRoles && existingRoles.length > 0) {
        // Mettre à jour le rôle existant
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
          
        if (error) throw error;
      } else {
        // Créer un nouveau rôle
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: newRole }]);
          
        if (error) throw error;
      }
      
      // Mettre à jour l'état local
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Rôle mis à jour",
        description: "Le rôle de l'utilisateur a été modifié avec succès."
      });
    } catch (error) {
      console.error("Erreur lors de la modification du rôle:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le rôle de l'utilisateur."
      });
    }
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditingProfile(false);
    setIsProfileOpen(true);
  };

  const handleEditProfile = (user: User) => {
    setSelectedUser(user);
    setIsEditingProfile(true);
    setIsProfileOpen(true);
  };

  const handleUpdateProfile = async (updatedUser: Partial<User>) => {
    try {
      if (!selectedUser) return;
      
      // Mettre à jour le profil dans Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          email: updatedUser.email,
          company: updatedUser.company,
          phone: updatedUser.phone,
          biography: updatedUser.biography,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedUser.id);
        
      if (error) throw error;
      
      // Si le rôle est modifié, mettre à jour dans la table user_roles
      if (updatedUser.role && updatedUser.role !== selectedUser.role) {
        const { data: existingRoles } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', selectedUser.id);

        if (existingRoles && existingRoles.length > 0) {
          // Mettre à jour le rôle existant
          const { error: roleError } = await supabase
            .from('user_roles')
            .update({ role: updatedUser.role })
            .eq('user_id', selectedUser.id);
            
          if (roleError) throw roleError;
        } else {
          // Créer un nouveau rôle
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([{ user_id: selectedUser.id, role: updatedUser.role }]);
            
          if (roleError) throw roleError;
        }
      }
      
      // Mettre à jour l'état local
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...updatedUser }
          : user
      ));
      
      toast({
        title: "Profil mis à jour",
        description: "Le profil a été modifié avec succès."
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le profil."
      });
    }
  };

  const handleSendMessage = (user: User) => {
    setSelectedUser(user);
    setIsMessageDialogOpen(true);
  };

  const handleExportUsers = () => {
    // Convertir les utilisateurs en CSV
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Nom,Email,Rôle,Entreprise,Date d'inscription\n" +
      users.map(user => 
        `${user.id},${user.name},${user.email},${user.role},${user.company || ''},${new Date(user.createdAt).toLocaleDateString('fr-FR')}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "utilisateurs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export terminé",
      description: "La liste des utilisateurs a été exportée."
    });
  };

  const handleRefreshUsers = () => {
    fetchUsers();
    toast({
      title: "Liste actualisée",
      description: "La liste des utilisateurs a été actualisée."
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
