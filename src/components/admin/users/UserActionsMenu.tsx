
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit2, Trash2, Mail, User as UserIcon, Shield, ShieldAlert, Users } from 'lucide-react';
import { User, UserRole } from '@/types/auth';
import { getRolesByCategory, getRolesByLevel, getRoleLabel } from '@/utils/roleUtils';

interface UserActionsMenuProps {
  user: User;
  onViewProfile: () => void;
  onEditProfile: () => void;
  onSendMessage: () => void;
  onChangeRole: (newRole: UserRole) => void;
  onDelete: () => void;
}

export const UserActionsMenu = ({
  user,
  onViewProfile,
  onEditProfile,
  onSendMessage,
  onChangeRole,
  onDelete
}: UserActionsMenuProps) => {
  const externalRoles = getRolesByLevel('external').filter(role => role !== 'visitor');
  const internalRoles = getRolesByLevel('internal');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onViewProfile}>
          <UserIcon className="h-4 w-4 mr-2" />
          Voir le profil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditProfile}>
          <Edit2 className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSendMessage}>
          <Mail className="h-4 w-4 mr-2" />
          Envoyer un message
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Shield className="h-4 w-4 mr-2" />
            Changer le rôle
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuLabel>Utilisateurs Externes</DropdownMenuLabel>
            {externalRoles.map(role => (
              <DropdownMenuItem 
                key={role}
                onClick={() => onChangeRole(role)}
                disabled={user.role === role}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                {getRoleLabel(role)}
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Utilisateurs Internes</DropdownMenuLabel>
            
            {internalRoles.filter(r => ['contributor', 'manager'].includes(r)).map(role => (
              <DropdownMenuItem 
                key={role}
                onClick={() => onChangeRole(role)}
                disabled={user.role === role}
              >
                <Users className="h-4 w-4 mr-2" />
                {getRoleLabel(role)}
              </DropdownMenuItem>
            ))}
            
            {internalRoles.filter(r => ['business_admin', 'super_admin'].includes(r)).map(role => (
              <DropdownMenuItem 
                key={role}
                onClick={() => onChangeRole(role)}
                disabled={user.role === role}
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                {getRoleLabel(role)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
