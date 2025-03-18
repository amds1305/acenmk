
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { SendIcon, Upload } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Le nom complet doit contenir au moins 2 caractères.',
  }),
  email: z.string().email({
    message: 'Veuillez saisir une adresse email valide.',
  }),
  phone: z.string().min(10, {
    message: 'Veuillez saisir un numéro de téléphone valide.',
  }),
  position: z.string({
    required_error: 'Veuillez sélectionner le poste qui vous intéresse.',
  }),
  message: z.string().min(10, {
    message: 'Votre message doit contenir au moins 10 caractères.',
  }),
  resume: z.any().optional(),
  linkedin: z.string().url({
    message: 'Veuillez saisir une URL LinkedIn valide.',
  }).optional().or(z.literal('')),
});

type ApplicationFormValues = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      message: '',
      linkedin: '',
    },
  });

  function onSubmit(values: ApplicationFormValues) {
    console.log(values);
    
    // Dans une application réelle, ceci enverrait les données à une API
    // au lieu d'un simple message de succès
    toast.success('Votre candidature a été soumise avec succès!', {
      description: 'Nous vous contacterons très prochainement.',
    });
    
    form.reset();
  }

  return (
    <div className="bg-muted/50 rounded-lg p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-2 text-center">Envoyez votre candidature</h2>
      <p className="text-muted-foreground text-center mb-8">
        Remplissez le formulaire ci-dessous pour nous faire part de votre intérêt
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jean.dupont@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="06 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poste souhaité</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un poste" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dev-frontend">Développeur Front-end React</SelectItem>
                      <SelectItem value="designer">Designer UX/UI</SelectItem>
                      <SelectItem value="chef-projet">Chef de projet digital</SelectItem>
                      <SelectItem value="dev-backend">Développeur Back-end Node.js</SelectItem>
                      <SelectItem value="autre">Autre / Candidature spontanée</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profil LinkedIn (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/votre-profil" {...field} />
                </FormControl>
                <FormDescription>
                  Partagez votre profil LinkedIn pour nous aider à mieux vous connaître.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV / Resume</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-500" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOCX (MAX. 5MB)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormDescription>
                  Téléchargez votre CV au format PDF ou Word.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message de motivation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Parlez-nous un peu de vous, de votre expérience et de vos motivations..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Expliquez brièvement pourquoi vous êtes intéressé par ce poste et ce que vous pouvez apporter à notre équipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" size="lg" className="w-full md:w-auto">
            <SendIcon className="mr-2 h-4 w-4" /> Envoyer ma candidature
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
