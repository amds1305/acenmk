
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';
import { getRolesByLevel, getRoleLabel, UserRole } from '@/utils/roleUtils';

interface UserFilterProps {
  selectedRole: string | null;
  onRoleSelect: (role: string | null) => void;
}

export const UserFilter = ({ selectedRole, onRoleSelect }: UserFilterProps) => {
  const externalRoles = getRolesByLevel('external');
  const internalRoles = getRolesByLevel('internal');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          {selectedRole ? getRoleLabel(selectedRole as UserRole) : "Tous les rôles"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtrer par rôle</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onRoleSelect(null)}>
          Tous les rôles
        </DropdownMenuItem>
        
        <DropdownMenuLabel>Rôles externes</DropdownMenuLabel>
        {externalRoles.map(role => (
          <DropdownMenuItem key={role} onClick={() => onRoleSelect(role)}>
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuLabel>Rôles internes</DropdownMenuLabel>
        {internalRoles.map(role => (
          <DropdownMenuItem key={role} onClick={() => onRoleSelect(role)}>
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
