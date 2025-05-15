
import React from 'react';
import { AdminWrapper } from '@/pages';
import { UsersManager } from '@/components/admin/users';

const AdminUsersPage = () => {
  return (
    <AdminWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérer les utilisateurs du système</p>
        </div>
        
        <UsersManager />
      </div>
    </AdminWrapper>
  );
};

export default AdminUsersPage;
