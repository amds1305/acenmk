
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppointments, updateAppointmentStatus } from '@/services/appointmentService';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, Mail, Phone, User, CheckCircle, X, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isUpdateStatusLoading, setIsUpdateStatusLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Fetch all appointments
  const { data: appointments = [], refetch } = useQuery({
    queryKey: ['adminAppointments'],
    queryFn: () => getAppointments(),
  });

  // Handle status change
  const handleStatusChange = async (status: Appointment['status']) => {
    if (!selectedAppointment) return;
    
    setIsUpdateStatusLoading(true);
    try {
      const updatedAppointment = await updateAppointmentStatus(selectedAppointment.id, status);
      if (updatedAppointment) {
        toast({
          title: "Statut mis à jour",
          description: `Le statut du rendez-vous a été modifié avec succès.`,
        });
        await refetch();
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de mettre à jour le statut du rendez-vous.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
      });
    } finally {
      setIsUpdateStatusLoading(false);
    }
  };

  // View appointment details
  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  // Get status badge
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

  // Filter appointments by date (most recent first)
  const sortedAppointments = [...appointments].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des rendez-vous</h1>
        <Button onClick={() => refetch()}>Actualiser</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucun rendez-vous trouvé
                </TableCell>
              </TableRow>
            ) : (
              sortedAppointments.map((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const startTime = new Date(appointment.startTime);
                
                return (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.userName}</TableCell>
                    <TableCell>{appointment.type.name}</TableCell>
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
                        onClick={() => handleViewDetails(appointment)}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Appointment details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
            <DialogDescription>
              Gérer les informations du rendez-vous
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedAppointment.userName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedAppointment.userEmail}</span>
                  </div>
                  {selectedAppointment.userPhone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{selectedAppointment.userPhone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Rendez-vous</h4>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Type:</span>
                    <span>{selectedAppointment.type.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(new Date(selectedAppointment.date), 'EEEE d MMMM yyyy', { locale: fr })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {format(new Date(selectedAppointment.startTime), 'HH:mm', { locale: fr })} - 
                      {format(new Date(selectedAppointment.endTime), 'HH:mm', { locale: fr })}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                  <p className="text-sm p-3 bg-muted rounded-md">{selectedAppointment.notes}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
                <Select 
                  defaultValue={selectedAppointment.status}
                  onValueChange={(value) => handleStatusChange(value as Appointment['status'])}
                  disabled={isUpdateStatusLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="canceled">Annulé</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="sm:ml-auto"
            >
              Fermer
            </Button>
            
            {selectedAppointment && selectedAppointment.status === 'pending' && (
              <>
                <Button
                  variant="default"
                  onClick={() => handleStatusChange('confirmed')}
                  disabled={isUpdateStatusLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirmer
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange('canceled')}
                  disabled={isUpdateStatusLoading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Annuler
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAppointments;
