
import React, { useState, useEffect } from 'react';
import { Appointment } from '@/types/appointment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle, Calendar, Clock, X, Info } from 'lucide-react';
import { cancelAppointment, getAppointmentById } from '@/services/appointmentService';
import { useToast } from '@/hooks/use-toast';

interface AppointmentListProps {
  appointments: Appointment[];
  refreshAppointments: () => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments,
  refreshAppointments 
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = async (appointmentId: string) => {
    const appointment = await getAppointmentById(appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsDialogOpen(true);
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;

    setIsCancelling(true);
    try {
      const success = await cancelAppointment(selectedAppointment.id);
      if (success) {
        toast({
          title: "Rendez-vous annulé",
          description: "Votre rendez-vous a été annulé avec succès.",
        });
        refreshAppointments();
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible d'annuler le rendez-vous.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation du rendez-vous.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // Function to get status badge
  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmé</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">En attente</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Annulé</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Terminé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Aucun rendez-vous</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Vous n'avez pas encore pris de rendez-vous.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date);
              const startTime = new Date(appointment.startTime);
              
              return (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.type.name}</TableCell>
                  <TableCell>
                    {format(appointmentDate, 'dd/MM/yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {format(startTime, 'HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(appointment.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(appointment.id)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Appointment details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
            <DialogDescription>
              Informations sur votre rendez-vous
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p>{selectedAppointment.type.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
                  <div>{getStatusBadge(selectedAppointment.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(selectedAppointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Heure</h4>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(new Date(selectedAppointment.startTime), 'HH:mm', { locale: fr })} - 
                    {format(new Date(selectedAppointment.endTime), 'HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                  <p className="text-sm">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedAppointment && selectedAppointment.status === 'pending' && (
              <Button 
                variant="default" 
                className="sm:ml-auto"
                disabled={isCancelling}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirmer
              </Button>
            )}
            
            {selectedAppointment && ['pending', 'confirmed'].includes(selectedAppointment.status) && (
              <Button 
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                <X className="h-4 w-4 mr-1" />
                Annuler
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentList;
