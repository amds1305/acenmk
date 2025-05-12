
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { useFormContext } from "react-hook-form";
import { ContactFormValues } from "./contactFormSchema";

interface TermsAndSubmitProps {
  isSubmitting?: boolean;
  isSuccess?: boolean;
}

const TermsAndSubmit: React.FC<TermsAndSubmitProps> = ({ 
  isSubmitting = false,
  isSuccess = false 
}) => {
  const form = useFormContext<ContactFormValues>();
  
  return (
    <>
      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm text-gray-700">
                J'accepte que mes données soient utilisées pour me recontacter
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="group inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-3 text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Envoi en cours...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Message envoyé !
            </>
          ) : (
            <>
              Envoyer le message
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default TermsAndSubmit;
