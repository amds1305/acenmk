
import { useState } from 'react';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useMessageSender = (onClose: () => void) => {
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string, user: User) => {
    if (!message.trim() || !user) return;
    
    setSending(true);
    try {
      // Simuler l'envoi du message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${user.name}.`
      });
      
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message."
      });
    } finally {
      setSending(false);
    }
  };

  return {
    sending,
    sendMessage
  };
};
