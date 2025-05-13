
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ContactRequest } from '@/types/contact';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, Eye } from 'lucide-react';

const ContactRequestsTable: React.FC = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contact_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: `Impossible de charger les demandes: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: fr });
    } catch {
      return dateString;
    }
  };

  const getServiceLabel = (value?: string) => {
    if (!value) return "Non spécifié";
    const services: Record<string, string> = {
      "web-development": "Développement Web",
      "mobile-app": "Application Mobile",
      "ui-ux": "Design UI/UX",
      "cloud-infra": "Infrastructure Cloud",
      "consulting": "Conseil",
      "other": "Autre"
    };
    return services[value] || value;
  };

  const getSourceLabel = (value?: string) => {
    if (!value) return "Non spécifié";
    const sources: Record<string, string> = {
      "search-engine": "Moteur de recherche",
      "social-media": "Réseaux sociaux",
      "recommendation": "Recommandation",
      "advertisement": "Publicité",
      "other": "Autre"
    };
    return sources[value] || value;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Demandes de contact</h2>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">Aucune demande de contact pour le moment</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-xs">
                    {formatDate(request.created_at)}
                  </TableCell>
                  <TableCell>
                    {request.prenom} {request.nom}
                  </TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.entreprise || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getServiceLabel(request.service_requis)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal de détail */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>
              Reçue le {selectedRequest && formatDate(selectedRequest.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold">Informations personnelles</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nom complet:</span>
                      <span className="font-medium">{selectedRequest.prenom} {selectedRequest.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{selectedRequest.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Téléphone:</span>
                      <span className="font-medium">{selectedRequest.telephone || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entreprise:</span>
                      <span className="font-medium">{selectedRequest.entreprise || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Site web:</span>
                      <span className="font-medium">
                        {selectedRequest.site_web ? (
                          <a 
                            href={selectedRequest.site_web} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {selectedRequest.site_web}
                          </a>
                        ) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold">Détails de la demande</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service requis:</span>
                      <Badge variant="outline">{getServiceLabel(selectedRequest.service_requis)}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <Badge variant="outline">{getSourceLabel(selectedRequest.origine)}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consentement:</span>
                      <span className="font-medium">{selectedRequest.consentement ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Message</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                  {selectedRequest.description}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactRequestsTable;
