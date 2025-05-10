
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
import AddUserDialog from './AddUserDialog';
import { supabase } from '@/lib/supabase';
import { MOCK_ADMIN_USER, MOCK_USER } from '@/data/mockUsers';

// Hook pour obtenir les utilisateurs depuis Supabase
const useSupabaseUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Utilisateurs fictifs pour l'exemple
  const mockUsers = [
    MOCK_ADMIN_USER,
    MOCK_USER,
    {
      id: 'user3',
      email: 'premium@example.com',
      name: 'Client Premium',
      role: 'client_premium' as UserRole,
      company: 'Premium Corp',
      phone: '+33 6 12 34 56 78',
      avatar: 'https://i.pravatar.cc/150?u=premium@example.com',
      createdAt: new Date(Date.now() - 7884000000).toISOString(), // 3 months ago
    },
    {
      id: 'user4',
      email: 'new@example.com',
      name: 'Nouveau Client',
      role: 'user' as UserRole,
      company: 'New Company',
      createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    },
    {
      id: 'user5',
      email: 'super@example.com',
      name: 'Super Admin',
      role: 'super_admin' as UserRole,
      company: 'Admin Solutions',
      phone: '+33 7 98 76 54 32',
      avatar: 'https://i.pravatar.cc/150?u=super@example.com',
      createdAt: new Date(Date.now() - 63072000000).toISOString(), // 2 years ago
    }
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    
    try {
      // Récupérer les profils des utilisateurs depuis Supabase
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Récupérer les rôles des utilisateurs
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (rolesError) throw rolesError;
      
      // Préparer un map des derniers rôles par utilisateur
      const roleMap: Record<string, UserRole> = {};
      userRoles.forEach(role => {
        if (!roleMap[role.user_id]) {
          roleMap[role.user_id] = role.role as UserRole;
        }
      });
      
      // Créer la liste des utilisateurs avec leurs rôles
      const mappedUsers = profiles.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name || profile.email?.split('@')[0] || 'Sans nom',
        role: roleMap[profile.id] || 'user' as UserRole,
        avatar: profile.avatar_url,
        company: profile.company,
        phone: profile.phone,
        biography: profile.biography,
        createdAt: profile.created_at
      }));
      
      // Si aucun utilisateur n'est récupéré ou en cas d'erreur, utiliser les utilisateurs fictifs
      if (mappedUsers && mappedUsers.length > 0) {
        setUsers(mappedUsers);
        console.log("Utilisateurs chargés depuis Supabase:", mappedUsers);
      } else {
        setUsers(mockUsers);
        console.log("Aucun utilisateur trouvé dans Supabase, utilisation des exemples fictifs");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      // Utiliser les utilisateurs fictifs en cas d'erreur
      setUsers(mockUsers);
      toast({
        variant: "warning",
        title: "Mode démo",
        description: "Impossible de charger les utilisateurs réels. Affichage d'exemples fictifs."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, fetchUsers, setUsers };
};

const AdminUsers = () => {
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
              <Button size="sm" onClick={handleAddUser}>
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
            isLoading={isLoading}
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

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
        onUserAdded={() => {
          fetchUsers();
        }}
      />
    </>
  );
};

export default AdminUsers;
