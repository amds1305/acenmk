
import React from 'react';
import { BarChart, Line, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cvStatsByMonth = [
  { name: 'Jan', uploaded: 18, processed: 15, contacted: 8 },
  { name: 'Fév', uploaded: 22, processed: 19, contacted: 11 },
  { name: 'Mar', uploaded: 29, processed: 24, contacted: 14 },
  { name: 'Avr', uploaded: 32, processed: 29, contacted: 16 },
  { name: 'Mai', uploaded: 25, processed: 21, contacted: 13 },
  { name: 'Juin', uploaded: 31, processed: 26, contacted: 17 },
];

const skillsDistribution = [
  { name: 'React', count: 42 },
  { name: 'JavaScript', count: 56 },
  { name: 'TypeScript', count: 38 },
  { name: 'Node.js', count: 32 },
  { name: 'Python', count: 28 },
  { name: 'Java', count: 21 },
];

const CVStats = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistiques de la CVthèque</CardTitle>
        <CardDescription>Analyse des CV et des tendances</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity">
          <TabsList className="mb-4">
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cvStatsByMonth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="uploaded" stroke="#8884d8" activeDot={{ r: 8 }} name="CV importés" />
                  <Line type="monotone" dataKey="processed" stroke="#82ca9d" name="CV traités" />
                  <Line type="monotone" dataKey="contacted" stroke="#ffc658" name="Candidats contactés" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">156</div>
                <div className="text-sm text-gray-600">CV dans la base</div>
              </div>
              <div className="bg-secondary/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-secondary">42</div>
                <div className="text-sm text-gray-600">CV ajoutés ce mois</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">18</div>
                <div className="text-sm text-gray-600">Entretiens planifiés</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={skillsDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Nombre de candidats" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CVStats;
