
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SectionsProvider } from "./contexts/SectionsContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import BlogPost from "./pages/BlogPost";
import PortfolioDetail from "./pages/PortfolioDetail";
import Faq from "./pages/Faq";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Careers from "./pages/Careers";
import ProjectEstimation from "./pages/ProjectEstimation";
import ChatbotBubble from "./components/chatbot/ChatbotBubble";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Importer les variables CSS des thèmes
import "./lib/theme-variables.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <SectionsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/estimate" element={<ProjectEstimation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatbotBubble />
            </BrowserRouter>
          </TooltipProvider>
        </SectionsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
