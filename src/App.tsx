
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

// Eagerly loaded components
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AdminWrapper from './pages/AdminWrapper';
import Admin from './pages/Admin';
import Portfolio from './pages/Portfolio';
import AceJob from './pages/AceJob';
import Careers from './pages/Careers';

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
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
              <Route path="/admin/*" element={<Admin />} />
              
              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
