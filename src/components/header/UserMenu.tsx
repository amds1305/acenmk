
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
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  User, LogOut, Settings, MessageSquare, 
  FileText, Briefcase, Bell 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserMenu = () => {
  const { user, logout, isAuthenticated, unreadMessages } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" 
            variant="destructive"
          >
            {unreadMessages}
          </Badge>
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
              <Badge className="ml-auto" variant="destructive">
                {unreadMessages}
              </Badge>
            )}
          </DropdownMenuItem>
          
          {user?.role === 'admin' && (
            <DropdownMenuItem onClick={() => navigate('/admin')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Administration</span>
            </DropdownMenuItem>
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
