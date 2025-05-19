
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Message } from '@/types/auth';
import { MessageSquare, BellRing } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages: React.FC<RecentMessagesProps> = ({ messages = [] }) => {
  const formatMessageDate = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: fr,
      });
    } catch (error) {
      console.error('Error formatting message date:', error);
      return 'Date invalide';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages récents
          </CardTitle>
          <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-medium rounded-full">
            {messages.filter(m => !m.read).length}
          </span>
        </div>
        <CardDescription>
          Vos derniers messages reçus
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {messages.length > 0 ? (
          <div className="divide-y">
            {messages.slice(0, 3).map((message) => (
              <div key={message.id} className={`px-4 py-3 ${!message.read ? 'bg-muted/50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-secondary">
                    {message.senderAvatar || message.avatar ? (
                      <img src={message.senderAvatar || message.avatar} alt={message.sender} className="object-cover" />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs font-medium">
                        {message.sender.charAt(0).toUpperCase()}
                      </span>
                    )}
                    {!message.read && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{message.sender}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatMessageDate(message.timestamp || message.date || '')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <BellRing className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              Vous n'avez aucun message pour le moment
            </p>
          </div>
        )}
        {messages.length > 0 && (
          <div className="p-2 text-center">
            <button className="text-xs text-primary hover:underline">
              Voir tous les messages
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
