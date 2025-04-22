
import { useState } from 'react';
import { Message } from '@/types/auth';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Cette fonction pourra être implémentée plus tard pour gérer les messages
  const fetchMessages = async () => {
    // TODO: Implémenter la récupération des messages depuis Supabase
    return [];
  };

  return {
    messages,
    unreadMessages,
    fetchMessages,
  };
};
