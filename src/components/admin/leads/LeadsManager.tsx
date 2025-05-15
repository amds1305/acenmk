
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoreHorizontal, Search, Plus, Filter } from 'lucide-react';

const mockLeads = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    company: 'Dupont Inc.',
    service: 'Développement web',
    source: 'Formulaire de contact',
    status: 'new',
    created_at: '2023-05-10T09:00:00Z',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    company: 'Martin SA',
    service: 'SEO',
    source: 'LinkedIn',
    status: 'contacted',
    created_at: '2023-05-08T10:30:00Z',
  },
  {
    id: '3',
    name: 'Pierre Petit',
    email: 'pierre@example.com',
    company: 'Petit SARL',
    service: 'Application mobile',
    source: 'Référence',
    status: 'qualified',
    created_at: '2023-05-05T14:20:00Z',
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    email: 'sophie@example.com',
    company: 'Bernard & Co',
    service: 'Maintenance',
    source: 'Google',
    status: 'proposal',
    created_at: '2023-05-01T11:10:00Z',
  },
  {
    id: '5',
    name: 'Lucas Moreau',
    email: 'lucas@example.com',
    company: 'Moreau Tech',
    service: 'Hébergement',
    source: 'Salon professionnel',
    status: 'negotiation',
    created_at: '2023-04-25T08:45:00Z',
  }
];

const statusLabels: Record<string, { label: string, variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  new: { label: 'Nouveau', variant: 'default' },
  contacted: { label: 'Contacté', variant: 'secondary' },
  qualified: { label: 'Qualifié', variant: 'secondary' },
  proposal: { label: 'Proposition', variant: 'outline' },
  negotiation: { label: 'Négociation', variant: 'outline' },
  won: { label: 'Gagné', variant: 'default' },
  lost: { label: 'Perdu', variant: 'destructive' }
};

const LeadsManager: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les leads
  const filteredLeads = mockLeads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des leads</CardTitle>
        <CardDescription>
          Gérez et suivez vos prospects commerciaux.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou entreprise..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouveaux</SelectItem>
                <SelectItem value="contacted">Contactés</SelectItem>
                <SelectItem value="qualified">Qualifiés</SelectItem>
                <SelectItem value="proposal">Proposition</SelectItem>
                <SelectItem value="negotiation">Négociation</SelectItem>
                <SelectItem value="won">Gagnés</SelectItem>
                <SelectItem value="lost">Perdus</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau lead
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <div>{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell>{lead.company || '-'}</TableCell>
                  <TableCell>{lead.service || '-'}</TableCell>
                  <TableCell>{lead.source || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={statusLabels[lead.status]?.variant || 'default'}>
                      {statusLabels[lead.status]?.label || lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                        <DropdownMenuItem>Assigner</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsManager;
