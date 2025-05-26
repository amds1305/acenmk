
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ActivitySection: React.FC = () => {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {[
              { action: 'Nouvel article publié', time: 'Il y a 2 heures', user: 'Admin' },
              { action: 'Mise à jour de la page Services', time: 'Il y a 1 jour', user: 'Marketing' },
              { action: 'Nouveau témoignage ajouté', time: 'Il y a 3 jours', user: 'Support' },
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item.user.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="text-xs mr-1">👤</span> {item.user} • {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tendances de recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              { term: 'développement web', count: 120 },
              { term: 'design responsive', count: 95 },
              { term: 'services cloud', count: 78 },
              { term: 'sécurité informatique', count: 64 },
              { term: 'IA et machine learning', count: 52 },
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-between pb-2 border-b last:border-0">
                <span className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  {item.term}
                </span>
                <span className="text-sm font-medium">{item.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
