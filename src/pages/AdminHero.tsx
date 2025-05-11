
import React from 'react';
import { AdminHeroEditor } from '@/components/admin/hero';
import { AdminLayout } from '@/components/admin/layout';

const AdminHeroPage = () => {
  return (
    <AdminLayout>
      <AdminHeroEditor />
    </AdminLayout>
  );
};

export default AdminHeroPage;
