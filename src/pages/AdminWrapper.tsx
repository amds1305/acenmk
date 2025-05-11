
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { AdminNotificationProvider } from '@/hooks/admin-notification';

const AdminWrapper = () => {
  return (
    <AdminNotificationProvider>
      <SectionsProvider>
        <PermissionsProvider>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </PermissionsProvider>
      </SectionsProvider>
    </AdminNotificationProvider>
  );
};

export default AdminWrapper;
