
import React, { useState } from 'react';
import { format, isBefore, addDays, startOfDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AppointmentDatePickerProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
}

const AppointmentDatePicker: React.FC<AppointmentDatePickerProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60); // Allow booking up to 60 days in advance
  
  // Quick date selection buttons (Today, Tomorrow, etc.)
  const quickDates = [
    { label: "Aujourd'hui", date: today, disabled: false },
    { label: "Demain", date: addDays(today, 1), disabled: false },
    { label: "Dans 2 jours", date: addDays(today, 2), disabled: false },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sélectionnez une date</h3>
      
      <div className="flex flex-wrap gap-2">
        {quickDates.map((item, index) => (
          <Button
            key={index}
            variant={selectedDate && isSameDay(selectedDate, item.date) ? "default" : "outline"}
            className="flex-1"
            disabled={item.disabled}
            onClick={() => onSelectDate(item.date)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, 'dd MMMM yyyy', { locale: fr })
              ) : (
                <span>Sélectionnez une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onSelectDate(date)}
              disabled={(date) => 
                isBefore(date, today) || 
                isBefore(maxDate, date)
              }
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default AppointmentDatePicker;
