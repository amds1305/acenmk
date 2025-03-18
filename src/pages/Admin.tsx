
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminBlogPost from '@/components/admin/AdminBlogPost';
import AdminHome from '@/components/admin/AdminHome';
import AdminServices from '@/components/admin/AdminServices';
import AdminAbout from '@/components/admin/AdminAbout';
import AdminTeam from '@/components/admin/AdminTeam';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminFaq from '@/components/admin/AdminFaq';
import AdminCareers from '@/components/admin/AdminCareers';

const Admin = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/blog" element={<AdminBlogPosts />} />
          <Route path="/blog/:id" element={<AdminBlogPost />} />
          <Route path="/home" element={<AdminHome />} />
          <Route path="/services" element={<AdminServices />} />
          <Route path="/about" element={<AdminAbout />} />
          <Route path="/team" element={<AdminTeam />} />
          <Route path="/testimonials" element={<AdminTestimonials />} />
          <Route path="/faq" element={<AdminFaq />} />
          <Route path="/careers" element={<AdminCareers />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Admin;
