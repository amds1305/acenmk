
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, FileText, Calendar, Briefcase } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  
  // Retrieve project stats
  const totalProjects = user?.projects?.length || 0;
  const activeProjects = user?.projects?.filter(project => 
    project.status === 'active' || project.status === 'in_progress'
  ).length || 0;
  
  const projectProgress = totalProjects > 0
    ? Math.floor((activeProjects / totalProjects) * 100)
    : 0;
  
  // Retrieve estimate stats
  const totalEstimates = user?.estimates?.length || 0;
  const pendingEstimates = user?.estimates?.filter(estimate =>
    estimate.status === 'pending' || estimate.status === 'in_review'
  ).length || 0;
  
  // Format date for last login
  const formatLastLogin = () => {
    if (!user || !user.lastLoginDate) return 'Inconnu';
    
    try {
      const lastLogin = new Date(user.lastLoginDate);
      return formatDistanceToNow(lastLogin, { locale: fr, addSuffix: true });
    } catch (error) {
      console.error('Error formatting last login date:', error);
      return 'Date invalide';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Projects card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            sur {totalProjects} projets au total
          </p>
          <div className="mt-2">
            <Progress value={projectProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Estimates card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Devis en attente</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingEstimates}</div>
          <p className="text-xs text-muted-foreground">
            sur {totalEstimates} devis au total
          </p>
        </CardContent>
      </Card>
      
      {/* Last login card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dernière connexion</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate">
            {formatLastLogin()}
          </div>
          <p className="text-xs text-muted-foreground">
            IP: {user?.loginHistory?.[0]?.ip || 'Non disponible'}
          </p>
        </CardContent>
      </Card>
      
      {/* Next meeting card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prochain rendez-vous</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Aucun</div>
          <p className="text-xs text-muted-foreground">
            Planifiez un rendez-vous
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
