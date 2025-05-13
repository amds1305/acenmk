
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Inbox, Send, Trash2, Search, MoreVertical, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MessagesPage = () => {
  const { user, isAuthenticated, isLoading, messages = [] } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Rediriger vers la page de connexion si non authentifié
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Filtrer les messages par terme de recherche
  const filteredMessages = messages.filter(
    message => 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Séparation des messages par tab
  const inboxMessages = filteredMessages.filter(msg => !msg.sent && !msg.deleted);
  const sentMessages = filteredMessages.filter(msg => msg.sent);
  const deletedMessages = filteredMessages.filter(msg => msg.deleted);

  return (
    <>
      <Helmet>
        <title>Messages | Espace personnel</title>
        <meta name="description" content="Consultez vos messages dans votre espace personnel" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Messages</h1>
          
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher dans les messages..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="inbox">
            <TabsList className="mb-6">
              <TabsTrigger value="inbox" className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                <span>Boîte de réception</span>
                {inboxMessages.filter(msg => !msg.read).length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {inboxMessages.filter(msg => !msg.read).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span>Envoyés</span>
              </TabsTrigger>
              <TabsTrigger value="trash" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Corbeille</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox">
              {inboxMessages.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-center">Votre boîte de réception est vide</p>
                    <p className="text-muted-foreground text-center mt-1">
                      Vous n'avez aucun message pour le moment
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  {inboxMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer flex items-start gap-4 ${!message.read ? 'bg-muted/20 font-medium' : ''}`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className={`text-sm truncate ${!message.read ? 'font-semibold' : ''}`}>
                            {message.sender.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-base truncate">{message.subject}</p>
                        <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0 ml-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="sent">
              {sentMessages.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Send className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-center">Aucun message envoyé</p>
                    <p className="text-muted-foreground text-center mt-1">
                      Vous n'avez envoyé aucun message
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  {sentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer flex items-start gap-4"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.recipient.avatar} alt={message.recipient.name} />
                        <AvatarFallback>{message.recipient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm truncate">
                            À: {message.recipient.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-base truncate">{message.subject}</p>
                        <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0 ml-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="trash">
              {deletedMessages.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Trash2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-center">Corbeille vide</p>
                    <p className="text-muted-foreground text-center mt-1">
                      Aucun message dans la corbeille
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  {deletedMessages.map((message) => (
                    <div
                      key={message.id}
                      className="p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer flex items-start gap-4"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm truncate">
                            {message.sender.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-base truncate">{message.subject}</p>
                        <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0 ml-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default MessagesPage;
