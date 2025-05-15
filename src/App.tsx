
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { Toaster } from './components/ui/toaster';

// Protected Route
import ProtectedRoute from './components/admin/ProtectedRoute';

// Admin Pages
import Admin from './pages/Admin';
import AdminHome from './pages/AdminHome';
import AdminServices from './pages/AdminServices';
import AdminAbout from './pages/AdminAbout';
import AdminTeam from './pages/AdminTeam';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminFaq from './pages/AdminFaq';
import AdminContact from './pages/AdminContact';
import AdminCustomSection from './pages/AdminCustomSection';
import AdminHeroPage from './pages/AdminHero';
import AdminFooter from './pages/AdminFooter';
import AdminHeader from './pages/AdminHeader';
import AdminAceJob from './pages/AdminAceJob';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminExternalLinks from './pages/AdminExternalLinks';
import AdminLeads from './pages/AdminLeads';
import AdminTrustedClients from './pages/AdminTrustedClients';
import AdminUsers from './pages/AdminUsers';
import AdminSupabaseMigration from './pages/AdminSupabaseMigration';
import AdminWrapper from './pages/AdminWrapper';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

// User Pages
import AceJob from './pages/AceJob';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Estimates from './pages/Estimates';
import Messages from './pages/Messages';
import MyLeads from './pages/MyLeads';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <SectionsProvider>
          <Routes>
            {/* Routes principales */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/ace-job" element={<AceJob />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/leads" element={<MyLeads />} />
            
            {/* Routes admin avec AdminWrapper comme layout parent */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminWrapper />
              </ProtectedRoute>
            }>
              <Route index element={<Admin />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="hero" element={<AdminHeroPage />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faq" element={<AdminFaq />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="custom-section/:id" element={<AdminCustomSection />} />
              <Route path="footer" element={<AdminFooter />} />
              <Route path="header" element={<AdminHeader />} />
              <Route path="ace-job" element={<AdminAceJob />} />
              <Route path="roles" element={<AdminRolesPermissions />} />
              <Route path="external-links" element={<AdminExternalLinks />} />
              <Route path="trusted-clients" element={<AdminTrustedClients />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="migration" element={<AdminSupabaseMigration />} />
            </Route>
            
            {/* Routes légales */}
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/politique-de-confidentialite" element={<LegalPage />} />
            <Route path="/conditions-utilisation" element={<LegalPage />} />
            <Route path="/politique-cookies" element={<LegalPage />} />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </SectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
