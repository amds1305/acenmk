
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminTeam as AdminTeamComponent } from '@/components/admin/AdminTeam';

const AdminTeam = () => {
  return (
    <AdminLayout>
      <AdminTeamComponent />
    </AdminLayout>
  );
};

export default AdminTeam;
