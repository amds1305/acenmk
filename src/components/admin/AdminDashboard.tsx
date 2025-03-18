
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Eye, ArrowRight, Settings, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Ces données seraient normalement récupérées depuis une API
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
      link: '#'
    },
  ];

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AdminDashboard;
