
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Users, Globe, MessageSquare, DollarSign } from 'lucide-react';

const StatCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> +12%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nouveaux utilisateurs</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+24</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> +8%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contacts</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+42</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 font-medium inline-flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" /> -2%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventes</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,234 €</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> +19%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
