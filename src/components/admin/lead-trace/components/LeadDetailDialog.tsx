
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Edit, Mail, Phone, Globe, Clock, Building, FileText, Tag } from 'lucide-react';
import { Lead } from '@/types/lead';
import LeadInteractionsList from './LeadInteractionsList';
import LeadAddInteraction from './LeadAddInteraction';
import LeadTasksList from './LeadTasksList';

interface LeadDetailDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

const LeadDetailDialog: React.FC<LeadDetailDialogProps> = ({
  lead,
  open,
  onOpenChange,
  onEdit,
}) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails du lead</span>
            <div className="flex items-center gap-2">
              {getStatusBadge(lead.status)}
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              {lead.assignedTo && (
                <p className="text-sm text-muted-foreground">
                  Assigné à: {lead.assignedTo}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              
              {lead.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
              
              {lead.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
              )}
              
              {lead.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-primary hover:underline">
                    {lead.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  Créé le {new Date(lead.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {lead.source && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Source: {lead.source}</span>
                </div>
              )}
            </div>
            
            {lead.tags && lead.tags.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Tags:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-1">Description:</h4>
              <p className="text-sm">{lead.description}</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="interactions">
              <TabsList className="w-full">
                <TabsTrigger value="interactions" className="flex-1">Interactions</TabsTrigger>
                <TabsTrigger value="tasks" className="flex-1">Tâches</TabsTrigger>
              </TabsList>
              <TabsContent value="interactions" className="space-y-4 pt-4">
                <LeadAddInteraction leadId={lead.id} />
                <LeadInteractionsList leadId={lead.id} />
              </TabsContent>
              <TabsContent value="tasks" className="pt-4">
                <LeadTasksList leadId={lead.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailDialog;
