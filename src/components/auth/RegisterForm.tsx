
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  company: z.string().optional(),
  phone: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      phone: '',
      terms: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Tentative d'inscription avec les données:", data);
      await register(data.name, data.email, data.password, data.company, data.phone);
      
      // La redirection sera effectuée automatiquement par useEffect dans le contexte d'authentification
      // si l'inscription réussit et que l'utilisateur est authentifié
      navigate('/profile');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // La gestion des erreurs est déjà faite dans le hook register
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
        <CardDescription className="text-center">
          Inscrivez-vous pour gérer vos projets et demandes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UserInfoFields control={form.control} />
            <PasswordFields control={form.control} />
            <OptionalFields control={form.control} />
            <TermsField control={form.control} />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                'Créer mon compte'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-sm text-muted-foreground">
            Vous avez déjà un compte?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

// Sub-components for form fields
const UserInfoFields = ({ control }: { control: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom complet</FormLabel>
          <FormControl>
            <Input placeholder="Votre nom" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="exemple@email.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const PasswordFields = ({ control }: { control: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl>
            <Input type="password" placeholder="********" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <FormControl>
            <Input type="password" placeholder="********" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const OptionalFields = ({ control }: { control: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      control={control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Entreprise (optionnel)</FormLabel>
          <FormControl>
            <Input placeholder="Nom de votre entreprise" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Téléphone (optionnel)</FormLabel>
          <FormControl>
            <Input placeholder="Votre numéro de téléphone" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const TermsField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="terms"
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>
            J'accepte les{' '}
            <Link to="/terms" className="text-primary hover:underline">
              conditions d'utilisation
            </Link>
          </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    )}
  />
);

export default RegisterForm;
