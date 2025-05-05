import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Layers, 
  ShoppingBag, 
  FileText, 
  Users, 
  Settings, 
  Calendar, 
  LifeBuoy, 
  Briefcase,
  Navigation,
  UserCog,
  Shield,
  MessagesSquare,
  Newspaper,
  Menu,
  X,
  ChevronDown,
  Database,
  MessageCircleQuestion,
  LayoutPanelBottom,
  LayoutPanelTop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion."
      });
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    { path: '/admin', label: 'Tableau de bord', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/home', label: 'Page d\'accueil', icon: <Home className="h-5 w-5" /> },
    { path: '/admin/hero', label: 'Hero', icon: <Layers className="h-5 w-5" /> },
    { path: '/admin/services', label: 'Services', icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/admin/pricing', label: 'Tarifs', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/about', label: 'À propos', icon: <LifeBuoy className="h-5 w-5" /> },
    { path: '/admin/team', label: 'Équipe', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/testimonials', label: 'Témoignages', icon: <MessagesSquare className="h-5 w-5" /> },
    { path: '/admin/faq', label: 'FAQ', icon: <MessageCircleQuestion className="h-5 w-5" /> },
    { path: '/admin/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
    { path: '/admin/careers', label: 'Carrières', icon: <Briefcase className="h-5 w-5" /> },
    { path: '/admin/appointments', label: 'Rendez-vous', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/header', label: 'En-tête', icon: <LayoutPanelTop className="h-5 w-5" /> },
    { path: '/admin/footer', label: 'Pied de page', icon: <LayoutPanelBottom className="h-5 w-5" /> },
    { divider: true },
    { path: '/admin/users', label: 'Utilisateurs', icon: <UserCog className="h-5 w-5" /> },
    { path: '/admin/roles', label: 'Rôles et Permissions', icon: <Shield className="h-5 w-5" /> },
    { path: '/admin/template', label: 'Template', icon: <Settings className="h-5 w-5" /> },
    { path: '/admin/trusted-clients', label: 'Clients fiables', icon: <Navigation className="h-5 w-5" /> },
    { path: '/admin/supabase-migration', label: 'Migration Supabase', icon: <Database className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`
          fixed md:sticky top-0 z-30 
          ${expanded ? 'left-0' : '-left-full md:left-0'} 
          w-64 h-screen transition-all duration-200 ease-in-out 
          bg-card border-r shadow-sm 
          flex flex-col
        `}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div className="font-bold text-lg">ACE Admin</div>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-2">
          <nav className="space-y-1 px-2">
            {navItems.map((item, i) => 
              item.divider ? (
                <div key={`divider-${i}`} className="my-3 border-t mx-2"></div>
              ) : (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                  onClick={() => setExpanded(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[150px]">{user?.name}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" alignOffset={-40} className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <span className="text-destructive">Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 w-full">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {expanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setExpanded(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
