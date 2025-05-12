
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LeadDetailDialog from './LeadDetailDialog';
import LeadEditDialog from './LeadEditDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';

// Mock data for leads
const mockLeads = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    company: 'Dupont SAS',
    website: 'www.dupontsas.fr',
    service: 'Développement web',
    source: 'Formulaire de contact',
    description: 'Besoin d\'un site e-commerce pour vendre nos produits',
    status: 'new',
    tags: ['e-commerce', 'urgent'],
    assignedTo: 'Sophie Martin',
    created_at: '2025-05-01T10:30:00Z',
    updated_at: '2025-05-01T10:30:00Z',
  },
  {
    id: '2',
    name: 'Marie Lambert',
    email: 'marie.lambert@example.com',
    phone: '+33 7 65 43 21 09',
    company: 'Lambert & Co',
    website: 'www.lambertco.fr',
    service: 'Design UX/UI',
    source: 'LinkedIn',
    description: 'Refonte de notre application mobile',
    status: 'in-progress',
    tags: ['app', 'design'],
    assignedTo: 'Thomas Bernard',
    created_at: '2025-04-28T14:20:00Z',
    updated_at: '2025-05-02T09:15:00Z',
  },
  {
    id: '3',
    name: 'Paul Moreau',
    email: 'paul.moreau@example.com',
    phone: '+33 6 98 76 54 32',
    company: 'Moreau Tech',
    website: 'www.moreautech.com',
    service: 'Conseil informatique',
    source: 'Recommandation',
    description: 'Migration vers le cloud et optimisation de l\'infrastructure',
    status: 'processed',
    tags: ['cloud', 'infrastructure'],
    assignedTo: 'Sophie Martin',
    created_at: '2025-04-20T11:45:00Z',
    updated_at: '2025-05-03T16:30:00Z',
  }
];

const LeadList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Nouveau</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En cours</Badge>;
      case 'processed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Traité</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archivé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetails = (lead: any) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const handleEdit = (lead: any) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleDelete = (lead: any) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting lead:', selectedLead.id);
    setIsDeleteOpen(false);
    // In a real app, this would call an API to delete the lead
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="new">Nouveaux</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="processed">Traités</SelectItem>
              <SelectItem value="archived">Archivés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Entreprise</TableHead>
              <TableHead className="hidden md:table-cell">Statut</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(lead)}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{lead.company || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(lead)}>
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(lead)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedLead && (
        <>
          <LeadDetailDialog 
            lead={selectedLead} 
            open={isDetailOpen} 
            onOpenChange={setIsDetailOpen}
            onEdit={() => {
              setIsDetailOpen(false);
              setIsEditOpen(true);
            }}
          />
          
          <LeadEditDialog
            lead={selectedLead}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          
          <DeleteConfirmDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onConfirm={confirmDelete}
            title="Supprimer ce lead"
            description="Êtes-vous sûr de vouloir supprimer ce lead ? Cette action est irréversible."
          />
        </>
      )}
    </div>
  );
};

export default LeadList;
