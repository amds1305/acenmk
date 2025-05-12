
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Filter,
  Users,
  Tag
} from 'lucide-react';
import LeadDetailDialog from './LeadDetailDialog';
import LeadEditDialog from './LeadEditDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { Lead, LeadFilter } from '@/types/lead';

// Simulate lead data for the initial UI
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    company: 'Entreprise ABC',
    website: 'www.entrepriseabc.fr',
    service: 'web-development',
    source: 'search-engine',
    description: 'Besoin d\'un nouveau site web e-commerce',
    status: 'new',
    tags: ['urgent', 'ecommerce'],
    created_at: '2025-05-01T10:30:00Z',
    updated_at: '2025-05-01T10:30:00Z',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    phone: '+33 6 23 45 67 89',
    company: 'Société XYZ',
    website: 'www.societe-xyz.fr',
    service: 'mobile-app',
    source: 'recommendation',
    description: 'Développement d\'une application mobile pour notre service client',
    status: 'in-progress',
    tags: ['mobile', 'premium'],
    assignedTo: 'Sophie Tremblay',
    created_at: '2025-04-28T14:15:00Z',
    updated_at: '2025-05-02T09:45:00Z',
  },
  {
    id: '3',
    name: 'Pierre Lefebvre',
    email: 'pierre.lefebvre@example.com',
    phone: '+33 7 34 56 78 90',
    company: 'Startup Tech',
    service: 'consulting',
    source: 'social-media',
    description: 'Besoin de conseil sur notre infrastructure cloud',
    status: 'processed',
    tags: ['cloud', 'consulting'],
    assignedTo: 'Thomas Bernard',
    created_at: '2025-04-20T11:20:00Z',
    updated_at: '2025-05-03T16:30:00Z',
  },
];

const LeadList = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LeadFilter>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { toast } = useToast();

  // In a real application, this would fetch data from the API
  useEffect(() => {
    // setIsLoading(true);
    // fetchLeads(filters).then((data) => {
    //   setLeads(data);
    //   setIsLoading(false);
    // });
  }, [filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusFilter = (status: string) => {
    setFilters({ ...filters, status });
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };

  const confirmDeleteLead = () => {
    // In a real application, this would call the API to delete the lead
    if (selectedLead) {
      setLeads(leads.filter(lead => lead.id !== selectedLead.id));
      toast({
        title: 'Lead supprimé',
        description: `Le lead ${selectedLead.name} a été supprimé avec succès.`,
      });
      setIsDeleteOpen(false);
    }
  };

  const exportLeads = () => {
    // In a real application, this would generate a CSV or Excel file
    toast({
      title: 'Export en cours',
      description: 'Vos données sont en cours d\'exportation...',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Nouveau</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">En cours</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Traité</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Archivé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Liste des leads</CardTitle>
            <CardDescription>Gérez vos prospects et contacts</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportLeads}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau lead
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des leads..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Select onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouveaux</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="processed">Traités</SelectItem>
                  <SelectItem value="archived">Archivés</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Assignés à
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom / Email</TableHead>
                <TableHead className="hidden md:table-cell">Entreprise</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden lg:table-cell">Tags</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Chargement des leads...</div>
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="text-muted-foreground">Aucun lead trouvé</div>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {lead.company || '-'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(lead.status)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewLead(lead)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteLead(lead)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Dialogs */}
      {selectedLead && (
        <>
          <LeadDetailDialog 
            lead={selectedLead}
            open={isDetailOpen}
            onOpenChange={setIsDetailOpen}
          />
          
          <LeadEditDialog
            lead={selectedLead}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onLeadUpdated={(updatedLead) => {
              setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
            }}
          />
          
          <DeleteConfirmDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onConfirm={confirmDeleteLead}
            title="Supprimer le lead"
            description={`Êtes-vous sûr de vouloir supprimer le lead "${selectedLead.name}" ? Cette action est irréversible.`}
          />
        </>
      )}
    </Card>
  );
};

export default LeadList;
