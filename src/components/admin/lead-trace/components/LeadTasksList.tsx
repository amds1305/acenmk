
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadTask } from '@/types/lead';

interface LeadTasksListProps {
  leadId: string;
}

// Mock tasks data
const mockTasks: LeadTask[] = [
  {
    id: '1',
    lead_id: '1',
    title: 'Envoyer une proposition commerciale',
    description: 'Préparer et envoyer une proposition détaillée pour le projet e-commerce',
    due_date: '2025-05-15T10:00:00Z',
    status: 'pending',
    priority: 'high',
    assigned_to: 'Sophie Tremblay',
    created_at: '2025-05-02T14:30:00Z',
    updated_at: '2025-05-02T14:30:00Z',
  },
  {
    id: '2',
    lead_id: '1',
    title: 'Appeler pour discuter des besoins spécifiques',
    description: 'Prendre rendez-vous téléphonique pour clarifier les fonctionnalités requises',
    due_date: '2025-05-10T14:00:00Z',
    status: 'completed',
    priority: 'medium',
    assigned_to: 'Thomas Bernard',
    created_at: '2025-05-03T10:15:00Z',
    updated_at: '2025-05-05T09:30:00Z',
  },
  {
    id: '3',
    lead_id: '1',
    title: 'Organiser une démo de notre plateforme',
    status: 'pending',
    priority: 'low',
    assigned_to: 'Sophie Tremblay',
    created_at: '2025-05-06T15:30:00Z',
    updated_at: '2025-05-06T15:30:00Z',
  },
];

const LeadTasksList: React.FC<LeadTasksListProps> = ({ leadId }) => {
  const { toast } = useToast();
  // Filter tasks for this specific lead
  const tasks = mockTasks.filter(task => task.lead_id === leadId);
  const [taskStatuses, setTaskStatuses] = useState<Record<string, boolean>>(
    tasks.reduce((acc, task) => ({
      ...acc,
      [task.id]: task.status === 'completed'
    }), {})
  );

  const handleToggleTask = (taskId: string) => {
    setTaskStatuses(prev => {
      const newStatus = !prev[taskId];
      
      // In a real app, this would update the task status in the database
      console.log(`Updating task ${taskId} status to ${newStatus ? 'completed' : 'pending'}`);
      
      toast({
        title: newStatus ? 'Tâche terminée' : 'Tâche rouverte',
        description: `La tâche a été marquée comme ${newStatus ? 'terminée' : 'à faire'}`,
      });
      
      return {
        ...prev,
        [taskId]: newStatus
      };
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleAddTask = () => {
    toast({
      title: 'Fonctionnalité à venir',
      description: 'L\'ajout de tâches sera disponible prochainement.',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Tâches</CardTitle>
          <CardDescription>
            Suivez les activités à réaliser pour ce lead
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleAddTask}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvelle tâche
        </Button>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune tâche créée pour ce lead
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`p-4 border rounded-md ${taskStatuses[task.id] ? 'bg-muted/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={taskStatuses[task.id]}
                    onCheckedChange={() => handleToggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`font-medium ${taskStatuses[task.id] ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.title}
                    </label>
                    
                    {task.description && (
                      <p className={`text-sm mt-1 ${taskStatuses[task.id] ? 'text-muted-foreground' : ''}`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {task.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Échéance: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {task.priority && (
                        <div>
                          {getPriorityBadge(task.priority)}
                        </div>
                      )}
                      
                      {task.assigned_to && (
                        <div>
                          Assignée à: {task.assigned_to}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadTasksList;
