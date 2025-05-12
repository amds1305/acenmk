
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Calendar, User } from 'lucide-react';
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
    description: 'Préparer et envoyer un devis détaillé pour le projet e-commerce',
    due_date: '2025-05-10T17:00:00Z',
    status: 'pending',
    priority: 'high',
    assigned_to: 'Sophie Tremblay',
    created_at: '2025-05-03T10:15:00Z',
    updated_at: '2025-05-03T10:15:00Z',
  },
  {
    id: '2',
    lead_id: '1',
    title: 'Planifier une réunion de découverte',
    description: 'Contacter le client pour organiser une réunion approfondie sur ses besoins',
    due_date: '2025-05-08T10:00:00Z',
    status: 'pending',
    priority: 'medium',
    assigned_to: 'Thomas Bernard',
    created_at: '2025-05-03T11:30:00Z',
    updated_at: '2025-05-03T11:30:00Z',
  },
];

const LeadTasksList: React.FC<LeadTasksListProps> = ({ leadId }) => {
  // In a real application, this would fetch tasks from the API based on leadId
  const [tasks, setTasks] = useState(mockTasks.filter(task => task.lead_id === leadId));
  const { toast } = useToast();

  const handleTaskStatusChange = (taskId: string, checked: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: checked ? 'completed' : 'pending' };
      }
      return task;
    }));

    toast({
      title: 'Tâche mise à jour',
      description: checked ? 'La tâche a été marquée comme terminée.' : 'La tâche a été marquée comme en cours.',
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Faible</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Haute</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Urgente</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle tâche
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tâches associées</CardTitle>
          <CardDescription>
            Gestion des tâches liées à ce lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune tâche associée à ce lead
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 border rounded-md ${task.status === 'completed' ? 'bg-muted/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id={`task-${task.id}`} 
                      checked={task.status === 'completed'}
                      onCheckedChange={(checked) => handleTaskStatusChange(task.id, !!checked)} 
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <label 
                          htmlFor={`task-${task.id}`} 
                          className={`font-medium cursor-pointer ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {task.title}
                        </label>
                        {getPriorityBadge(task.priority)}
                      </div>
                      
                      {task.description && (
                        <div className="mt-1 text-sm text-muted-foreground">
                          {task.description}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        {task.due_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(task.due_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {task.assigned_to && (
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{task.assigned_to}</span>
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
    </>
  );
};

export default LeadTasksList;
