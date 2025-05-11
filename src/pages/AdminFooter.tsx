
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import AdminFooter from '@/components/admin/footer/AdminFooter';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminFooterPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminFooter />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminFooterPage;
