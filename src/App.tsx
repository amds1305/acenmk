
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SectionsProvider } from '@/contexts/SectionsContext';
import { Toaster } from '@/components/ui/toaster';

// Page imports
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Faq from '@/pages/Faq';
import Profile from '@/pages/Profile';
import Portfolio from '@/pages/Portfolio';
import PortfolioDetail from '@/pages/PortfolioDetail';
import ProjectEstimation from '@/pages/ProjectEstimation';
import Appointments from '@/pages/Appointments';
import Careers from '@/pages/Careers';
import AdminLogin from '@/pages/AdminLogin';
import Admin from '@/pages/Admin';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SectionsProvider>
            <BrowserRouter>
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
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </SectionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
