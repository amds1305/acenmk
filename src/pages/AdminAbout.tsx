
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminAbout as AdminAboutComponent } from '@/components/admin/AdminAbout';

const AdminAbout = () => {
  return (
    <AdminLayout>
      <AdminAboutComponent />
    </AdminLayout>
  );
};

export default AdminAbout;
