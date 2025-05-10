
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit2, Users } from 'lucide-react';
import { User } from '@/types/auth';
import { getRoleLabel, getRoleBadgeVariant } from '@/utils/roleUtils';

interface UserPermissionsListProps {
  users: User[];
  permissionsMap: Record<string, string[]>;
  onEditPermissions: (user: User) => void;
  isLoading: boolean;
}

const UserPermissionsList: React.FC<UserPermissionsListProps> = ({
  users,
  permissionsMap,
  onEditPermissions,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement des données...</span>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center border rounded-lg">
        <Users className="h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="font-medium">Aucun utilisateur trouvé</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Aucun utilisateur n'est disponible dans le système
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Utilisateur</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role) as any}>
                  {getRoleLabel(user.role)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {permissionsMap[user.id]?.slice(0, 3).map(perm => (
                    <Badge key={perm} variant="outline" className="text-xs">
                      {perm}
                    </Badge>
                  ))}
                  {permissionsMap[user.id]?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{permissionsMap[user.id].length - 3} autres
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEditPermissions(user)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPermissionsList;
