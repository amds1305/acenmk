
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  notificationsEnabled: z.boolean().default(true),
  notificationEmail: z.string().email('Email invalide'),
  leadExpiryDays: z.string().min(1, 'Ce champ est requis'),
  defaultStatus: z.string().min(1, 'Ce champ est requis'),
  showArchivedLeads: z.boolean().default(false),
  enableExport: z.boolean().default(true),
});

const SettingsManager: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notificationsEnabled: true,
      notificationEmail: 'admin@example.com',
      leadExpiryDays: '90',
      defaultStatus: 'new',
      showArchivedLeads: false,
      enableExport: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Settings form values:', values);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: 'Paramètres sauvegardés',
        description: 'Les paramètres ont été mis à jour avec succès.',
      });
    }, 500);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Notifications</h3>
            
            <FormField
              control={form.control}
              name="notificationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Notifications par email
                    </FormLabel>
                    <FormDescription>
                      Recevez des notifications par email pour les nouveaux leads
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notificationEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email de notification</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Les notifications de nouveaux leads seront envoyées à cette adresse
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Paramètres généraux</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="leadExpiryDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Délai d'expiration des leads (jours)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Les leads seront automatiquement archivés après ce délai
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="defaultStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut par défaut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">Nouveau</SelectItem>
                        <SelectItem value="in-progress">En cours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Statut attribué aux nouveaux leads
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="showArchivedLeads"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Afficher les leads archivés
                    </FormLabel>
                    <FormDescription>
                      Inclure les leads archivés dans la liste principale
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="enableExport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Activer l'export de données
                    </FormLabel>
                    <FormDescription>
                      Permettre l'export des données au format CSV
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="flex justify-end">
            <Button type="submit">Enregistrer les paramètres</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsManager;
