
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir une adresse e-mail."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would normally connect to your auth system to send a reset email
      // For now, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "E-mail envoyé",
        description: "Si un compte existe avec cette adresse e-mail, vous recevrez un lien de réinitialisation."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer plus tard."
      });
      console.error("Error during password reset request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
            <CardDescription className="text-center">
              {isSuccess 
                ? "Consultez votre boîte mail pour réinitialiser votre mot de passe" 
                : "Entrez votre adresse e-mail pour recevoir un lien de réinitialisation"}
            </CardDescription>
          </CardHeader>
          
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le lien de réinitialisation"
                  )}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  <Link to="/login" className="text-primary hover:underline">
                    Retour à la page de connexion
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-300 text-sm">
                  Si un compte existe avec l'adresse e-mail <strong>{email}</strong>, 
                  vous recevrez un lien pour réinitialiser votre mot de passe. 
                  Veuillez vérifier votre boîte de réception et vos courriers indésirables.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setEmail('');
                  setIsSuccess(false);
                }}
              >
                Demander un nouveau lien
              </Button>
              <div className="text-sm text-center text-muted-foreground mt-4">
                <Link to="/login" className="text-primary hover:underline">
                  Retour à la page de connexion
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
