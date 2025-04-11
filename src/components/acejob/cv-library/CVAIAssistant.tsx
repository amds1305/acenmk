
import React, { useState } from 'react';
import { Brain, MessageCircle, Send, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const CVAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant IA pour la CVthèque. Comment puis-je vous aider aujourd'hui ?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simuler une réponse de l'IA après un court délai
    setTimeout(() => {
      const aiResponses = [
        "Je peux vous aider à trouver les meilleurs candidats pour votre poste de développeur React. Voulez-vous que je filtre les CV par expérience spécifique ?",
        "D'après l'analyse des CV dans votre base, il y a 15 candidats qui correspondent à vos critères de recherche. Souhaitez-vous les consulter ?",
        "Je vous recommande de contacter Jean Dupont en priorité, son profil correspond à 92% aux exigences du poste de développeur senior.",
        "L'analyse des tendances montre une augmentation de 15% des candidatures pour les postes en développement web ce mois-ci."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {!isOpen ? (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Brain className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 shadow-lg z-50">
          <CardHeader className="py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Assistant IA
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64 px-4">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">Assistant IA</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Posez une question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CVAIAssistant;
