
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SectionsProvider } from '@/contexts/SectionsContext';
import { Toaster } from '@/components/ui/toaster';

// Chargement immédiat des composants essentiels (pages principales)
import Index from '@/pages/Index';

// Chargement différé des autres pages
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Faq = lazy(() => import('@/pages/Faq'));
const Profile = lazy(() => import('@/pages/Profile'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioDetail = lazy(() => import('@/pages/PortfolioDetail'));
const ProjectEstimation = lazy(() => import('@/pages/ProjectEstimation'));
const Appointments = lazy(() => import('@/pages/Appointments'));
const Careers = lazy(() => import('@/pages/Careers'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const Admin = lazy(() => import('@/pages/Admin'));
const AceJob = lazy(() => import('@/pages/AceJob'));

// Composant de chargement pour Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p className="ml-3 text-lg">Chargement...</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SectionsProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                  <Route path="/estimation" element={<ProjectEstimation />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/ace-job" element={<AceJob />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/*" element={<Admin />} />
                </Routes>
              </Suspense>
              <Toaster />
            </BrowserRouter>
          </SectionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
