
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MoreHorizontal, Mail, Phone, ExternalLink, 
  CheckCircle, XCircle, Clock, UserPlus 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

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
  userId: string; // Identifiant de l'utilisateur propriétaire
}

const statusLabels: Record<string, { label: string, color: string }> = {
  'new': { label: 'Nouveau', color: 'bg-blue-500' },
  'contacted': { label: 'Contacté', color: 'bg-purple-500' },
  'qualified': { label: 'Qualifié', color: 'bg-amber-500' },
  'proposal': { label: 'Proposition', color: 'bg-orange-500' },
  'won': { label: 'Gagné', color: 'bg-green-500' },
  'lost': { label: 'Perdu', color: 'bg-red-500' }
};

const LeadsList = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    // Dans un environnement réel, nous chargerions les leads depuis l'API
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads && user) {
      // Filtrer pour n'afficher que les leads de l'utilisateur connecté
      const allLeads = JSON.parse(storedLeads);
      const userLeads = allLeads.filter((lead: Lead) => lead.userId === user.id);
      setLeads(userLeads);
    } else {
      setLeads([]);
    }
  }, [user]);

  const viewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
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

  if (!user) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>Veuillez vous connecter pour accéder à vos leads.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes leads</CardTitle>
          <CardDescription>Suivez les prospects qui vous sont affectés</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Vous n'avez pas encore de leads assignés.</p>
            </div>
          ) : (
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
                          <DropdownMenuItem onClick={() => window.location.href = `mailto:${lead.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Envoyer un email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.location.href = `tel:${lead.phone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Appeler</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal détails du lead */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du lead</DialogTitle>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsList;
