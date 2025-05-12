
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ContactEmailSettings } from '@/types/contact';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';

// Schéma de validation
const emailSettingsSchema = z.object({
  destinataires: z.string().min(1, "Au moins un destinataire est requis"),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  objet: z.string().min(1, "L'objet de l'email est requis"),
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

const EmailSettingsForm: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      destinataires: "",
      cc: "",
      bcc: "",
      objet: "",
    },
  });

  // Récupération des paramètres existants
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contact_email_settings')
          .select('*')
          .limit(1);

        if (error) throw error;
        
        if (data && data.length > 0) {
          // Utiliser le premier résultat au lieu de .single()
          const settings = data[0];
          setSettingsId(settings.id);
          form.reset({
            destinataires: Array.isArray(settings.destinataires) ? settings.destinataires.join(', ') : '',
            cc: Array.isArray(settings.cc) ? settings.cc.join(', ') : '',
            bcc: Array.isArray(settings.bcc) ? settings.bcc.join(', ') : '',
            objet: settings.objet || '',
          });
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: `Impossible de charger les paramètres: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [form, toast]);

  // Traitement des emails (conversion de la chaîne aux formats séparés par des virgules)
  const parseEmails = (emailString: string): string[] => {
    if (!emailString) return [];
    return emailString.split(',').map(email => email.trim()).filter(email => email !== '');
  };

  const onSubmit = async (values: EmailSettingsFormValues) => {
    try {
      setSaving(true);
      
      const settingsToSave = {
        destinataires: parseEmails(values.destinataires),
        cc: parseEmails(values.cc || ''),
        bcc: parseEmails(values.bcc || ''),
        objet: values.objet,
      };
      
      let error;
      
      if (settingsId) {
        // Mise à jour des paramètres existants
        const response = await supabase
          .from('contact_email_settings')
          .update(settingsToSave)
          .eq('id', settingsId);
        error = response.error;
      } else {
        // Création de nouveaux paramètres
        const response = await supabase
          .from('contact_email_settings')
          .insert(settingsToSave);
        error = response.error;
      }
      
      if (error) throw error;
      
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres d'email ont été mis à jour avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de sauvegarder les paramètres: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres des emails de notification</CardTitle>
        <CardDescription>
          Configurez les destinataires et l'objet des emails envoyés lors de la réception d'un nouveau message via le formulaire de contact.
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="destinataires"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destinataires principaux</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@domaine.com, exemple2@domaine.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Séparez les adresses email par des virgules.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copie carbone (CC)</FormLabel>
                      <FormControl>
                        <Input placeholder="cc1@domaine.com, cc2@domaine.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Destinataires en copie, séparés par des virgules. Optionnel.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bcc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copie cachée (BCC)</FormLabel>
                      <FormControl>
                        <Input placeholder="bcc1@domaine.com, bcc2@domaine.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Destinataires en copie cachée, séparés par des virgules. Optionnel.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet de l'email</FormLabel>
                      <FormControl>
                        <Input placeholder="Nouvelle demande de contact via le site web" {...field} />
                      </FormControl>
                      <FormDescription>
                        L'objet des emails de notification.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              disabled={loading || saving}
              className="ml-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default EmailSettingsForm;
