
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Lead() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Accès restreint</CardTitle>
          <CardDescription className="text-center">
            Vous devez être connecté pour accéder au module LeadTrace
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => navigate('/login')}>Se connecter</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Bienvenue sur LeadTrace</CardTitle>
        <CardDescription>
          Gérez vos contacts et suivez vos opportunités commerciales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Bonjour {user?.name || 'utilisateur'}, 
            bienvenue dans le module LeadTrace. Cet outil vous permet de suivre 
            vos prospects et de transformer vos contacts en contrats.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => navigate('/admin/lead-trace')}
            >
              Accéder au tableau de bord
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/admin/contact')}
            >
              Voir les formulaires de contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Lead;
