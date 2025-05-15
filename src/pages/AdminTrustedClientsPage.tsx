
import React from 'react';
import { AdminWrapper } from '@/pages';
import { AdminTrustedClients } from '@/components/admin';

const AdminTrustedClientsPage = () => {
  return (
    <AdminWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Clients de confiance</h1>
          <p className="text-muted-foreground">Gérer les logos et références clients</p>
        </div>
        
        <AdminTrustedClients />
      </div>
    </AdminWrapper>
  );
};

export default AdminTrustedClientsPage;
