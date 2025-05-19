
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types/auth';
import { formatDateString } from './utils';

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  const navigate = useNavigate();
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
                    {formatDateString(message.date)}
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

export default RecentMessages;
