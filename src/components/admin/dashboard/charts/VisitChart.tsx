
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Sample data
const visitsData = [
  { name: 'Jan', visits: 400 },
  { name: 'Fév', visits: 300 },
  { name: 'Mar', visits: 600 },
  { name: 'Avr', visits: 800 },
  { name: 'Mai', visits: 700 },
  { name: 'Juin', visits: 900 },
  { name: 'Juil', visits: 1000 }
];

export const VisitChart: React.FC = () => {
  return (
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
  );
};
