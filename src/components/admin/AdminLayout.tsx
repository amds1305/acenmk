
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  FileText,
  Home,
  PackageOpen,
  Info,
  Users,
  MessageSquareQuote,
  MessageCircleQuestion,
  Menu,
  Calendar,
  ExternalLink,
  LogOut,
  Globe,
  LayoutTemplate,
  Database,
  StarIcon,
  Tags
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const navigationItems = [
    { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Page d\'accueil', href: '/admin/home', icon: Home },
    { name: 'Hero', href: '/admin/hero', icon: StarIcon },
    { name: 'Services', href: '/admin/services', icon: PackageOpen },
    { name: 'Nos offres', href: '/admin/pricing', icon: Tags },
    { name: 'À propos', href: '/admin/about', icon: Info },
    { name: 'Équipe', href: '/admin/team', icon: Users },
    { name: 'Clients', href: '/admin/trusted-clients', icon: BriefcaseBusiness },
    { name: 'Témoignages', href: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'FAQ', href: '/admin/faq', icon: MessageCircleQuestion },
    { name: 'Articles', href: '/admin/blog', icon: FileText },
    { name: 'Rendez-vous', href: '/admin/appointments', icon: Calendar },
    { name: 'Template', href: '/admin/template', icon: LayoutTemplate },
    { name: 'En-tête', href: '/admin/header', icon: Globe },
    { name: 'Pied de page', href: '/admin/footer', icon: Globe },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Migration Supabase', href: '/admin/supabase-migration', icon: Database }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar pour desktop */}
      <div className={cn(
        "hidden md:flex md:w-64 flex-col border-r bg-background z-30",
      )}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Administration</h2>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-secondary-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary/50"
                  )}
                >
                  <ItemIcon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                A
              </div>
              <span className="ml-2 font-medium text-sm">Admin</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.open('/', '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir le site
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Barre de navigation mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-background z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Administration</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar} />
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-background p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Administration</h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-secondary text-secondary-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50"
                    )}
                    onClick={toggleSidebar}
                  >
                    <ItemIcon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 md:pt-6 mt-14 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
