
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';

const AdminWrapper = () => {
  return (
    <PermissionsProvider>
      <SectionsProvider>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </SectionsProvider>
    </PermissionsProvider>
  );
};

export default AdminWrapper;
