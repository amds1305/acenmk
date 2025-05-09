
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
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
import { VisitChart } from './charts/VisitChart';
import { TrafficSourceChart } from './charts/TrafficSourceChart';
import { ContentPerformanceChart } from './charts/ContentPerformanceChart';

export const AnalyticsSection: React.FC = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart2 className="h-5 w-5 mr-2 text-primary" />
        Analytics
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <VisitChart />
        <TrafficSourceChart />
      </div>
      
      <ContentPerformanceChart />
    </>
  );
};
