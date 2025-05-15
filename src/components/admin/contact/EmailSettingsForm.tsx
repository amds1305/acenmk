
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Schéma de validation pour le formulaire
const formSchema = z.object({
  destinataires: z.string()
    .min(1, "Au moins un destinataire est requis"),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  objet: z.string()
    .min(1, "Un objet est requis")
});

type FormValues = z.infer<typeof formSchema>;

const EmailSettingsForm: React.FC = () => {
  const { toast } = useToast();
  
  // Initialisation du formulaire avec react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinataires: "contact@example.com",
      cc: "",
      bcc: "",
      objet: "Nouvelle demande de contact via le site web"
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = async (values: FormValues) => {
    try {
      // Dans une version réelle, nous sauvegarderions ces valeurs dans Supabase
      console.log("Sauvegarde des paramètres email:", values);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres de notification ont été mis à jour",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Une erreur s'est produite lors de la sauvegarde des paramètres",
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="destinataires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinataires principaux</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com, email2@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Séparez plusieurs adresses par des virgules.
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
                  <FormLabel>Copie (CC)</FormLabel>
                  <FormControl>
                    <Input placeholder="cc@example.com, cc2@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Destinataires en copie (facultatif).
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
                    <Input placeholder="bcc@example.com, bcc2@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Destinataires en copie cachée (facultatif).
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
                  <FormLabel>Objet du message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    L'objet du message envoyé lorsqu'un nouveau contact est reçu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Enregistrer les paramètres</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailSettingsForm;
