
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, UserRole } from '@/types/auth';
import { UserActionsMenu } from './UserActionsMenu';
import { getRoleBadgeVariant, getRoleLabel } from '@/utils/roleUtils';

interface UserTableProps {
  users: User[];
  onViewProfile: (user: User) => void;
  onEditProfile: (user: User) => void;
  onSendMessage: (user: User) => void;
  onChangeRole: (userId: string, newRole: UserRole) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserTable = ({ 
  users, 
  onViewProfile, 
  onEditProfile, 
  onSendMessage, 
  onChangeRole, 
  onDeleteUser 
}: UserTableProps) => {
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
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
                  <Badge variant={getRoleBadgeVariant(user.role) as any} className="font-normal">
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <UserActionsMenu 
                    user={user}
                    onViewProfile={() => onViewProfile(user)}
                    onEditProfile={() => onEditProfile(user)}
                    onSendMessage={() => onSendMessage(user)}
                    onChangeRole={(newRole) => onChangeRole(user.id, newRole)}
                    onDelete={() => onDeleteUser(user.id)}
                  />
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
