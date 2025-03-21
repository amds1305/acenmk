
import React from 'react';
import { TimeSlot } from '@/types/appointment';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentTimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  isLoading: boolean;
}

const AppointmentTimeSlots: React.FC<AppointmentTimeSlotsProps> = ({
  timeSlots,
  selectedSlot,
  onSelectSlot,
  isLoading
}) => {
  // Group time slots by morning and afternoon
  const morningSlots = timeSlots.filter(
    slot => new Date(slot.startTime).getHours() < 12
  );
  
  const afternoonSlots = timeSlots.filter(
    slot => new Date(slot.startTime).getHours() >= 12
  );
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (timeSlots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun créneau disponible pour cette date</p>
        <p className="text-sm mt-2">Veuillez sélectionner une autre date</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center">
        <Clock className="mr-2 h-5 w-5" />
        Sélectionnez un créneau horaire
      </h3>
      
      {morningSlots.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Matin</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {morningSlots.map(slot => (
              <TimeSlotButton
                key={slot.id}
                slot={slot}
                selectedSlot={selectedSlot}
                onSelectSlot={onSelectSlot}
              />
            ))}
          </div>
        </div>
      )}
      
      {afternoonSlots.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Après-midi</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {afternoonSlots.map(slot => (
              <TimeSlotButton
                key={slot.id}
                slot={slot}
                selectedSlot={selectedSlot}
                onSelectSlot={onSelectSlot}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface TimeSlotButtonProps {
  slot: TimeSlot;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  slot,
  selectedSlot,
  onSelectSlot
}) => {
  const startTime = new Date(slot.startTime);
  const formattedTime = format(startTime, 'HH:mm', { locale: fr });
  
  return (
    <Button
      variant={selectedSlot?.id === slot.id ? "default" : "outline"}
      className={cn(
        "w-full",
        !slot.available && "opacity-50 cursor-not-allowed"
      )}
      disabled={!slot.available}
      onClick={() => slot.available && onSelectSlot(slot)}
    >
      {formattedTime}
    </Button>
  );
};

export default AppointmentTimeSlots;
