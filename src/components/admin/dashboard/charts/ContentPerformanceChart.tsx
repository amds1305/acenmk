
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data
const contentPerformanceData = [
  { name: 'Article 1', vues: 120, engagement: 80 },
  { name: 'Article 2', vues: 80, engagement: 60 },
  { name: 'Article 3', vues: 150, engagement: 90 },
  { name: 'Article 4', vues: 60, engagement: 40 },
  { name: 'Article 5', vues: 220, engagement: 120 }
];

export const ContentPerformanceChart: React.FC = () => {
  return (
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
  );
};
