
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { ContactFormValues } from "./contactFormSchema";

const ProjectDetails: React.FC = () => {
  const form = useFormContext<ContactFormValues>();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Service requis <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900">
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web-development">Développement Web</SelectItem>
                  <SelectItem value="mobile-app">Application Mobile</SelectItem>
                  <SelectItem value="ui-ux">Design UI/UX</SelectItem>
                  <SelectItem value="cloud-infrastructure">Infrastructure Cloud</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
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
              <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                Comment avez-vous entendu parler de nous? <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Veuillez indiquer comment vous nous avez trouvés"
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
        name="projectDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
              Description du projet <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez votre projet en quelques mots..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                rows={5}
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

export default ProjectDetails;
