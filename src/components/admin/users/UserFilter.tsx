
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
import { UserRole } from '@/types/auth';

interface UserFilterProps {
  selectedRole: string | null;
  onRoleSelect: (role: string | null) => void;
}

export const UserFilter = ({ selectedRole, onRoleSelect }: UserFilterProps) => {
  const getRoleLabel = (role: string | null) => {
    switch(role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Administrateur';
      case 'client_premium': return 'Client Premium';
      case 'user': return 'Client';
      default: return 'Tous les rôles';
    }
  };

  // Définir les rôles disponibles basés sur le type UserRole
  const availableRoles: UserRole[] = ['super_admin', 'admin', 'client_premium', 'user'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          {getRoleLabel(selectedRole)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtrer par rôle</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onRoleSelect(null)}>
          Tous les rôles
        </DropdownMenuItem>
        
        {availableRoles.map(role => (
          <DropdownMenuItem 
            key={role} 
            onClick={() => onRoleSelect(role)}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
