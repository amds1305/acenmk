
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { AdminTrustedClientsMain } from '@/components/admin/trusted-clients';

const AdminTrustedClientsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Clients de confiance</h1>
          <p className="text-muted-foreground">Gérer les logos et références clients</p>
        </div>
        
        <AdminTrustedClientsMain />
      </div>
    </AdminLayout>
  );
};

export default AdminTrustedClientsPage;
