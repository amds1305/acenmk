
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/auth';
import { formatDateString } from './utils';

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  // Get user role badge color based on role
  const getRoleBadgeColor = (role?: string) => {
    if (!role) return 'bg-gray-200 text-gray-800';
    
    switch(role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'client_premium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getUserRoleDisplay = (role?: string) => {
    if (!role) return 'Client';
    
    switch(role) {
      case 'admin': return 'Administrateur';
      case 'super_admin': return 'Super administrateur';
      case 'client_premium': return 'Client premium';
      case 'user': return 'Client';
      default: return role;
    }
  };

  return (
    <Card>
      <CardHeader className="text-center pb-0">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          {user.avatar_url || user.avatar ? (
            <AvatarImage src={user.avatar_url || user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="text-xl bg-primary/10">{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          )}
        </Avatar>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>
          {getUserRoleDisplay(user.role)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
            <span className="text-sm font-medium">Email</span>
            <span className="text-sm">{user.email}</span>
          </div>
          
          {user.company && (
            <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
              <span className="text-sm font-medium">Entreprise</span>
              <span className="text-sm">{user.company}</span>
            </div>
          )}
          
          {user.phone && (
            <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
              <span className="text-sm font-medium">Téléphone</span>
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
            <span className="text-sm font-medium">Membre depuis</span>
            <span className="text-sm">{formatDateString(user.createdAt)}</span>
          </div>
          
          {user.twoFactorEnabled !== undefined && (
            <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
              <span className="text-sm font-medium">2FA</span>
              <Badge variant={user.twoFactorEnabled ? "default" : "outline"}>
                {user.twoFactorEnabled ? "Activé" : "Désactivé"}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
