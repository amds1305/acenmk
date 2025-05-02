
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminHome from '@/components/admin/AdminHome';
import AdminHero from '@/pages/AdminHero';
import AdminServices from '@/components/admin/AdminServices';
import AdminAbout from '@/components/admin/AdminAbout';
import AdminTeam from '@/components/admin/AdminTeam';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminFaq from '@/components/admin/AdminFaq';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import { AdminCareers } from '@/components/admin/careers';
import AdminTemplateChooser from '@/pages/AdminTemplateChooser';
import { AdminTrustedClients } from '@/components/admin/trusted-clients';
import AdminSupabaseMigration from '@/pages/AdminSupabaseMigration';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminPricing from '@/components/admin/pricing/AdminPricing';
import AdminAppointments from '@/components/admin/AdminAppointments';
import AdminHeader from '@/components/admin/header/AdminHeader';
import AdminFooter from '@/components/admin/footer/AdminFooter';
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
            <Route path="/pricing" element={<AdminPricing />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/team" element={<AdminTeam />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/faq" element={<AdminFaq />} />
            <Route path="/blog" element={<AdminBlogPosts />} />
            <Route path="/blog/:id" element={<AdminBlogPosts />} />
            <Route path="/careers" element={<AdminCareers />} />
            <Route path="/appointments" element={<AdminAppointments />} />
            <Route path="/template" element={<AdminTemplateChooser />} />
            <Route path="/trusted-clients" element={<AdminTrustedClients />} />
            <Route path="/header" element={<AdminHeader />} />
            <Route path="/footer" element={<AdminFooter />} />
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
