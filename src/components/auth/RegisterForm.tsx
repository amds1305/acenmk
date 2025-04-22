
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfoFields } from './register/UserInfoFields';
import { PasswordFields } from './register/PasswordFields';
import { OptionalFields } from './register/OptionalFields';
import { TermsField } from './register/TermsField';
import { formSchema, FormData } from './register/formSchema';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Tentative d'inscription avec les données:", data);
      await register(data.name, data.email, data.password, data.company, data.phone);
      navigate('/profile');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
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

export default RegisterForm;
