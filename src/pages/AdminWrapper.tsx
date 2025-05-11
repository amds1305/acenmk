
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { AdminNotificationProvider } from '@/hooks/use-admin-notification';

const AdminWrapper = () => {
  return (
    <PermissionsProvider>
      <AdminNotificationProvider>
        <SectionsProvider>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </SectionsProvider>
      </AdminNotificationProvider>
    </PermissionsProvider>
  );
};

export default AdminWrapper;
