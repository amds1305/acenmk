
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useFormContext } from "react-hook-form";
import { ContactFormValues } from "./contactFormSchema";

const TermsAndSubmit: React.FC = () => {
  const form = useFormContext<ContactFormValues>();
  
  return (
    <>
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
    </>
  );
};

export default TermsAndSubmit;
