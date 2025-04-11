
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User as UserType, UserPreferences } from '@/types/auth';
import { Bell, Eye, Palette } from 'lucide-react';

const preferencesFormSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    projectUpdates: z.boolean(),
    marketing: z.boolean(),
  }),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'private', 'contacts_only']),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
  }),
  theme: z.enum(['light', 'dark', 'system']),
});

interface UserPreferencesProps {
  user: UserType;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
}

const UserPreferences = ({ user, updatePreferences }: UserPreferencesProps) => {
  const defaultPreferences = user.preferences || {
    notifications: {
      email: true,
      sms: false,
      projectUpdates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: 'public' as const,
      showEmail: false,
      showPhone: false,
    },
    theme: 'system' as const,
  };

  const form = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: defaultPreferences,
  });

  const onSubmit = async (values: z.infer<typeof preferencesFormSchema>) => {
    await updatePreferences(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences utilisateur</CardTitle>
        <CardDescription>
          Gérez vos préférences de notification, de confidentialité et d'affichage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Notification Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Notifications</h3>
              </div>
              
              <FormField
                control={form.control}
                name="notifications.email"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Notifications par e-mail
                      </FormLabel>
                      <FormDescription>
                        Recevez des notifications par e-mail sur les mises à jour de vos projets.
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
                name="notifications.sms"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Notifications par SMS
                      </FormLabel>
                      <FormDescription>
                        Recevez des alertes SMS pour les mises à jour importantes.
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
                name="notifications.projectUpdates"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Mises à jour des projets
                      </FormLabel>
                      <FormDescription>
                        Recevez des notifications lorsque vos projets sont mis à jour.
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
                name="notifications.marketing"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Communications marketing
                      </FormLabel>
                      <FormDescription>
                        Recevez des newsletters et des offres spéciales.
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
            
            {/* Privacy Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Confidentialité</h3>
              </div>
              
              <FormField
                control={form.control}
                name="privacy.profileVisibility"
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4">
                    <FormLabel className="text-base mb-2 block">
                      Visibilité du profil
                    </FormLabel>
                    <FormDescription className="mb-4">
                      Choisissez qui peut voir votre profil
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="public" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Public - Visible par tout le monde
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="contacts_only" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Contacts uniquement - Visible par vos contacts
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="private" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Privé - Visible uniquement par vous
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="privacy.showEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Afficher l'adresse e-mail
                      </FormLabel>
                      <FormDescription>
                        Permettre aux autres utilisateurs de voir votre adresse e-mail.
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
                name="privacy.showPhone"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Afficher le numéro de téléphone
                      </FormLabel>
                      <FormDescription>
                        Permettre aux autres utilisateurs de voir votre numéro de téléphone.
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
            
            {/* Theme Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Apparence</h3>
              </div>
              
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4">
                    <FormLabel className="text-base mb-2 block">
                      Thème
                    </FormLabel>
                    <FormDescription className="mb-4">
                      Personnalisez l'apparence de l'interface
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="light" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Clair
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dark" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sombre
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="system" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Système (utiliser les paramètres de votre appareil)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Enregistrer les préférences
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
