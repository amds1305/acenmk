
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminHome from '@/components/admin/AdminHome';
import AdminHero from '@/pages/AdminHero';
import AdminServices from '@/pages/AdminServices';
import AdminAbout from '@/pages/AdminAbout';
import AdminTeam from '@/pages/AdminTeam';
import AdminTestimonials from '@/pages/AdminTestimonials';
import AdminFaq from '@/pages/AdminFaq';
import AdminBlog from '@/pages/AdminBlog';
import AdminCareers from '@/pages/AdminCareers';
import AdminTemplateChooser from '@/pages/AdminTemplateChooser';
import AdminTrustedClients from '@/pages/AdminTrustedClients';
import AdminSupabaseMigration from '@/pages/AdminSupabaseMigration';
import AdminUsers from '@/components/admin/AdminUsers';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';

const Admin = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SectionsProvider>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/hero" element={<AdminHero />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/team" element={<AdminTeam />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/faq" element={<AdminFaq />} />
            <Route path="/blog" element={<AdminBlog />} />
            <Route path="/blog/:id" element={<AdminBlog />} />
            <Route path="/careers" element={<AdminCareers />} />
            <Route path="/template" element={<AdminTemplateChooser />} />
            <Route path="/trusted-clients" element={<AdminTrustedClients />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/supabase-migration" element={<AdminSupabaseMigration />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </SectionsProvider>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Admin;
