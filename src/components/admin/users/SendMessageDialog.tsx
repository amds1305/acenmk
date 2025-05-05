
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface SendMessageDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  user,
  isOpen,
  onClose
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    setIsLoading(true);
    
    // Simuler l'envoi d'un message
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${user?.name} via ${messageType}.`
      });
      
      setIsLoading(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setSubject('');
    setMessage('');
    setMessageType('email');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer un message</DialogTitle>
          <DialogDescription>
            Envoyez un message à {user?.name}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="message-type">Type de message</Label>
            <Select
              value={messageType}
              onValueChange={setMessageType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type de message" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="notification">Notification système</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Entrez le sujet"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Entrez votre message ici..."
              rows={5}
              required
            />
          </div>
        </form>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading || !subject || !message}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Envoyer'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
