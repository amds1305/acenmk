
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from './contact/contactFormSchema';
import ContactInformation from './contact/ContactInformation';
import ProjectDetails from './contact/ProjectDetails';
import TermsAndSubmit from './contact/TermsAndSubmit';

const TekoContact: React.FC = () => {
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
    // Usually you would send the data to a server here
    alert("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
            <div className="w-24 h-1 bg-teal-500 mb-6"></div>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
    </section>
  );
};

export default TekoContact;
