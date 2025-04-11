
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ContactFormValues } from './contactFormSchema';

const ContactInformation: React.FC = () => {
  const form = useFormContext<ContactFormValues>();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Prénom <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre prénom"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Nom <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="votre@email.com"
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Téléphone <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre numéro de téléphone"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
              Nom de l'entreprise <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Nom de votre entreprise"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
            <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
              Site web
            </FormLabel>
            <FormControl>
              <Input
                placeholder="https://"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactInformation;
