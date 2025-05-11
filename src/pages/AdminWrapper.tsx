
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';

const AdminWrapper = () => {
  return (
    <SectionsProvider>
      <PermissionsProvider>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </PermissionsProvider>
    </SectionsProvider>
  );
};

export default AdminWrapper;
