
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
import { MoreHorizontal, Edit2, Trash2, Mail, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '@/types/auth';

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
        
        <DropdownMenuLabel>Changer le rôle</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => onChangeRole('user')}
          disabled={user.role === 'user'}
        >
          Client
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onChangeRole('client_premium')}
          disabled={user.role === 'client_premium'}
        >
          Client Premium
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onChangeRole('admin')}
          disabled={user.role === 'admin'}
        >
          Administrateur
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onChangeRole('super_admin')}
          disabled={user.role === 'super_admin'}
        >
          Super Admin
        </DropdownMenuItem>
        
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
