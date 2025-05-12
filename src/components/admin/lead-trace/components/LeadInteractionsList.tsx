
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, MessageSquare, Phone, Mail, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { fetchLeadInteractions } from '@/services/leadTraceService';
import { LeadInteraction } from '@/types/lead';

interface LeadInteractionsListProps {
  leadId: string;
}

// Configurations des icônes par type d'interaction
const interactionIcons: Record<string, React.ReactNode> = {
  'note': <FileText className="h-4 w-4" />,
  'call': <Phone className="h-4 w-4" />,
  'email': <Mail className="h-4 w-4" />,
  'meeting': <Calendar className="h-4 w-4" />,
  'message': <MessageSquare className="h-4 w-4" />,
};

// Configurations des couleurs par type d'interaction
const interactionColors: Record<string, string> = {
  'note': 'bg-blue-50 text-blue-600',
  'call': 'bg-green-50 text-green-600',
  'email': 'bg-purple-50 text-purple-600',
  'meeting': 'bg-amber-50 text-amber-600',
  'message': 'bg-gray-50 text-gray-600',
};

const LeadInteractionsList: React.FC<LeadInteractionsListProps> = ({ leadId }) => {
  const [interactions, setInteractions] = useState<LeadInteraction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInteractions();
  }, [leadId]);

  const loadInteractions = async () => {
    setLoading(true);
    try {
      const data = await fetchLeadInteractions(leadId);
      setInteractions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des interactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInteractionIcon = (type: string) => {
    return interactionIcons[type] || <FileText className="h-4 w-4" />;
  };

  const getInteractionColor = (type: string) => {
    return interactionColors[type] || 'bg-gray-50 text-gray-600';
  };

  const getInteractionLabel = (type: string) => {
    switch (type) {
      case 'note': return 'Note';
      case 'call': return 'Appel';
      case 'email': return 'Email';
      case 'meeting': return 'Rendez-vous';
      case 'message': return 'Message';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (interactions.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">Aucune interaction enregistrée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interactions.map((interaction) => (
        <Card key={interaction.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              <div className={`p-4 ${getInteractionColor(interaction.type)}`}>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  {getInteractionIcon(interaction.type)}
                </div>
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{getInteractionLabel(interaction.type)}</span>
                    <span className="text-sm text-muted-foreground ml-2">par {interaction.user_name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(interaction.created_at), 'dd MMM yyyy à HH:mm', { locale: fr })}
                  </span>
                </div>
                <p className="mt-2 text-sm">{interaction.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadInteractionsList;
