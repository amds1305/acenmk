
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfoFields } from './register/UserInfoFields';
import { PasswordFields } from './register/PasswordFields';
import { OptionalFields } from './register/OptionalFields';
import { TermsField } from './register/TermsField';
import { formSchema, type FormData } from './register/formSchema';
import { Loader2 } from 'lucide-react';

const RegisterForm = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      phone: "",
      terms: false
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { confirmPassword, terms, ...userData } = data;
      const response = await register(userData);
      
      if (response && response.error) {
        toast({
          variant: 'destructive',
          title: "Erreur d'inscription",
          description: response.error.message || "Une erreur est survenue lors de l'inscription.",
        });
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          Inscrivez-vous pour accéder à toutes les fonctionnalités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <UserInfoFields control={form.control} />
            <PasswordFields control={form.control} />
            <OptionalFields control={form.control} />
            <TermsField control={form.control} />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Connectez-vous
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
