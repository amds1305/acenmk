
import React from 'react';
import { AdminHeroEditor } from '@/components/admin/hero';
import { AdminLayout } from '@/components/admin/layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminHeroPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminHeroEditor />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminHeroPage;
