import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { 
  User, LogOut, Settings, MessageSquare, 
  FileText, Briefcase, Bell, Badge
} from 'lucide-react';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { usePermissions } from '@/contexts/PermissionsContext';
import { isAdminRole } from '@/utils/roleUtils';

// Définition des modules internes
const internalModules = [
  {
    name: 'AceJob',
    path: '/acejob',
    icon: <Badge className="h-4 w-4" />,
    requiredRole: ['admin', 'super_admin', 'business_admin', 'contributor']
  }
  // Possibilité d'ajouter d'autres modules internes facilement ici
];

const UserMenu = () => {
  const { user, logout, isAuthenticated, unreadMessages } = useAuth();
  const { hasAccess } = usePermissions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filtrer les modules internes en fonction des permissions de l'utilisateur
  const authorizedModules = internalModules.filter(module => {
    // Vérifier si l'utilisateur a le rôle requis
    if (user && module.requiredRole.some(role => user.role === role)) {
      return true;
    }
    // Vérifier si l'utilisateur a accès au chemin via le système de permissions
    if (user && hasAccess(module.path, user.role)) {
      return true;
    }
    return false;
  });

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate('/login')}>
          Connexion
        </Button>
        <Button onClick={() => navigate('/register')}>
          Inscription
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {unreadMessages > 0 && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative" 
          onClick={() => navigate('/messages')}
        >
          <Bell className="h-5 w-5" />
          <BadgeUI 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" 
            variant="destructive"
          >
            {unreadMessages}
          </BadgeUI>
        </Button>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="cursor-pointer h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects')}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Mes projets</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/estimates')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Mes devis</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/messages')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
            {unreadMessages > 0 && (
              <BadgeUI className="ml-auto" variant="destructive">
                {unreadMessages}
              </BadgeUI>
            )}
          </DropdownMenuItem>
          
          {/* Modules internes autorisés */}
          {authorizedModules.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex items-center text-xs text-muted-foreground">
                  <Badge className="mr-1 h-3 w-3" />
                  Modules internes
                </DropdownMenuLabel>
                
                {authorizedModules.map((module) => (
                  <DropdownMenuItem key={module.name} onClick={() => navigate(module.path)}>
                    {module.icon && <span className="mr-2">{module.icon}</span>}
                    <span>{module.name}</span>
                    <BadgeUI variant="outline" className="ml-auto text-xs">interne</BadgeUI>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </>
          )}
          
          {user?.role === 'admin' || isAdminRole(user?.role || '') && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Administration</span>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
