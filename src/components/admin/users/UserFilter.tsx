
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
import { getRoleLabel, getRolesByCategory } from '@/utils/roleUtils';

interface UserFilterProps {
  selectedRole: string | null;
  onRoleSelect: (role: string | null) => void;
}

export const UserFilter: React.FC<UserFilterProps> = ({
  selectedRole,
  onRoleSelect
}) => {
  // Récupérer les rôles par catégorie pour faciliter le filtrage dans l'interface
  const clientRoles = getRolesByCategory('client');
  const providerRoles = getRolesByCategory('provider');
  const staffRoles = getRolesByCategory('staff');
  const adminRoles = getRolesByCategory('admin');
  
  const getSelectedRoleLabel = () => {
    if (!selectedRole) return "Tous les rôles";
    return getRoleLabel(selectedRole);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          {getSelectedRoleLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtrer par rôle</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onRoleSelect(null)}>
          Tous les rôles
        </DropdownMenuItem>
        
        {/* Rôles client */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">Clients</DropdownMenuLabel>
        {clientRoles.map(role => (
          <DropdownMenuItem 
            key={role}
            onClick={() => onRoleSelect(role)}
            className={selectedRole === role ? "bg-accent" : ""}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
        
        {/* Rôles prestataire */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">Prestataires</DropdownMenuLabel>
        {providerRoles.map(role => (
          <DropdownMenuItem 
            key={role}
            onClick={() => onRoleSelect(role)}
            className={selectedRole === role ? "bg-accent" : ""}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
        
        {/* Rôles staff */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">Équipe</DropdownMenuLabel>
        {staffRoles.map(role => (
          <DropdownMenuItem 
            key={role}
            onClick={() => onRoleSelect(role)}
            className={selectedRole === role ? "bg-accent" : ""}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
        
        {/* Rôles admin */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">Administrateurs</DropdownMenuLabel>
        {adminRoles.map(role => (
          <DropdownMenuItem 
            key={role}
            onClick={() => onRoleSelect(role)}
            className={selectedRole === role ? "bg-accent" : ""}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
