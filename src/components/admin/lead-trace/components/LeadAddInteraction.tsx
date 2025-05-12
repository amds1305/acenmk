
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Mail, MessageSquare, Phone, Send, FileText, Loader2 } from 'lucide-react';
import { addLeadInteraction } from '@/services/leadTraceService';
import { useToast } from '@/hooks/use-toast';

interface LeadAddInteractionProps {
  leadId: string;
}

const interactionTypes = [
  { value: 'note', label: 'Note', icon: <FileText className="mr-2 h-4 w-4" /> },
  { value: 'call', label: 'Appel', icon: <Phone className="mr-2 h-4 w-4" /> },
  { value: 'email', label: 'Email', icon: <Mail className="mr-2 h-4 w-4" /> },
  { value: 'meeting', label: 'Rendez-vous', icon: <Calendar className="mr-2 h-4 w-4" /> },
  { value: 'message', label: 'Message', icon: <MessageSquare className="mr-2 h-4 w-4" /> },
];

const LeadAddInteraction: React.FC<LeadAddInteractionProps> = ({ leadId }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('note');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: 'Champ requis',
        description: 'Veuillez saisir le contenu de l\'interaction',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Utiliser un nom d'utilisateur fictif pour les tests
      // Dans une application réelle, ce serait l'utilisateur connecté
      const userName = 'Utilisateur Test';
      
      const success = await addLeadInteraction(leadId, type, content, userName);
      
      if (success) {
        toast({
          title: 'Interaction ajoutée',
          description: 'L\'interaction a été enregistrée avec succès',
        });
        setContent('');
      } else {
        throw new Error('Échec de l\'ajout de l\'interaction');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'interaction:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter l\'interaction',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Select
          value={type}
          onValueChange={setType}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'interaction" />
          </SelectTrigger>
          <SelectContent>
            {interactionTypes.map((item) => (
              <SelectItem key={item.value} value={item.value} className="flex items-center gap-2">
                <div className="flex items-center">
                  {item.icon}
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ajouter une nouvelle interaction..."
          className="flex-1"
          disabled={isSubmitting}
        />

        <Button type="submit" size="sm" className="self-end" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default LeadAddInteraction;
