
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAuth } from '@/contexts/AuthContext';
import type { UserPreferences as UserPreferencesType } from '@/types/auth';

// Form structure for preferences
interface PreferencesFormValues {
  notifications?: {
    email?: boolean;
    sms?: boolean;
    projectUpdates?: boolean;
    marketing?: boolean;
  };
  privacy?: {
    profileVisibility?: "public" | "private" | "contacts_only";
    showEmail?: boolean;
    showPhone?: boolean;
  };
  theme?: "light" | "dark" | "system";
}

const UserPreferences: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = React.useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  // Default values if user preferences are not set
  const defaultValues: PreferencesFormValues = {
    notifications: {
      email: true,
      sms: false,
      projectUpdates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
    theme: "system",
  };
  
  // Initialize form with user preferences or defaults
  const form = useForm<PreferencesFormValues>({
    defaultValues: user?.preferences ? {
      notifications: {
        email: user.preferences.emailNotifications,
        sms: false,
        projectUpdates: true,
        marketing: false,
      },
      privacy: {
        profileVisibility: "public",
        showEmail: false, 
        showPhone: false,
      },
      theme: user.preferences.darkMode ? "dark" : "light",
    } : defaultValues
  });
  
  const onSubmit = async (values: PreferencesFormValues) => {
    setIsSaving('saving');
    try {
      // Convert form values to UserPreferences format
      const userPreferences: Partial<UserPreferencesType> = {
        emailNotifications: values.notifications?.email || false,
        darkMode: values.theme === "dark",
        language: "fr",
      };
      
      // Save preferences
      await updateProfile({ 
        id: user?.id || '',
        preferences: userPreferences as UserPreferencesType
      });
      
      setIsSaving('success');
      setTimeout(() => setIsSaving('idle'), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setIsSaving('error');
      setTimeout(() => setIsSaving('idle'), 5000);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Préférences</CardTitle>
          <CardDescription>
            Gérez vos préférences de notification et paramètres
          </CardDescription>
        </div>
        <SaveIndicator status={isSaving} />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              
              <FormField
                control={form.control}
                name="notifications.email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <FormLabel>Emails</FormLabel>
                      <FormDescription>
                        Recevoir des notifications par email
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
                  <FormItem className="flex flex-row items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <FormLabel>SMS</FormLabel>
                      <FormDescription>
                        Recevoir des notifications par SMS
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
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Confidentialité</h3>
              
              <FormField
                control={form.control}
                name="privacy.profileVisibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibilité du profil</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="public" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Public
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="private" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Privé
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="contacts_only" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Contacts seulement
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thème</h3>
              
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="light" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Clair
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dark" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Sombre
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="system" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Système
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit">Enregistrer les préférences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
