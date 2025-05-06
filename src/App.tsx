
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/SectionsContext';
import { AceJobProvider } from './contexts/AceJobContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import CguPage from './pages/CguPage';
import ConfidentialityPage from './pages/ConfidentialityPage';
import AccessibilityPage from './pages/AccessibilityPage';
import SitemapPage from './pages/SitemapPage';
import SearchPage from './pages/SearchPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminServices from './pages/AdminServices';
import AdminTeam from './pages/AdminTeam';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminFaq from './pages/AdminFaq';
import AdminPricing from './pages/AdminPricing';
import AdminPages from './pages/AdminPages';
import AdminJobs from './pages/AdminJobs';
import AdminMedia from './pages/AdminMedia';
import AdminSettings from './pages/AdminSettings';
import AdminHome from './pages/AdminHome';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminTemplateChooser from './pages/AdminTemplateChooser';
import AceJobDashboard from './pages/acejob/AceJobDashboard';
import AceJobCvGenerator from './pages/acejob/AceJobCvGenerator';
import AceJobOffers from './pages/acejob/AceJobOffers';
import AceJobCompanies from './pages/acejob/AceJobCompanies';
import AceJobCandidatures from './pages/acejob/AceJobCandidatures';
import Index from './pages/Index';
import AdminKinkTemplate from './pages/AdminKinkTemplate';
import AdminWrapper from './pages/AdminWrapper';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SectionsProvider>
          <AceJobProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/cgu" element={<CguPage />} />
              <Route path="/confidentiality" element={<ConfidentialityPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              
              {/* ACE JOB routes */}
              <Route path="/ace-job" element={<AceJobDashboard />} />
              <Route path="/ace-job/cv-generator" element={<AceJobCvGenerator />} />
              <Route path="/ace-job/offers" element={<AceJobOffers />} />
              <Route path="/ace-job/companies" element={<AceJobCompanies />} />
              <Route path="/ace-job/candidatures" element={<AceJobCandidatures />} />
              
              {/* Admin routes with the new wrapper */}
              <Route path="/admin/*" element={<AdminWrapper />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="faq" element={<AdminFaq />} />
                <Route path="pricing" element={<AdminPricing />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="home" element={<AdminHome />} />
                <Route path="roles-permissions" element={<AdminRolesPermissions />} />
                <Route path="template" element={<AdminTemplateChooser />} />
                <Route path="kink-template" element={<AdminKinkTemplate />} />
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AceJobProvider>
        </SectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
