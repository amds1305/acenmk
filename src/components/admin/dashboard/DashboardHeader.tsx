
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarRange, Download } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre panneau d'administration
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarRange className="h-4 w-4" />
          Sélectionner la période
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
