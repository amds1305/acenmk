
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { UserTable } from './UserTable';
import { UsersStats } from './UsersStats';
import { UsersToolbar } from './UsersToolbar';
import { User, UserRole } from '@/types/auth';

interface UsersContentProps {
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string | null;
  onRoleSelect: (value: string | null) => void;
  onViewProfile: (user: User) => void;
  onEditProfile: (user: User) => void;
  onSendMessage: (user: User) => void;
  onChangeRole: (userId: string, newRole: UserRole) => void;
  onDeleteUser: (userId: string) => void;
}

export const UsersContent: React.FC<UsersContentProps> = ({
  users,
  filteredUsers,
  isLoading,
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleSelect,
  onViewProfile,
  onEditProfile,
  onSendMessage,
  onChangeRole,
  onDeleteUser
}) => {
  return (
    <CardContent>
      <UsersToolbar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
        selectedRole={selectedRole}
        onRoleSelect={onRoleSelect}
      />
      
      <UserTable 
        users={filteredUsers}
        onViewProfile={onViewProfile}
        onEditProfile={onEditProfile}
        onSendMessage={onSendMessage}
        onChangeRole={onChangeRole}
        onDeleteUser={onDeleteUser}
        isLoading={isLoading}
      />
      
      <UsersStats 
        filteredCount={filteredUsers.length} 
        totalCount={users.length} 
      />
    </CardContent>
  );
};
