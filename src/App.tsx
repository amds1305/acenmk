
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SectionsProvider } from '@/contexts/SectionsContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import ProjectEstimation from './pages/ProjectEstimation';
import Appointments from './pages/Appointments';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import AdminHome from './components/admin/AdminHome';
import AdminLogin from './pages/AdminLogin';
import AdminServices from './pages/AdminServices';
import AdminAbout from './pages/AdminAbout';
import AdminTeam from './pages/AdminTeam';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminFaq from './pages/AdminFaq';
import AdminCareers from './pages/AdminCareers';
import AdminBlog from './pages/AdminBlog';
import AdminTrustedClients from './pages/AdminTrustedClients';
import AdminHero from './pages/AdminHero';
import ProtectedRoute from './components/admin/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function App() {
  const [count, setCount] = useState(0);

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

                {/* Admin routes */}
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
                  <Route index element={<AdminHome />} />
                  <Route path="home" element={<AdminHome />} />
                  <Route path="hero" element={<AdminHero />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="trusted-clients" element={<AdminTrustedClients />} />
                  <Route path="faq" element={<AdminFaq />} />
                  <Route path="careers" element={<AdminCareers />} />
                  <Route path="blog" element={<AdminBlog />} />
                </Route>

                <Route path="*" element={<NotFound />} />
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
