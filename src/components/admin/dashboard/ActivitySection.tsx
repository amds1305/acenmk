
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: null,
    },
    action: 'a modifié la section hero',
    time: '2 minutes ago',
  },
  {
    id: 2,
    user: {
      name: 'Super Admin',
      email: 'super@example.com',
      avatar: null,
    },
    action: 'a ajouté un nouveau service',
    time: '1 heure ago',
  },
  {
    id: 3,
    user: {
      name: 'Client Premium',
      email: 'premium@example.com',
      avatar: null,
    },
    action: 'a créé un nouveau compte',
    time: '3 heures ago',
  },
  {
    id: 4,
    user: {
      name: 'Standard User',
      email: 'user@example.com',
      avatar: null,
    },
    action: 'a effectué une demande de contact',
    time: '5 heures ago',
  },
  {
    id: 5,
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: null,
    },
    action: 'a mis à jour la section footer',
    time: 'hier',
  },
];

const ActivitySection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>Dernières actions effectuées sur le site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar || undefined} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">
                  <span className="font-bold">{activity.user.name}</span> {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySection;
