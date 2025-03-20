
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StatsContent = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques et activité</CardTitle>
        <CardDescription>
          Visualisez l'activité liée à vos projets
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            Dans une application complète, des graphiques et statistiques
            sur vos projets seraient affichés ici.
          </p>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Voir le tableau de bord
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsContent;
