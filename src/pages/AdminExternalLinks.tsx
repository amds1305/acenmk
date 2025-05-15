
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { ExternalLinksManager } from '@/components/admin/external-links';

const AdminExternalLinksPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Liens externes</h1>
          <p className="text-muted-foreground">Gérer les liens vers des applications externes</p>
        </div>
        
        <ExternalLinksManager />
      </div>
    </AdminLayout>
  );
};

export default AdminExternalLinksPage;
