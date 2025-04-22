
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from '@/types/auth';

interface MessageFormProps {
  message: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  sending: boolean;
}

const MessageForm = ({ message, onChange, onSubmit, sending }: MessageFormProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Écrivez votre message ici..."
        value={message}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={onSubmit} 
          disabled={sending || !message.trim()}
        >
          {sending ? "Envoi..." : "Envoyer"}
        </Button>
      </div>
    </div>
  );
};

export default MessageForm;
