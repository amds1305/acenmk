
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Edit2, Trash2, Mail, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '@/types/auth';
import { getRoleBadgeVariant, getRoleLabel } from '@/utils/roleUtils';

interface UserTableProps {
  users: User[];
  onViewProfile: (user: User) => void;
  onEditProfile: (user: User) => void;
  onSendMessage: (user: User) => void;
  onChangeRole: (userId: string, newRole: UserRole) => void;
  onDeleteUser: (userId: string) => void;
  isLoading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onViewProfile,
  onEditProfile,
  onSendMessage,
  onChangeRole,
  onDeleteUser,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Utilisateur</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={4} className="h-16">
                  <div className="w-full h-4 bg-muted animate-pulse rounded"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Utilisateur</TableHead>
            <TableHead className="hidden md:table-cell">Role</TableHead>
            <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      {user.company && (
                        <p className="text-xs text-muted-foreground hidden sm:block">{user.company}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={getRoleBadgeVariant(user.role)} className="font-normal">
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewProfile(user)}>
                        <UserIcon className="h-4 w-4 mr-2" />
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditProfile(user)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSendMessage(user)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer un message
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuLabel>Changer le rôle</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => onChangeRole(user.id, 'user')}
                        disabled={user.role === 'user'}
                      >
                        Client
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onChangeRole(user.id, 'client_premium')}
                        disabled={user.role === 'client_premium'}
                      >
                        Client Premium
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onChangeRole(user.id, 'admin')}
                        disabled={user.role === 'admin'}
                      >
                        Administrateur
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onChangeRole(user.id, 'super_admin')}
                        disabled={user.role === 'super_admin'}
                      >
                        Super Admin
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
