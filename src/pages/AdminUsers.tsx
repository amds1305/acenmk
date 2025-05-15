
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { UsersManager } from '@/components/admin/users';

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Administrer les comptes utilisateurs</p>
        </div>
        
        <UsersManager />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
