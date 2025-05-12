
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  type: z.string().min(1, 'Le type d\'interaction est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
});

interface LeadAddInteractionProps {
  leadId: string;
}

const LeadAddInteraction: React.FC<LeadAddInteractionProps> = ({ leadId }) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      content: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, this would call the API to add an interaction
    console.log('New interaction for lead', leadId, values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Interaction ajoutée',
        description: 'L\'interaction a été ajoutée avec succès.',
      });
      form.reset();
    }, 500);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'interaction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Appel téléphonique</SelectItem>
                      <SelectItem value="meeting">Réunion</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Contenu de l'interaction..." 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
              Ajouter l'interaction
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LeadAddInteraction;
