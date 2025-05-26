
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface TermsFieldProps {
  control: Control<any>;
}

export const TermsField: React.FC<TermsFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="terms"
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>
            J'accepte les{' '}
            <Link to="/terms" className="text-primary hover:underline">
              conditions d'utilisation
            </Link>
          </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    )}
  />
);
