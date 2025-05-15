
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MoreHorizontal, Mail, Phone, ExternalLink, 
  CheckCircle, XCircle, Clock, UserPlus 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  createdAt: string;
  notes?: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '+33 6 12 34 56 78',
    company: 'Entreprise ABC',
    source: 'Site web',
    status: 'new',
    createdAt: '2023-05-15',
    notes: 'Intéressé par nos services de développement web.'
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    phone: '+33 7 12 34 56 78',
    company: 'Startup XYZ',
    source: 'LinkedIn',
    status: 'contacted',
    createdAt: '2023-05-10',
    notes: 'Premier appel effectué le 12/05, rappel prévu le 18/05.'
  },
  {
    id: '3',
    name: 'Pierre Dubois',
    email: 'pierre@example.com',
    phone: '+33 6 98 76 54 32',
    source: 'Recommandation',
    status: 'qualified',
    createdAt: '2023-05-05',
    notes: 'Besoin urgent d\'une solution de e-commerce.'
  }
];

const statusLabels: Record<string, { label: string, color: string }> = {
  'new': { label: 'Nouveau', color: 'bg-blue-500' },
  'contacted': { label: 'Contacté', color: 'bg-purple-500' },
  'qualified': { label: 'Qualifié', color: 'bg-amber-500' },
  'proposal': { label: 'Proposition', color: 'bg-orange-500' },
  'won': { label: 'Gagné', color: 'bg-green-500' },
  'lost': { label: 'Perdu', color: 'bg-red-500' }
};

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Dans un environnement réel, nous chargerions les leads depuis l'API
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      setLeads(mockLeads);
      localStorage.setItem('leads', JSON.stringify(mockLeads));
    }
  }, []);

  const viewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const openStatusDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setIsStatusDialogOpen(true);
  };

  const updateLeadStatus = () => {
    if (!selectedLead || !newStatus) return;

    const updatedLeads = leads.map(lead => 
      lead.id === selectedLead.id ? { ...lead, status: newStatus as any } : lead
    );

    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));

    toast({
      title: "Statut mis à jour",
      description: `Le lead est maintenant marqué comme "${statusLabels[newStatus].label}"`
    });

    setIsStatusDialogOpen(false);
  };

  const deleteLead = (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));

    toast({
      title: "Lead supprimé",
      description: "Le lead a été supprimé avec succès"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'contacted': return <Mail className="h-4 w-4 text-purple-500" />;
      case 'qualified': return <UserPlus className="h-4 w-4 text-amber-500" />;
      case 'proposal': return <ExternalLink className="h-4 w-4 text-orange-500" />;
      case 'won': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'lost': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Liste des leads</CardTitle>
          <CardDescription>Gérez vos prospects et suivez leur progression</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{lead.email}</span>
                      <span className="text-xs text-muted-foreground">{lead.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company || '-'}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge className={statusLabels[lead.status].color}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(lead.status)}
                        <span>{statusLabels[lead.status].label}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewLeadDetails(lead)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Voir les détails</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openStatusDialog(lead)}>
                          <Clock className="mr-2 h-4 w-4" />
                          <span>Modifier le statut</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `mailto:${lead.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Envoyer un email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteLead(lead.id)} className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal détails du lead */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du lead</DialogTitle>
            <DialogDescription>
              Informations complètes sur le prospect
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nom</h3>
                  <p>{selectedLead.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{selectedLead.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Téléphone</h3>
                  <p>{selectedLead.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Entreprise</h3>
                  <p>{selectedLead.company || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
                  <p>{selectedLead.source}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date de création</h3>
                  <p>{selectedLead.createdAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                  <Badge className={statusLabels[selectedLead.status].color}>
                    {statusLabels[selectedLead.status].label}
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                <p className="mt-1 text-sm">{selectedLead.notes || 'Aucune note'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal changement de statut */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="contacted">Contacté</SelectItem>
                <SelectItem value="qualified">Qualifié</SelectItem>
                <SelectItem value="proposal">Proposition</SelectItem>
                <SelectItem value="won">Gagné</SelectItem>
                <SelectItem value="lost">Perdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>Annuler</Button>
            <Button onClick={updateLeadStatus}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManager;
