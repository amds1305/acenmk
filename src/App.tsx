
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SectionsProvider } from './contexts/SectionsContext';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Index from './pages/Index';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Careers from './pages/Careers';
import Faq from './pages/Faq';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import ProjectEstimation from './pages/ProjectEstimation';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';
import PortfolioDetail from './pages/PortfolioDetail';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminTrustedClients from './pages/AdminTrustedClients';

// Styles
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SectionsProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/project-estimation" element={<ProjectEstimation />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/trusted-clients" element={<AdminTrustedClients />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </SectionsProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
