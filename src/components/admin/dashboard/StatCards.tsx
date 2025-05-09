
import React from 'react';
import { FileText, Users, Eye, Settings, MessageSquare, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const StatCards: React.FC = () => {
  // These data would normally be fetched from an API
  const stats = [
    { 
      title: 'Articles', 
      value: '12', 
      description: 'Articles de blog publiés', 
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: '/admin/blog'
    },
    { 
      title: 'Équipe', 
      value: '8', 
      description: 'Membres dans l\'équipe', 
      icon: <Users className="h-6 w-6 text-primary" />,
      link: '/admin/team'
    },
    { 
      title: 'Services', 
      value: '6', 
      description: 'Services proposés', 
      icon: <Settings className="h-6 w-6 text-primary" />,
      link: '/admin/services'
    },
    { 
      title: 'Témoignages', 
      value: '15', 
      description: 'Témoignages clients', 
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      link: '/admin/testimonials'
    },
    { 
      title: 'FAQ', 
      value: '24', 
      description: 'Questions & Réponses', 
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      link: '/admin/faq'
    },
    { 
      title: 'Visites', 
      value: '2.4k', 
      description: 'Visites ce mois-ci', 
      icon: <Eye className="h-6 w-6 text-primary" />,
      link: '#analytics'
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className="mt-4">
              <Link to={stat.link}>
                <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:text-primary">
                  Gérer
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
