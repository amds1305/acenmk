
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/auth";
import MessageForm from './message/MessageForm';
import { useMessageSender } from '@/hooks/admin/useMessageSender';

interface SendMessageDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageDialog = ({ user, isOpen, onClose }: SendMessageDialogProps) => {
  const [message, setMessage] = useState('');
  const { sending, sendMessage } = useMessageSender(onClose);

  const handleSubmit = async () => {
    if (!user) return;
    await sendMessage(message, user);
    setMessage('');
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Envoyer un message à {user.name}</DialogTitle>
        </DialogHeader>

        <MessageForm
          message={message}
          onChange={setMessage}
          onSubmit={handleSubmit}
          sending={sending}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
