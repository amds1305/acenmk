
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GripHorizontal, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Tentative de connexion admin avec:", email);
      
      // Option temporaire pour connexion avec admin@example.com/password pour les tests
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: 'Connexion réussie (mode test)',
          description: 'Bienvenue dans l\'interface d\'administration (mode test)',
        });
        
        // Simuler une session admin
        localStorage.setItem('adminTestMode', 'true');
        localStorage.setItem('adminTestEmail', email);
        
        navigate(from, { replace: true });
        return;
      }
      
      // Appel direct à Supabase pour le débogage
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Erreur Supabase lors de la connexion admin:", error);
        throw error;
      }
      
      if (data?.session) {
        console.log("Session admin Supabase créée avec succès:", data.session);
        
        // Utiliser le hook login de notre contexte d'auth
        await login(email, password);
        
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue dans l\'interface d\'administration',
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Erreur complète lors de la connexion admin:", error);
      toast({
        variant: 'destructive',
        title: 'Échec de la connexion',
        description: 'Veuillez vérifier vos identifiants',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <GripHorizontal className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Administration</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous pour accéder au tableau de bord
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-gray-500 dark:text-gray-400">
            Utilisez admin@example.com / password pour la connexion de test
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
