
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Validate token on component mount
  React.useEffect(() => {
    const validateToken = async () => {
      try {
        // In a real app, you would validate the token with your backend
        // For demo purposes, we'll assume it's valid if it's at least 10 chars long
        if (!token || token.length < 10) {
          setIsTokenInvalid(true);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsTokenInvalid(true);
      }
    };

    validateToken();
  }, [token]);

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the new password and token to your backend
      // For demo purposes, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Mot de passe réinitialisé",
        description: "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter."
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      });
      console.error("Error during password reset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error if token is invalid
  if (isTokenInvalid) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl text-center">Lien invalide</CardTitle>
              <CardDescription className="text-center">
                Ce lien de réinitialisation est invalide ou a expiré.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild>
                <Link to="/forgot-password">Demander un nouveau lien</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/login">Retour à la connexion</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
        <Card className="w-full max-w-md">
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Réinitialiser le mot de passe</CardTitle>
                <CardDescription className="text-center">
                  Créez un nouveau mot de passe pour votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <Input 
                    id="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <div className="text-sm text-destructive">{passwordError}</div>
                )}
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
                      Réinitialisation en cours...
                    </>
                  ) : (
                    "Réinitialiser le mot de passe"
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
            <>
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-center">Mot de passe réinitialisé</CardTitle>
                <CardDescription className="text-center">
                  Votre mot de passe a été réinitialisé avec succès
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center">
                  Vous allez être redirigé vers la page de connexion...
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
