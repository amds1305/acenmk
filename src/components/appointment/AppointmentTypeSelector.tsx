
import React from 'react';
import { AppointmentType } from '@/types/appointment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentTypeSelectorProps {
  types: AppointmentType[];
  selectedType: AppointmentType | null;
  onSelectType: (type: AppointmentType) => void;
}

const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({
  types,
  selectedType,
  onSelectType
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sélectionnez un type de rendez-vous</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map((type) => (
          <Card 
            key={type.id}
            className={cn(
              "cursor-pointer border-2 transition-all",
              selectedType?.id === type.id
                ? "border-primary"
                : "hover:border-primary/50"
            )}
            onClick={() => onSelectType(type)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{type.name}</CardTitle>
                {selectedType?.id === type.id && (
                  <div className="bg-primary rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              {type.price && (
                <CardDescription>{type.price} €</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{type.description}</p>
              <p className="text-sm mt-2 font-medium">Durée: {type.duration} min</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTypeSelector;
