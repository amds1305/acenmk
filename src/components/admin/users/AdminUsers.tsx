
import React from 'react';
import { Card } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { useAdminUsers } from './hooks/useAdminUsers';
import { UsersHeader } from './UsersHeader';
import { UsersContent } from './UsersContent';
import { UsersDialogs } from './UsersDialogs';

const AdminUsers = () => {
  const {
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
  } = useAdminUsers();

  const handleProfileDialogClose = () => {
    setIsProfileOpen(false);
    setSelectedUser(null);
    setIsEditingProfile(false);
  };

  const handleMessageDialogClose = () => {
    setIsMessageDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddUserDialogClose = () => {
    setIsAddUserDialogOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
      
      <Card>
        <UsersHeader 
          onRefresh={handleRefreshUsers}
          onExport={handleExportUsers}
          onAddUser={handleAddUser}
          isLoading={isLoading}
        />

        <UsersContent 
          users={users}
          filteredUsers={filteredUsers}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
          onViewProfile={handleViewProfile}
          onEditProfile={handleEditProfile}
          onSendMessage={handleSendMessage}
          onChangeRole={handleChangeRole}
          onDeleteUser={handleDeleteUser}
        />
      </Card>

      <UsersDialogs
        selectedUser={selectedUser}
        isProfileOpen={isProfileOpen}
        isEditingProfile={isEditingProfile}
        isMessageDialogOpen={isMessageDialogOpen}
        isAddUserDialogOpen={isAddUserDialogOpen}
        onProfileDialogClose={handleProfileDialogClose}
        onMessageDialogClose={handleMessageDialogClose}
        onAddUserDialogClose={handleAddUserDialogClose}
        onProfileUpdate={handleUpdateProfile}
        onUserAdded={fetchUsers}
      />
    </>
  );
};

export default AdminUsers;
