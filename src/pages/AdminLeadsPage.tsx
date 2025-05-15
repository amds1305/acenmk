
import React from 'react';
import { AdminWrapper } from '@/pages';
import { LeadsManager } from '@/components/admin/leads';

const AdminLeadsPage = () => {
  return (
    <AdminWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Gérer les leads et opportunités commerciales</p>
        </div>
        
        <LeadsManager />
      </div>
    </AdminWrapper>
  );
};

export default AdminLeadsPage;
