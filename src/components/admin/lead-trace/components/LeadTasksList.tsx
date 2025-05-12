
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface LeadTasksListProps {
  leadId: string;
}

const LeadTasksList: React.FC<LeadTasksListProps> = ({ leadId }) => {
  // Fonctionnalité à implémenter dans une future itération
  // Affiche simplement un message pour le moment
  
  return (
    <Card className="rounded-lg border border-dashed p-8">
      <CardContent className="flex flex-col items-center justify-center space-y-3 p-0">
        <Clock className="h-10 w-10 text-muted-foreground" />
        <p className="text-center text-muted-foreground">
          La gestion des tâches sera disponible dans une prochaine mise à jour.
        </p>
      </CardContent>
    </Card>
  );
};

export default LeadTasksList;
