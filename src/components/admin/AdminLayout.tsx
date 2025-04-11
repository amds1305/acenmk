
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Users, MessageSquare, FileQuestion, BriefcaseBusiness, Layout, LogOut, LucideIcon, User, Landmark, LayoutDashboard, Settings, Calendar, FileText, MenuSquare, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, href, label, active }: NavItemProps) => (
  <Link to={href} className={cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
    active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
  )}>
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Link>
);

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
              <Layout className="h-6 w-6" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <NavItem
                icon={Home}
                href="/admin"
                label="Accueil"
                active={location.pathname === "/admin"}
              />
              <NavItem
                icon={Settings}
                href="/admin/home"
                label="Configuration Accueil"
                active={location.pathname === "/admin/home"}
              />
              <NavItem
                icon={LayoutDashboard}
                href="/admin/hero"
                label="Hero"
                active={location.pathname === "/admin/hero"}
              />
              <NavItem
                icon={MenuSquare}
                href="/admin/header"
                label="En-tête"
                active={location.pathname === "/admin/header"}
              />
              <NavItem
                icon={Footprints}
                href="/admin/footer"
                label="Pied de page"
                active={location.pathname === "/admin/footer"}
              />
              <NavItem
                icon={BriefcaseBusiness}
                href="/admin/services"
                label="Services"
                active={location.pathname === "/admin/services"}
              />
              <NavItem
                icon={Users}
                href="/admin/team"
                label="Équipe"
                active={location.pathname === "/admin/team"}
              />
              <NavItem
                icon={Landmark}
                href="/admin/trusted-clients"
                label="Clients en vedette"
                active={location.pathname === "/admin/trusted-clients"}
              />
              <NavItem
                icon={MessageSquare}
                href="/admin/testimonials"
                label="Témoignages"
                active={location.pathname === "/admin/testimonials"}
              />
              <NavItem
                icon={FileQuestion}
                href="/admin/faq"
                label="FAQ"
                active={location.pathname === "/admin/faq"}
              />
              <NavItem
                icon={BriefcaseBusiness}
                href="/admin/careers"
                label="Carrières"
                active={location.pathname === "/admin/careers"}
              />
              <NavItem
                icon={Calendar}
                href="/admin/appointments"
                label="Rendez-vous"
                active={location.pathname === "/admin/appointments"}
              />
              <NavItem
                icon={BookOpen}
                href="/admin/blog"
                label="Blog"
                active={location.pathname === "/admin/blog" || location.pathname.startsWith("/admin/blog/")}
              />
              <NavItem
                icon={User}
                href="/admin/about"
                label="À propos"
                active={location.pathname === "/admin/about"}
              />
              <NavItem
                icon={Users}
                href="/admin/users"
                label="Utilisateurs"
                active={location.pathname === "/admin/users"}
              />
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-3">
              <LogOut className="h-4 w-4" />
              <span>Se déconnecter</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
