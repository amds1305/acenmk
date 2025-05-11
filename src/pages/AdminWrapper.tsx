
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { AdminNotificationProvider } from '@/hooks/use-admin-notification';

const AdminWrapper = () => {
  return (
    <SectionsProvider>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </SectionsProvider>
  );
};

export default AdminWrapper;
