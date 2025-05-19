
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User as UserType } from '@/types/auth';
import { formatDateString } from './utils';

interface UserInfoProps {
  user: UserType;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader className="text-center pb-0">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>
          {
            user.role === 'admin' ? 'Administrateur' : 
            user.role === 'super_admin' ? 'Super administrateur' :
            user.role === 'client_premium' ? 'Client premium' :
            'Client'
          }
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
