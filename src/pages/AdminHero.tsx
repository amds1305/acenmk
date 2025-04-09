
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminHeroEditor } from '@/components/admin/hero';

const AdminHeroPage = () => {
  return (
    <AdminLayout>
      <AdminHeroEditor />
    </AdminLayout>
  );
};

export default AdminHeroPage;
