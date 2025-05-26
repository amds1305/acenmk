
import React from 'react';
import { AdminTrustedClients } from '@/components/admin/trusted-clients';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminTrustedClientsPage = () => {
  return (
    <AdminLayout>
      <AdminTrustedClients />
    </AdminLayout>
  );
};

export default AdminTrustedClientsPage;
