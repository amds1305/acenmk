
import React from 'react';
import { Clock, Briefcase, FileText, MessageSquare } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

interface DashboardOverviewProps {
  user: User;
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Projets actifs",
      value: user.projects?.filter(p => p.status !== 'completed').length || 0,
      total: user.projects?.length || 0,
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      onClick: () => navigate('/projects')
    },
    {
      title: "Devis en attente",
      value: user.estimates?.filter(e => e.status === 'pending' || e.status === 'in_review').length || 0,
      total: user.estimates?.length || 0,
      icon: <FileText className="h-6 w-6" />,
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
      onClick: () => navigate('/estimates')
    },
    {
      title: "Messages non lus",
      value: 2, // Exemple statique, remplacez par la valeur réelle
      total: 5, // Exemple statique, remplacez par la valeur réelle
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      onClick: () => navigate('/messages')
    },
    {
      title: "Dernière connexion",
      value: user.lastLoginDate 
        ? new Date(user.lastLoginDate).toLocaleString('fr-FR', { 
            day: 'numeric', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        : "Jamais",
      icon: <Clock className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      special: true
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`overflow-hidden transition-all hover:border-primary/50 ${stat.special ? '' : 'cursor-pointer'}`}
          onClick={stat.onClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <h4 className="text-2xl font-bold">
                  {typeof stat.value === 'number' && typeof stat.total === 'number' ? (
                    <>{stat.value}{' '}
                      <span className="text-sm font-normal text-muted-foreground">/ {stat.total}</span>
                    </>
                  ) : (
                    stat.value
                  )}
                </h4>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
