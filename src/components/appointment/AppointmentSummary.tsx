
import React from 'react';
import { AppointmentType, TimeSlot } from '@/types/appointment';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, User } from 'lucide-react';

interface AppointmentSummaryProps {
  selectedType: AppointmentType | null;
  selectedDate: Date | undefined;
  selectedSlot: TimeSlot | null;
  userName?: string;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({
  selectedType,
  selectedDate,
  selectedSlot,
  userName
}) => {
  if (!selectedType || !selectedDate || !selectedSlot) {
    return null;
  }
  
  const startTime = new Date(selectedSlot.startTime);
  const endTime = new Date(selectedSlot.endTime);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Résumé du rendez-vous</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedType && (
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${selectedType.color || 'bg-primary'}`}>
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">{selectedType.name}</p>
              <p className="text-sm text-muted-foreground">Durée: {selectedType.duration} min</p>
              {selectedType.price && (
                <p className="text-sm font-medium mt-1">Prix: {selectedType.price} €</p>
              )}
            </div>
          </div>
        )}
        
        {selectedDate && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">
                {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
        )}
        
        {selectedSlot && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">
                {format(startTime, 'HH:mm', { locale: fr })} - {format(endTime, 'HH:mm', { locale: fr })}
              </p>
            </div>
          </div>
        )}
        
        {userName && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">{userName}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Un récapitulatif vous sera envoyé par email. Vous pourrez annuler ou reprogrammer votre rendez-vous jusqu'à 24 heures avant l'heure prévue.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AppointmentSummary;
