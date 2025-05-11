import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AdminNotificationProvider } from '@/hooks/use-admin-notification';
import { Toaster } from '@/components/ui/toaster';

// Eagerly loaded components
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AdminWrapper from './pages/AdminWrapper';
import Portfolio from './pages/Portfolio';
import AceJob from './pages/AceJob';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminHome from './pages/AdminHome';

// Lazily loaded components for better performance
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminHero = lazy(() => import('./pages/AdminHero'));
const AdminSupabaseMigration = lazy(() => import('./pages/AdminSupabaseMigration'));
const AdminTemplateChooser = lazy(() => import('./pages/AdminTemplateChooser')); 
const Blog = lazy(() => import('./pages/Blog'));
const ProjectEstimation = lazy(() => import('./pages/ProjectEstimation'));
const Faq = lazy(() => import('./pages/Faq'));
const AdminExternalLinks = lazy(() => import('./pages/AdminExternalLinks'));
const AdminCareers = lazy(() => import('./pages/AdminCareers'));
const AdminPricing = lazy(() => import('./pages/AdminPricing'));

// Import des composants admin manquants
const AdminServices = lazy(() => import('./pages/AdminServices'));
const AdminAbout = lazy(() => import('./pages/AdminAbout'));
const AdminTeam = lazy(() => import('./pages/AdminTeam'));
const AdminTestimonials = lazy(() => import('./pages/AdminTestimonials'));
const AdminFaq = lazy(() => import('./pages/AdminFaq'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminAppointments = lazy(() => import('./pages/AdminAppointments'));
const AdminHeader = lazy(() => import('./pages/AdminHeader'));
const AdminFooter = lazy(() => import('./pages/AdminFooter'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminTrustedClients = lazy(() => import('./pages/AdminTrustedClients'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AdminNotificationProvider>
            <PermissionsProvider>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile/*" element={<Profile />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/estimation" element={<ProjectEstimation />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/ace-job" element={<AceJob />} />
                  
                  {/* Routes d'administration */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminWrapper />}>
                    <Route index element={<Admin />} />
                    <Route path="home" element={<AdminHome />} />
                    <Route path="hero" element={<AdminHero />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="pricing" element={<AdminPricing />} />
                    <Route path="about" element={<AdminAbout />} />
                    <Route path="team" element={<AdminTeam />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="faq" element={<AdminFaq />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="careers" element={<AdminCareers />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                    <Route path="header" element={<AdminHeader />} />
                    <Route path="footer" element={<AdminFooter />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="external-links" element={<AdminExternalLinks />} />
                    <Route path="roles" element={<AdminRolesPermissions />} />
                    <Route path="supabase-migration" element={<AdminSupabaseMigration />} />
                    <Route path="template" element={<AdminTemplateChooser />} />
                    <Route path="trusted-clients" element={<AdminTrustedClients />} />
                    <Route path="*" element={<Admin />} />
                  </Route>
                  
                  {/* Route 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </Suspense>
            </PermissionsProvider>
          </AdminNotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
