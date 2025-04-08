
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form Schema for validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  businessName: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  phone: z.string().min(1, { message: "Le numéro de téléphone est requis" }),
  website: z.string().optional(),
  service: z.string().min(1, { message: "Veuillez sélectionner un service" }),
  referralSource: z.string().min(1, { message: "Veuillez indiquer comment vous nous avez trouvés" }),
  projectDescription: z.string().min(10, { message: "Veuillez décrire votre projet (minimum 10 caractères)" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "Vous devez accepter les conditions" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mb-6"></div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your first name"
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
                      <FormLabel className="text-white">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Business Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Last Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your last name"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Phone <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(123) 456-7890"
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Details Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-6">Project Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          What service can we provide? <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-teal-500">
                              <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-app">Mobile Application</SelectItem>
                            <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                            <SelectItem value="cloud-infrastructure">Cloud Infrastructure</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          How did you hear about us? <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please include any keywords you have used to find us"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Please describe your project <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide as many details as you can for a more accurate estimate"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500 min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-white/80">
                          By submitting this form you agree to our <a href="#" className="text-teal-400 hover:underline">Terms and Conditions</a> and <a href="#" className="text-teal-400 hover:underline">Privacy Policy</a>.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6 px-8">
                SEND
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default TekoContact;
