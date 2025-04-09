
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminServices as AdminServicesComponent } from '@/components/admin/AdminServices';

const AdminServices = () => {
  return (
    <AdminLayout>
      <AdminServicesComponent />
    </AdminLayout>
  );
};

export default AdminServices;
