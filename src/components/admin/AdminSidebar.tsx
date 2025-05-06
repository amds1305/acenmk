
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  Users, 
  FileText, 
  LayoutDashboard,
  MessageSquare,
  Image,
  Package,
  Briefcase,
  PanelLeft,
  ShieldCheck,
  Palette,
  BarChart2
} from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ href, icon, children }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link 
      to={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  return (
    <div className="group w-[220px] max-w-[220px] flex flex-col h-screen border-r dark:border-gray-800 transition-all duration-300 ease-in-out">
      <div className="flex h-14 items-center border-b px-4 dark:border-gray-800">
        <Link to="/admin" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-5 w-5" />
          <span>Administration</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-2 px-4">
        <nav className="grid gap-1">
          <SidebarLink href="/admin" icon={<Home className="h-4 w-4" />}>
            Tableau de bord
          </SidebarLink>
          
          <div className="my-2 h-px bg-muted-foreground/20"></div>
          
          <p className="mb-1 mt-2 px-2 text-xs font-semibold">Contenu</p>
          <SidebarLink href="/admin/home" icon={<Home className="h-4 w-4" />}>
            Page d'accueil
          </SidebarLink>
          <SidebarLink href="/admin/kink-template" icon={<Palette className="h-4 w-4" />}>
            Template Kink
          </SidebarLink>
          <SidebarLink href="/admin/template" icon={<PanelLeft className="h-4 w-4" />}>
            Choix du template
          </SidebarLink>
          <SidebarLink href="/admin/services" icon={<Package className="h-4 w-4" />}>
            Services
          </SidebarLink>
          <SidebarLink href="/admin/team" icon={<Users className="h-4 w-4" />}>
            Équipe
          </SidebarLink>
          <SidebarLink href="/admin/testimonials" icon={<MessageSquare className="h-4 w-4" />}>
            Témoignages
          </SidebarLink>
          <SidebarLink href="/admin/faq" icon={<MessageSquare className="h-4 w-4" />}>
            FAQ
          </SidebarLink>
          <SidebarLink href="/admin/pricing" icon={<BarChart2 className="h-4 w-4" />}>
            Offres tarifaires
          </SidebarLink>
          <SidebarLink href="/admin/pages" icon={<FileText className="h-4 w-4" />}>
            Pages
          </SidebarLink>
          <SidebarLink href="/admin/jobs" icon={<Briefcase className="h-4 w-4" />}>
            Offres d'emploi
          </SidebarLink>
          <SidebarLink href="/admin/media" icon={<Image className="h-4 w-4" />}>
            Médiathèque
          </SidebarLink>
          
          <div className="my-2 h-px bg-muted-foreground/20"></div>
          
          <p className="mb-1 mt-2 px-2 text-xs font-semibold">Administration</p>
          <SidebarLink href="/admin/users" icon={<Users className="h-4 w-4" />}>
            Utilisateurs
          </SidebarLink>
          <SidebarLink href="/admin/roles-permissions" icon={<ShieldCheck className="h-4 w-4" />}>
            Rôles et Permissions
          </SidebarLink>
          <SidebarLink href="/admin/settings" icon={<Settings className="h-4 w-4" />}>
            Paramètres
          </SidebarLink>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t dark:border-gray-800">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Home className="h-4 w-4" />
          <span>Retour au site</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
