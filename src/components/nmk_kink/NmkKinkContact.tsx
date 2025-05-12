
import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  contactFormSchema, 
  ContactFormValues,
  ContactInformation,
  ProjectDetails,
  TermsAndSubmit
} from './contact';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NmkKinkContact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      businessName: "",
      phone: "",
      website: "",
      service: "",
      referralSource: "",
      projectDescription: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsSubmitting(true);
      
      // Mapper les données du formulaire au format de la table contact_requests
      const contactData = {
        prenom: data.firstName,
        nom: data.lastName,
        email: data.email,
        telephone: data.phone,
        entreprise: data.businessName,
        site_web: data.website,
        service_requis: data.service,
        origine: data.referralSource,
        description: data.projectDescription,
        consentement: data.termsAccepted
      };
      
      // Envoyer les données à Supabase
      const { error } = await supabase
        .from('contact_requests')
        .insert(contactData);
      
      if (error) throw error;
      
      // Fonctionnalité Edge Function existante (si disponible)
      // Tentative d'envoi via l'Edge Function
      try {
        await supabase.functions.invoke('contact-form', {
          body: contactData
        });
      } catch (functionError) {
        console.log('Edge function non disponible ou erreur:', functionError);
        // On continue même si l'edge function échoue, car les données sont déjà en base
      }
      
      setIsSuccess(true);
      toast({
        title: "Message envoyé!",
        description: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.",
      });
      
      form.reset();
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Contact
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Parlons de votre projet
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Prenez contact avec nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-6 text-xl font-bold text-center">Envoyez-nous un message</h3>
            
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Information Section */}
                <ContactInformation />
                
                {/* Project Details Section */}
                <ProjectDetails />

                {/* Terms and Submit Button */}
                <TermsAndSubmit isSubmitting={isSubmitting} isSuccess={isSuccess} />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkContact;
