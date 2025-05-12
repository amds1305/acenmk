
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for stats
const mockStats = {
  total: 126,
  newLeads: 23,
  inProgressLeads: 45,
  processedLeads: 52,
  archivedLeads: 6,
  conversionRate: 41.2,
  responseTime: 3.5,
};

// Mock data for chart
const mockChartData = [
  { month: 'Jan', nouveaux: 12, convertis: 5 },
  { month: 'Fév', nouveaux: 19, convertis: 8 },
  { month: 'Mar', nouveaux: 15, convertis: 7 },
  { month: 'Avr', nouveaux: 21, convertis: 10 },
  { month: 'Mai', nouveaux: 28, convertis: 12 },
  { month: 'Juin', nouveaux: 18, convertis: 9 },
];

const LeadStats: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leads totaux</CardDescription>
            <CardTitle className="text-3xl">{mockStats.total}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-xs text-muted-foreground">Augmentation de 12% ce mois</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taux de conversion</CardDescription>
            <CardTitle className="text-3xl">{mockStats.conversionRate}%</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Progress value={mockStats.conversionRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Objectif: 45%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Temps de réponse moyen</CardDescription>
            <CardTitle className="text-3xl">{mockStats.responseTime}h</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-muted-foreground">Amélioration de 0.5h</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leads en attente</CardDescription>
            <CardTitle className="text-3xl">{mockStats.newLeads + mockStats.inProgressLeads}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <p className="text-xs">Nouveaux: {mockStats.newLeads}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <p className="text-xs">En cours: {mockStats.inProgressLeads}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des leads</CardTitle>
          <CardDescription>Nouveaux leads et leads convertis par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nouveaux" name="Nouveaux leads" fill="#3b82f6" />
                <Bar dataKey="convertis" name="Leads convertis" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Status breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par statut</CardTitle>
          <CardDescription>Distribution des leads selon leur statut actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                  <span>Nouveaux</span>
                </div>
                <span>{mockStats.newLeads} ({Math.round(mockStats.newLeads / mockStats.total * 100)}%)</span>
              </div>
              <Progress value={mockStats.newLeads / mockStats.total * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
                  <span>En cours</span>
                </div>
                <span>{mockStats.inProgressLeads} ({Math.round(mockStats.inProgressLeads / mockStats.total * 100)}%)</span>
              </div>
              <Progress value={mockStats.inProgressLeads / mockStats.total * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Traités</span>
                </div>
                <span>{mockStats.processedLeads} ({Math.round(mockStats.processedLeads / mockStats.total * 100)}%)</span>
              </div>
              <Progress value={mockStats.processedLeads / mockStats.total * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-gray-400 mr-2"></div>
                  <span>Archivés</span>
                </div>
                <span>{mockStats.archivedLeads} ({Math.round(mockStats.archivedLeads / mockStats.total * 100)}%)</span>
              </div>
              <Progress value={mockStats.archivedLeads / mockStats.total * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadStats;
