import React, { useState } from 'react';
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
import { MOCK_ADMIN_USER, MOCK_USER } from '@/data/mockUsers';
import { UserTable } from './UserTable';
import { UserSearch } from './UserSearch';
import { UserFilter } from './UserFilter';
import { UsersStats } from './UsersStats';
import UserProfileDialog from './UserProfileDialog';
import SendMessageDialog from './SendMessageDialog';

const mockUsers = [
  MOCK_ADMIN_USER,
  MOCK_USER,
  {
    id: 'user3',
    email: 'premium@example.com',
    name: 'Client Premium',
    role: 'client_premium',
    company: 'Premium Corp',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://i.pravatar.cc/150?u=premium@example.com',
    createdAt: new Date(Date.now() - 7884000000).toISOString(), // 3 months ago
  } as User,
  {
    id: 'user4',
    email: 'new@example.com',
    name: 'Nouveau Client',
    role: 'user',
    company: 'New Company',
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  } as User,
  {
    id: 'user5',
    email: 'super@example.com',
    name: 'Super Admin',
    role: 'super_admin',
    company: 'Admin Solutions',
    phone: '+33 7 98 76 54 32',
    avatar: 'https://i.pravatar.cc/150?u=super@example.com',
    createdAt: new Date(Date.now() - 63072000000).toISOString(), // 2 years ago
  } as User,
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès."
    });
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast({
      title: "Rôle mis à jour",
      description: "Le rôle de l'utilisateur a été modifié avec succès."
    });
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
    setUsers(users.map(user => 
      user.id === selectedUser?.id 
        ? { ...user, ...updatedUser }
        : user
    ));
  };

  const handleSendMessage = (user: User) => {
    setSelectedUser(user);
    setIsMessageDialogOpen(true);
  };

  const handleExportUsers = () => {
    toast({
      title: "Export lancé",
      description: "La liste des utilisateurs est en cours d'export."
    });
  };

  const handleRefreshUsers = () => {
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
              <Button variant="outline" size="sm" onClick={handleRefreshUsers}>
                <RefreshCw className="h-4 w-4 mr-1" /> Actualiser
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportUsers}>
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
