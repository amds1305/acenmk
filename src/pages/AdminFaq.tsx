
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminFaq as AdminFaqComponent } from '@/components/admin/AdminFaq';

const AdminFaq = () => {
  return (
    <AdminLayout>
      <AdminFaqComponent />
    </AdminLayout>
  );
};

export default AdminFaq;
