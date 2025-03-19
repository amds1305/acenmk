
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';

// Types for our messages
type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const INITIAL_MESSAGES: MessageType[] = [
  {
    id: '1',
    content: 'Bonjour ! Je suis l\'assistant virtuel d\'Acenümerik. Comment puis-je vous aider aujourd\'hui ?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const ChatbotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<MessageType[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const minimizeChat = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const newBotMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Simple response logic - in real app, this would connect to a more sophisticated service
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offrez')) {
      return 'Nous offrons une variété de services numériques, notamment le développement web, mobile, et des solutions SaaS. Vous pouvez consulter notre page Services pour plus de détails.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('joindre')) {
      return 'Vous pouvez nous contacter via notre formulaire de contact en bas de la page d\'accueil, ou par email à contact@acenumerik.com.';
    } else if (lowerMessage.includes('emploi') || lowerMessage.includes('travail') || lowerMessage.includes('carrière') || lowerMessage.includes('recrutement')) {
      return 'Nous avons plusieurs postes ouverts ! Consultez notre page Carrières pour voir les offres disponibles et postuler.';
    } else if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût') || lowerMessage.includes('estimation')) {
      return 'Les prix varient selon les projets. Nous vous invitons à nous décrire votre projet via notre formulaire de contact pour obtenir un devis personnalisé.';
    } else {
      return 'Merci pour votre message. Pour une assistance plus précise, n\'hésitez pas à nous contacter directement ou à préciser votre question.';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={cn(
          'bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 w-80 md:w-96 transition-all duration-300 overflow-hidden',
          isOpen ? 'h-96 opacity-100' : 'h-0 opacity-0 invisible'
        )}
      >
        {/* Chat Header */}
        <div className="bg-primary text-white p-3 flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Assistant Acenümerik</h3>
          </div>
          <div className="flex space-x-2">
            <button onClick={minimizeChat} className="text-white hover:text-gray-200">
              <Minimize className="h-4 w-4" />
            </button>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-3 h-[calc(100%-120px)] overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t dark:border-gray-700">
          <div className="flex space-x-2">
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              className="resize-none"
              rows={1}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              disabled={inputValue.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ChatbotBubble;
