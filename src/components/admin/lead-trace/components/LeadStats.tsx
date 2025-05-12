
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InboxIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';

// Mock data for charts
const conversionData = [
  { name: 'Jan', conversion: 13 },
  { name: 'Feb', conversion: 20 },
  { name: 'Mar', conversion: 17 },
  { name: 'Avr', conversion: 25 },
  { name: 'Mai', conversion: 30 },
];

const responseTimeData = [
  { name: 'Jan', time: 8 },
  { name: 'Feb', time: 7 },
  { name: 'Mar', time: 5 },
  { name: 'Avr', time: 4 },
  { name: 'Mai', time: 3 },
];

const leadSourceData = [
  { name: 'Formulaire', value: 42 },
  { name: 'Réseaux sociaux', value: 28 },
  { name: 'Google', value: 18 },
  { name: 'Recommandation', value: 12 },
];

const LeadStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Aperçu des leads</CardTitle>
          <CardDescription>
            Statistiques générales sur vos leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <InboxIcon className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">128</div>
              <div className="text-sm text-muted-foreground">Leads totaux</div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <TrendingUpIcon className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold">24%</div>
              <div className="text-sm text-muted-foreground">Taux de conversion</div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <ClockIcon className="h-8 w-8 text-orange-500 mb-2" />
              <div className="text-2xl font-bold">3h</div>
              <div className="text-sm text-muted-foreground">Temps de réponse</div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <CheckCircleIcon className="h-8 w-8 text-purple-500 mb-2" />
              <div className="text-2xl font-bold">31</div>
              <div className="text-sm text-muted-foreground">Leads convertis</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Répartition des leads</div>
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="text-sm text-muted-foreground ml-2">35%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <div>Nouveaux (45)</div>
              <div>En cours (38)</div>
              <div>Traités (25)</div>
              <div>Archivés (20)</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Taux de conversion</CardTitle>
          <CardDescription>
            Évolution mensuelle du taux de conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversion" fill="#3b82f6" name="Taux de conversion (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Temps de réponse</CardTitle>
          <CardDescription>
            Temps de réponse moyen (en heures)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="time" fill="#10b981" name="Temps de réponse (h)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Sources des leads</CardTitle>
          <CardDescription>
            Répartition par source d'acquisition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" name="Nombre de leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadStats;
