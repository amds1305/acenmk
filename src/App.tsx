
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

// Additional admin pages
import AdminTeam from './pages/AdminTeam';
import AdminServices from './pages/AdminServices';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminFaq from './pages/AdminFaq';
import AdminCareers from './pages/AdminCareers';
import AdminBlog from './pages/AdminBlog';
import AdminAbout from './pages/AdminAbout';

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
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/trusted-clients" element={<AdminTrustedClients />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/faq" element={<AdminFaq />} />
                <Route path="/admin/careers" element={<AdminCareers />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/about" element={<AdminAbout />} />
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
