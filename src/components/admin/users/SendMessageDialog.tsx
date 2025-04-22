
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

interface SendMessageDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageDialog = ({ user, isOpen, onClose }: SendMessageDialogProps) => {
  const { toast } = useToast();
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const handleSend = async () => {
    if (!message.trim() || !user) return;
    
    setSending(true);
    try {
      // Simuler l'envoi du message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${user.name}.`
      });
      
      setMessage('');
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

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Envoyer un message à {user.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Écrivez votre message ici..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={sending || !message.trim()}
          >
            {sending ? "Envoi..." : "Envoyer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
