
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Projects = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 sm:px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-8">Mes projets</h1>
          
          <div className="bg-card rounded-lg shadow-sm p-6">
            {user?.projects && user.projects.length > 0 ? (
              <div className="space-y-4">
                {user.projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <p className="text-muted-foreground mt-1">{project.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-muted-foreground">
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {project.status === 'completed' ? 'Terminé' :
                         project.status === 'in-progress' ? 'En cours' :
                         'En attente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun projet en cours.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
