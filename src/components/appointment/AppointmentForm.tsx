
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  userName: z.string().min(2, {
    message: 'Le nom doit comporter au moins 2 caractères',
  }),
  userEmail: z.string().email({
    message: 'Veuillez entrer une adresse email valide',
  }),
  userPhone: z.string().optional(),
  notes: z.string().optional(),
});

interface AppointmentFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  isSubmitting
}) => {
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: user?.name || '',
      userEmail: user?.email || '',
      userPhone: user?.phone || '',
      notes: '',
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="userPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Votre numéro de téléphone" {...field} />
              </FormControl>
              <FormDescription>
                Nous ne vous appellerons que si nécessaire.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optionnel)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ajoutez des informations supplémentaires concernant votre rendez-vous" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Réservation en cours...' : 'Confirmer le rendez-vous'}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
