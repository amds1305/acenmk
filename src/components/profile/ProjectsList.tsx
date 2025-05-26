
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/types/auth';

interface ProjectsListProps {
  projects: Project[] | undefined;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  formatDate: (dateString: string) => string;
}

const ProjectsList = ({ projects, getStatusColor, getStatusText, formatDate }: ProjectsListProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets en cours</CardTitle>
        <CardDescription>
          Suivez l'avancement de vos projets en temps réel
        </CardDescription>
      </CardHeader>
      <CardContent>
        {projects && projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.name || project.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(project.status)}`}></div>
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Détails</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{project.name || project.title}</DialogTitle>
                        <DialogDescription>
                          Dernière mise à jour: {formatDate(project.lastUpdated || '')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center mb-4">
                          <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(project.status)}`}></div>
                          <span>Statut: {getStatusText(project.status)}</span>
                        </div>
                        <Separator className="my-4" />
                        <h4 className="text-sm font-medium mb-2">Détails du projet</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Informations détaillées sur votre projet et son avancement.
                        </p>
                        <div className="rounded-md bg-muted p-4">
                          <p className="text-sm">
                            Dans une application réelle, des détails complets sur le projet
                            seraient affichés ici, y compris les étapes du projet, les livrables,
                            l'équipe, etc.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => navigate(`/projects/${project.id}`)}>
                          Voir la page du projet
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Dernière mise à jour: {formatDate(project.lastUpdated || '')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Vous n'avez pas encore de projets</p>
            <Button onClick={() => navigate('/estimate')}>
              Demander un devis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
