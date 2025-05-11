
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import KinkContactEditor from '@/components/admin/kink/KinkContactEditor';

const AdminContact = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Section Contact</h1>
        <p className="text-muted-foreground">
          Personnalisez le formulaire de contact et les informations affichées.
        </p>
        
        <KinkContactEditor />
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
