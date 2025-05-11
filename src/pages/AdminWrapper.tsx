
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { AdminNotificationProvider } from '@/hooks/admin-notification';
import { Outlet } from 'react-router-dom';

interface AdminWrapperProps {
  children?: React.ReactNode;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({ children }) => {
  return (
    <AdminNotificationProvider>
      <SectionsProvider>
        <AdminLayout>
          {children || <Outlet />}
        </AdminLayout>
      </SectionsProvider>
    </AdminNotificationProvider>
  );
};

export default AdminWrapper;
