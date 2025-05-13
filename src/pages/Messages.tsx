
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, MessageSquare, User, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const Messages = () => {
  const { isAuthenticated, isLoading, user, messages } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Filtrer les messages selon la recherche
  const filteredMessages = messages?.filter(
    (msg) => 
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.content?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Séparer les messages lus et non lus
  const unreadMessages = filteredMessages.filter(msg => !msg.read);
  const readMessages = filteredMessages.filter(msg => msg.read);

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 sm:px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-8">Mes messages</h1>
          
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <Input 
                placeholder="Rechercher dans les messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <Tabs defaultValue="unread">
              <TabsList>
                <TabsTrigger value="unread" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Non lus</span>
                  {unreadMessages.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadMessages.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="all">Tous les messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="unread" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  {unreadMessages.length > 0 ? (
                    <div className="space-y-4">
                      {unreadMessages.map((message) => (
                        <MessageCard key={message.id} message={message} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Aucun message non lu.</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  {filteredMessages.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMessages.map((message) => (
                        <MessageCard key={message.id} message={message} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Aucun message trouvé.</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// Composant de carte de message
const MessageCard = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`border rounded-lg p-4 ${message.read ? 'bg-card' : 'bg-accent/10'} hover:bg-accent/20 transition-colors`}>
      <div className="flex justify-between">
        <h3 className="font-medium">{message.subject}</h3>
        {!message.read && (
          <span className="bg-primary text-xs text-primary-foreground px-2 py-1 rounded-full">
            Nouveau
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
        <User className="h-3 w-3" />
        <span>{message.sender}</span>
        <Clock className="h-3 w-3 ml-2" />
        <span>{new Date(message.date).toLocaleDateString()}</span>
      </div>
      
      <div className={`mt-2 ${expanded ? '' : 'line-clamp-2'}`}>
        {message.content}
      </div>
      
      {message.content.length > 120 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)} 
          className="mt-2"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </Button>
      )}
    </div>
  );
};

export default Messages;
