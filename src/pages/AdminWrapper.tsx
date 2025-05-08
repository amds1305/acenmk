
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { SectionsProvider } from '@/contexts/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { AdminNotificationProvider } from '@/hooks/use-admin-notification';

const AdminWrapper = () => {
  return (
    <AdminNotificationProvider>
      <PermissionsProvider>
        <SectionsProvider>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </SectionsProvider>
      </PermissionsProvider>
    </AdminNotificationProvider>
  );
};

export default AdminWrapper;
