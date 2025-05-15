
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Filter, Plus } from 'lucide-react';

const MyLeads = () => {
  // Données fictives des leads pour la démonstration
  const leads = [
    {
      id: '1',
      name: 'Jean Dupont',
      company: 'Dupont Inc.',
      email: 'jean@example.com',
      phone: '06 12 34 56 78',
      status: 'new',
      source: 'Formulaire de contact',
      created_at: '2023-05-10T09:00:00Z',
    },
    {
      id: '2',
      name: 'Marie Martin',
      company: 'Martin SA',
      email: 'marie@example.com',
      phone: '06 23 45 67 89',
      status: 'contacted',
      source: 'LinkedIn',
      created_at: '2023-05-08T10:30:00Z',
    },
    {
      id: '3',
      name: 'Pierre Petit',
      company: 'Petit SARL',
      email: 'pierre@example.com',
      phone: '06 34 56 78 90',
      status: 'qualified',
      source: 'Référence',
      created_at: '2023-05-05T14:20:00Z',
    },
  ];

  // Mapping pour les statuts
  const statusMap: Record<string, { label: string, color: string }> = {
    new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    contacted: { label: 'Contacté', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
    qualified: { label: 'Qualifié', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    lost: { label: 'Perdu', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
    won: { label: 'Gagné', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Mes Leads</h1>

      <div className="mb-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="won">Gagnés</TabsTrigger>
            <TabsTrigger value="lost">Perdus</TabsTrigger>
            <TabsTrigger value="all">Tous</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher par nom, entreprise, email..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filtrer</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Nouveau lead</span>
              </Button>
            </div>
          </div>

          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads
                .filter(lead => lead.status !== 'won' && lead.status !== 'lost')
                .map(lead => (
                  <LeadCard key={lead.id} lead={lead} statusMap={statusMap} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="won" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads
                .filter(lead => lead.status === 'won')
                .map(lead => (
                  <LeadCard key={lead.id} lead={lead} statusMap={statusMap} />
                ))}
              {leads.filter(lead => lead.status === 'won').length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  Aucun lead gagné pour le moment.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="lost" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads
                .filter(lead => lead.status === 'lost')
                .map(lead => (
                  <LeadCard key={lead.id} lead={lead} statusMap={statusMap} />
                ))}
              {leads.filter(lead => lead.status === 'lost').length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  Aucun lead perdu pour le moment.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.map(lead => (
                <LeadCard key={lead.id} lead={lead} statusMap={statusMap} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface LeadCardProps {
  lead: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    created_at: string;
  };
  statusMap: Record<string, { label: string, color: string }>;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, statusMap }) => {
  const status = statusMap[lead.status] || { label: lead.status, color: 'bg-gray-100 text-gray-800' };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">{lead.name}</CardTitle>
          <CardDescription>{lead.company}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={status.color}>
            {status.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Voir les détails</DropdownMenuItem>
              <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
              <DropdownMenuItem>Ajouter une note</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1 text-sm">
            <div className="text-muted-foreground">Email:</div>
            <div className="col-span-2 truncate">{lead.email}</div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-sm">
            <div className="text-muted-foreground">Téléphone:</div>
            <div className="col-span-2">{lead.phone}</div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-sm">
            <div className="text-muted-foreground">Source:</div>
            <div className="col-span-2">{lead.source}</div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-sm">
            <div className="text-muted-foreground">Date:</div>
            <div className="col-span-2">{new Date(lead.created_at).toLocaleDateString()}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          Contacter
        </Button>
        <Button size="sm">
          Détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyLeads;
