
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Calendar, Mail } from 'lucide-react';

interface LeadInteractionsListProps {
  leadId: string;
}

// Mock interactions data
const mockInteractions = [
  {
    id: '1',
    lead_id: '1',
    user_id: 'user1',
    user_name: 'Sophie Tremblay',
    type: 'email',
    content: 'Email envoyé pour confirmer la réception de la demande',
    created_at: '2025-05-02T14:30:00Z',
  },
  {
    id: '2',
    lead_id: '1',
    user_id: 'user1',
    user_name: 'Sophie Tremblay',
    type: 'call',
    content: 'Appel pour discuter des besoins spécifiques du projet de site e-commerce',
    created_at: '2025-05-03T10:15:00Z',
  },
  {
    id: '3',
    lead_id: '1',
    user_id: 'user2',
    user_name: 'Thomas Bernard',
    type: 'note',
    content: 'Client très intéressé par nos services, besoin d\'un devis détaillé',
    created_at: '2025-05-03T16:45:00Z',
  },
];

const LeadInteractionsList: React.FC<LeadInteractionsListProps> = ({ leadId }) => {
  // In a real application, this would fetch interactions from the API based on leadId
  const interactions = mockInteractions.filter(interaction => interaction.lead_id === leadId);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'call':
        return <Phone className="h-5 w-5" />;
      case 'meeting':
        return <Calendar className="h-5 w-5" />;
      case 'note':
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getInteractionBadge = (type: string) => {
    switch (type) {
      case 'email':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Email</Badge>;
      case 'call':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Appel</Badge>;
      case 'meeting':
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-0">Réunion</Badge>;
      case 'note':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Note</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Historique des interactions</CardTitle>
        <CardDescription>
          Consultez les interactions récentes avec ce contact
        </CardDescription>
      </CardHeader>
      <CardContent>
        {interactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune interaction enregistrée pour ce lead
          </div>
        ) : (
          <div className="space-y-6 relative pl-6 border-l border-border">
            {interactions.map((interaction) => (
              <div key={interaction.id} className="relative">
                <div className="absolute -left-[21px] mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium flex items-center gap-2">
                      {getInteractionBadge(interaction.type)}
                      <span>{interaction.user_name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(interaction.created_at).toLocaleDateString()} - {new Date(interaction.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="mt-1">{interaction.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadInteractionsList;
