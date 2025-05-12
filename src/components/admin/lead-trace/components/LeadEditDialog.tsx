
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Lead } from '@/types/lead';
import { updateLead } from '@/services/leadTraceService';
import { Loader2 } from 'lucide-react';

interface LeadEditDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  service: z.string().optional(),
  source: z.string().optional(),
  description: z.string().min(1, 'La description est requise'),
  status: z.enum(['new', 'in-progress', 'processed', 'archived']),
  assignedTo: z.string().optional(),
  tags: z.string().optional(),
});

const LeadEditDialog: React.FC<LeadEditDialogProps> = ({
  lead,
  open,
  onClose,
  onSave,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Convertir les tags array en string pour le formulaire
  const tagsString = lead.tags ? lead.tags.join(', ') : '';
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? '',
      company: lead.company ?? '',
      website: lead.website ?? '',
      service: lead.service ?? '',
      source: lead.source ?? '',
      description: lead.description,
      status: lead.status,
      assignedTo: lead.assignedTo ?? '',
      tags: tagsString,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Convertir la chaîne de tags en tableau
      const tagsArray = values.tags ? 
        values.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : 
        [];
      
      // Préparer les données à mettre à jour
      const updatedLeadData: Partial<Lead> = {
        ...values,
        tags: tagsArray,
      };
      
      // Envoyer la mise à jour à la base de données
      const success = await updateLead(lead.id, updatedLeadData);
      
      if (success) {
        // Créer un objet Lead complet pour la mise à jour de l'interface
        const updatedLead: Lead = {
          ...lead,
          ...updatedLeadData,
        };
        
        toast({
          title: 'Lead mis à jour',
          description: 'Les modifications ont été enregistrées avec succès',
        });
        
        onSave(updatedLead);
      } else {
        throw new Error('Échec de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lead:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors de la mise à jour du lead',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Modifier le lead</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site web</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">Nouveau</SelectItem>
                        <SelectItem value="in-progress">En cours</SelectItem>
                        <SelectItem value="processed">Traité</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (séparés par des virgules)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="web, urgent, priorité" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer les modifications'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadEditDialog;
