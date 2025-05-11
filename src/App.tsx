
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
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
import AdminWrapper from './pages/AdminWrapper';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { Toaster } from './components/ui/toaster';

// Autres imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

// Page des mentions légales
const LegalPage = React.lazy(() => import('./pages/LegalPage'));

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
            
            {/* Routes admin avec AdminWrapper comme layout parent */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminWrapper />
              </ProtectedRoute>
            }>
              <Route index element={<Admin />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faq" element={<AdminFaq />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="custom-section/:id" element={<AdminCustomSection />} />
              <Route path="hero" element={<AdminHeroPage />} />
              <Route path="footer" element={<AdminFooter />} />
              <Route path="header" element={<AdminHeader />} />
            </Route>
            
            {/* Routes légales */}
            <Route path="/legal/:page" element={
              <React.Suspense fallback={<div>Chargement...</div>}>
                <LegalPage />
              </React.Suspense>
            } />
            
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
