
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Gérez votre contenu et suivez l'activité de votre site.</p>
      </div>
      <Link to="/">
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Eye className="mr-2 h-4 w-4" />
          Voir le site
        </Button>
      </Link>
    </div>
  );
};
