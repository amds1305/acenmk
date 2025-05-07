
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import Admin from '@/pages/Admin';

// Ce wrapper optimise la disposition admin en ne rendant la disposition qu'une fois
// et en utilisant React Router pour le contenu dynamique
const AdminWrapper = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SectionsProvider>
          <Suspense fallback={<div className="p-8">Loading admin page...</div>}>
            <Admin />
          </Suspense>
        </SectionsProvider>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminWrapper;
