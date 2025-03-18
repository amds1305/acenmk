
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Eye, ArrowRight, Settings, MessageSquare, HelpCircle, TrendingUp, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Données fictives pour les graphiques
const visitsData = [
  { name: 'Jan', visits: 400 },
  { name: 'Fév', visits: 300 },
  { name: 'Mar', visits: 600 },
  { name: 'Avr', visits: 800 },
  { name: 'Mai', visits: 700 },
  { name: 'Juin', visits: 900 },
  { name: 'Juil', visits: 1000 }
];

const sourceData = [
  { name: 'Direct', value: 40 },
  { name: 'Recherche', value: 30 },
  { name: 'Social', value: 20 },
  { name: 'Référents', value: 10 }
];

const contentPerformanceData = [
  { name: 'Article 1', vues: 120, engagement: 80 },
  { name: 'Article 2', vues: 80, engagement: 60 },
  { name: 'Article 3', vues: 150, engagement: 90 },
  { name: 'Article 4', vues: 60, engagement: 40 },
  { name: 'Article 5', vues: 220, engagement: 120 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      link: '#analytics'
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

      <div id="analytics" className="pt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-primary" />
          Analytics
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visites du site</CardTitle>
              <CardDescription>Évolution sur les 7 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  config={{
                    visits: {
                      label: 'Visites',
                      theme: {
                        light: '#2563eb',
                        dark: '#3b82f6',
                      }
                    }
                  }}
                >
                  <AreaChart
                    data={visitsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      name="visits" 
                      stroke="var(--color-visits)" 
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sources de trafic</CardTitle>
              <CardDescription>Répartition des visites par source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} visites`, 'Nombre']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Performance du contenu</CardTitle>
            <CardDescription>Vues et engagement des derniers articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contentPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vues" name="Vues" fill="#3b82f6" />
                  <Bar dataKey="engagement" name="Engagement" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
    </div>
  );
};

export default AdminDashboard;
