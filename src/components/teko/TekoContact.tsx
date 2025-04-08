
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form Schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Veuillez sélectionner un sujet" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const TekoContact: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    // Usually you would send the data to a server here
    alert("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
    form.reset();
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      value: 'contact@visiontech.fr',
      href: 'mailto:contact@visiontech.fr',
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789',
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Adresse',
      value: '123 Avenue de l\'Innovation, 75001 Paris',
      href: 'https://maps.google.com',
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactez-nous</h2>
              <div className="w-16 h-0.5 bg-teal-500 mb-8"></div>
              <p className="text-white/70 mb-8">
                Prêt à transformer votre vision en réalité ? Remplissez le formulaire ci-dessous
                et notre équipe vous contactera dans les plus brefs délais.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Nom complet</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Votre nom"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="votre@email.com"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nom de votre entreprise"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Sujet</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-teal-500">
                                <SelectValue placeholder="Sélectionnez un sujet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Projet web">Projet web</SelectItem>
                              <SelectItem value="Application mobile">Application mobile</SelectItem>
                              <SelectItem value="Cloud & Infrastructure">Cloud & Infrastructure</SelectItem>
                              <SelectItem value="Conseil">Conseil</SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet ou votre demande..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500 min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-white text-[#0a0c10] hover:bg-white/90 rounded-full py-6">
                    Envoyer le message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info Column */}
            <div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10">
                <h3 className="text-2xl font-medium mb-8">Informations de contact</h3>
                
                <div className="space-y-6 mb-10">
                  {contactInfo.map((info, index) => (
                    <a 
                      key={index}
                      href={info.href}
                      className="flex items-start hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="p-3 rounded-lg bg-white/10 mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/60">{info.title}</h4>
                        <p className="font-medium mt-1">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">Horaires d'ouverture</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Lundi - Vendredi</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Samedi</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-medium mb-4">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TekoContact;
