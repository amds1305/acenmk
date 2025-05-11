
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { Toaster } from './components/ui/toaster';
import { AdminNotificationProvider } from './hooks/admin-notification';

// Autres imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

// Page des mentions légales
const LegalPage = React.lazy(() => import('./pages/LegalPage'));

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <SectionsProvider>
          <AdminNotificationProvider>
            <Router>
              <Routes>
                {/* Routes principales */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Routes admin */}
                <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
                <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
                <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
                <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
                <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
                <Route path="/admin/faq" element={<ProtectedRoute><AdminFaq /></ProtectedRoute>} />
                <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
                <Route path="/admin/custom-section/:id" element={<ProtectedRoute><AdminCustomSection /></ProtectedRoute>} />
                <Route path="/admin/hero" element={<ProtectedRoute><AdminHeroPage /></ProtectedRoute>} />
                <Route path="/admin/footer" element={<ProtectedRoute><AdminFooter /></ProtectedRoute>} />
                
                {/* Routes légales */}
                <Route path="/legal/:page" element={
                  <React.Suspense fallback={<div>Chargement...</div>}>
                    <LegalPage />
                  </React.Suspense>
                } />
                
                {/* Route 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </AdminNotificationProvider>
        </SectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
