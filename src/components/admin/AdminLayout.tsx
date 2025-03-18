
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun, 
  Menu, 
  X,
  GripHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes maintenant déconnecté",
    });
  };

  const mainNavItems = [
    { name: 'Tableau de bord', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Blog', path: '/admin/blog', icon: <FileText className="h-5 w-5" /> },
    { name: 'Page d\'accueil', path: '/admin/home', icon: <Home className="h-5 w-5" /> },
    { name: 'Services', path: '/admin/services', icon: <Settings className="h-5 w-5" /> },
    { name: 'À propos', path: '/admin/about', icon: <Users className="h-5 w-5" /> },
    { name: 'Équipe', path: '/admin/team', icon: <Users className="h-5 w-5" /> },
    { name: 'Témoignages', path: '/admin/testimonials', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'FAQ', path: '/admin/faq', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        {/* Sidebar pour desktop */}
        <Sidebar className="border-r border-gray-200 dark:border-gray-800">
          <SidebarContent>
            <div className="flex items-center justify-between p-4">
              <Link to="/admin" className="flex items-center space-x-2">
                <GripHorizontal className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">Admin</span>
              </Link>
              <SidebarTrigger className="lg:hidden" />
            </div>
            
            {user && (
              <div className="px-4 py-2">
                <div className="bg-primary/10 rounded-md p-3">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
            )}
            
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            location.pathname === item.path && "bg-primary/10 text-primary dark:bg-primary/20"
                          )}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="mt-auto p-4">
              <Separator className="my-4" />
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary flex items-center gap-2 transition-colors">
                  <Eye className="h-5 w-5" />
                  <span>Voir le site</span>
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start px-2 text-gray-600 dark:text-gray-400 hover:text-destructive dark:hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Déconnexion</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="self-end">
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Header mobile */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 lg:hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <SidebarTrigger />
                <Link to="/admin" className="flex items-center space-x-2">
                  <GripHorizontal className="h-6 w-6 text-primary" />
                  <span className="font-bold">Admin</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </header>

          {/* Contenu de la page */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
