
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';

interface OptionalFieldsProps {
  control: Control<any>;
}

export const OptionalFields: React.FC<OptionalFieldsProps> = ({ control }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField 
      control={control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Entreprise (optionnel)</FormLabel>
          <FormControl>
            <Input placeholder="Nom de votre entreprise" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Téléphone (optionnel)</FormLabel>
          <FormControl>
            <Input placeholder="Votre numéro de téléphone" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
