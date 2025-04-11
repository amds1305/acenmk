
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User as UserType, Message } from '@/types/auth';

interface UserSidebarProps {
  user: UserType;
  messages: Message[];
}

const UserSidebar = ({ user, messages }: UserSidebarProps) => {
  const navigate = useNavigate();
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="lg:col-span-4">
      <Card>
        <CardHeader className="text-center pb-0">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>
            {
              user.role === 'admin' ? 'Administrateur' : 
              user.role === 'super_admin' ? 'Super administrateur' :
              user.role === 'client_premium' ? 'Client premium' :
              'Client'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
              <span className="text-sm font-medium">Email</span>
              <span className="text-sm">{user.email}</span>
            </div>
            
            {user.company && (
              <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
                <span className="text-sm font-medium">Entreprise</span>
                <span className="text-sm">{user.company}</span>
              </div>
            )}
            
            {user.phone && (
              <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
                <span className="text-sm font-medium">Téléphone</span>
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
              <span className="text-sm font-medium">Membre depuis</span>
              <span className="text-sm">{formatDate(user.createdAt)}</span>
            </div>
            
            {user.twoFactorEnabled !== undefined && (
              <div className="flex justify-between items-center py-2 px-4 rounded-md bg-muted/50">
                <span className="text-sm font-medium">2FA</span>
                <Badge variant={user.twoFactorEnabled ? "default" : "outline"}>
                  {user.twoFactorEnabled ? "Activé" : "Désactivé"}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <RecentMessages messages={messages} formatDate={formatDate} navigate={navigate} />
    </div>
  );
};

interface RecentMessagesProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
  navigate: ReturnType<typeof useNavigate>;
}

const RecentMessages = ({ messages, formatDate, navigate }: RecentMessagesProps) => {
  const recentMessages = messages.slice(0, 3); // Show only the 3 most recent messages
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Messages récents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentMessages.length > 0 ? (
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg border ${!message.read ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <Badge variant={message.sender === 'admin' ? "default" : "secondary"} className="text-xs">
                      {message.sender === 'admin' ? 'Support' : 'Vous'}
                    </Badge>
                    {!message.read && message.sender === 'admin' && (
                      <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
                        Non lu
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.date)}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Aucun message</p>
        )}
        
        <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/messages')}>
          Voir tous les messages
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserSidebar;
