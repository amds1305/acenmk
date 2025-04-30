
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';

// This wrapper optimizes the admin layout by only rendering the layout once
// and then using React Router's Outlet for dynamic content
const AdminWrapper = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SectionsProvider>
          <Suspense fallback={<div className="p-8">Loading admin page...</div>}>
            <Outlet />
          </Suspense>
        </SectionsProvider>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminWrapper;
