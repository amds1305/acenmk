
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { AdminNotificationProvider } from '@/hooks/admin-notification';

interface AdminWrapperProps {
  children: React.ReactNode;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({ children }) => {
  return (
    <AdminNotificationProvider>
      <SectionsProvider>
        <AdminLayout>
          {children}
        </AdminLayout>
      </SectionsProvider>
    </AdminNotificationProvider>
  );
};

export default AdminWrapper;
