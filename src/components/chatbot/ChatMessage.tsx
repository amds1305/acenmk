
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = format(message.timestamp, 'HH:mm');

  return (
    <div className={cn(
      'flex mb-3',
      isBot ? 'justify-start' : 'justify-end'
    )}>
      <div className={cn(
        'p-3 rounded-lg max-w-[80%]',
        isBot 
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
          : 'bg-primary text-white'
      )}>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <span className={cn(
          'text-xs mt-1 block text-right',
          isBot ? 'text-gray-500 dark:text-gray-400' : 'text-primary-foreground/70'
        )}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
