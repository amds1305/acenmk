
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Lead } from '@/types/lead';
import LeadDetailDialog from './LeadDetailDialog';
import LeadEditDialog from './LeadEditDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { fetchLeads, updateLeadStatus, deleteLead } from '@/services/leadTraceService';

// Mapping des statuts
const statusConfig = {
  'new': { label: 'Nouveau', variant: 'default', bg: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' },
  'in-progress': { label: 'En cours', variant: 'secondary', bg: 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' },
  'processed': { label: 'Traité', variant: 'secondary', bg: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' },
  'archived': { label: 'Archivé', variant: 'outline', bg: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400' },
};

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { toast } = useToast();

  // Charger les leads
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (error) {
      console.error('Erreur lors du chargement des leads:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les leads',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer le changement de statut
  const handleStatusChange = async (lead: Lead, newStatus: string) => {
    try {
      setUpdatingStatus(lead.id);
      const success = await updateLeadStatus(lead.id, newStatus);
      
      if (success) {
        // Mettre à jour l'état local
        setLeads(leads.map(l => l.id === lead.id ? { ...l, status: newStatus as any } : l));
        
        toast({
          title: 'Statut mis à jour',
          description: `Le lead est maintenant "${statusConfig[newStatus as keyof typeof statusConfig]?.label}"`,
        });
      } else {
        throw new Error('Échec de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut',
        variant: 'destructive',
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Gérer la suppression d'un lead
  const handleDelete = async (lead: Lead) => {
    try {
      const success = await deleteLead(lead.id);
      
      if (success) {
        // Mettre à jour l'état local
        setLeads(leads.filter(l => l.id !== lead.id));
        
        toast({
          title: 'Lead supprimé',
          description: 'Le lead a été supprimé avec succès',
        });
        
        setIsDeleteOpen(false);
      } else {
        throw new Error('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du lead:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le lead',
        variant: 'destructive',
      });
    }
  };
  
  // Mettre à jour un lead après modification
  const handleLeadUpdated = (updatedLead: Lead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Liste des leads</h3>
        <Button variant="outline" size="sm" onClick={loadLeads} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead className="hidden md:table-cell">Source</TableHead>
              <TableHead className="hidden md:table-cell">Service</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
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
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                      {lead.company && (
                        <div className="text-xs text-muted-foreground">{lead.company}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{lead.source || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">{lead.service || '-'}</TableCell>
                  <TableCell className="hidden lg:table-cell whitespace-nowrap">
                    {lead.created_at ? format(new Date(lead.created_at), 'dd MMM yyyy', { locale: fr }) : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`${statusConfig[lead.status]?.bg} text-xs font-medium h-6 gap-1 ${updatingStatus === lead.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={updatingStatus === lead.id}
                        >
                          {updatingStatus === lead.id ? (
                            <>
                              <RefreshCw className="h-3 w-3 animate-spin" />
                              Mise à jour...
                            </>
                          ) : (
                            statusConfig[lead.status]?.label || lead.status
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(lead, 'new')}
                          disabled={lead.status === 'new'}
                        >
                          Nouveau
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(lead, 'in-progress')}
                          disabled={lead.status === 'in-progress'}
                        >
                          En cours
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(lead, 'processed')}
                          disabled={lead.status === 'processed'}
                        >
                          Traité
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(lead, 'archived')}
                          disabled={lead.status === 'archived'}
                        >
                          Archivé
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsDeleteOpen(true);
                          }}
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

      {/* Modals */}
      {selectedLead && (
        <>
          <LeadDetailDialog
            lead={selectedLead}
            open={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onEdit={() => {
              setIsDetailOpen(false);
              setIsEditOpen(true);
            }}
            onLeadUpdated={handleLeadUpdated}
          />
          <LeadEditDialog
            lead={selectedLead}
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSave={(updatedLead) => {
              handleLeadUpdated(updatedLead);
              setIsEditOpen(false);
            }}
          />
          <DeleteConfirmDialog
            open={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => handleDelete(selectedLead)}
            title="Supprimer ce lead?"
            description="Cette action est irréversible. Toutes les données associées à ce lead seront définitivement supprimées."
          />
        </>
      )}
    </div>
  );
};

export default LeadList;
