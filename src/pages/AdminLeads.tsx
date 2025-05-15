
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { LeadsManager } from '@/components/admin/leads';

const AdminLeadsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Gérer les leads et prospects</p>
        </div>
        
        <LeadsManager />
      </div>
    </AdminLayout>
  );
};

export default AdminLeadsPage;
