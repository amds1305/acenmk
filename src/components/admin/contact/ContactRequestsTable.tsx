
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, RefreshCw, User, Mail, Phone, Building, Globe, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ContactRequest } from '@/types/contact';
import { useToast } from '@/hooks/use-toast';
import { convertContactToLead } from '@/services/leadTraceService';

const ContactRequestsTable: React.FC = () => {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [convertingId, setConvertingId] = useState<string | null>(null);

  // Charger les demandes de contact
  useEffect(() => {
    fetchContactRequests();
  }, []);

  const fetchContactRequests = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setContactRequests(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de contact:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les demandes de contact',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Convertir un contact en lead
  const handleConvertToLead = async (contact: ContactRequest) => {
    try {
      setConvertingId(contact.id);
      
      const leadId = await convertContactToLead(contact);
      
      if (leadId) {
        toast({
          title: 'Conversion réussie',
          description: 'Le contact a été converti en lead avec succès',
        });
        
        // Rafraîchir la liste
        fetchContactRequests();
      } else {
        throw new Error('La conversion a échoué');
      }
    } catch (error) {
      console.error('Erreur lors de la conversion en lead:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de convertir le contact en lead',
        variant: 'destructive',
      });
    } finally {
      setConvertingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Demandes de contact</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchContactRequests}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>
      
      <Table>
        <TableCaption>Liste des demandes reçues via le formulaire de contact</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="hidden md:table-cell">Entreprise</TableHead>
            <TableHead className="hidden md:table-cell">Service</TableHead>
            <TableHead className="hidden md:table-cell">Origine</TableHead>
            <TableHead className="w-[100px]">Statut</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contactRequests.length === 0 && !loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Aucune demande de contact pour le moment
              </TableCell>
            </TableRow>
          ) : (
            contactRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(request.created_at), 'dd MMM yyyy', { locale: fr })}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(request.created_at), 'HH:mm', { locale: fr })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium flex items-center">
                      <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {request.prenom} {request.nom}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {request.email}
                    </div>
                    {request.telephone && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {request.telephone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {request.entreprise ? (
                    <div className="flex flex-col">
                      <div className="font-medium flex items-center">
                        <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {request.entreprise}
                      </div>
                      {request.site_web && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          <a 
                            href={request.site_web.startsWith('http') ? request.site_web : `https://${request.site_web}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {request.site_web}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {request.service_requis || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {request.origine || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell>
                  {request.converted_to_lead ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                      Converti en lead
                    </Badge>
                  ) : (
                    <Badge variant="outline">Nouveau</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => {
                        // Afficher les détails
                        toast({
                          title: "Détails",
                          description: "Fonctionnalité à venir",
                        })
                      }}>
                        <FileText className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        disabled={request.converted_to_lead || convertingId === request.id} 
                        onClick={() => handleConvertToLead(request)}
                      >
                        {convertingId === request.id ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Conversion...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Convertir en lead
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {loading && (
        <div className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default ContactRequestsTable;
