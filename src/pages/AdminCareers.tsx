
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminCareers as AdminCareersComponent } from '@/components/admin/AdminCareers';

const AdminCareers = () => {
  return (
    <AdminLayout>
      <AdminCareersComponent />
    </AdminLayout>
  );
};

export default AdminCareers;
