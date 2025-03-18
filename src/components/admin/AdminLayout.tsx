
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, FileText, Settings, Users, Star, HelpCircle, 
  LogOut, Menu, X, LayoutDashboard, Eye as EyeIcon, Briefcase
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { 
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />, 
    label: 'Tableau de bord', 
    href: '/admin' 
  },
  { 
    icon: <FileText className="mr-2 h-4 w-4" />, 
    label: 'Articles', 
    href: '/admin/blog' 
  },
  { 
    icon: <Home className="mr-2 h-4 w-4" />, 
    label: 'Page d\'accueil', 
    href: '/admin/home' 
  },
  { 
    icon: <Settings className="mr-2 h-4 w-4" />, 
    label: 'Services', 
    href: '/admin/services' 
  },
  { 
    icon: <Users className="mr-2 h-4 w-4" />, 
    label: 'Équipe', 
    href: '/admin/team' 
  },
  { 
    icon: <Star className="mr-2 h-4 w-4" />, 
    label: 'Témoignages', 
    href: '/admin/testimonials' 
  },
  { 
    icon: <HelpCircle className="mr-2 h-4 w-4" />, 
    label: 'FAQ', 
    href: '/admin/faq' 
  },
  { 
    icon: <Briefcase className="mr-2 h-4 w-4" />, 
    label: 'Carrières', 
    href: '/admin/careers' 
  },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:max-w-none border-r">
              <div className="px-2 py-6 flex items-center">
                <X
                  className="mr-2 h-4 w-4 cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                />
                <Link to="/admin" className="flex items-center space-x-2">
                  <span className="font-bold">Administration</span>
                </Link>
              </div>
              <nav className="grid gap-2 px-2 py-4">
                {sidebarItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      isActive(item.href)
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="font-semibold hidden md:block">
              Administration
            </Link>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">
                <EyeIcon className="mr-2 h-3.5 w-3.5" />
                Voir le site
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>{user?.name.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden md:flex flex-col w-64 border-r bg-background">
          <nav className="grid gap-2 px-4 py-6">
            {sidebarItems.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
