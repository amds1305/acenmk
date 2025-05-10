
import React from 'react';
import { UserSearch } from './UserSearch';
import { UserFilter } from './UserFilter';

interface UsersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string | null;
  onRoleSelect: (role: string | null) => void;
}

export const UsersToolbar: React.FC<UsersToolbarProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleSelect
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <UserSearch value={searchTerm} onChange={onSearchChange} />
      <UserFilter selectedRole={selectedRole} onRoleSelect={onRoleSelect} />
    </div>
  );
};
