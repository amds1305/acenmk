
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  contactFormSchema, 
  ContactFormValues,
  ContactInformation,
  ProjectDetails,
  TermsAndSubmit
} from './contact';

const NmkKinkContact: React.FC = () => {
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

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    // Normally you would send the data to a server here
    alert("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
    form.reset();
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
                <TermsAndSubmit />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkContact;
