
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Phone,
  Mail,
  Globe,
  Building,
  Calendar,
  Tag,
  Info,
  MessageSquare,
  CheckSquare,
  User
} from 'lucide-react';
import { Lead } from '@/types/lead';
import LeadInteractionsList from './LeadInteractionsList';
import LeadTasksList from './LeadTasksList';
import LeadAddInteraction from './LeadAddInteraction';

interface LeadDetailDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadDetailDialog: React.FC<LeadDetailDialogProps> = ({ lead, open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('info');

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>{lead.name}</span>
            {getStatusBadge(lead.status)}
          </DialogTitle>
          <DialogDescription className="text-md flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            {lead.email}
            {lead.phone && (
              <>
                <span className="mx-2">•</span>
                <Phone className="mr-2 h-4 w-4" />
                {lead.phone}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="info">
              <Info className="mr-2 h-4 w-4" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="interactions">
              <MessageSquare className="mr-2 h-4 w-4" />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <CheckSquare className="mr-2 h-4 w-4" />
              Tâches
            </TabsTrigger>
            <TabsTrigger value="history">
              <Calendar className="mr-2 h-4 w-4" />
              Historique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </div>
                  </div>
                  
                  {lead.phone && (
                    <div className="flex items-start">
                      <Phone className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Téléphone</div>
                        <div className="text-sm text-muted-foreground">{lead.phone}</div>
                      </div>
                    </div>
                  )}
                  
                  {lead.company && (
                    <div className="flex items-start">
                      <Building className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Entreprise</div>
                        <div className="text-sm text-muted-foreground">{lead.company}</div>
                      </div>
                    </div>
                  )}
                  
                  {lead.website && (
                    <div className="flex items-start">
                      <Globe className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Site web</div>
                        <div className="text-sm text-muted-foreground">
                          <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="hover:underline text-blue-500">
                            {lead.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Calendar className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Date de création</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()} - {new Date(lead.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  {lead.assignedTo && (
                    <div className="flex items-start">
                      <User className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Assigné à</div>
                        <div className="text-sm text-muted-foreground">{lead.assignedTo}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Détails de la demande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lead.service && (
                    <div className="flex items-start">
                      <div className="mr-3 h-5 w-5 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">Service requis</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.service === 'web-development' && 'Développement Web'}
                          {lead.service === 'mobile-app' && 'Application Mobile'}
                          {lead.service === 'ui-ux' && 'Design UI/UX'}
                          {lead.service === 'consulting' && 'Conseil'}
                          {lead.service === 'other' && 'Autre'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {lead.source && (
                    <div className="flex items-start">
                      <div className="mr-3 h-5 w-5 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">Source</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.source === 'search-engine' && 'Moteur de recherche'}
                          {lead.source === 'social-media' && 'Réseaux sociaux'}
                          {lead.source === 'recommendation' && 'Recommandation'}
                          {lead.source === 'advertisement' && 'Publicité'}
                          {lead.source === 'other' && 'Autre'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Tag className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Tags</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lead.tags.length > 0 ? (
                          lead.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Aucun tag</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 h-5 w-5 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium">Description</div>
                      <div className="mt-1 text-sm whitespace-pre-wrap">{lead.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="interactions">
            <LeadAddInteraction leadId={lead.id} />
            <LeadInteractionsList leadId={lead.id} />
          </TabsContent>
          
          <TabsContent value="tasks">
            <LeadTasksList leadId={lead.id} />
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des modifications</CardTitle>
                <CardDescription>
                  Consultez l'historique complet des modifications apportées à ce lead
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l border-border">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="mb-6 relative">
                      <div className="absolute -left-[21px] mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                      <div className="font-medium">{new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {i === 0 && "Statut modifié de 'Nouveau' à 'En cours'"}
                        {i === 1 && "Tag 'urgent' ajouté"}
                        {i === 2 && "Lead créé via le formulaire de contact"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailDialog;
