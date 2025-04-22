
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { Plus, RefreshCw, Download } from 'lucide-react';
import { UserTable } from './UserTable';
import { UserSearch } from './UserSearch';
import { UserFilter } from './UserFilter';
import { UsersStats } from './UsersStats';
import UserProfileDialog from './UserProfileDialog';
import SendMessageDialog from './SendMessageDialog';
import { supabase } from '@/lib/supabase';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Charger les utilisateurs depuis Supabase
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Récupérer les profils des utilisateurs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Récupérer les rôles des utilisateurs
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
        
      if (rolesError) throw rolesError;
      
      // Combiner les informations pour créer la liste des utilisateurs
      const mappedUsers = profiles.map(profile => {
        const userRole = userRoles.find(role => role.user_id === profile.id);
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: (userRole?.role || 'user') as UserRole,
          company: profile.company || undefined,
          phone: profile.phone || undefined,
          avatar: profile.avatar_url || undefined,
          createdAt: profile.created_at,
        } as User;
      });
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      // Supprimer l'utilisateur dans Supabase Auth
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
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
      // Mettre à jour le rôle dans la base de données
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);
        
      if (error) throw error;
      
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
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: updatedUser.role })
          .eq('user_id', selectedUser.id);
          
        if (roleError) throw roleError;
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
    // Convertir les utilisateurs en CSV ou autre format
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>
                Gérez les comptes utilisateurs et leurs permissions.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshUsers} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
                {isLoading ? 'Chargement...' : 'Actualiser'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportUsers} disabled={isLoading}>
                <Download className="h-4 w-4 mr-1" /> Exporter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <UserSearch value={searchTerm} onChange={setSearchTerm} />
            <UserFilter selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
          </div>
          
          <UserTable 
            users={filteredUsers}
            onViewProfile={handleViewProfile}
            onEditProfile={handleEditProfile}
            onSendMessage={handleSendMessage}
            onChangeRole={handleChangeRole}
            onDeleteUser={handleDeleteUser}
          />
          
          <UsersStats 
            filteredCount={filteredUsers.length} 
            totalCount={users.length} 
          />
        </CardContent>
      </Card>

      <UserProfileDialog
        user={selectedUser}
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedUser(null);
          setIsEditingProfile(false);
        }}
        onSave={handleUpdateProfile}
        isEditing={isEditingProfile}
      />

      <SendMessageDialog
        user={selectedUser}
        isOpen={isMessageDialogOpen}
        onClose={() => {
          setIsMessageDialogOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
};

export default AdminUsers;
