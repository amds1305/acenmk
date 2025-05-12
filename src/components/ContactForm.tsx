
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContactForm } from '@/hooks/useContactForm';
import { Loader2, Send, Check } from 'lucide-react';

// Liste des services (à personnaliser selon les besoins)
const SERVICES = [
  { value: "web-development", label: "Développement Web" },
  { value: "mobile-app", label: "Application Mobile" },
  { value: "ui-ux", label: "Design UI/UX" },
  { value: "cloud-infra", label: "Infrastructure Cloud" },
  { value: "consulting", label: "Conseil" },
  { value: "other", label: "Autre" },
];

// Liste des sources (à personnaliser selon les besoins)
const SOURCES = [
  { value: "search-engine", label: "Moteur de recherche" },
  { value: "social-media", label: "Réseaux sociaux" },
  { value: "recommendation", label: "Recommandation" },
  { value: "advertisement", label: "Publicité" },
  { value: "other", label: "Autre" },
];

const ContactForm: React.FC = () => {
  const { form, isSubmitting, isSuccess, onSubmit } = useContactForm();

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Champ honeypot - invisible pour les humains, mais les bots le rempliront */}
          <div className="hidden">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register('_honeypot')}
            />
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
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
                  <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+33 6 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="entreprise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entreprise</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de votre entreprise" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_web"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="service_requis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service requis</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment nous avez-vous trouvé ?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SOURCES.map((source) => (
                        <SelectItem key={source.value} value={source.value}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre message <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez votre projet ou votre demande..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consentement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    J'accepte que mes données soient utilisées pour me recontacter concernant ma demande. <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Vos données ne seront jamais partagées avec des tiers. Vous pouvez consulter notre <a href="/privacy-policy" className="text-primary hover:underline">politique de confidentialité</a>.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : isSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Message envoyé !
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </>
            )}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ContactForm;
