
import React from 'react';
import AdminHome from '@/components/admin/AdminHome';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';

const AdminHomePage = () => {
  return (
    <SectionsProvider>
      <AdminHome />
    </SectionsProvider>
  );
};

export default AdminHomePage;
