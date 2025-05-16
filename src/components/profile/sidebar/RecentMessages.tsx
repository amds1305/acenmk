
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, ExternalLink } from 'lucide-react';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Message } from '@/types/auth';

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages: React.FC<RecentMessagesProps> = ({ messages }) => {
  // Format the timestamp based on when it was received
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return format(date, 'HH:mm', { locale: fr });
    } else if (isYesterday(date)) {
      return `Hier, ${format(date, 'HH:mm', { locale: fr })}`;
    } else {
      return formatDistanceToNow(date, { locale: fr, addSuffix: true });
    }
  };
  
  // Get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substr(0, 2);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Messages récents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {messages.length > 0 ? (
          <div className="divide-y divide-border">
            {messages.slice(0, 3).map((message) => (
              <div key={message.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    {message.avatar ? (
                      <AvatarImage src={message.avatar} alt={message.sender} />
                    ) : (
                      <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium leading-none">{message.sender}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatMessageTime(message.timestamp || message.date || '')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">Aucun message récent</p>
          </div>
        )}
        
        <div className="p-4 border-t">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href="/messages">
              <ExternalLink className="h-4 w-4 mr-2" />
              Voir tous les messages
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
