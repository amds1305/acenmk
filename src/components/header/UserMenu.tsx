
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserCircle, Settings, LogOut, FileText, MessageSquare, BarChart4, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface UserMenuProps {
  isAuthenticated?: boolean;
  user?: any;
  config?: {
    show_login_button?: boolean;
    show_register_button?: boolean;
    show_profile_icon?: boolean;
    login_button_label?: string;
    register_button_label?: string;
  };
  actionButtons?: any[];
}

const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  user,
  config,
  actionButtons = []
}) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      // La redirection est gérée par le contexte d'authentification
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        {config?.show_login_button && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">
              {config.login_button_label || 'Connexion'}
            </Link>
          </Button>
        )}
        {config?.show_register_button && (
          <Button size="sm" asChild>
            <Link to="/register">
              {config.register_button_label || 'Inscription'}
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user?.name || 'Avatar utilisateur'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <UserCircle className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="font-medium">{user?.name || 'Mon compte'}</div>
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/projects" className="flex items-center cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Projets</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/estimates" className="flex items-center cursor-pointer">
            <Calculator className="mr-2 h-4 w-4" />
            <span>Devis</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/messages" className="flex items-center cursor-pointer">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/leads" className="flex items-center cursor-pointer">
            <BarChart4 className="mr-2 h-4 w-4" />
            <span>Leads</span>
          </Link>
        </DropdownMenuItem>
        
        {(user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'business_admin') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Administration</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
