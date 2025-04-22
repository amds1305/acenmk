
import { useState } from 'react';
import { Message } from '@/types/auth';
import { MOCK_MESSAGES } from '@/data/mockUsers';

export const useMessages = () => {
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const unreadMessages = messages.filter(message => !message.read && message.sender === 'admin').length;

  return {
    messages,
    unreadMessages
  };
};
