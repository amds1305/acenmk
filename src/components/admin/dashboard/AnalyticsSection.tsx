
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart } from '@tremor/react';

const AnalyticsSection: React.FC = () => {
  // Données fictives pour les graphiques
  const visitorData = [
    {
      date: 'Jan 22',
      Visiteurs: 2890,
      'Pages vues': 7389,
    },
    {
      date: 'Feb 22',
      Visiteurs: 2756,
      'Pages vues': 7093,
    },
    {
      date: 'Mar 22',
      Visiteurs: 3322,
      'Pages vues': 8129,
    },
    {
      date: 'Apr 22',
      Visiteurs: 3470,
      'Pages vues': 9103,
    },
    {
      date: 'May 22',
      Visiteurs: 3475,
      'Pages vues': 9945,
    },
    {
      date: 'Jun 22',
      Visiteurs: 3129,
      'Pages vues': 8863,
    },
  ];

  const salesData = [
    {
      month: 'Jan',
      Service1: 2000,
      Service2: 1800,
      Service3: 1200,
    },
    {
      month: 'Feb',
      Service1: 1900,
      Service2: 1398,
      Service3: 1100,
    },
    {
      month: 'Mar',
      Service1: 2400,
      Service2: 1980,
      Service3: 1500,
    },
    {
      month: 'Apr',
      Service1: 2780,
      Service2: 2300,
      Service3: 1390,
    },
    {
      month: 'May',
      Service1: 2990,
      Service2: 2480,
      Service3: 1590,
    },
    {
      month: 'Jun',
      Service1: 3490,
      Service2: 2910,
      Service3: 1700,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse du trafic et des ventes</CardTitle>
        <CardDescription>
          Visualisez les tendances de vos visiteurs et ventes au cours des derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="traffic">Trafic</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic" className="space-y-4">
            <AreaChart
              data={visitorData}
              index="date"
              categories={["Visiteurs", "Pages vues"]}
              colors={["indigo", "cyan"]}
              valueFormatter={(number) => number.toString()}
              yAxisWidth={40}
              showAnimation={true}
              showLegend={true}
              className="h-80"
            />
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <BarChart
              data={salesData}
              index="month"
              categories={["Service1", "Service2", "Service3"]}
              colors={["indigo", "cyan", "amber"]}
              valueFormatter={(number) => `${number}€`}
              yAxisWidth={40}
              showAnimation={true}
              showLegend={true}
              className="h-80"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
