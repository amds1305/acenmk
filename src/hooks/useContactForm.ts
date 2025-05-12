
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { supabase } from '@/integrations/supabase/client';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      entreprise: "",
      site_web: "",
      service_requis: "",
      origine: "",
      description: "",
      consentement: false,
      _honeypot: "",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      
      const { data: response, error } = await supabase.functions.invoke('contact-form', {
        body: data
      });
      
      if (error) {
        throw error;
      }
      
      if (response.success) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Message envoyé !",
          description: "Votre demande a bien été enregistrée. Nous vous contacterons bientôt.",
        });
      } else {
        throw new Error(response.error || "Une erreur s'est produite lors de l'envoi du formulaire.");
      }
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
