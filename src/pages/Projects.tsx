
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, FileEdit, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Rediriger vers la page de connexion si non authentifié
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Exemple de projets de l'utilisateur (normalement chargés depuis l'API)
  const userProjects = user?.projects || [];

  return (
    <>
      <Helmet>
        <title>Mes Projets | Espace personnel</title>
        <meta name="description" content="Gérez vos projets dans votre espace personnel" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mes Projets</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouveau projet
            </Button>
          </div>
          
          {userProjects.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto my-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileEdit className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Aucun projet</h3>
                <p className="text-muted-foreground mt-2">
                  Vous n'avez pas encore de projet. Créez votre premier projet pour commencer.
                </p>
                <Button className="mt-6">
                  <Plus className="mr-2 h-4 w-4" /> Créer un projet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Créé le {new Date(project.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProjectsPage;
